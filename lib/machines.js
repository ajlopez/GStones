
var contexts = require('./contexts');
var boards = require('./boards');
var Color = boards.Color;
var Direction = boards.Direction;

function Machine() {
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
}

function createMachine() {
    return new Machine();
}

module.exports = {
    machine: createMachine
};