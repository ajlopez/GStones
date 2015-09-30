
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

exports['evaluate equal in context'] = function (test) {
    var ctx = contexts.context();
    
    ctx.set('a', 2);
    ctx.set('b', 2);
    ctx.set('c', 3);
    
    test.equal(expressions.equals(expressions.name('a'), expressions.name('b')).evaluate(ctx), true);
    test.equal(expressions.equals(expressions.name('a'), expressions.name('c')).evaluate(ctx), false);
};

exports['evaluate not equals in context'] = function (test) {
    var ctx = contexts.context();
    
    ctx.set('a', 2);
    ctx.set('b', 2);
    ctx.set('c', 3);
    
    test.equal(expressions.notEquals(expressions.name('a'), expressions.name('b')).evaluate(ctx), false);
    test.equal(expressions.notEquals(expressions.name('a'), expressions.name('c')).evaluate(ctx), true);
};

exports['evaluate less in context'] = function (test) {
    var ctx = contexts.context();
    
    ctx.set('a', 2);
    ctx.set('b', 2);
    ctx.set('c', 3);
    
    test.equal(expressions.less(expressions.name('a'), expressions.name('b')).evaluate(ctx), false);
    test.equal(expressions.less(expressions.name('a'), expressions.name('c')).evaluate(ctx), true);
    test.equal(expressions.less(expressions.name('c'), expressions.name('b')).evaluate(ctx), false);
};

exports['evaluate greater in context'] = function (test) {
    var ctx = contexts.context();
    
    ctx.set('a', 2);
    ctx.set('b', 2);
    ctx.set('c', 3);
    
    test.equal(expressions.greater(expressions.name('a'), expressions.name('b')).evaluate(ctx), false);
    test.equal(expressions.greater(expressions.name('a'), expressions.name('c')).evaluate(ctx), false);
    test.equal(expressions.greater(expressions.name('c'), expressions.name('b')).evaluate(ctx), true);
};

exports['evaluate less equal in context'] = function (test) {
    var ctx = contexts.context();
    
    ctx.set('a', 2);
    ctx.set('b', 2);
    ctx.set('c', 3);
    
    test.equal(expressions.lessEquals(expressions.name('a'), expressions.name('b')).evaluate(ctx), true);
    test.equal(expressions.lessEquals(expressions.name('a'), expressions.name('c')).evaluate(ctx), true);
    test.equal(expressions.lessEquals(expressions.name('c'), expressions.name('b')).evaluate(ctx), false);
};

exports['evaluate greater equal in context'] = function (test) {
    var ctx = contexts.context();
    
    ctx.set('a', 2);
    ctx.set('b', 2);
    ctx.set('c', 3);
    
    test.equal(expressions.greaterEquals(expressions.name('a'), expressions.name('b')).evaluate(ctx), true);
    test.equal(expressions.greaterEquals(expressions.name('a'), expressions.name('c')).evaluate(ctx), false);
    test.equal(expressions.greaterEquals(expressions.name('c'), expressions.name('b')).evaluate(ctx), true);
};

exports['evaluate and in context'] = function (test) {
    var ctx = contexts.context();
    
    ctx.set('a', true);
    ctx.set('b', true);
    ctx.set('c', false);
    ctx.set('d', 1);
    ctx.set('e', null);
    ctx.set('f', null);
    
    test.strictEqual(expressions.and(expressions.name('a'), expressions.name('b')).evaluate(ctx), true);
    test.strictEqual(expressions.and(expressions.name('a'), expressions.name('c')).evaluate(ctx), false);
    test.strictEqual(expressions.and(expressions.name('c'), expressions.name('b')).evaluate(ctx), false);
    
    test.strictEqual(expressions.and(expressions.name('a'), expressions.name('d')).evaluate(ctx), true);
    test.strictEqual(expressions.and(expressions.name('d'), expressions.name('e')).evaluate(ctx), false);
    test.strictEqual(expressions.and(expressions.name('f'), expressions.name('d')).evaluate(ctx), false);
};

exports['evaluate or in context'] = function (test) {
    var ctx = contexts.context();
    
    ctx.set('a', true);
    ctx.set('b', true);
    ctx.set('c', false);
    ctx.set('d', 1);
    ctx.set('e', null);
    ctx.set('f', null);
    
    test.strictEqual(expressions.or(expressions.name('a'), expressions.name('b')).evaluate(ctx), true);
    test.strictEqual(expressions.or(expressions.name('a'), expressions.name('c')).evaluate(ctx), true);
    test.strictEqual(expressions.or(expressions.name('c'), expressions.name('b')).evaluate(ctx), true);
    
    test.strictEqual(expressions.or(expressions.name('a'), expressions.name('d')).evaluate(ctx), true);
    test.strictEqual(expressions.or(expressions.name('d'), expressions.name('e')).evaluate(ctx), true);
    test.strictEqual(expressions.or(expressions.name('f'), expressions.name('d')).evaluate(ctx), true);

    test.strictEqual(expressions.or(expressions.name('f'), expressions.name('e')).evaluate(ctx), false);
    test.strictEqual(expressions.or(expressions.name('c'), expressions.name('e')).evaluate(ctx), false);
    test.strictEqual(expressions.or(expressions.name('c'), expressions.name('c')).evaluate(ctx), false);
};

exports['evaluate not in context'] = function (test) {
    var ctx = contexts.context();
    
    ctx.set('a', true);
    ctx.set('b', false);
    ctx.set('c', 1);
    ctx.set('d', null);
    
    test.strictEqual(expressions.not(expressions.name('a')).evaluate(ctx), false);
    test.strictEqual(expressions.not(expressions.name('b')).evaluate(ctx), true);
    test.strictEqual(expressions.not(expressions.name('c')).evaluate(ctx), false);
    test.strictEqual(expressions.not(expressions.name('d')).evaluate(ctx), true);
};

