
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

