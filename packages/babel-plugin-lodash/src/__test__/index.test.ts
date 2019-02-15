import "jest";

const babel = require("babel-core");
const plugin = require("../index");

const example = `import { eq } from "lodash"`;

test(`the example should equal "import eq from lodash/eq;"`, () => {
  const { code } = babel.transform(example, { plugins: [plugin] });
  expect(code).toEqual(`import eq from "lodash/eq";`);
});
