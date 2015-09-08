
var expressions = require('./expressions');
    
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

function ProgramCommand(cmd) {
    this.execute = function (ctx) {
        ctx.set('$program', cmd);
    };
}

function ProcedureCommand(name, argnames, cmd) {
    this.execute = function (ctx) {
        ctx.set(name, expressions.func(argnames, cmd));
    };
}

function IfCommand(expr, thencmd, elsecmd) {
    this.execute = function (ctx) {
        var value = expr.evaluate(ctx);
        
        if (value)
            thencmd.execute(ctx);
        else if (elsecmd)
            elsecmd.execute(ctx);
    }
}

module.exports = {
    expression: function (expr) { return new ExpressionCommand(expr); },
    program: function (cmds) { return new ProgramCommand(cmds); },
    composite: function (cmds) { return new CompositeCommand(cmds); },
    procedure: function (name, argnames, cmd) { return new ProcedureCommand(name, argnames, cmd); },
    assign: function (name, expr) { return new AssignCommand(name, expr); },
    ifc: function (expr, thencmd, elsecmd) { return new IfCommand(expr, thencmd, elsecmd); }
};
