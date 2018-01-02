    var should = chai.should();
    describe('sample test',function () {
        it('should equal 0 when n === 0',function () {
            window.fibonacci(0).should.equal(0);
        });
    });