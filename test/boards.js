
var boards = require('../lib/boards');
var Color = boards.Color;

exports['create board'] = function (test) {
    var board = boards.createBoard();
    
    test.ok(board);
    test.equal(typeof board, 'object');
};

exports['no stones'] = function (test) {
    var board = boards.createBoard();

    test.equal(board.hasStones(Color.Blue), false);
    test.equal(board.hasStones(Color.Black), false);
    test.equal(board.hasStones(Color.Red), false);
    test.equal(board.hasStones(Color.Green), false);
}

exports['count of stones'] = function (test) {
    var board = boards.createBoard();

    test.equal(board.countStones(Color.Blue), 0);
    test.equal(board.countStones(Color.Black), 0);
    test.equal(board.countStones(Color.Red), 0);
    test.equal(board.countStones(Color.Green), 0);
}
