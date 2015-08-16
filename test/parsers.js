
var parsers = require('../lib/parsers');
var contexts = require('../lib/contexts');

exports['parse integer constant expression'] = function (test) {
    var parser = parsers.parser('42');
    
    var expr = parser.parseExpression();
    
    test.ok(expr);
    test.equal(expr.evaluate(), 42);
    
    test.equal(parser.parseExpression(), null);
};

exports['parse string constant expression'] = function (test) {
    var parser = parsers.parser('"foo"');
    
    var expr = parser.parseExpression();
    
    test.ok(expr);
    test.equal(expr.evaluate(), "foo");
    
    test.equal(parser.parseExpression(), null);
};

exports['parse name'] = function (test) {
    var parser = parsers.parser('foo');
    
    var expr = parser.parseExpression();
    var ctx = contexts.context();
    ctx.set('foo', 42);
    
    test.ok(expr);
    test.equal(expr.evaluate(ctx), 42);
    
    test.equal(parser.parseExpression(), null);
};

exports['parse call without arguments'] = function (test) {
    var parser = parsers.parser('foo()');
    
    var expr = parser.parseExpression();
    var ctx = contexts.context();
    ctx.set('foo', function () { return 42; });
    
    test.ok(expr);
    test.equal(expr.evaluate(ctx), 42);
    
    test.equal(parser.parseExpression(), null);
};

exports['parse call with two arguments'] = function (test) {
    var parser = parsers.parser('add(1, 2)');
    
    var expr = parser.parseExpression();
    var ctx = contexts.context();
    ctx.set('add', function (x, y) { return x + y; });
    
    test.ok(expr);
    test.equal(expr.evaluate(ctx), 3);
    
    test.equal(parser.parseExpression(), null);
};
