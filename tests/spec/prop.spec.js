(function ($) {

    "use strict";

    QUnit.module("prop");
    QUnit.test("should accept key/value, key/regex key/function, key/boolean", function (assert) {
        var $elem = $("<div>");

        $elem.where({
            prop: {
                key: "foo",
                value: "var"
            }
        });

        assert.ok(true, "prop accepts key/value");

        $elem.where({
            prop: {
                key: "foo",
                value: new RegExp("\\w+")
            }
        });

        assert.ok(true, "prop accepts key/regexp");

        $elem.where({
            prop: {
                key: "foo",
                value: function (value) {
                    return true;
                }
            }
        });

        assert.ok(true, "prop accepts key/function");

    });

    QUnit.test("should compare literals if string is given", function (assert) {

        var html = "" +
            "<ul>" +
            "<li>Item 1</li>" +
            "<li>Something else</li>" +
            "<li>Item 2</li>" +
            "<li></li>" +
            "</ul>";

        var $elems = $("<div>").html(html).find("li");

        $elems.eq(0).prop("foo", "bar");
        $elems.eq(2).prop("foo", "foo");

        var $items = $elems.where({
            prop: {
                key: "foo",
                value: "bar"
            }
        });

        assert.equal($items.length, 1);

    });

    QUnit.test("should evaluate regex if regex is given", function (assert) {

        var html = "" +
            "<ul>" +
            "<li>Item 1</li>" +
            "<li>Something else</li>" +
            "<li>Item 2</li>" +
            "<li></li>" +
            "</ul>";

        var $elems = $("<div>").html(html).find("li");

        $elems.eq(0).prop("foo", "bar");
        $elems.eq(1).prop("foo", "bars");
        $elems.eq(2).prop("foo", "foo");

        var $items = $elems.where({
            prop: {
                key: "foo",
                value: new RegExp("ba\\w{1,2}")
            }
        });

        assert.equal($items.length, 2);

    });

}(jQuery));