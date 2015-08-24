
var commands = require('../lib/commands');
var expressions = require('../lib/expressions');
var contexts = require('../lib/contexts');

exports['create and execute expression command'] = function (test) {
    var ctx = contexts.context();
    var done = false;
    
    ctx.set('add', function (x, y) { done = true; return x + y; });
    var cmd = commands.expression(expressions.call('add', [ expressions.constant(1), expressions.constant(2) ]));
    
    test.ok(cmd);
    cmd.execute(ctx);
    test.ok(done);
};

exports['execute assign command'] = function (test) {
    var ctx = contexts.context();
    var cmd = commands.assign('foo', expressions.constant(42));
    
    cmd.execute(ctx);
    
    test.equal(ctx.get('foo'), 42);
}