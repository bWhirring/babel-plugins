"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
var babel = require("babel-core");
var plugin = require("../index");
var example = "import { eq } from \"lodash\"";
var example1 = "import _ from \"lodash\"; _.add(2,4)";
var example2 = "import _ from \"lodash\"; _.add(2,4);_.eq(11)";
describe("the examples shoule be success", function () {
    test("the example should equal \"import eq from lodash/eq;\"", function () {
        var code = babel.transform(example, { plugins: [plugin] }).code;
        expect(code).toEqual("import eq from \"lodash/eq\";");
    });
    test("the example1 should equal \n\"import add from \"lodash/add\";\nadd(2, 4);\"", function () {
        var code = babel.transform(example1, { plugins: [plugin] }).code;
        expect(code).toEqual("import add from \"lodash/add\";\nadd(2, 4);");
    });
    test("the example2 should equal \n\"import add from \"lodash/add\";\nimport eq from \"lodash/eq\";\nadd(2, 4);\neq(11);\"", function () {
        var code = babel.transform(example2, { plugins: [plugin] }).code;
        expect(code).toEqual("import add from \"lodash/add\";\nimport eq from \"lodash/eq\";\nadd(2, 4);eq(11);");
    });
});
//# sourceMappingURL=index.test.js.map