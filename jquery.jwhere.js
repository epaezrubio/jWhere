/**
 * Name: jWhere
 * Author: Eduardo Páez Rubio
 * Email: contact@devpaezrubio.com
 * Website: http://www.devpaezrubio.com
 */

(function ($) {

    "use strict";

    var filterSuites = {
        "html": {
            testString: function ($element, string) {
                return $element.html() === string;
            },
            testRegexp: function ($element, regexp) {
                return $element.html().match(regexp);
            },
            testFunction: function ($element, fn) {
                return fn($element.html())
            }
        },
        "text": {
            testString: function ($element, string) {
                return $element.text() === string;
            },
            testRegexp: function ($element, regexp) {
                return $element.text().match(regexp);
            },
            testFunction: function ($element, fn) {
                return fn($element.text())
            }
        },
        "css": {
            testKeyValue: function ($element, object) {
                return $element.css(object.key) == object.value;
            },
            testKeyValueFn: function ($element, object) {
                return object.value($element.css(object.key));
            }
        },
        "data": {
            testKeyValue: function ($element, object) {
                return $element.data(object.key) == object.value;
            },
            testKeyRegexp: function ($element, object) {
                return ("" + $element.data(object.key)).match(object.value)
            },
            testKeyValueFn: function ($element, object) {
                return object.value($element.data(object.key));
            }
        },
        "width": {
            testNumber: function ($element, number) {
                return $element.width() === number;
            },
            testFunction: function ($element, fn) {
                return fn($element.width())
            }
        },
        "height": {
            testNumber: function ($element, number) {
                return $element.height() === number;
            },
            testFunction: function ($element, fn) {
                return fn($element.height())
            }
        },
        "outerHeight": {
            testNumber: function ($element, number) {
                return $element.outerHeight() === number;
            },
            testFunction: function ($element, fn) {
                return fn($element.innerHeight())
            }
        },
        "innerHeight": {
            testNumber: function ($element, number) {
                return $element.innerHeight() === number;
            },
            testFunction: function ($element, fn) {
                return fn($element.innerHeight())
            }
        },
        "outerWidth": {
            testNumber: function ($element, number) {
                return $element.outerWidth() === number;
            },
            testFunction: function ($element, fn) {
                return fn($element.innerWidth())
            }
        },
        "innerWidth": {
            testNumber: function ($element, number) {
                return $element.innerWidth() === number;
            },
            testFunction: function ($element, fn) {
                return fn($element.innerWidth())
            }
        },
        "children": {
            testNumber: function ($element, number) {
                return $element.children().length === number;
            },
            testFunction: function ($element, fn) {
                return fn($element.children())
            }
        }
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