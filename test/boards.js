
var boards = require('../lib/boards');

exports['create board'] = function (test) {
    var board = boards.createBoard();
    
    test.ok(board);
    test.equal(typeof board, 'object');
};

