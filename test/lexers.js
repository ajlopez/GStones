var lexers = require('../lib/lexers');var TokenType = lexers.TokenType;exports['create lexer'] = function (test) {    var lexer = lexers.lexer('foo');    test.ok(lexer);    test.equal(typeof lexer, 'object');};exports['get name'] = function (test) {    var lexer = lexers.lexer('foo');        var token = lexer.nextToken();        test.ok(token);    test.equal(token.value, 'foo');    test.equal(token.type, TokenType.Name);        test.equal(lexer.nextToken(), null);};exports['get name with underscore'] = function (test) {    var lexer = lexers.lexer('foo_bar');        var token = lexer.nextToken();        test.ok(token);    test.equal(token.value, 'foo_bar');    test.equal(token.type, TokenType.Name);        test.equal(lexer.nextToken(), null);};exports['get name with digits'] = function (test) {    var lexer = lexers.lexer('foo42');        var token = lexer.nextToken();        test.ok(token);    test.equal(token.value, 'foo42');    test.equal(token.type, TokenType.Name);        test.equal(lexer.nextToken(), null);};exports['get name with apostrophe'] = function (test) {    var lexer = lexers.lexer("foo'bar");        var token = lexer.nextToken();        test.ok(token);    test.equal(token.value, "foo'bar");    test.equal(token.type, TokenType.Name);        test.equal(lexer.nextToken(), null);};exports['get name skipping spaces'] = function (test) {    var lexer = lexers.lexer(' foo  ');        var token = lexer.nextToken();        test.ok(token);    test.equal(token.value, 'foo');    test.equal(token.type, TokenType.Name);        test.equal(lexer.nextToken(), null);};exports['get name skipping white spaces'] = function (test) {    var lexer = lexers.lexer('\r\n\t foo\r\n\t ');        var token = lexer.nextToken();        test.ok(token);    test.equal(token.value, 'foo');    test.equal(token.type, TokenType.Name);        test.equal(lexer.nextToken(), null);};exports['get name skipping comments'] = function (test) {    var lexer = lexers.lexer('-- a comment \n foo  -- another comment ');        var token = lexer.nextToken();        test.ok(token);    test.equal(token.value, 'foo');    test.equal(token.type, TokenType.Name);        test.equal(lexer.nextToken(), null);};exports['get name skipping multiline comments'] = function (test) {    var lexer = lexers.lexer('{- this is \r\na comment -}\n foo  {- this is \r\nanother comment -} ');        var token = lexer.nextToken();        test.ok(token);    test.equal(token.value, 'foo');    test.equal(token.type, TokenType.Name);        test.equal(lexer.nextToken(), null);};exports['get names'] = function (test) {    var lexer = lexers.lexer('foo bar');        var token = lexer.nextToken();        test.ok(token);    test.equal(token.value, 'foo');    test.equal(token.type, TokenType.Name);        var token = lexer.nextToken();        test.ok(token);    test.equal(token.value, 'bar');    test.equal(token.type, TokenType.Name);        test.equal(lexer.nextToken(), null);};exports['get names skipping spaces'] = function (test) {    var lexer = lexers.lexer('   foo    bar    ');        var token = lexer.nextToken();        test.ok(token);    test.equal(token.value, 'foo');    test.equal(token.type, TokenType.Name);        var token = lexer.nextToken();        test.ok(token);    test.equal(token.value, 'bar');    test.equal(token.type, TokenType.Name);        test.equal(lexer.nextToken(), null);};exports['get integer number'] = function (test) {    var lexer = lexers.lexer('42');    var token = lexer.nextToken();    test.ok(token);    test.equal(token.value, '42');    test.equal(token.type, TokenType.Number);        test.equal(lexer.nextToken(), null);};exports['get string'] = function (test) {    var lexer = lexers.lexer('"foo"');    var token = lexer.nextToken();    test.ok(token);    test.equal(token.value, 'foo');    test.equal(token.type, TokenType.String);        test.equal(lexer.nextToken(), null);};exports['get delimiters'] = function (test) {    var lexer = lexers.lexer("{};()");        [ '{', '}', ';', '(', ')' ].forEach(function (value) {        var token = lexer.nextToken();                test.ok(token);        test.equal(token.value, value);        test.equal(token.type, TokenType.Delimiter);    });        test.equal(lexer.nextToken(), null);};exports['get name and delimiters'] = function (test) {    var lexer = lexers.lexer("foo()");        var token = lexer.nextToken();        test.ok(token);    test.equal(token.value, 'foo');    test.equal(token.type, TokenType.Name);        var token = lexer.nextToken();        test.ok(token);    test.equal(token.value, '(');    test.equal(token.type, TokenType.Delimiter);        var token = lexer.nextToken();        test.ok(token);    test.equal(token.value, ')');    test.equal(token.type, TokenType.Delimiter);        test.equal(lexer.nextToken(), null);};