
var contexts = require('../lib/contexts');

exports['get undefined value as null'] = function (test) {
    var context = contexts.createContext();
    
    test.strictEqual(context.get('foo'), null);
};

exports['set and get value'] = function (test) {
    var context = contexts.createContext();
    
    context.set('foo', 42);
    
    test.strictEqual(context.get('foo'), 42);
};

exports['set value in parent and get value in child'] = function (test) {
    var parent = contexts.createContext();
    var context = contexts.createContext(parent);
    
    parent.set('foo', 42);
    
    test.strictEqual(context.get('foo'), 42);
};

