/*jslint browser: true, forin: true, plusplus: true, indent: 4 */
(function(Object, mixin) {
    "use strict"; // happy linter ^_____^

    /* <droppable>
     * adhoc polyfill section for this purpose only
     * never use these functions outside this closure ... like ...
ne*/var
    /*
^ ... you see that? only reason I chose 4 spaces indentations here :D
      also this comment ... pure quality, right ?!?! ... anyway ... */

        // for IE < 9 Desktop browsers
        defineProperty = Object.defineProperty ||
        function (o, k, d) {
            o[k] = d.value;
        },
        // same as above
        getOwnPropertyNames = Object.getOwnPropertyNames ||
        function (o) {
            var
                // in case the guy does not inherit from Object.prototype
                has = Object.prototype.hasOwnProperty,
                result = [],
                key;
            for (key in o) {
                // in non ES5 compliant browsers
                // there's no way to define properties
                // as non enumerable unless these are
                // there by default, like "constructor" is
                // for functions.prototype
                if (has.call(o, key)) {
                    result.push(key);
                }
            }
            return result;
        },
        // again ... IE < 8
        getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor ||
        function (o, k) {
            return {
                enumerable: true,
                writable: true,
                configurable: true,
                value: o[k]
            };
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
            value: function mixin(
                target, // object to enrich with
                source    // mixin object/function
            ) {
                var
                    // check if source is a function
                    enricher = typeof source === 'function' ? source.prototype : source,
                    // per each own property name
                    keys = getOwnPropertyNames(enricher),
                    length = keys.length,
                    i = 0,
                    key;
                while (i < length) {
                    // define it ...
                    defineProperty(
                        target,
                        key = keys[i++],
                        // ... via same property descriptor
                        getOwnPropertyDescriptor(
                            source,
                            key
                        )
                    );
                }
                // if the object had no own names
                // it's quite clear the intention of the user
                // so that if a function without properties
                // is passed through this method ...
                if (!length && typeof source === 'function') {
                    // this function is invoked with the target
                    // as its own context
                    source.apply(
                        target,
                        // optional arguments to initialize defaults
                        // for this mixin might be accepted too
                        keys.slice.call(arguments, 2)
                    );
                }
                // always return the initial target
                // ignoring a possible different return
                // in latter case: consistency with this method
                return target;
            }
        }
    );
}(Object, 'mixin'));