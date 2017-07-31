"use strict";

const Throxy = require('./index');

const proxee = {
    foo: () => Promise.resolve(new Date().getTime()),
    bar: n => Promise.resolve(n * 2),
    exception: () => 'exception',
    nonFunction: 'non function',
    errorMaker: function () {
        throw new Error('this is an error');
    }
}

describe('Throxy', function () {

    const start = new Date().getTime();
    const proxy = new Throxy(proxee, 1000, ['exception']);

    it("copies functions of the proxee to the proxy", function () {
        expect(typeof proxy.foo).toEqual('function');
        expect(typeof proxy.bar).toEqual('function');
    });

    it("throttles proxee functions", function (done) {
        Promise.all([proxy.foo(), proxy.foo(), proxy.foo()]).then(ends => {
            expect(ends[ends.length - 1] - start).toBeGreaterThanOrEqual(3000);
            done();
        });
    });

    it("throttles proxee functions with arguments", function (done) {
        proxy.bar(3).then(result => {
            expect(result).toEqual(6);
            done();
        })
    });

    it("puts exceptions in the proxy as is", function () {
        expect(proxy.exception()).toEqual('exception');
    });

    it("puts non functions in the proxy as is", function () {
        expect(proxy.nonFunction).toEqual('non function');
    });

    it("rejects promise if there is an error", function (done) {
        proxy.errorMaker().then(result => fail(), error => done());
    });

});