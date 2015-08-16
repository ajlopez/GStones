
var contexts = require('./contexts');
var boards = require('./boards');

function Machine() {
    this.context = contexts.context();
    this.board = boards.board();
}

function createMachine() {
    return new Machine();
}

module.exports = {
    machine: createMachine
};