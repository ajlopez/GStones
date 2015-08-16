
var machines = require('../lib/machines');

exports['create machine with context and board'] = function (test) {
    var machine = machines.machine();
    
    test.ok(machine);
    test.ok(machine.board);
    test.ok(machine.context);
};

