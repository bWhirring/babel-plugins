"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var t = require("babel-types");
var visitor = {
    ImportDeclaration: function (path) {
        var _a = path.node, specifiers = _a.specifiers, source = _a.source;
        var value = source.value;
        if (value === "lodash" && !t.isImportDefaultSpecifier(specifiers[0])) {
            var declarations = specifiers.map(function (spe) {
                var local = spe.local;
                return t.importDeclaration([t.importDefaultSpecifier(local)], t.stringLiteral(value + "/" + local.name));
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