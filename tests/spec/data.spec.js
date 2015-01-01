(function ($) {

    "use strict";

    QUnit.module("data");
    QUnit.test("should accept key/value, key/regex key/function, key/boolean", function (assert) {
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

        $elem.where({
            data: {
                key: "foo",
                value: true
            }
        });

        assert.ok(true, "data accepts key/boolean");

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

    QUnit.test("should evaluate definition if boolean is given", function (assert) {

        var html = "" +
            "<div>" +
            "<a>Item 1</a>" +
            "<a>Item 2</a>" +
            "</div>";

        var $elems = $("<div>").html(html).find("a");
        $elems.eq(0).data("foo", "bar");

        var $hasData = $elems.where({
            data: {
                key: "foo",
                exists: true
            }
        }), $hasNoData = $elems.where({
            data: {
                key: "foo",
                exists: false
            }
        });

        assert.equal($hasData.html(), "Item 1");
        assert.equal($hasNoData.html(), "Item 2");

    });


}(jQuery));