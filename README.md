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

## 优化（动态单元测试、Grunt工具自动执行单元测试）
### 动态单元测试
```js
// add.js
function add(x, y) {
    var _x = Number(x),
        _y = Number(y)
    if (isNaN(_x) || isNaN(_y)) {
        return NaN;
    } else {
        return _x + _y;
    }
}

module.exports = add;
```
```js
// test/add.test.js
describe('加法函数的动态测试', function () {
    var tests_normal = [
        { args: [0, 0], exp: 0 },
        { args: [2, 3], exp: 05 },
        { args: [-4, -2], exp: -6 },
        { args: [-4, 10], exp: 6 },
        { args: [1, 1023], exp: 1024 },
        { args: [2.6, 3.8], exp: 6.4 },
        { args: ['2e2', '3e-2'], exp: 200.03 }
    ]

    tests_normal.forEach(function (test) {
        it(`${test.args[0]} + ${test.args[1]} = ${test.exp}`, function () {
            expect(add(test.args[0], test.args[1])).to.be.equal(test.exp);
        });
    });

    var tests_ugily = [
        { args: ['a', 'b'], exp: NaN },
        { args: [2, 'a'], exp: NaN },
        { args: [',', 3], exp: NaN }
    ]

    tests_ugily.forEach(function (test) {
        it(`${test.args[0]} + ${test.args[1]} = ${test.exp}`, function () {
            expect(add(test.args[0], test.args[1])).to.be.NaN;
        });
    });
})
```

### grunt构建单元测试
```bash
# 安装 grunt 相关依赖库
$ npm install grunt grunt-mocha-cli grunt-mocha-istanbul -D
```

修改package.json
```json
{

  "scripts": {
    "test": "grunt"
  }

}
```

```js
// Gruntfile.js
module.exports = function (grunt) {
    grunt.initConfig({
        mochacli: {
            options: {
                reporter: 'spec',
                bail: true
            },
            all: ['test/*.js']
        },
        mocha_istanbul: {
            coverage: {
                src: 'test'
            }
        },
        istanbul_check_coverage: {
            default: {
                options: {
                    coverageFolder: 'coverage*',
                    check: {
                        lines: 90,
                        statements: 90
                    }
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-mocha-cli');
    grunt.loadNpmTasks('grunt-mocha-istanbul');

    grunt.registerTask('default', ['mochacli']);
    grunt.registerTask('cover', ['mocha_istanbul']);
    grunt.registerTask('check-cover', ['istanbul_check_coverage']);
}
```

运行
```bash
$ npm test  # mocha单元测试
# 或
$ grunt

$ grunt cover  #测试覆盖率

$ grunt check-cover #测试指标，要做运行测试覆盖率之后，才能执行
```