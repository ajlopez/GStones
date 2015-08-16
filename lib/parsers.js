
var expressions = require('./expressions');
var lexers = require('./lexers');
var TokenType = lexers.TokenType;

function Parser(text) {
    var lexer = lexers.lexer(text);
    
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
    
    function getToken(value, type) {
        if (!tryGetToken(value, type))
            throw new Error("Expected '" + value + "'");
    }
}

function createParser(text) {
    return new Parser(text);
}

module.exports = {
    parser: createParser
};

