//remove:
var mixin = require('../build/object-mixin.node.js');
//:remove

wru.test([
  // ES3 compatible tests
  {
    name: "main",
    test: function () {
      wru.assert(typeof Object.mixin == "function");
    }
  },{
    name: "classic object",
    test: function () {
      var obj = Object.mixin({}, {a:'a'});
      wru.assert('has property', 'a' in obj);
      wru.assert('with the right value', obj.a === 'a');
    }
  },{
    name: "function",
    test: function () {
      function method() {}

      function Trait(){
        this.method = method;
      }

      var obj = Object.mixin({}, Trait);
      wru.assert('invoked', obj.method === method);
    }
  },{
    name: "function with arguments",
    test: function () {
      function method() {}

      function Trait(a, b){
        this.a = a;
        this.b = b;
        this.method = method;
      }

      var obj = Object.mixin({}, Trait, [1, 2]);
      wru.assert('invokedwith args',
        obj.method === method &&
        obj.a === 1 &&
        obj.b === 2
      );
    }
  },
  // ES5+ compatible tests
  {
    name: "descriptors get",
    test: function () {
      if (Object.getOwnPropertyDescriptor) {
        function get() {
          wru.assert(true);
          obj = 123;
        }
        var obj = Object.mixin(
          {},
          Object.defineProperty(
            {},
            'key',
            {
              get: wru.async(get)
            }
          )
        );
        obj.key;
        wru.assert(obj === 123);
      }
    }
  }, {
    name: "descriptors set",
    test: function () {
      if (Object.getOwnPropertyDescriptor) {
        function set(value) {
          wru.assert(true);
          obj = value;
        }
        var obj = Object.mixin(
          {},
          Object.defineProperty(
            {},
            'key',
            {
              set: wru.async(set)
            }
          )
        );
        obj.key = 123;
        wru.assert(obj === 123);
      }
    }
  }
]);
