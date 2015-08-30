
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

exports['evaluate add in context'] = function (test) {
    var ctx = contexts.context();
    
    ctx.set('a', 1);
    ctx.set('b', 2);
    
    test.equal(expressions.add(expressions.name('a'), expressions.name('b')).evaluate(ctx), 3);
};

exports['evaluate subtract in context'] = function (test) {
    var ctx = contexts.context();
    
    ctx.set('a', 1);
    ctx.set('b', 2);
    
    test.equal(expressions.subtract(expressions.name('a'), expressions.name('b')).evaluate(ctx), -1);
};

exports['evaluate multiply in context'] = function (test) {
    var ctx = contexts.context();
    
    ctx.set('a', 3);
    ctx.set('b', 2);
    
    test.equal(expressions.multiply(expressions.name('a'), expressions.name('b')).evaluate(ctx), 6);
};

exports['evaluate divide in context'] = function (test) {
    var ctx = contexts.context();
    
    ctx.set('a', 3);
    ctx.set('b', 2);
    
    test.equal(expressions.divide(expressions.name('a'), expressions.name('b')).evaluate(ctx), 3/2);
};

