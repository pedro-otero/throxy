# Throxy

Throxy is a Node.js package that creates a throttled proxy of a any object. Such proxy throttles the execution of all the functions in the original object. Properties of the original object that aren't functions are copied to the proxy as is. You can also specify a list of exceptions.

I made this library with API limits in mind, so that you can convert your client object into something you can call functions on without worrying about the limits. You set the limits once, when you construct the Throxy instance.

## Usage

In the root of your Node project run `npm install throxy`

### Example

```javascript
const myObject = new MyObject(); // your original object
const Throxy = require('throxy');
const proxy = new Throxy(myObject, 1000);
// you just created a throttled version of your object
```

Please note that for every function that is throttled, its return value is given as a Promise.


```javascript
const myObject = {
    foo: (x) => x * 2
}
const Throxy = require('throxy');
const proxy = new Throxy(myObject, 1000);
proxy.foo(2).then(result => console.log(result); // 4 is printed
```

### The Throxy constructor

```javascript
function (proxee, t[, exceptions])
```
- **proxee**: The object for which you want a proxy
- **t**: Period of time on which the queue is processed. The queue has the pending invocations of every function that is meant to be throttled. Every `t` milliseconds, every invocation is fulfilled.
- **exceptions**: Array of names of the functions of this object that you don't want to throttle. Such functions behave just like in the original object. They don't return promises unless the original functions do.

If you are proxying a client of an API, `n` and `t` are the arguments that describe its limits.

## Testing
This project uses [Jasmine][6] for testing. The `test` script runs all the tests.

[6]: https://jasmine.github.io/