
var parsers = require('../lib/parsers');
var contexts = require('../lib/contexts');
var machines = require('../lib/machines');
var Color = require('../lib/boards').Color;

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
    
    test.equal(parser.parseExpression(), null);
};

exports['parse name'] = function (test) {
    var parser = parsers.parser('foo');
    
    var expr = parser.parseExpression();
    var ctx = contexts.context();
    ctx.set('foo', 42);
    
    test.ok(expr);
    test.equal(expr.evaluate(ctx), 42);
    
    test.equal(parser.parseExpression(), null);
};

exports['parse call without arguments'] = function (test) {
    var parser = parsers.parser('foo()');
    
    var expr = parser.parseExpression();
    var ctx = contexts.context();
    ctx.set('foo', function () { return 42; });
    
    test.ok(expr);
    test.equal(expr.evaluate(ctx), 42);
    
    test.equal(parser.parseExpression(), null);
};

exports['parse call with two arguments'] = function (test) {
    var parser = parsers.parser('add(1, 2)');
    
    var expr = parser.parseExpression();
    var ctx = contexts.context();
    ctx.set('add', function (x, y) { return x + y; });
    
    test.ok(expr);
    test.equal(expr.evaluate(ctx), 3);
    
    test.equal(parser.parseExpression(), null);
};

exports['parse command'] = function (test) {
    var parser = parsers.parser('Poner(Rojo);');
    
    var cmd = parser.parseCommand();
    var machine = machines.machine();
    
    test.ok(cmd);
    
    cmd.execute(machine.context);
    
    test.equal(machine.board.countStones(Color.Red), 1);
    test.equal(parser.parseCommand(), null);
};

exports['parse program command'] = function (test) {
    var parser = parsers.parser('program { Poner(Rojo); Poner(Verde) }');
    
    var cmd = parser.parseCommand();
    var machine = machines.machine();
    
    test.ok(cmd);
    
    cmd.execute(machine.context);
    
    var pgm = machine.context.get('$program');
    
    test.ok(pgm);
    test.ok(pgm.execute);
    
    pgm.execute(machine.context);
    
    test.equal(machine.board.countStones(Color.Red), 1);
    test.equal(machine.board.countStones(Color.Green), 1);
    
    test.equal(parser.parseCommand(), null);
};


