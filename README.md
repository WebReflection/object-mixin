object-mixin
============

A possible ES6 polyfill

[![build status](https://secure.travis-ci.org/WebReflection/object-mixin.png)](http://travis-ci.org/WebReflection/object-mixin)


### API

```javascript

// basic signature
Object.mixin(
  target:Object,  // the object to be enriched

  source:Object   // all own properties of this object
                  // will be assigned using same descriptor

):target          // returns the target object modified


// overload with Traits (Function)

Object.mixin(
  target:Object,  // the object to be enriched

  source:Trait    // invoked with target as context

  [, args:Array|Arguments]
                  // optional args property
                  // used at Trait arguments

):target          // returns the target object modified

```


### Compatibility
Should be compatible with all JavaScript ES3 or JScript engines.

[node.js](build/object-mixin.node.js) module, [AMD](build/object-mixin.amd.js) module, and generic env [standalone](build/object-mixin.js) file.


### Example

```javascript
// using an object

var a = {a: 'b'},
    b = Object.mixin({b: 'b'}, a);

console.log(JSON.stringify(b));
// {"a":"a","b":"b"}


// using a function
function addUniqueIdFunctionality(prefix) {
  var
    privatelyShared = {},
    i = 0
  ;
  if (!prefix) prefix = '.' + (new Date).getTime();
  this.getIdFor = function (key) {
    return privatelyShared[key] || (
      privatelyShared[key] = ++i + prefix + Math.random()
    );
  };
}

function GenericClass(){}

Object.mixin(
  GenericClass.prototype,
  addUniqueIdFunctionality
  // , ['my_prefix']
);

var instance1 = new GenericClass,
    instance2 = new GenericClass;

console.log([
  instance1.getIdFor('a'),
  instance1.getIdFor('b'), // different
  instance2.getIdFor('a')
  // same as instance1.getIdFor('a')
].join('\n'));
```


### License

```
           DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
                   Version 2, December 2004

Copyright (C) 2013 Andrea Giammarchi <spam@hater.me>

Everyone is permitted to copy and distribute verbatim or modified
copies of this license document, and changing it is allowed as long
as the name is changed.

           DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
  TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION

 0. You just DO WHAT THE FUCK YOU WANT TO.
```