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
        }
    }, getAssertionFunction = function (key, assertion) {

        if (!key || !filterSuites[key]) {
            return null;
        }

        if ((assertion === "" + assertion) && assertion.indexOf) {
            return filterSuites[key].testString;
        }

        if (assertion.compile) {
            return filterSuites[key].testRegexp;
        }

        if (assertion.key && assertion.value) {
            return filterSuites[key].testKeyValue;
        }

        if (assertion.prototype && assertion.prototype.constructor) {
            return filterSuites[key].testFunction;
        }

        return null;

    };

    $.fn.where = function (filters) {

        var result = [];

        this.each(function (i, element) {

            $.each(filters, function (key, assertion) {

                var assertionFunction = getAssertionFunction(key, assertion),
                    $element = $(element);

                if (!assertionFunction) {
                    throw new Error("Assertion for filter " + key + " is unknown");
                }

                if (assertionFunction($element, assertion)) {
                    result.push($element)
                }

            });

        });

        return $(result);

    };


}(jQuery));