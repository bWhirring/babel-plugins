"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var t = require("@babel/types");
var visitor = {
    CallExpression: function (path) {
        var callee = path.node.callee;
        if (!callee.object || callee.object.name !== "_")
            return;
        var name = callee.property.name;
        path.replaceWith(t.callExpression(t.identifier("" + name), path.node.arguments));
    },
    ImportDeclaration: function (path) {
        var body = path.parent.body;
        var arr = [];
        for (var _i = 0, body_1 = body; _i < body_1.length; _i++) {
            var expressionStatement = body_1[_i];
            if (t.isExpressionStatement(expressionStatement)) {
                var expression = expressionStatement.expression;
                var callee = expression.callee;
                if (callee && callee.object && callee.object.name === "_")
                    arr.push(callee.property.name);
            }
        }
        var _a = path.node, source = _a.source, specifiers = _a.specifiers;
        var value = source.value;
        if (!t.isImportDefaultSpecifier(specifiers[0])) {
            specifiers.map(function (v) {
                arr.push(v.local.name);
            });
        }
        if (value === "lodash") {
            var declarations = arr.map(function (spe) {
                return t.importDeclaration([t.importDefaultSpecifier(t.identifier("" + spe))], t.stringLiteral(value + "/" + spe));
            });
            path.replaceWithMultiple(declarations);
        }
    }
};
module.exports = function () {
    return {
        visitor: visitor
    };
};
//# sourceMappingURL=index.js.map