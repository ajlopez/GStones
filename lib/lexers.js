
var TokenType = { Name: 1, Number: 2, String: 3 };

function Lexer(text) {
    var l = text ? text.length : 0;
    var p = 0;
    
    this.nextToken = function () {
        skipWhiteSpaces();
        
        if (p >= l)
            return null;
            
        var value = text[p++];
        
        if (value == '"')
            return nextString();
        
        if (isDigit(value))
            return nextNumber(value);
            
        return nextName(value);
    }
     
    function nextString() {
        var value = '';
        
        while (p < l && text[p] != '"')
            value += text[p++];
            
        if (p < l)
            p++;
            
        return { value: value, type: TokenType.String };
    };
     
    function nextNumber(value) {
        while (p < l && isDigit(text[p]))
            value += text[p++];
            
        return { value: value, type: TokenType.Number };
    };
     
    function nextName(value) {
        while (p < l && !isWhiteSpace(text[p]))
            value += text[p++];
            
        return { value: value, type: TokenType.Name };
    };
    
    function skipWhiteSpaces() {
        while (true) {
            while (p < l && isWhiteSpace(text[p]))
                p++;
                
            if (text[p] == '-' && text[p + 1] == '-') {
                while (p < l && text[p] != '\n')
                    p++;
                    
                continue;
            }
            
            break;
        }
    }
}

function isWhiteSpace(ch) {
    return ch <= ' ';
}

function isDigit(ch) {
    return ch >= '0' && ch <= '9';
}

function createLexer(text) {
    return new Lexer(text);
}

module.exports = {
    lexer: createLexer,
    TokenType: TokenType
};

