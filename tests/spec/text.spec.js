(function ($) {

    "use strict";

    QUnit.module("text");
    QUnit.test("should accept string, regex or function", function (assert) {
        var $elem = $("<div>");

        $elem.where({
            text: "test"
        });

        assert.ok(true, "text accepts string");

        $elem.where({
            text: new RegExp(".*")
        });

        $elem.where({
            text: /.*/
        });

        assert.ok(true, "text accepts regex");

        $elem.where({
            text: function () {

            }
        });

        assert.ok(true, "text accepts function");

    });

    QUnit.test("should should filter by literal if string is given", function (assert) {

        var html = "" +
            "<ul>" +
            "<li>Item</li>" +
            "<li>Something else</li>" +
            "<li>Item</li>" +
            "<li></li>" +
            "</ul>";

        var $elems = $("<div>").html(html).find("li"),
            $items = $elems.where({
                text: "Item"
            }),
            $noresult = $elems.where({
                text: "Whatever"
            }),
            $empty = $elems.where({
                text: ""
            });

        assert.equal($items.length, 2);
        assert.equal($noresult.length, 0);
        assert.equal($empty.length, 1);

    });

    QUnit.test("should evaluate regex if regex is given", function (assert) {

        var html = "" +
            "<ul>" +
            "<li>Item 1</li>" +
            "<li>Something else</li>" +
            "<li>Item 2</li>" +
            "<li></li>" +
            "</ul>";

        var $elems = $("<div>").html(html).find("li"),
            $items = $elems.where({
                text: new RegExp("Item \\d")
            }),
            $noresult = $elems.where({
                text: new RegExp(".{100}")
            }),
            $empty = $elems.where({
                text: new RegExp("$^")
            });

        assert.equal($items.length, 2);
        assert.equal($noresult.length, 0);
        assert.equal($empty.length, 1);

    });

    QUnit.test("should evaluate function if function is given", function (assert) {

        var html = "" +
            "<ul>" +
            "<li>Item 1</li>" +
            "<li>Something else</li>" +
            "<li>Item 2</li>" +
            "<li></li>" +
            "</ul>";

        var $elems = $("<div>").html(html).find("li"),
            $items = $elems.where({
                text: function(text) {
                    return text.length === 6;
                }
            }),
            $noresult = $elems.where({
                text: function(text) {
                    return text.length > 100
                }
            }),
            $empty = $elems.where({
                text: function(text) {
                    return (text.indexOf("t") === -1)
                }
            });

        assert.equal($items.length, 2);
        assert.equal($noresult.length, 0);
        assert.equal($empty.length, 1);

    });

}(jQuery));