var add = require('../add');

var expect = require('chai').expect;

describe('加法函数的测试', function () {
    it('3 + 2 = 5', function () {
        expect(add(3, 2)).to.be.equal(5);
    });

    it('1 + 1 = 2', function () {
        expect(add(1, 1)).to.be.equal(2);
    });
});

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