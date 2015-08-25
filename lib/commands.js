
function ExpressionCommand(expr) {
    this.execute = function (ctx) {
        expr.evaluate(ctx);
    };
}

function AssignCommand(name, expr) {
    this.execute = function (ctx) {
        ctx.set(name, expr.evaluate(ctx));
    };
}

function CompositeCommand(cmds) {
    this.execute = function (ctx) {
        cmds.forEach(function (cmd) {
            cmd.execute(ctx);
        });
    };
}

function ProgramCommand(cmds) {
    this.execute = function (ctx) {
        ctx.set('$program', new CompositeCommand(cmds));
    };
}

function ProcedureCommand(name, argnames, cmds) {
    this.execute = function (ctx) {
        ctx.set(name, new CompositeCommand(cmds));
    };
}

function IfCommand(expr, thencmd) {
    this.execute = function (ctx) {
        var value = expr.evaluate(ctx);
        
        if (value)
            thencmd.execute(ctx);
    }
}

module.exports = {
    expression: function (expr) { return new ExpressionCommand(expr); },
    program: function (cmds) { return new ProgramCommand(cmds); },
    composite: function (cmds) { return new CompositeCommand(cmds); },
    procedure: function (name, argnames, cmds) { return new ProcedureCommand(name, argnames, cmds); },
    assign: function (name, expr) { return new AssignCommand(name, expr); },
    ifc: function (expr, thencmd) { return new IfCommand(expr, thencmd); }
};
