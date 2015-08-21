
var expressions = require('./expressions');
var lexers = require('./lexers');
var TokenType = lexers.TokenType;

function ExpressionCommand(expr) {
    this.execute = function (ctx) {
        expr.evaluate(ctx);
    };
}

function CompositeCommand(cmds) {
    this.execute = function (ctx) {
        cmds.forEach(function (cmd) {
            cmd.execute(ctx);
        });
    };
}

function ProgramCommand(cmds) {
    this.execute = function (ctx) {
        ctx.set('$program', new CompositeCommand(cmds));
    };
}

function ProcedureCommand(name, argnames, cmds) {
    this.execute = function (ctx) {
        ctx.set(name, new CompositeCommand(cmds));
    };
}

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
            
        lexer.pushToken(token);
        
        var expr = this.parseExpression();
        
        if (expr == null)
            return null;
            
        tryGetToken(';', TokenType.Delimiter);
        
        return new ExpressionCommand(expr);
    };
    
    this.parseExpression = function () {
        var token = lexer.nextToken();
        
        if (token == null)
            return null;
            
        if (token.type == TokenType.Number)
            return expressions.constant(parseInt(token.value));
            
        if (token.type == TokenType.String)
            return expressions.constant(token.value);
            
        if (token.type == TokenType.Name) {
            if (tryGetToken('(', TokenType.Delimiter)) {
                var exprs = [];
                
                for (var expr = this.parseExpression(); expr; expr = this.parseExpression()) {
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
        var cmds = [];
        
        getToken('{', TokenType.Delimiter);
        
        for (var cmd = self.parseCommand(); cmd != null; cmd = self.parseCommand())
            cmds.push(cmd);
        
        getToken('}', TokenType.Delimiter);
        
        return new ProgramCommand(cmds);
    }
    
    function parseProcedure() {
        var name = getName();
        var argnames = [];
        var cmds = [];
        
        getToken('(', TokenType.Delimiter);
        getToken(')', TokenType.Delimiter);
        getToken('{', TokenType.Delimiter);
        
        for (var cmd = self.parseCommand(); cmd != null; cmd = self.parseCommand())
            cmds.push(cmd);
        
        getToken('}', TokenType.Delimiter);
        
        return new ProcedureCommand(name, argnames, cmds);
    }
}

function createParser(text) {
    return new Parser(text);
}

module.exports = {
    parser: createParser
};

