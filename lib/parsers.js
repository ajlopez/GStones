
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
                getToken(')', TokenType.Delimiter);
                return expressions.call(token.value, []);
            }
            
            return expressions.name(token.value);
        }
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

