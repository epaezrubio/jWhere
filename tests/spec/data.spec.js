(function ($) {

    "use strict";

    QUnit.module("data");
    QUnit.test("should accept key/value, key/regex key/function", function (assert) {
        var $elem = $("<div>");

        $elem.where({
            data: {
                key: "foo",
                value: "var"
            }
        });

        assert.ok(true, "data accepts key/value");

        $elem.where({
            data: {
                key: "foo",
                value: new RegExp("\\w+")
            }
        });

        assert.ok(true, "data accepts key/regexp");

        $elem.where({
            data: {
                key: "foo",
                value: function (value) {
                    return true;
                }
            }
        });

        assert.ok(true, "data accepts key/function");

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

        $elems.eq(0).data("foo", "bar");
        $elems.eq(2).data("foo", "foo");

        var $items = $elems.where({
            data: {
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

        $elems.eq(0).data("foo", "bar");
        $elems.eq(1).data("foo", "bars");
        $elems.eq(2).data("foo", "foo");

        var $items = $elems.where({
            data: {
                key: "foo",
                value: new RegExp("ba\\w{1,2}")
            }
        });

        assert.equal($items.length, 2);

    });

}(jQuery));