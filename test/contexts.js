
var contexts = require('../lib/contexts');

exports['get undefined value as null'] = function (test) {
    var context = contexts.context();
    
    test.strictEqual(context.get('foo'), null);
};

exports['set and get value'] = function (test) {
    var context = contexts.context();
    
    context.set('foo', 42);
    
    test.strictEqual(context.get('foo'), 42);
};

exports['set value in parent and get value in child'] = function (test) {
    var parent = contexts.context();
    var context = contexts.context(parent);
    
    parent.set('foo', 42);
    
    test.strictEqual(context.get('foo'), 42);
};

