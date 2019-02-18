import * as t from "@babel/types";

const visitor = {
  ImportDeclaration(path: any) {
    const { specifiers, source } = path.node;
    const { value } = source;
    if (value === "lodash" && !t.isImportDefaultSpecifier(specifiers[0])) {
      var declarations = specifiers.map((spe: any) => {
        const { local } = spe;
        return t.importDeclaration(
          [t.importDefaultSpecifier(local)],
          t.stringLiteral(`${value}/${local.name}`)
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
