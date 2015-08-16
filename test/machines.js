
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

function isProcedure(machine, name) {
    return typeof machine.context.get(name) == 'function';
}

