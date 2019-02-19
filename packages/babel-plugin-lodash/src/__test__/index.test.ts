import "jest";

const babel = require("babel-core");
const plugin = require("../index");

const example = `import { eq } from "lodash"`;
const example1 = `import _ from "lodash"; _.add(2,4)`;
const example2 = `import _ from "lodash"; _.add(2,4);_.eq(11)`;

describe("the examples shoule be success", () => {
  test(`the example should equal "import eq from lodash/eq;"`, () => {
    const { code } = babel.transform(example, { plugins: [plugin] });
    expect(code).toEqual(`import eq from "lodash/eq";`);
  });

  test(`the example1 should equal \n"import add from "lodash/add";\nadd(2, 4);"`, () => {
    const { code } = babel.transform(example1, { plugins: [plugin] });
    expect(code).toEqual(`import add from "lodash/add";\nadd(2, 4);`);
  });

  test(`the example2 should equal \n"import add from "lodash/add";\nimport eq from "lodash/eq";\nadd(2, 4);\neq(11);"`, () => {
    const { code } = babel.transform(example2, { plugins: [plugin] });
    expect(code).toEqual(
      `import add from "lodash/add";\nimport eq from "lodash/eq";\nadd(2, 4);eq(11);`
    );
  });
});
