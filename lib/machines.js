
var contexts = require('./contexts');
var boards = require('./boards');
var Color = boards.Color;

function Machine() {
    this.context = contexts.context();
    this.board = boards.board();
    
    this.context.set('Azul', Color.Blue);
    this.context.set('Negro', Color.Black);
    this.context.set('Rojo', Color.Red);
    this.context.set('Verde', Color.Green);
}

function createMachine() {
    return new Machine();
}

module.exports = {
    machine: createMachine
};