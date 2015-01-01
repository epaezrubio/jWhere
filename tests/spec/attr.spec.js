(function ($) {

    "use strict";

    QUnit.module("attr");
    QUnit.test("should accept key/value, key/regex key/function, key/boolean", function (assert) {
        var $elem = $("<div>");

        $elem.where({
            attr: {
                key: "foo",
                value: "var"
            }
        });

        assert.ok(true, "attr accepts key/value");

        $elem.where({
            attr: {
                key: "foo",
                value: new RegExp("\\w+")
            }
        });

        assert.ok(true, "attr accepts key/regexp");

        $elem.where({
            attr: {
                key: "foo",
                value: function (value) {
                    return true;
                }
            }
        });

        assert.ok(true, "attr accepts key/function");

        $elem.where({
            attr: {
                key: "foo",
                value: true
            }
        });

        assert.ok(true, "attr accepts key/boolean");

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

        $elems.eq(0).attr("foo", "bar");
        $elems.eq(2).attr("foo", "foo");

        var $items = $elems.where({
            attr: {
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

        $elems.eq(0).attr("foo", "bar");
        $elems.eq(1).attr("foo", "bars");
        $elems.eq(2).attr("foo", "foo");

        var $items = $elems.where({
            attr: {
                key: "foo",
                value: new RegExp("ba\\w{1,2}")
            }
        });

        assert.equal($items.length, 2);

    });

    QUnit.test("should evaluate definition if boolean is given", function (assert) {

        var html = "" +
            "<div>" +
            "<a href=''>Item 1</a>" +
            "<a>Item 2</a>" +
            "</div>";

        var $elems = $("<div>").html(html).find("a");

        var $hasAttr = $elems.where({
            attr: {
                key: "href",
                exists: true
            }
        }), $hasNoAttr = $elems.where({
            attr: {
                key: "href",
                exists: false
            }
        });

        assert.equal($hasAttr.html(), "Item 1");
        assert.equal($hasNoAttr.html(), "Item 2");

    });

}(jQuery));