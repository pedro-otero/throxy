"use strict";

describe('Throxy', function () {

    const Throxy = require('./index');
    const proxee = {
        foo: () => {
            return Promise.resolve(new Date().getTime())
        }
    }
    const throxy = new Throxy(proxee, 1, 1000);

    it("copies functions of the proxee to the throxy instance", function () {
        expect(typeof throxy.foo).toEqual('function');
    });

});