(function ($) {

    "use strict";

    QUnit.module("css");
    QUnit.test("should accept key/value or key/function", function (assert) {
        var $elem = $("<div>");

        $elem.where({
            css: {
                key: "display",
                value: "inline"
            }
        });

        assert.ok(true, "css accepts key/value");

        $elem.where({
            css: {
                key: "display",
                value: function (value) {
                    return true;
                }
            }
        });

        assert.ok(true, "css accepts key/function");

    });

    QUnit.test("should compare literals if string is given", function (assert) {

        var style = "border: 1px solid #00FF00;",
            html = "" +
            "<ul>" +
            "<li style='" + style + "'>Item 1</li>" +
            "<li>Something else</li>" +
            "<li>Item 2</li>" +
            "<li></li>" +
            "</ul>";

        var $elems = $("<div>").html(html).find("li"),
            $items = $elems.where({
                css: {
                    key: "border-width",
                    value: "1px"
                }
            });

        assert.equal($items.length, 1);

    });

}(jQuery));