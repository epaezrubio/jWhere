/**
 * Name: jWhere
 * Author: Eduardo Páez Rubio
 * Email: contact@devpaezrubio.com
 * Website: http://www.devpaezrubio.com
 */

(function ($) {

    "use strict";

    var sanitizes = {
        lowerString: function (string) {
            return string.toLowerCase();
        }
    }, sanitizeFn = function (sanitize, prop) {
        return sanitize ? sanitize(prop) : prop;
    }, jQueryTestGetter = function (testProp, sanitize) {
        return function ($element, args) {
            return sanitizeFn(sanitize, $element[testProp].apply($element, args ? [].concat(args) : []));
        }
    }, jQueryTestProp = function (testProp, sanitize) {
        return function ($element) {
            return sanitizeFn(sanitize, $element.prop(testProp));
        }
    }, fnGroupsObjectBuilder = function (testProp, options) {
        var _options = options || {},
            _testPropFn = null;

        if (_options.prop) {
            _testPropFn = jQueryTestProp(testProp, _options.sanitize);
        } else {
            _testPropFn = jQueryTestGetter(testProp, _options.sanitize);
        }

        this.testPropFn = _testPropFn;

    };

    fnGroupsObjectBuilder.prototype.allowText = function () {
        var testPropFn = this.testPropFn;
        this.testString = function ($element, text) {
            return testPropFn($element) === text;
        };
        return this;
    };

    fnGroupsObjectBuilder.prototype.allowNumber = function () {
        var testPropFn = this.testPropFn;
        this.testNumber = function ($element, number) {
            return parseInt(testPropFn($element)) === number;
        };
        return this;
    };

    fnGroupsObjectBuilder.prototype.allowCount = function () {
        var testPropFn = this.testPropFn;
        this.testNumber = function ($element, number) {
            return testPropFn($element).length === number;
        };
        return this;
    };

    fnGroupsObjectBuilder.prototype.allowFunction = function () {
        var testPropFn = this.testPropFn;
        this.testFunction = function ($element, fn) {
            return fn(testPropFn($element))
        };
        return this;
    };

    fnGroupsObjectBuilder.prototype.allowRegex = function () {
        var testPropFn = this.testPropFn;
        this.testRegexp = function ($element, regexp) {
            return testPropFn($element).match(regexp);
        };
        return this;
    };

    fnGroupsObjectBuilder.prototype.allowKeyValue = function () {
        var testPropFn = this.testPropFn;
        this.testKeyValue = function ($element, object) {
            return testPropFn($element, object.key) == object.value;
        };
        return this;
    };

    fnGroupsObjectBuilder.prototype.allowKeyValueFunction = function () {
        var testPropFn = this.testPropFn;
        this.testKeyValueFn = function ($element, object) {
            return object.value(testPropFn($element, object.key));
        };
        return this;
    };

    fnGroupsObjectBuilder.prototype.allowKeyValueRegex = function () {
        var testPropFn = this.testPropFn;
        this.testKeyRegexp = function ($element, object) {
            return ("" + testPropFn($element, object.key)).match(object.value)
        };
        return this;
    };

    fnGroupsObjectBuilder.prototype.allowKeyValueDef = function () {
        var testPropFn = this.testPropFn;
        this.testKeyBoolean = function ($element, object) {
            return (testPropFn($element, object.key) !== (void 0)) === object.exists;
        };
        return this;
    };

    var filterSuites = {
        "html": new fnGroupsObjectBuilder("html").allowFunction().allowText().allowRegex(),
        "text": new fnGroupsObjectBuilder("text").allowFunction().allowText().allowRegex(),
        "width": new fnGroupsObjectBuilder("width").allowNumber().allowFunction(),
        "height": new fnGroupsObjectBuilder("height").allowNumber().allowFunction(),
        "outerHeight": new fnGroupsObjectBuilder("outerHeight").allowNumber().allowFunction(),
        "innerHeight": new fnGroupsObjectBuilder("innerHeight").allowNumber().allowFunction(),
        "outerWidth": new fnGroupsObjectBuilder("outerWidth").allowNumber().allowFunction(),
        "innerWidth": new fnGroupsObjectBuilder("innerWidth").allowNumber().allowFunction(),
        "css": new fnGroupsObjectBuilder("css").allowKeyValue().allowKeyValueFunction().allowKeyValueRegex(),
        "data": new fnGroupsObjectBuilder("data").allowKeyValue().allowKeyValueFunction().allowKeyValueRegex().allowKeyValueDef(),
        "attr": new fnGroupsObjectBuilder("attr").allowKeyValue().allowKeyValueFunction().allowKeyValueRegex().allowKeyValueDef(),
        "children": new fnGroupsObjectBuilder("children").allowFunction().allowCount(),
        "siblings": new fnGroupsObjectBuilder("siblings").allowFunction().allowCount(),
        "parents": new fnGroupsObjectBuilder("parents").allowFunction().allowCount(),
        "tagName": new fnGroupsObjectBuilder("tagName", {
            prop: true,
            sanitize: sanitizes.lowerString
        }).allowFunction().allowText().allowRegex()
    }, getAssertionFunction = function (key, assertion) {

        if (!key || !filterSuites[key]) {
            return null;
        }

        if ((assertion === "" + assertion) && assertion.indexOf) {
            return filterSuites[key].testString;
        }

        if (assertion + 0 === assertion) {
            return filterSuites[key].testNumber;
        }

        if (assertion.compile) {
            return filterSuites[key].testRegexp;
        }

        if (assertion.prototype && assertion.prototype.constructor) {
            return filterSuites[key].testFunction;
        }

        if (assertion.key) {

            if (assertion.value) {

                if (assertion.value.prototype && assertion.value.prototype.constructor) {
                    return filterSuites[key].testKeyValueFn;
                }

                if (assertion.value.compile) {
                    return filterSuites[key].testKeyRegexp;
                }

                return filterSuites[key].testKeyValue;

            }

            if (assertion.exists === false || assertion.exists === true) {
                return filterSuites[key].testKeyBoolean
            }
        }

        return null;

    };

    $.fn.where = function (filters) {

        var result = this.toArray(),
            filterSet = filters;

        if (!(filterSet && typeof filterSet == 'object' && typeof filterSet.length == 'number' &&
            toString.call(filterSet) == "[object Array]" || false)) {
            filterSet = [filterSet];
        }


        $.each(filterSet, function (index, filter) {

            for (var i = 0; i < result.length; i++) {
                var element = result[i];

                var filterKey = Object.keys(filter)[0],
                    filterAssertion = filter[filterKey];

                var assertionFunction = getAssertionFunction(filterKey, filterAssertion),
                    $element = $(element);

                if (!assertionFunction) {
                    throw new Error("Assertion for filter " + filterKey + " is unknown");
                }

                if (!assertionFunction($element, filterAssertion)) {
                    result.splice(result.indexOf(element), 1);
                    i = i - 1;
                }

            }

        });


        return $(result);

    };


}(jQuery));