/**
 * Name: jWhere
 * Author: Eduardo Páez Rubio
 * Email: contact@devpaezrubio.com
 * Website: http://www.devpaezrubio.com
 */

(function ($) {

    "use strict";

    var fnGroupsObjectBuilder = function (testProp) {
        this.testProp = testProp;
    };

    fnGroupsObjectBuilder.prototype.allowText = function () {
        var testProp = this.testProp;
        this.testString = function ($element, number) {
            return $element[testProp]() === number;
        };
        return this;
    };

    fnGroupsObjectBuilder.prototype.allowNumber = function () {
        var testProp = this.testProp;
        this.testNumber = function ($element, number) {
            return parseInt($element[testProp]()) === number;
        };
        return this;
    };

    fnGroupsObjectBuilder.prototype.allowCount = function () {
        var testProp = this.testProp;
        this.testNumber = function ($element, number) {
            return $element[testProp]().length === number;
        };
        return this;
    };

    fnGroupsObjectBuilder.prototype.allowFunction = function () {
        var testProp = this.testProp;
        this.testFunction = function ($element, fn) {
            return fn($element[testProp]())
        };
        return this;
    };

    fnGroupsObjectBuilder.prototype.allowRegex = function () {
        var testProp = this.testProp;
        this.testRegexp = function ($element, regexp) {
            return $element[testProp]().match(regexp);
        };
        return this;
    };

    fnGroupsObjectBuilder.prototype.allowKeyValue = function () {
        var testProp = this.testProp;
        this.testKeyValue = function ($element, object) {
            return $element[testProp](object.key) == object.value;
        };
        return this;
    };

    fnGroupsObjectBuilder.prototype.allowKeyValueFunction = function () {
        var testProp = this.testProp;
        this.testKeyValueFn = function ($element, object) {
            return object.value($element[testProp](object.key));
        };
        return this;
    };

    fnGroupsObjectBuilder.prototype.allowKeyValueRegex = function () {
        var testProp = this.testProp;
        this.testKeyRegexp = function ($element, object) {
            return ("" + $element[testProp](object.key)).match(object.value)
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
        "data": new fnGroupsObjectBuilder("data").allowKeyValue().allowKeyValueFunction().allowKeyValueRegex(),
        "children": new fnGroupsObjectBuilder("children").allowFunction().allowCount(),
        "siblings": new fnGroupsObjectBuilder("siblings").allowFunction().allowCount(),
        "parents": new fnGroupsObjectBuilder("parents").allowFunction().allowCount()
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