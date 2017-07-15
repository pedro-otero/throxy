# Throxy

Throxy is a Node.js package that creates a throttled proxy of a any object. Such proxy throttles the execution of all the functions in the original object. Properties of the original object that aren't functions are copied to the proxy as is. You can also specify a list of exceptions.

I made this library with API limits in mind, so that you can convert your client object into something you can call functions on without worrying about the limits. You set the limits once, when you construct the Throxy instance.

## Usage

In the root of your Node project run `npm install throxy`

### Example

```javascript
const myObject = new MyObject(); // your original object
const Throxy = require('throxy');
const proxy = new Throxy(myObject, 1, 1000);
// you just created a throttled version of your object
```

### The Throxy constructor

```javascript
function (proxee, n, t[, exceptions])
```
- **proxee**: The object for which you want a proxy
- **n**: Max amount of simultaneous requests the proxy will allow in a given **t**
- **t**: Period of time on which max **n** simultaneous requests can be made to the proxy
- **exceptions**: Array of names of the functions of this object that you don't want to throttle

If you are proxying a client of an API, `n` and `t` are the arguments that describe its limits.

## Testing
This project uses [Jasmine][6] for testing. The `test` script runs all the tests.

[6]: https://jasmine.github.io/