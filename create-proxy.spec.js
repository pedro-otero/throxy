"use strict";

describe('Create proxy', function () {

    const createProxy = require('./create-proxy');
    const throttle = require('throttled-queue')(1, 1000);
    const start = new Date().getTime();
    const proxee = {
        foo: () => {
            return Promise.resolve(new Date().getTime())
        },
        bar: n => {
            return Promise.resolve(n * 2);
        },
        exception: () => 'exception',
        nonFunction: 'non function'
    }
    const proxy = new createProxy(proxee, throttle, ['exception']);

    it("copies functions of the proxee to the proxy", function () {
        expect(typeof proxy.foo).toEqual('function');
    });

    it("throttles proxee functions", function (done) {
        proxy.foo().then(end => {
            expect(end - start).toBeGreaterThanOrEqual(1000);
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

});