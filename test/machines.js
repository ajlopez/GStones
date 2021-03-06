
var machines = require('../lib/machines');
var Color = require('../lib/boards').Color;
var Direction = require('../lib/boards').Direction;

exports['create machine with context and board'] = function (test) {
    var machine = machines.machine();
    
    test.ok(machine);
    test.ok(machine.board);
    test.ok(machine.context);
};

exports['defined colors'] = function (test) {
    var machine = machines.machine();
    
    test.equal(machine.context.get('Azul'), Color.Blue);
    test.equal(machine.context.get('Negro'), Color.Black);
    test.equal(machine.context.get('Rojo'), Color.Red);
    test.equal(machine.context.get('Verde'), Color.Green);
};

exports['defined directions'] = function (test) {
    var machine = machines.machine();
    
    test.equal(machine.context.get('Norte'), Direction.North);
    test.equal(machine.context.get('Este'), Direction.East);
    test.equal(machine.context.get('Sur'), Direction.South);
    test.equal(machine.context.get('Oeste'), Direction.West);
};

exports['defined procedures'] = function (test) {
    var machine = machines.machine();
    
    test.ok(isProcedure(machine, 'Poner'));
    test.ok(isProcedure(machine, 'Sacar'));
};

exports['evaluate procedure'] = function (test) {
    var machine = machines.machine();
    
    machine.evaluate('Poner(Rojo)');
    
    test.ok(machine.board.hasStones(Color.Red));
    test.ok(!machine.board.hasStones(Color.Blue));
    test.ok(!machine.board.hasStones(Color.Black));
    test.ok(!machine.board.hasStones(Color.Green));
    
    test.equal(machine.board.countStones(Color.Red), 1);
};

exports['evaluate two procedures'] = function (test) {
    var machine = machines.machine();
    
    machine.evaluate('Poner(Rojo)');
    machine.evaluate('Poner(Rojo)');
    
    test.ok(machine.board.hasStones(Color.Red));
    test.ok(!machine.board.hasStones(Color.Blue));
    test.ok(!machine.board.hasStones(Color.Black));
    test.ok(!machine.board.hasStones(Color.Green));
    
    test.equal(machine.board.countStones(Color.Red), 2);
};

exports['evaluate three procedures'] = function (test) {
    var machine = machines.machine();
    
    machine.evaluate('Poner(Rojo)');
    machine.evaluate('Poner(Rojo)');
    machine.evaluate('Sacar(Rojo)');
    
    test.ok(machine.board.hasStones(Color.Red));
    test.ok(!machine.board.hasStones(Color.Blue));
    test.ok(!machine.board.hasStones(Color.Black));
    test.ok(!machine.board.hasStones(Color.Green));
    
    test.equal(machine.board.countStones(Color.Red), 1);
};

exports['evaluate move'] = function (test) {
    var machine = machines.machine();

    test.deepEqual(machine.board.getPosition(), { x: 0, y: 0 });
    machine.evaluate('Mover(Norte)');
    test.deepEqual(machine.board.getPosition(), { x: 0, y: 1 });
    machine.evaluate('Mover(Este)');
    test.deepEqual(machine.board.getPosition(), { x: 1, y: 1 });
    machine.evaluate('Mover(Sur)');
    test.deepEqual(machine.board.getPosition(), { x: 1, y: 0 });
    machine.evaluate('Mover(Oeste)');
    test.deepEqual(machine.board.getPosition(), { x: 0, y: 0 });
};

exports['evaluate move to border'] = function (test) {
    var machine = machines.machine();

    test.deepEqual(machine.board.getPosition(), { x: 0, y: 0 });
    machine.evaluate('IrAlBorde(Norte)');
    test.deepEqual(machine.board.getPosition(), { x: 0, y: 7 });
    machine.evaluate('IrAlBorde(Este)');
    test.deepEqual(machine.board.getPosition(), { x: 7, y: 7 });
    machine.evaluate('IrAlBorde(Sur)');
    test.deepEqual(machine.board.getPosition(), { x: 7, y: 0 });
    machine.evaluate('IrAlBorde(Oeste)');
    test.deepEqual(machine.board.getPosition(), { x: 0, y: 0 });
};

exports['evaluate empty board'] = function (test) {
    var machine = machines.machine();
    
    machine.evaluate('Poner(Rojo)');
    machine.evaluate('Mover(Norte)');
    machine.evaluate('Poner(Negro)');
    machine.evaluate('Mover(Este)');
    machine.evaluate('Poner(Azul)');
    machine.evaluate('Mover(Sur)');
    machine.evaluate('Poner(Verde)');
    
    test.equal(machine.board.countStonesAt(Color.Red, 0, 0), 1);
    test.equal(machine.board.countStonesAt(Color.Black, 0, 1), 1);
    test.equal(machine.board.countStonesAt(Color.Blue, 1, 1), 1);
    test.equal(machine.board.countStonesAt(Color.Green, 1, 0), 1);
    
    machine.evaluate('VaciarTablero()');
    
    test.equal(machine.board.countStonesAt(Color.Red, 0, 0), 0);
    test.equal(machine.board.countStonesAt(Color.Black, 0, 1), 0);
    test.equal(machine.board.countStonesAt(Color.Blue, 1, 1), 0);
    test.equal(machine.board.countStonesAt(Color.Green, 1, 0), 0);
};

exports['execute program with one command'] = function (test) {
    var machine = machines.machine();
    
    machine.execute('program { Poner(Rojo); }');

    test.equal(machine.board.countStones(Color.Red), 1);
    test.equal(machine.board.countStones(Color.Black), 0);
    test.equal(machine.board.countStones(Color.Blue), 0);
    test.equal(machine.board.countStones(Color.Green), 0);    
};

exports['execute program with two commands'] = function (test) {
    var machine = machines.machine();
    
    machine.execute('program { Poner(Rojo); Poner(Verde); }');

    test.equal(machine.board.countStones(Color.Red), 1);
    test.equal(machine.board.countStones(Color.Black), 0);
    test.equal(machine.board.countStones(Color.Blue), 0);
    test.equal(machine.board.countStones(Color.Green), 1);    
};

exports['execute composite command with assignment and board move'] = function (test) {
    var machine = machines.machine();
    
    machine.execute('{ a:= Rojo; Poner(a) }');

    test.equal(machine.board.countStones(Color.Red), 1);
    test.equal(machine.board.countStones(Color.Black), 0);
    test.equal(machine.board.countStones(Color.Blue), 0);
    test.equal(machine.board.countStones(Color.Green), 0);    
};

function isProcedure(machine, name) {
    return typeof machine.context.get(name) == 'function';
}

