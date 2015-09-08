
var commands = require('../lib/commands');
var expressions = require('../lib/expressions');
var contexts = require('../lib/contexts');
var machines = require('../lib/machines');
var Color = require('../lib/boards').Color;

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
};

exports['execute if command with true condition'] = function (test) {
    var ctx = contexts.context();
    var cmd = commands.ifc(expressions.constant(true), commands.composite([ commands.assign('foo', expressions.constant(42)) ]));
    
    cmd.execute(ctx);
    
    test.equal(ctx.get('foo'), 42);
};

exports['execute if command with false condition'] = function (test) {
    var ctx = contexts.context();
    var cmd = commands.ifc(expressions.constant(false), commands.expression(expressions.constant(42)), commands.composite([ commands.assign('foo', expressions.constant(42)) ]));
    
    cmd.execute(ctx);
    
    test.equal(ctx.get('foo'), 42);
};

exports['execute procedure command and call procedure'] = function (test) {
    var machine = machines.machine();
    var cmd = commands.procedure("DoPut", ["n"], commands.composite([ commands.expression(expressions.call("Poner", [ expressions.name("n") ])) ]));
    
    cmd.execute(machine.context);
    
    var proc = machine.context.get('DoPut');
    test.ok(proc);
    
    proc.evaluate(machine.context, [Color.Blue]);
    
    test.equal(machine.board.countStones(Color.Blue), 1);
};