
var expressions = require('../lib/expressions');
var contexts = require('../lib/contexts');

exports['evaluate constante'] = function (test) {
    test.equal(expressions.constant(42).evaluate(), 42);
};

exports['evaluate name in context'] = function (test) {
    var ctx = contexts.createContext();
    
    ctx.set('foo', 42);
    
    test.equal(expressions.name('foo').evaluate(ctx), 42);
};

