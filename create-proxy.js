"use strict";

module.exports = function (proxee, throttle, exceptions) {

    const isThrottable = key => {
        return typeof proxee[key] === 'function'
            && (!exceptions || exceptions.indexOf(key) == -1);
    }
    const mapper = {
        'function': (property) => ({
            name: property.name, body: function () {
                return new Promise((resolve, reject) => {
                    throttle(() => resolve(property.value.bind(proxee, ...arguments)()))
                })
            }
        }),
        'as_is': (property) => ({name: property.name, body: property.value})
    };
    return Object.keys(proxee)
        .map(key => ({
            type: isThrottable(key) ? 'function' : 'as_is',
            name: key,
            value: proxee[key]
        })).map(property => {
            return mapper[property.type](property)
        }).reduce((proxy, Function) => {
            proxy[Function.name] = Function.body;
            return proxy;
        }, {});
}