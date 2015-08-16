
function Constant(value) {
    this.evaluate = function () { return value; };
}

function Name(name) {
    this.evaluate = function (ctx) { return ctx.get(name); };
}

function createConstant(value) {
    return new Constant(value);
}

function createName(name) {
    return new Name(name);
}

module.exports = {
    constant: createConstant,
    name: createName
};