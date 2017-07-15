"use strict";

const createProxy = require('./create-proxy');
const throttledQueue = require('throttled-queue');

module.exports = function (proxee, n, t, exceptions) {
    const throttle = throttledQueue(n, t);
    return createProxy(proxee, throttle, exceptions);
}