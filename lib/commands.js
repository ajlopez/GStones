
function ExpressionCommand(expr) {
    this.execute = function (ctx) {
        expr.evaluate(ctx);
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

module.exports = {
    expression: function (expr) { return new ExpressionCommand(expr); },
    program: function (cmds) { return new ProgramCommand(cmds); },
    procedure: function (name, argnames, cmds) { return new ProcedureCommand(name, argnames, cmds); }
};