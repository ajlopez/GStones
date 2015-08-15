
var TokenType = { Name: 1 };

function Lexer(text) {
    var l = text ? text.length : 0;
    var p = 0;
    
    this.nextToken = function () {
        while (p < l && isWhiteSpace(text[p]))
            p++;
            
        if (p >= l)
            return null;
            
        var value = text[p++];
        
        while (p < l && !isWhiteSpace(text[p]))
            value += text[p++];
            
        return { value: value, type: TokenType.Name };
    };
}

function isWhiteSpace(ch) {
    return ch <= ' ';
}

function createLexer(text) {
    return new Lexer(text);
}

module.exports = {
    lexer: createLexer,
    TokenType: TokenType
};