
var expressions = require('../lib/expressions');
var contexts = require('../lib/contexts');

exports['evaluate constante'] = function (test) {
    test.equal(expressions.constant(42).evaluate(), 42);
};

exports['evaluate name in context'] = function (test) {
    var ctx = contexts.context();
    
    ctx.set('foo', 42);
    
    test.equal(expressions.name('foo').evaluate(ctx), 42);
};

exports['evaluate call in context'] = function (test) {
    var ctx = contexts.context();
    
    ctx.set('add', function (x, y) { return x + y; });
    
    test.equal(expressions.call('add', [ expressions.constant(1), expressions.constant(2) ]).evaluate(ctx), 3);
};

