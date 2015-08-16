
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
    }
}

function createParser(text) {
    return new Parser(text);
}

module.exports = {
    createParser: createParser
};