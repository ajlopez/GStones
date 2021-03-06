
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

exports['parse true constant expression'] = function (test) {
    var parser = parsers.parser('true');
    
    var expr = parser.parseExpression();
    
    test.ok(expr);
    test.strictEqual(expr.evaluate(), true);
    
    test.equal(parser.parseExpression(), null);
};

exports['parse false constant expression'] = function (test) {
    var parser = parsers.parser('false');
    
    var expr = parser.parseExpression();
    
    test.ok(expr);
    test.strictEqual(expr.evaluate(), false);
    
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

exports['parse compare equals integers'] = function (test) {
    var parser = parsers.parser('1 == 2');
    
    var expr = parser.parseExpression();
    test.equal(expr.evaluate(), false);
    
    test.equal(parser.parseExpression(), null);
};

exports['parse compare not equals integers'] = function (test) {
    var parser = parsers.parser('1 /= 2');
    
    var expr = parser.parseExpression();
    test.equal(expr.evaluate(), true);
    
    test.equal(parser.parseExpression(), null);
};

exports['parse compare less integers'] = function (test) {
    var parser = parsers.parser('1 < 2');
    
    var expr = parser.parseExpression();
    test.strictEqual(expr.evaluate(), true);
    
    test.equal(parser.parseExpression(), null);
};

exports['parse compare less or equal integers'] = function (test) {
    var parser = parsers.parser('1 <= 2');
    
    var expr = parser.parseExpression();
    test.strictEqual(expr.evaluate(), true);
    
    test.equal(parser.parseExpression(), null);
};

exports['parse logical not integer'] = function (test) {
    var parser = parsers.parser('not 1');
    
    var expr = parser.parseExpression();
    test.strictEqual(expr.evaluate(), false);
    
    test.equal(parser.parseExpression(), null);
};

exports['parse logical and integers'] = function (test) {
    var parser = parsers.parser('1 && 2');
    
    var expr = parser.parseExpression();
    test.strictEqual(expr.evaluate(), true);
    
    test.equal(parser.parseExpression(), null);
};

exports['parse logical or integers'] = function (test) {
    var parser = parsers.parser('0 || 0');
    
    var expr = parser.parseExpression();
    test.strictEqual(expr.evaluate(), false);
    
    test.equal(parser.parseExpression(), null);
};

exports['parse compare greater integers'] = function (test) {
    var parser = parsers.parser('1 > 2');
    
    var expr = parser.parseExpression();
    test.strictEqual(expr.evaluate(), false);
    
    test.equal(parser.parseExpression(), null);
};

exports['parse compare greater or equal integers'] = function (test) {
    var parser = parsers.parser('1 >= 2');
    
    var expr = parser.parseExpression();
    test.strictEqual(expr.evaluate(), false);
    
    test.equal(parser.parseExpression(), null);
};

exports['parse add integers'] = function (test) {
    var parser = parsers.parser('1 + 2');
    
    var expr = parser.parseExpression();
    test.equal(expr.evaluate(), 3);
    
    test.equal(parser.parseExpression(), null);
};

exports['parse add and subtract integers'] = function (test) {
    var parser = parsers.parser('1 - 2 + 5');
    
    var expr = parser.parseExpression();
    test.equal(expr.evaluate(), 4);
    
    test.equal(parser.parseExpression(), null);
};

exports['parse subtract integers'] = function (test) {
    var parser = parsers.parser('1 - 2');
    
    var expr = parser.parseExpression();
    test.equal(expr.evaluate(), -1);
    
    test.equal(parser.parseExpression(), null);
};

exports['parse multiply integers'] = function (test) {
    var parser = parsers.parser('2 * 3');
    
    var expr = parser.parseExpression();
    test.equal(expr.evaluate(), 6);
    
    test.equal(parser.parseExpression(), null);
};

exports['parse multiply and divide integers'] = function (test) {
    var parser = parsers.parser('4 * 3 / 2');
    
    var expr = parser.parseExpression();
    test.equal(expr.evaluate(), 6);
    
    test.equal(parser.parseExpression(), null);
};

exports['parse multiply and divide and add integers'] = function (test) {
    var parser = parsers.parser('4 * 3 / 2 + 1');
    
    var expr = parser.parseExpression();
    test.equal(expr.evaluate(), 7);
    
    test.equal(parser.parseExpression(), null);
};

exports['parse divide integers'] = function (test) {
    var parser = parsers.parser('2 / 3');
    
    var expr = parser.parseExpression();
    test.equal(expr.evaluate(), 2/3);
    
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

exports['parse and execute program command'] = function (test) {
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

exports['parse and execute procedure command without parameters'] = function (test) {
    var parser = parsers.parser('procedure PonerPiedras() { Poner(Rojo); Poner(Verde) }');
    
    var cmd = parser.parseCommand();
    var machine = machines.machine();
    
    test.ok(cmd);
    
    cmd.execute(machine.context);
    
    test.ok(machine.context.get('PonerPiedras'));
    
    test.equal(parser.parseCommand(), null);
};

exports['parse and execute procedure command with parameters'] = function (test) {
    var parser = parsers.parser('procedure PonerPiedras(color1, color2) { Poner(color1); Poner(color2) }');
    
    var cmd = parser.parseCommand();
    var machine = machines.machine();
    
    test.ok(cmd);
    
    cmd.execute(machine.context);
    
    test.ok(machine.context.get('PonerPiedras'));
    
    test.equal(parser.parseCommand(), null);
};

exports['parse and execute assign command'] = function (test) {
    var parser = parsers.parser('a := 42');
    
    var cmd = parser.parseCommand();
    var machine = machines.machine();
    
    test.ok(cmd);
    
    cmd.execute(machine.context);
    
    test.equal(machine.context.get('a'), 42);
    
    test.equal(parser.parseCommand(), null);
};

exports['parse and execute composite command'] = function (test) {
    var parser = parsers.parser('{ a := 42; b:= 1 }');
    
    var cmd = parser.parseCommand();
    var machine = machines.machine();
    
    test.ok(cmd);
    
    cmd.execute(machine.context);
    
    test.equal(machine.context.get('a'), 42);
    test.equal(machine.context.get('b'), 1);
    
    test.equal(parser.parseCommand(), null);
};

exports['parse and execute if command with true condition'] = function (test) {
    var parser = parsers.parser('if (true) a := 42');
    
    var cmd = parser.parseCommand();
    var machine = machines.machine();
    
    test.ok(cmd);
    
    cmd.execute(machine.context);
    
    test.equal(machine.context.get('a'), 42);
    
    test.equal(parser.parseCommand(), null);
};

exports['parse and execute if command with true condition'] = function (test) {
    var parser = parsers.parser('if (false) a := 42 else b:= 1');
    
    var cmd = parser.parseCommand();
    var machine = machines.machine();
    
    test.ok(cmd);
    
    cmd.execute(machine.context);
    
    test.equal(machine.context.get('a'), null);
    test.equal(machine.context.get('b'), 1);
    
    test.equal(parser.parseCommand(), null);
};
