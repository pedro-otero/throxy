"use strict";

module.exports = function (proxee, t, exceptions) {

    const queue = [];

    if (!exceptions) {
        exceptions = [];
    }

    setInterval(() => {
        if (queue.length > 0) {
            queue.shift()();
        }
    }, t);

    const convertFunction = key => function () {
        const args = Array.prototype.slice.call(arguments);
        const boundFunction = proxee[key].bind(proxee, ...args);
        if (exceptions.indexOf(key) == -1) {
            return new Promise((resolve, reject) => {
                queue.push(() => {
                    try {
                        resolve(boundFunction());
                    } catch (error) {
                        reject(error);
                    }
                });
            });
        } else {
            return boundFunction();
        }
    }

    Object.keys(proxee).forEach(key => {
        const value = proxee[key];
        this[key] = (typeof value === 'function') ? convertFunction(key) : value;
    });
}