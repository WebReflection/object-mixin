object-mixin
============

A possible ES6 polyfill

[![build status](https://secure.travis-ci.org/WebReflection/object-mixin.png)](http://travis-ci.org/WebReflection/object-mixin)


### API

```javascript

Object.mixin(
  target:Object,  // the object to be enriched

  source:Object|Function
                  // if object, all own properties
                  // are copied over the target

                  // if function
                  // this is invoked with target
                  // as the context

  [arg0, arg1, ..., argN]
                  // optional arguments, if specified
                  // used to invoke the mixin
):target

```

### Example

```
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


### Compatibility
Should be compatible with all JavaScript ES3 or JScript engines.

[node.js](build/object-mixin.node.js) module, [AMD](build/object-mixin.amd.js) module, and generic env [standalone](build/object-mixin.js) file.


### License

```
           DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
                   Version 2, December 2004

Copyright (C) 2004 Sam Hocevar <sam@hocevar.net>

Everyone is permitted to copy and distribute verbatim or modified
copies of this license document, and changing it is allowed as long
as the name is changed.

           DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
  TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION

 0. You just DO WHAT THE FUCK YOU WANT TO.
```