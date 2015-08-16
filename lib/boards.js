
var Color = { Blue: 1, Black: 2, Red: 3, Green: 4 };

function Board() {
    var stones = new Array(4);
    stones[0] = stones[1] = stones[2] = stones[3] = 0;
    
    this.hasStones = function (color) { return stones[color - 1] > 0; };
    
    this.countStones = function (color) { return stones[color - 1]; };
    
    this.putStone = function (color) {
        stones[color - 1]++;
    };
}

function createBoard() {
    return new Board();
}

module.exports = {
    createBoard: createBoard,
    Color: Color
};

