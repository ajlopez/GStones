
var TokenType = { Name: 1, Number: 2, String: 3, Delimiter: 4, Operator: 5 };

var delimiters = "{};(),";
var operators = [ "+", "-", "*", "/" ];

function Lexer(text) {
    var l = text ? text.length : 0;
    var p = 0;
    var tokens = [];
    
    this.pushToken = function (token) {
        tokens.push(token);
    };
    
    this.nextToken = function () {
        if (tokens.length)
            return tokens.pop();

        skipWhiteSpaces();
        
        if (p >= l)
            return null;
            
        var value = text[p++];
        
        if (value == '"')
            return nextString();
        
        if (isDigit(value))
            return nextNumber(value);
            
        if (delimiters.indexOf(value) >= 0)
            return { value: value, type: TokenType.Delimiter };
            
        if (operators.indexOf(value) >= 0)
            return { value: value, type: TokenType.Operator };
            
        if (value == ':' && text[p] == '=') {
            p++;
            return { value: ":=", type: TokenType.Operator };
        }
            
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
        while (p < l && (isLetter(text[p]) || isDigit(text[p]) || text[p] == '_' || text[p] == "'"))
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
                
            if (text[p] == '/' && text[p + 1] == '/') {
                while (p < l && text[p] != '\n')
                    p++;
                    
                continue;
            }

            if (text[p] == '#') {
                while (p < l && text[p] != '\n')
                    p++;
                    
                continue;
            }

            if (text[p] == '{' && text[p + 1] == '-') {
                while (p < l && (text[p] != '-' || text[p + 1] != '}'))
                    p++;
                    
                if (text[p] == '-')
                    p += 2;
                    
                continue;
            }

            if (text[p] == '/' && text[p + 1] == '*') {
                while (p < l && (text[p] != '*' || text[p + 1] != '/'))
                    p++;
                    
                if (text[p] == '*')
                    p += 2;
                    
                continue;
            }

            if (text[p] == '"' && text[p + 1] == '"' && text[p + 2] == '"') {
                p += 3;
                
                while (p < l && (text[p] != '"' || text[p + 1] != '"' || text[p + 2] != '"'))
                    p++;
                    
                p += 3;
                    
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

function isLetter(ch) {
    return ch >= 'A' && ch <= 'Z' || ch >= 'a' && ch <= 'z';
}

function createLexer(text) {
    return new Lexer(text);
}

module.exports = {
    lexer: createLexer,
    TokenType: TokenType
};

