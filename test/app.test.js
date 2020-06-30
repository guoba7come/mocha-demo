const expect = require('chai').expect,
    http = require('http')

describe('矩形计算器 HTTP API 自动化测试', function () {
    it('正确请求格式的测试', function(done) {
        http.get('http://localhost:8080/rectangle?width=2&height=3', function(res) {
            var result = ''

            res.on('data', function(chunk) { result += chunk })
            res.on('end', function () {
                var rect = JSON.parse(result)

                expect(rect.area).to.be.equal(6)
                expect(rect.perimeter).to.be.equal(10)
                done()
            })
        })
    })
})