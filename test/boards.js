
var boards = require('../lib/boards');
var Color = boards.Color;
var Direction = boards.Direction;

exports['create board'] = function (test) {
    var board = boards.board();
    
    test.ok(board);
    test.equal(typeof board, 'object');
};

exports['get initial position'] = function (test) {
    var board = boards.board();
    
    test.deepEqual(board.getPosition(), { x: 0, y: 0 });
};

exports['no stones in empty board'] = function (test) {
    var board = boards.board();
    
    for (var x = 0; x < 8; x++)
        for (var y = 0; y < 8; y++) {
            test.equal(board.countStonesAt(Color.Blue, x, y), 0);
            test.equal(board.countStonesAt(Color.Black, x, y), 0);
            test.equal(board.countStonesAt(Color.Red, x, y), 0);
            test.equal(board.countStonesAt(Color.Green, x, y), 0);
        }
};

exports['no stones'] = function (test) {
    var board = boards.board();

    test.equal(board.hasStones(Color.Blue), false);
    test.equal(board.hasStones(Color.Black), false);
    test.equal(board.hasStones(Color.Red), false);
    test.equal(board.hasStones(Color.Green), false);
};

exports['count of stones'] = function (test) {
    var board = boards.board();

    test.equal(board.countStones(Color.Blue), 0);
    test.equal(board.countStones(Color.Black), 0);
    test.equal(board.countStones(Color.Red), 0);
    test.equal(board.countStones(Color.Green), 0);
};

exports['put blue stone'] = function (test) {
    var board = boards.board();
    
    board.putStone(Color.Blue);
    
    test.equal(board.hasStones(Color.Blue), true);
    test.equal(board.hasStones(Color.Black), false);
    test.equal(board.hasStones(Color.Red), false);
    test.equal(board.hasStones(Color.Green), false);

    test.equal(board.countStones(Color.Blue), 1);
    test.equal(board.countStones(Color.Black), 0);
    test.equal(board.countStones(Color.Red), 0);
    test.equal(board.countStones(Color.Green), 0);
};

exports['put two blue stones'] = function (test) {
    var board = boards.board();
    
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
};

exports['put two blue stones and remove one'] = function (test) {
    var board = boards.board();
    
    board.putStone(Color.Blue);
    board.putStone(Color.Blue);
    board.removeStone(Color.Blue);
    
    test.equal(board.hasStones(Color.Blue), true);
    test.equal(board.hasStones(Color.Black), false);
    test.equal(board.hasStones(Color.Red), false);
    test.equal(board.hasStones(Color.Green), false);

    test.equal(board.countStones(Color.Blue), 1);
    test.equal(board.countStones(Color.Black), 0);
    test.equal(board.countStones(Color.Red), 0);
    test.equal(board.countStones(Color.Green), 0);
};

exports['remove stone raise exception if no stones'] = function (test) {
    var board = boards.board();
    
    test.throws(
        function () {
            board.removeStone(Color.Blue);
        },
        "No stones"
    );
};

exports['put stones of four colors'] = function (test) {
    var board = boards.board();
    
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
};

exports['move to east'] = function (test) {
    var board = boards.board();
    
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
};

exports['move to east and west'] = function (test) {
    var board = boards.board();
    
    board.putStone(Color.Blue);    
    board.moveTo(Direction.East);
    board.putStone(Color.Black);    
    board.moveTo(Direction.East);
    board.putStone(Color.Red);    
    board.moveTo(Direction.East);
    board.putStone(Color.Green);    
    board.moveTo(Direction.East);
    
    test.equal(board.hasStones(Color.Blue), false);
    test.equal(board.hasStones(Color.Black), false);
    test.equal(board.hasStones(Color.Red), false);
    test.equal(board.hasStones(Color.Green), false);

    board.moveTo(Direction.West);
    
    test.equal(board.hasStones(Color.Blue), false);
    test.equal(board.hasStones(Color.Black), false);
    test.equal(board.hasStones(Color.Red), false);
    test.equal(board.hasStones(Color.Green), true);

    board.moveTo(Direction.West);
    
    test.equal(board.hasStones(Color.Blue), false);
    test.equal(board.hasStones(Color.Black), false);
    test.equal(board.hasStones(Color.Red), true);
    test.equal(board.hasStones(Color.Green), false);

    board.moveTo(Direction.West);
    
    test.equal(board.hasStones(Color.Blue), false);
    test.equal(board.hasStones(Color.Black), true);
    test.equal(board.hasStones(Color.Red), false);
    test.equal(board.hasStones(Color.Green), false);

    board.moveTo(Direction.West);
    
    test.equal(board.hasStones(Color.Blue), true);
    test.equal(board.hasStones(Color.Black), false);
    test.equal(board.hasStones(Color.Red), false);
    test.equal(board.hasStones(Color.Green), false);
};

exports['move to north and south'] = function (test) {
    var board = boards.board();
    
    board.putStone(Color.Blue);    
    board.moveTo(Direction.North);
    board.putStone(Color.Black);    
    board.moveTo(Direction.North);
    board.putStone(Color.Red);    
    board.moveTo(Direction.North);
    board.putStone(Color.Green);    
    board.moveTo(Direction.North);
    
    test.equal(board.hasStones(Color.Blue), false);
    test.equal(board.hasStones(Color.Black), false);
    test.equal(board.hasStones(Color.Red), false);
    test.equal(board.hasStones(Color.Green), false);

    board.moveTo(Direction.South);
    
    test.equal(board.hasStones(Color.Blue), false);
    test.equal(board.hasStones(Color.Black), false);
    test.equal(board.hasStones(Color.Red), false);
    test.equal(board.hasStones(Color.Green), true);

    board.moveTo(Direction.South);
    
    test.equal(board.hasStones(Color.Blue), false);
    test.equal(board.hasStones(Color.Black), false);
    test.equal(board.hasStones(Color.Red), true);
    test.equal(board.hasStones(Color.Green), false);

    board.moveTo(Direction.South);
    
    test.equal(board.hasStones(Color.Blue), false);
    test.equal(board.hasStones(Color.Black), true);
    test.equal(board.hasStones(Color.Red), false);
    test.equal(board.hasStones(Color.Green), false);

    board.moveTo(Direction.South);
    
    test.equal(board.hasStones(Color.Blue), true);
    test.equal(board.hasStones(Color.Black), false);
    test.equal(board.hasStones(Color.Red), false);
    test.equal(board.hasStones(Color.Green), false);
};

exports['can move from initial cell'] = function (test) {
    var board = boards.board();
    
    test.equal(board.canMoveTo(Direction.North), true);
    test.equal(board.canMoveTo(Direction.East), true);
    test.equal(board.canMoveTo(Direction.South), false);
    test.equal(board.canMoveTo(Direction.West), false);
};

exports['empty board'] = function (test) {
    var board = boards.board();
    
    for (var k = 0; k < 7 ; k++) {
        board.putStone(Color.Blue);
        board.putStone(Color.Black);
        board.putStone(Color.Red);
        board.putStone(Color.Green);
        board.moveTo(Direction.North);
    }
    
    board.empty();
    
    for (var k = 0; k < 7; k++) {
        board.moveTo(Direction.South);
        test.equal(board.hasStones(Color.Blue), false);
        test.equal(board.hasStones(Color.Black), false);
        test.equal(board.hasStones(Color.Red), false);
        test.equal(board.hasStones(Color.Green), false);
    }
};

exports['go to border'] = function (test) {
    var board = boards.board();
    
    board.putStone(Color.Blue);
    board.moveToBorder(Direction.North);
    board.putStone(Color.Black);
    board.moveToBorder(Direction.East);
    board.putStone(Color.Red);
    board.moveToBorder(Direction.South);
    board.putStone(Color.Green);
    
    board.moveToBorder(Direction.West);
    
    test.equal(board.hasStones(Color.Blue), true);
    test.equal(board.hasStones(Color.Black), false);
    test.equal(board.hasStones(Color.Red), false);
    test.equal(board.hasStones(Color.Green), false);
    
    board.moveToBorder(Direction.North);
    
    test.equal(board.hasStones(Color.Blue), false);
    test.equal(board.hasStones(Color.Black), true);
    test.equal(board.hasStones(Color.Red), false);
    test.equal(board.hasStones(Color.Green), false);
    
    board.moveToBorder(Direction.East);
    
    test.equal(board.hasStones(Color.Blue), false);
    test.equal(board.hasStones(Color.Black), false);
    test.equal(board.hasStones(Color.Red), true);
    test.equal(board.hasStones(Color.Green), false);
    
    board.moveToBorder(Direction.South);
    
    test.equal(board.hasStones(Color.Blue), false);
    test.equal(board.hasStones(Color.Black), false);
    test.equal(board.hasStones(Color.Red), false);
    test.equal(board.hasStones(Color.Green), true);
};

exports['move to raise exception if cannot move'] = function (test) {
    var board = boards.board();

    test.throws(
        function () {
            board.moveTo(Direction.West);
        },
        "Invalid move"
    );
};

