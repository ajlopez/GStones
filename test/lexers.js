var lexers = require('../lib/lexers');var TokenType = lexers.TokenType;exports['create lexer'] = function (test) {    var lexer = lexers.lexer('foo');    test.ok(lexer);    test.equal(typeof lexer, 'object');};exports['get name'] = function (test) {    var lexer = lexers.lexer('foo');        var token = lexer.nextToken();        test.ok(token);    test.equal(token.value, 'foo');    test.equal(token.type, TokenType.Name);        test.equal(lexer.nextToken(), null);};exports['get name skipping spaces'] = function (test) {    var lexer = lexers.lexer(' foo  ');        var token = lexer.nextToken();        test.ok(token);    test.equal(token.value, 'foo');    test.equal(token.type, TokenType.Name);        test.equal(lexer.nextToken(), null);};exports['get names'] = function (test) {    var lexer = lexers.lexer('foo bar');        var token = lexer.nextToken();        test.ok(token);    test.equal(token.value, 'foo');    test.equal(token.type, TokenType.Name);        var token = lexer.nextToken();        test.ok(token);    test.equal(token.value, 'bar');    test.equal(token.type, TokenType.Name);        test.equal(lexer.nextToken(), null);};exports['get names skipping spaces'] = function (test) {    var lexer = lexers.lexer('   foo    bar    ');        var token = lexer.nextToken();        test.ok(token);    test.equal(token.value, 'foo');    test.equal(token.type, TokenType.Name);        var token = lexer.nextToken();        test.ok(token);    test.equal(token.value, 'bar');    test.equal(token.type, TokenType.Name);        test.equal(lexer.nextToken(), null);};