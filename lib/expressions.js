
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

function Add(lexpr, rexpr) {
    this.evaluate = function (ctx) {
        return lexpr.evaluate(ctx) + rexpr.evaluate(ctx);
    }
}

function Subtract(lexpr, rexpr) {
    this.evaluate = function (ctx) {
        return lexpr.evaluate(ctx) - rexpr.evaluate(ctx);
    }
}

function Multiply(lexpr, rexpr) {
    this.evaluate = function (ctx) {
        return lexpr.evaluate(ctx) * rexpr.evaluate(ctx);
    }
}

function Divide(lexpr, rexpr) {
    this.evaluate = function (ctx) {
        return lexpr.evaluate(ctx) / rexpr.evaluate(ctx);
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

function createAdd(lexpr, rexpr) {
    return new Add(lexpr, rexpr);
}

function createSubtract(lexpr, rexpr) {
    return new Subtract(lexpr, rexpr);
}

function createMultiply(lexpr, rexpr) {
    return new Multiply(lexpr, rexpr);
}

function createDivide(lexpr, rexpr) {
    return new Divide(lexpr, rexpr);
}

module.exports = {
    constant: createConstant,
    name: createName,
    call: createCall,
    add: createAdd,
    subtract: createSubtract,
    multiply: createMultiply,
    divide: createDivide
};
