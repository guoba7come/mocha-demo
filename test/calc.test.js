var expect = chai.expect

describe('矩形计算大的单元测试', function() {
    it('w=2, h=3 => p=10, a=6', function(){
        var rect = new Rectangle(2, 3);
        expect(rect.perimeter()).to.be.equal(10);
        expect(rect.area()).to.be.equal(6);
    });
})