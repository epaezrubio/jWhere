(function ($) {

    "use strict";

    QUnit.module("multi-filter");
    QUnit.test("should accept 0..n conditions", function (assert) {
        var $elem = $("<div>");

        $elem.where([]);
        $elem.where([
            {
                html: ""
            },
            {
                text: ""
            }
        ]);

        assert.ok(true);

    });


    QUnit.test("should throw if one of the filters are not recognised", function (assert) {
        var $elem = $("<div>");

        try {
            $elem.where([
                {
                    html: ""
                },
                {
                    text: ""
                },
                {
                    falseFilter: ""
                }
            ]);

            assert.ok(false, "false filter didn't throw");
        } catch (exception) {
            assert.ok(true);
        }

    });

    QUnit.test("should apply all filters", function (assert) {
        var $elem = $("<ul>");

        var listHTML = "<li>5</li><li>4</li><li>3</li><li>2</li><li>1</li>";

        $elem.html(listHTML);

        var cdn1 = {
            text: function (value) {
                return parseInt(value) > 1;
            }
        };

        var cdn2 = {
            text: function (value) {
                return parseInt(value) < 5;
            }
        };

        var $result = $elem.find("li").where([
            cdn1,
            cdn2
        ]);

        assert.equal($result.length, 3);

    });


}(jQuery));