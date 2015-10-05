
var expressions = require('./expressions');
var lexers = require('./lexers');
var TokenType = lexers.TokenType;
var commands = require('./commands');

var operators = [['+', '-'], ['*', '/']];

function Parser(text) {
    var lexer = lexers.lexer(text);
    var self = this;
    
    this.parseCommand = function () {
        var token = lexer.nextToken();
        
        if (token == null)
            return null;
            
        if (token.value == 'program' && token.type == TokenType.Name)
            return parseProgram();

        if (token.value == 'procedure' && token.type == TokenType.Name)
            return parseProcedure();
            
        if (token.type == TokenType.Name && tryGetToken(':=', TokenType.Operator)) {
            var cmd = commands.assign(token.value, this.parseExpression());
            tryGetToken(';', TokenType.Delimiter);
            return cmd;
        }
                
        if (token.value == 'if' && token.type == TokenType.Name)
            return parseIfCommand();
            
        lexer.pushToken(token);

        if (token.value == "}" && token.type == TokenType.Delimiter)
            return null;
            
        if (token.value == "{" && token.type == TokenType.Delimiter)
            return parseCompositeCommand();
        
        var expr = this.parseExpression();
        
        if (expr == null)
            return null;
            
        tryGetToken(';', TokenType.Delimiter);
        
        return commands.expression(expr);
    };
    
    this.parseExpression = function () {
        var expr = parseBinaryExpression(0);
        
        if (expr == null)
            return null;
            
        if (tryGetToken('&&', TokenType.Operator))
            return expressions.and(expr, parseBinaryExpression(0));
            
        if (tryGetToken('||', TokenType.Operator))
            return expressions.or(expr, parseBinaryExpression(0));
            
        if (tryGetToken('==', TokenType.Operator))
            return expressions.equals(expr, parseBinaryExpression(0));

        if (tryGetToken('/=', TokenType.Operator))
            return expressions.notEquals(expr, parseBinaryExpression(0));
            
        if (tryGetToken('<', TokenType.Operator))
            return expressions.less(expr, parseBinaryExpression(0));
            
        if (tryGetToken('<=', TokenType.Operator))
            return expressions.lessEquals(expr, parseBinaryExpression(0));
            
        if (tryGetToken('>', TokenType.Operator))
            return expressions.greater(expr, parseBinaryExpression(0));
            
        if (tryGetToken('>=', TokenType.Operator))
            return expressions.greaterEquals(expr, parseBinaryExpression(0));
        
        return expr;
    }
    
    function parseBinaryExpression(level) {
        if (level >= operators.length)
            return parseTerm();
            
        var expr = parseBinaryExpression(level + 1);
        
        var token = lexer.nextToken();
        
        while (token != null && token.type == TokenType.Operator && operators[level].indexOf(token.value) >= 0) {
            var oper = token.value;
            
            if (oper === '+')
                expr = expressions.add(expr, parseBinaryExpression(level + 1));
            else if (oper === '-')
                expr = expressions.subtract(expr, parseBinaryExpression(level + 1));
            else if (oper === '*')
                expr = expressions.multiply(expr, parseBinaryExpression(level + 1));
            else if (oper === '/')
                expr = expressions.divide(expr, parseBinaryExpression(level + 1));
                
            token = lexer.nextToken();
        }
        
        lexer.pushToken(token);

        return expr;
    }
    
    function parseTerm() {
        var token = lexer.nextToken();
        
        if (token == null)
            return null;
            
        if (token.type == TokenType.Operator && token.value == 'not')
            return expressions.not(parseTerm());
            
        if (token.type == TokenType.Number)
            return expressions.constant(parseInt(token.value));
            
        if (token.type == TokenType.String)
            return expressions.constant(token.value);
            
        if (token.type == TokenType.Name) {
            if (token.value == 'true')
                return expressions.constant(true);
            if (token.value == 'false')
                return expressions.constant(false);
                
            if (tryGetToken('(', TokenType.Delimiter)) {
                var exprs = [];
                
                for (var expr = self.parseExpression(); expr; expr = self.parseExpression()) {
                    exprs.push(expr);
                    
                    if (!tryGetToken(",", TokenType.Delimiter))
                        break;
                }
                
                getToken(')', TokenType.Delimiter);
                return expressions.call(token.value, exprs);
            }
            
            return expressions.name(token.value);
        }
        
        lexer.pushToken(token);
        
        return null;
    }

    function parseCompositeCommand() {
        var cmds = [];
        
        getToken("{", TokenType.Delimiter);
        
        for (var cmd = self.parseCommand(); cmd; cmd = self.parseCommand())
            cmds.push(cmd);
        
        getToken("}", TokenType.Delimiter);
        
        return commands.composite(cmds);
    }
    
    function parseIfCommand() {
        getToken("(", TokenType.Delimiter);
        var cond = self.parseExpression();
        getToken(")", TokenType.Delimiter);
        
        var thencmd = self.parseCommand();
        var elsecmd = null;
        
        if (tryGetToken('else', TokenType.Name))
            elsecmd = self.parseCommand();        
        
        return commands.ifc(cond, thencmd, elsecmd);
    }
        
    function tryGetToken(value, type) {
        var token = lexer.nextToken();
        
        if (token == null)
            return false;
            
        if (token.value == value && token.type == type)
            return true;
            
        lexer.pushToken(token);
        
        return false;
    }

    function getName() {
        var token = lexer.nextToken();
        
        if (token == null || token.type != TokenType.Name)
            throw new ("Expected name");
            
        return token.value;
    }
    
    function getToken(value, type) {
        if (!tryGetToken(value, type))
            throw new Error("Expected '" + value + "'");
    }
    
    function parseProgram() {
        return commands.program(parseCompositeCommand());
    }
    
    function parseProcedure() {
        var name = getName();
        var argnames = [];
        
        getToken('(', TokenType.Delimiter);
        
        while (!tryGetToken(')', TokenType.Delimiter)) {
            var nm = getName();
            argnames.push(nm);
            if (tryGetToken(')', TokenType.Delimiter))
                break;
            getToken(',', TokenType.Delimiter);
        }
        
        return commands.procedure(name, argnames, parseCompositeCommand());
    }
}

function createParser(text) {
    return new Parser(text);
}

module.exports = {
    parser: createParser
};

