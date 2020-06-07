# mocha-demo

## mocha 单元测试
```js
// add.js
function add(x, y) {
    return x + y;
}

module.exports = add;
```
```js
// add.test.js
var add = require('./add.js');
var assert = require('assert');

describe('加法函数的测试', function() {
  it('1 加 1 应该等于 2', function() {
    assert.equal(add(1, 1), 2);
  });
});
```

### 进行mocha单元测试
```bash
$ npm install -global mocha # 全局安装mocha
```
```bash
# 进入当前目录
$ mocha add.test.js  # mocha测试

加法函数的测试
    ✓ 1 加 1 应该等于 2


1 passing (4ms)
```

## istanbul 测试覆盖率
### 覆盖率测试
```bash
$ npm install -g istanbul
```
```bash
$ istanbul cover add.js

=============================== Coverage summary ===============================
Statements   : 66.67% ( 2/3 )
Branches     : 100% ( 0/0 )
Functions    : 0% ( 0/1 )
Lines        : 66.67% ( 2/3 )
================================================================================
```
### 与测试框架结合
```bash
$ istanbul cover _mocha add.test.js

 加法函数的测试
    ✓ 1 加 1 应该等于 2


  1 passing (5ms)

=============================================================================
Writing coverage object [/Users/apple/git/mocha-demo/coverage/coverage.json]
Writing coverage reports at [/Users/apple/git/mocha-demo/coverage]
=============================================================================

=============================== Coverage summary ===============================
Statements   : 100% ( 8/8 )
Branches     : 100% ( 0/0 )
Functions    : 100% ( 3/3 )
Lines        : 100% ( 8/8 )
================================================================================
```
这条命令同时还生成了一个 coverage 子目录，其中的 coverage.json 文件包含覆盖率的原始数据，coverage/lcov-report 是可以在浏览器打开的覆盖率报告，其中有详细信息，到底哪些代码没有覆盖到。