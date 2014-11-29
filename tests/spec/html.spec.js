(function ($) {

    "use strict";

    QUnit.module("html");
    QUnit.test("should accept string, regex or function", function (assert) {
        var $elem = $("<div>");

        $elem.where({
            html: "test"
        });

        assert.ok(true, "html accepts string");

        $elem.where({
            html: new RegExp(".*")
        });

        $elem.where({
            html: /.*/
        });

        assert.ok(true, "html accepts regex");

        $elem.where({
            html: function () {

            }
        });

        assert.ok(true, "html accepts function");

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
                html: "Item"
            }),
            $noresult = $elems.where({
                html: "Whatever"
            }),
            $empty = $elems.where({
                html: ""
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
                html: new RegExp("Item \\d")
            }),
            $noresult = $elems.where({
                html: new RegExp(".{100}")
            }),
            $empty = $elems.where({
                html: new RegExp("$^")
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
                html: function(html) {
                    return html.length === 6;
                }
            }),
            $noresult = $elems.where({
                html: function(html) {
                    return html.length > 100
                }
            }),
            $empty = $elems.where({
                html: function(html) {
                    return (html.indexOf("t") === -1)
                }
            });

        assert.equal($items.length, 2);
        assert.equal($noresult.length, 0);
        assert.equal($empty.length, 1);

    });

}(jQuery));