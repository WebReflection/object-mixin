/*jslint browser: true, forin: true, plusplus: true, indent: 4 */
(function(Object, mixin) {
    "use strict"; // happy linter ^_____^

    /* <droppable> interesting code after line 110, here
     * ad-hoc polyfill section for this purpose only
     * never use these functions outside this closure ... like ...
ne*/var

        // borrowed methods for unknown Objects
        ObjectPrototype = Object.prototype,

        lookupGetter = ObjectPrototype.__lookupGetter__,
        lookupSetter = ObjectPrototype.__lookupSetter__,
        defineGetter = ObjectPrototype.__defineGetter__,
        defineSetter = ObjectPrototype.__defineSetter__,
        has          = ObjectPrototype.hasOwnProperty,

        emptyArray   = [],
        // slice        = emptyArray.slice,

        // for IE < 9 and non IE5 yet browsers
        goNative = true,
        defineProperty = (function(defineProperty){
          try{
            return defineProperty && defineProperty({},'_',{value:1})._ && defineProperty;
          } catch(IE8) {
            goNative = false;
          }
        }(Object.defineProperty)) ||
        function (o, k, d) {
            var
                get = d.get, // has.call(d, 'get') would be better but
                set = d.set; // ES5 is just like this
            if (get && defineGetter) {
                defineGetter.call(o, k, get);
            }
            if (set && defineSetter) {
                defineSetter.call(o, k, set);
            }
            if (!(get || set)) {
                o[k] = d.value;
            }
        },
        // for IE < 9 and non IE5 yet browsers
        getOwnPropertyNames = (goNative && Object.getOwnPropertyNames) ||
        (function () {
            var
                addHiddenOwnProperties = function (result) {
                    return result;
                },
                list = [],
                key,
                i,
                length;

            for (key in {valueOf: key}) {
                list.push(key);
            }

            if (!list.length) {
                length = list.push(
                    'constructor',
                    'hasOwnProperty',
                    'isPrototypeOf',
                    'propertyIsEnumerable',
                    'toLocaleString',
                    'toString',
                    'valueOf'
                ) - 1;
                addHiddenOwnProperties = function (result, o) {
                    for (i = 0; i < length; i++) {
                        key = list[i];
                        if (has.call(o, key)) {
                            result.push(key);
                        }
                    }
                    return result;
                };
            }

            return function (o) {
                var
                    result = [],
                    key;
                for (key in o) {
                    if (has.call(o, key)) {
                        result.push(key);
                    }
                }
                return addHiddenOwnProperties(result, o);
            };
        }()),
        // IE < 9 or other non ES5 yet browsers
        getOwnPropertyDescriptor = (goNative && Object.getOwnPropertyDescriptor) ||
        function (o, k) {
            var
                descriptor = {
                    enumerable: true,
                    configurable: true
                },
                get = lookupGetter && lookupGetter.call(o, k),
                set = lookupSetter && lookupSetter.call(o, k);
            if (get) {
                descriptor.get = get;
            }
            if (set) {
                descriptor.set = set;
            }
            if (!(get || set)) {
                descriptor.writable = true;
                descriptor.value = o[k];
            }
            return descriptor;
        };
    // </droppable>

    // if already defined get out of here
    // this should be 
    // if (mixin in Object) return;
    // but for some reason I went for JSLint ... 
    if (Object[mixin]) {
        return;
    }
    // same descriptor as other spec'd methods
    defineProperty(
        Object,
        mixin,
        {
            enumerable: false,
            writable: true,
            configurable: true,
            value: function (
                target, // object to enrich with
                source, // mixin object or Trait (Function)
                args    // optional arguments for Trait
            ) {
                var
                    i,
                    length,
                    keys,
                    key;

                if (typeof source === 'function') {
                    // if the source is a function
                    // it will be invoked with object as target
                    // this let us define mixin as closures
                    // function addFunctionality() {
                    //     this.functionality = function () {
                    //       // do amazing stuff
                    //     }
                    // }
                    // addFunctionality.call(Class.prototype);
                    // addFunctionality.call(genericObject);
                    // // or
                    // Object.mixin(Class.prototype, addFunctionality);

                    source.apply(target, args || emptyArray);
                    /*
                    // try to perform as fast as possible
                    if (arguments.length < 3) {
                        // so if no extra args are passed ...
                        source.call(target);
                    } else {
                        // there is no need to slice them as done here
                        source.apply(target, slice.call(arguments, 2));
                    }
                    */
                } else {
                    // if source is an object
                    // grab all possibe properties
                    // and per each of them ...
                    keys = getOwnPropertyNames(source);
                    length = keys.length;
                    i = 0;
                    while (i < length) {
                        key = keys[i++];
                        // ... define it ...
                        defineProperty(
                            target,
                            key,
                            // ... using the same descriptor
                            getOwnPropertyDescriptor(
                                source,
                                key
                            )
                        );
                    }
                }
                // always return the initial target
                // ignoring all possible different return with functions
                return target;
            }
        }
    );
}(Object, 'mixin'));