
var contexts = require('./contexts');
var boards = require('./boards');
var parsers = require('./parsers');

var Color = boards.Color;
var Direction = boards.Direction;

function Machine() {
    var self = this;
    
    this.context = contexts.context();
    this.board = boards.board();
    
    this.context.set('Azul', Color.Blue);
    this.context.set('Negro', Color.Black);
    this.context.set('Rojo', Color.Red);
    this.context.set('Verde', Color.Green);
    
    this.context.set('Norte', Direction.North);
    this.context.set('Este', Direction.East);
    this.context.set('Sur', Direction.South);
    this.context.set('Oeste', Direction.West);
    
    this.context.set('Poner', function (color) { self.board.putStone(color); });
    this.context.set('Sacar', function (color) { self.board.removeStone(color); });
    this.context.set('Mover', function (direction) { self.board.moveTo(direction); });
    this.context.set('IrAlBorde', function (direction) { self.board.moveToBorder(direction); });
    
    this.evaluate = function (text) {
        var parser = parsers.parser(text);
        
        return parser.parseExpression().evaluate(this.context);
    };
}

function createMachine() {
    return new Machine();
}

module.exports = {
    machine: createMachine
};