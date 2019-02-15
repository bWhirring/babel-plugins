"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
var babel = require("babel-core");
var plugin = require("../index");
var example = "import { eq } from \"lodash\"";
test("the example should equal \"import eq from lodash/eq;\"", function () {
    var code = babel.transform(example, { plugins: [plugin] }).code;
    expect(code).toEqual("import eq from \"lodash/eq\";");
});
//# sourceMappingURL=index.test.js.map