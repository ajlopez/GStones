
var boards = require('../lib/boards');
var Color = boards.Color;
var Direction = boards.Direction;

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
};

exports['count of stones'] = function (test) {
    var board = boards.createBoard();

    test.equal(board.countStones(Color.Blue), 0);
    test.equal(board.countStones(Color.Black), 0);
    test.equal(board.countStones(Color.Red), 0);
    test.equal(board.countStones(Color.Green), 0);
};

exports['put blue stone'] = function (test) {
    var board = boards.createBoard();
    
    board.putStone(Color.Blue);
    
    test.equal(board.hasStones(Color.Blue), true);
    test.equal(board.hasStones(Color.Black), false);
    test.equal(board.hasStones(Color.Red), false);
    test.equal(board.hasStones(Color.Green), false);

    test.equal(board.countStones(Color.Blue), 1);
    test.equal(board.countStones(Color.Black), 0);
    test.equal(board.countStones(Color.Red), 0);
    test.equal(board.countStones(Color.Green), 0);
}

exports['put two blue stones'] = function (test) {
    var board = boards.createBoard();
    
    board.putStone(Color.Blue);
    board.putStone(Color.Blue);
    
    test.equal(board.hasStones(Color.Blue), true);
    test.equal(board.hasStones(Color.Black), false);
    test.equal(board.hasStones(Color.Red), false);
    test.equal(board.hasStones(Color.Green), false);

    test.equal(board.countStones(Color.Blue), 2);
    test.equal(board.countStones(Color.Black), 0);
    test.equal(board.countStones(Color.Red), 0);
    test.equal(board.countStones(Color.Green), 0);
}

exports['put stones of four colors'] = function (test) {
    var board = boards.createBoard();
    
    board.putStone(Color.Blue);
    board.putStone(Color.Black);
    board.putStone(Color.Red);
    board.putStone(Color.Green);
    
    test.equal(board.hasStones(Color.Blue), true);
    test.equal(board.hasStones(Color.Black), true);
    test.equal(board.hasStones(Color.Red), true);
    test.equal(board.hasStones(Color.Green), true);

    test.equal(board.countStones(Color.Blue), 1);
    test.equal(board.countStones(Color.Black), 1);
    test.equal(board.countStones(Color.Red), 1);
    test.equal(board.countStones(Color.Green), 1);
}

exports['move to east'] = function (test) {
    var board = boards.createBoard();
    
    board.putStone(Color.Blue);
    board.putStone(Color.Black);
    board.putStone(Color.Red);
    board.putStone(Color.Green);
    
    board.moveTo(Direction.East);
    
    test.equal(board.hasStones(Color.Blue), false);
    test.equal(board.hasStones(Color.Black), false);
    test.equal(board.hasStones(Color.Red), false);
    test.equal(board.hasStones(Color.Green), false);

    test.equal(board.countStones(Color.Blue), 0);
    test.equal(board.countStones(Color.Black), 0);
    test.equal(board.countStones(Color.Red), 0);
    test.equal(board.countStones(Color.Green), 0);
}

