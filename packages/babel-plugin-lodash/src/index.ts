import * as t from "@babel/types";

const visitor = {
  CallExpression(path: any) {
    const { callee } = path.node;
    if (!callee.object || callee.object.name !== "_") return;
    const { name } = callee.property;
    path.replaceWith(
      t.callExpression(t.identifier(`${name}`), path.node.arguments)
    );
  },
  ImportDeclaration(path: any) {
    const { body } = path.parent;
    const arr = [];
    for (const expressionStatement of body) {
      if (t.isExpressionStatement(expressionStatement)) {
        const expression: any = expressionStatement.expression;
        const { callee } = expression;
        if (callee && callee.object && callee.object.name === "_")
          arr.push(callee.property.name);
      }
    }
    const { source, specifiers } = path.node;
    const { value } = source;

    if (!t.isImportDefaultSpecifier(specifiers[0])) {
      specifiers.map(v => {
        arr.push(v.local.name);
      });
    }

    if (value === "lodash") {
      var declarations = arr.map(spe => {
        return t.importDeclaration(
          [t.importDefaultSpecifier(t.identifier(`${spe}`))],
          t.stringLiteral(`${value}/${spe}`)
        );
      });
      path.replaceWithMultiple(declarations);
    }
  }
};
module.exports = () => {
  return {
    visitor
  };
};
