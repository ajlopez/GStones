
var Color = { Blue: 1, Black: 2, Red: 3, Green: 4 };

function Board() {
    this.hasStones = function () { return false; }
    
    this.countStones = function () { return 0; }
}

function createBoard() {
    return new Board();
}

module.exports = {
    createBoard: createBoard,
    Color: Color
};

