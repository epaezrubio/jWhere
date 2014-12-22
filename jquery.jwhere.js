/**
 * Name: jWhere
 * Author: Eduardo Páez Rubio
 * Email: contact@devpaezrubio.com
 * Website: http://www.devpaezrubio.com
 */

(function ($) {

    "use strict";

    var fnGroupsObjects = {
            numberFunctionObject: function (testProp) {
                return {
                    testNumber: function ($element, number) {
                        return $element[testProp]() === number;
                    },
                    testFunction: function ($element, fn) {
                        return fn($element[testProp]())
                    }
                }
            },
            stringRegexpFunctionObject: function(testProp) {
                return {
                    testString: function ($element, string) {
                        return $element[testProp]() === string;
                    },
                    testRegexp: function ($element, regexp) {
                        return $element[testProp]().match(regexp);
                    },
                    testFunction: function ($element, fn) {
                        return fn($element[testProp]())
                    }
                }
            },
            keyValuekeyRegexpKeyFn: function (testProp) {
                return {
                    testKeyValue: function ($element, object) {
                        return $element[testProp](object.key) == object.value;
                    },
                    testKeyRegexp: function ($element, object) {
                        return ("" + $element[testProp](object.key)).match(object.value)
                    },
                    testKeyValueFn: function ($element, object) {
                        return object.value($element[testProp](object.key));
                    }
                }
            },
            numberCountFn: function (testProp) {
                return {
                    testNumber: function ($element, number) {
                        return $element[testProp]().length === number;
                    },
                    testFunction: function ($element, fn) {
                        return fn($element[testProp]())
                    }
                }
            }
        },
        filterSuites = {
            "html": fnGroupsObjects.stringRegexpFunctionObject("html"),
            "text": fnGroupsObjects.stringRegexpFunctionObject("text"),
            "width": fnGroupsObjects.numberFunctionObject("width"),
            "height": fnGroupsObjects.numberFunctionObject("height"),
            "outerHeight": fnGroupsObjects.numberFunctionObject("outerHeight"),
            "innerHeight": fnGroupsObjects.numberFunctionObject("innerHeight"),
            "outerWidth": fnGroupsObjects.numberFunctionObject("outerWidth"),
            "innerWidth": fnGroupsObjects.numberFunctionObject("innerWidth"),
            "css": fnGroupsObjects.keyValuekeyRegexpKeyFn("css"),
            "data": fnGroupsObjects.keyValuekeyRegexpKeyFn("data"),
            "children": fnGroupsObjects.numberCountFn("parents"),
            "siblings": fnGroupsObjects.numberCountFn("siblings"),
            "parents": fnGroupsObjects.numberCountFn("parents")
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

            if (assertion.key && assertion.value) {

                if (assertion.value.prototype && assertion.value.prototype.constructor) {
                    return filterSuites[key].testKeyValueFn;
                }

                if (assertion.value.compile) {
                    return filterSuites[key].testKeyRegexp;
                }

                return filterSuites[key].testKeyValue;
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