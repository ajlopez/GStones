
var machines = require('../lib/machines');
var Color = require('../lib/boards').Color;

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

