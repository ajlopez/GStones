
var contexts = require('./contexts');

function Constant(value) {
    this.evaluate = function () { return value; };
}

function Name(name) {
    this.evaluate = function (ctx) { return ctx.get(name); };
}

function DefFunction(argnames, cmd) {
    this.evaluate = function (ctx, values) {
        var fnctx = contexts.context(ctx);
        
        if (argnames && argnames.length)
            for (var n in argnames)
                fnctx.set(argnames[n], values[n]);
                
        cmd.execute(fnctx);
    }
}

function Call(name, exprs) {
    this.evaluate = function (ctx) {
        var fn = ctx.get(name);
        
        var values = [];
        
        if (exprs)
            exprs.forEach(function (expr) { values.push(expr.evaluate(ctx)); });

        if (fn.evaluate)
            return fn.evaluate(ctx, values);
            
        return fn.apply(null, values);
    }
}

function And(lexpr, rexpr) {
    this.evaluate = function (ctx) {
        return lexpr.evaluate(ctx) && rexpr.evaluate(ctx) ? true : false;
    }
}

function Or(lexpr, rexpr) {
    this.evaluate = function (ctx) {
        return lexpr.evaluate(ctx) || rexpr.evaluate(ctx) ? true : false;
    }
}

function Not(expr) {
    this.evaluate = function (ctx) {
        return expr.evaluate(ctx) ? false : true;
    }
}

function Equals(lexpr, rexpr) {
    this.evaluate = function (ctx) {
        return lexpr.evaluate(ctx) == rexpr.evaluate(ctx);
    }
}

function NotEquals(lexpr, rexpr) {
    this.evaluate = function (ctx) {
        return lexpr.evaluate(ctx) != rexpr.evaluate(ctx);
    }
}

function Less(lexpr, rexpr) {
    this.evaluate = function (ctx) {
        return lexpr.evaluate(ctx) < rexpr.evaluate(ctx);
    }
}

function LessEquals(lexpr, rexpr) {
    this.evaluate = function (ctx) {
        return lexpr.evaluate(ctx) <= rexpr.evaluate(ctx);
    }
}

function Greater(lexpr, rexpr) {
    this.evaluate = function (ctx) {
        return lexpr.evaluate(ctx) > rexpr.evaluate(ctx);
    }
}

function GreaterEquals(lexpr, rexpr) {
    this.evaluate = function (ctx) {
        return lexpr.evaluate(ctx) >= rexpr.evaluate(ctx);
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

function createFunction(argnames, cmd) {
    return new DefFunction(argnames, cmd);
}

function createEquals(lexpr, rexpr) {
    return new Equals(lexpr, rexpr);
}

function createNotEquals(lexpr, rexpr) {
    return new NotEquals(lexpr, rexpr);
}

function createLess(lexpr, rexpr) {
    return new Less(lexpr, rexpr);
}

function createLessEquals(lexpr, rexpr) {
    return new LessEquals(lexpr, rexpr);
}

function createGreater(lexpr, rexpr) {
    return new Greater(lexpr, rexpr);
}

function createGreaterEquals(lexpr, rexpr) {
    return new GreaterEquals(lexpr, rexpr);
}

function createAnd(lexpr, rexpr) {
    return new And(lexpr, rexpr);
}

function createOr(lexpr, rexpr) {
    return new Or(lexpr, rexpr);
}

function createNot(expr) {
    return new Not(expr);
}

module.exports = {
    constant: createConstant,
    name: createName,
    call: createCall,
    func: createFunction,
    add: createAdd,
    subtract: createSubtract,
    multiply: createMultiply,
    divide: createDivide,
    equals: createEquals,
    notEquals: createNotEquals,
    less: createLess,
    lessEquals: createLessEquals,
    greater: createGreater,
    greaterEquals: createGreaterEquals,
    and: createAnd,
    or: createOr,
    not: createNot
};
