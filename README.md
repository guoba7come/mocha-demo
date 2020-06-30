# mocha-demo

### 重构rectangle.js代码
```js
// calc.js
function Rectangle(w, h) {
    var _w = Number(w),
        _h = Number(h);
    
    this.perimeter = () => 2 * (_w + _h);
    this.area = () => _w * _h;
}
```

```js
// rectange.js
$(function() {
    var $width = $('#width'),
        $height = $('#height'),
        $btnCal = $('#calculate'),
        $perimeter = $('#perimeter'),
        $area = $('#area');
  
    $btnCal.click(function(){
      var w = $width.val(),
          h = $height.val()

      var rect = new Rectangle(w, h);
  
      $perimeter.val(rect.perimeter());
      $area.val(rect.area());
    });
  });
```

index.html 引入 calc.js文件

### 安装环境
```bash
$ npm init -y
$ npm install chai mocha istanbul -D
$ npm install mocha-headless-chrome -D # 无头浏览器
```

```bash
$ mocha init test # mocha生成前端测试文件

# 对test文件夹下文件进行修改
$ rm -rf coverage # 删除多余文件
$ rm test/tests.spec.js
```

### 添加单元测试代码
在test文件夹加添加calc.test.js文件
```js
var expect = chai.expect

describe('矩形计算大的单元测试', function() {
    it('w=2, h=3 => p=10, a=6', function(){
        var rect = new Rectangle(2, 3);
        expect(rect.perimeter()).to.be.equal(10);
        expect(rect.area()).to.be.equal(6);
    });
})
```

修改test/index.html文件
```html
<body>
  <div id="mocha"></div>
  <script src="../calc.js"></script> <!--被测试文件-->
  <script src="../node_modules/chai/chai.js"></script>
  <script src="mocha.js"></script>
  <script>mocha.setup('bdd');</script>
  <script src="calc.test.js"></script> <!--测试文件-->
  <script>
    mocha.run();
  </script>
</body>
```

修改package.json文件
```json
{
	"scripts": {
    "test": "./node_modules/.bin/mocha-headless-chrome -f test/index.html -a no-sandbox"
  },
}
```

### 运行单元测试
```bash
$ npm test

矩形计算大的单元测试
✓ w=2, h=3 => p=10, a=6
1 passing (5ms)
```

### 添加持续集成服务器
在Travis CI 中关联GitHub中项目仓库
添加 .travis.yml文件，注意空格
```yaml
language: node_js

node_js:
  - 'node'

branches: 
  only:
    - mocha-fe
```