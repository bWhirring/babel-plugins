#### @dwd/babel-plugin-lodash

`lodash按需加载插件`

##### install

```
npm install @dwd/babel-plugin-lodash
```

##### Usage

.babelrc

```

"plugins": [
  "@dwd/babel-plugin-lodash",
]

```

```
import { chunk, eq } from "lodash"

转换成

import chunk from "lodash/chunk"
import eq from "lodash/eq"
```

```
import _ from "lodash"
_.add(2,4)

转换成

import add from "lodash/add"
add(2,4)
```

> ps: 定义对象时不要以 "\_" 命名
