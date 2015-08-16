
function Constant(value) {
    this.evaluate = function () { return value; };
}

function Name(name) {
    this.evaluate = function (ctx) { return ctx.get(name); };
}

function Call(name, exprs) {
    this.evaluate = function (ctx) {
        var fn = ctx.get(name);
        
        var values = [];
        
        if (exprs)
            exprs.forEach(function (expr) { values.push(expr.evaluate(ctx)); });
            
        return fn.apply(null, values);
    }
}

function createConstant(value) {
    return new Constant(value);
}

function createName(name) {
    return new Name(name);
}

function createCall(name, exprs) {
    return new Call(name, exprs);
}

module.exports = {
    constant: createConstant,
    name: createName,
    call: createCall
};