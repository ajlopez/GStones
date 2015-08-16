
var parsers = require('../lib/parsers');

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
};

