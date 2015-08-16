
var Color = { Blue: 1, Black: 2, Red: 3, Green: 4 };
var Direction = { North: 1, East: 2, South: 3, West: 4 };

function Cell() {
    var stones = new Array(4);
    stones[0] = stones[1] = stones[2] = stones[3] = 0;
    
    this.hasStones = function (color) { return stones[color - 1] > 0; };
    
    this.countStones = function (color) { return stones[color - 1]; };
    
    this.putStone = function (color) {
        stones[color - 1]++;
    };
    
    this.removeStone = function (color) {
        if (!stones[color - 1])
            throw new Error("No stones");
            
        stones[color - 1]--;
    };
}

function Board() {
    var cells;
    var px = 0;
    var py = 0;

    emptyBoard();
    
    var ccell = cells[px][py];

    this.hasStones = function (color) { return ccell.hasStones(color); };
    
    this.countStones = function (color) { return ccell.countStones(color); };
    
    this.putStone = function (color) { return ccell.putStone(color); };
    
    this.removeStone = function (color) { return ccell.removeStone(color); };
    
    this.empty = function () { emptyBoard(); };
    
    this.moveTo = function (dir) {
        if (dir == Direction.East) {
            if (px >= 7)
                throw new Error("Invalid move");
            ccell = cells[++px][py];
        }
        else if (dir == Direction.West) {
            if (px < 0)
                throw new Error("Invalid move");
            ccell = cells[--px][py];
        }
        else if (dir == Direction.North) {
            if (py >= 7)
                throw new Error("Invalid move");
            ccell = cells[px][++py];
        }
        else if (dir == Direction.South) {
            if (py < 1)
                throw new Error("Invalid move");
            ccell = cells[px][--py];
        }
    };
    
    this.moveToBorder = function (dir) {
        if (dir == Direction.East)
            ccell = cells[px = 7][py];
        else if (dir == Direction.West)
            ccell = cells[px = 0][py];
        else if (dir == Direction.North)
            ccell = cells[px][py = 7];
        else if (dir == Direction.South)
            ccell = cells[px][py = 0];
    };
    
    this.canMoveTo = function (dir) {
        if (dir == Direction.East)
            return px < 7;
        else if (dir == Direction.West)
            return px > 0;
        else if (dir == Direction.North)
            return py < 7;
        else if (dir == Direction.South)
            return py > 0;
    };
    
    function emptyBoard() {
        cells = new Array(8);
        
        for (var k = 0; k < 8; k++) {
            cells[k] = new Array(8);
            
            for (var j = 0; j < 8; j++)
                cells[k][j] = new Cell();
        }
    }
}

function createBoard() {
    return new Board();
}

module.exports = {
    createBoard: createBoard,
    Color: Color,
    Direction: Direction
};

