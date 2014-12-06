(function ($) {

    "use strict";

    QUnit.module("width");
    QUnit.test("should accept number or function", function (assert) {
        var $elem = $("<div>");

        $elem.where({
            width: 100
        });

        assert.ok(true, "width accepts number");

        $elem.where({
            width: function (width) {
                return true;
            }
        });

        assert.ok(true, "width accepts function");

    });

    QUnit.test("should should filter by value if number is given", function (assert) {

        var html = "" +
            "<ul>" +
            "<li>Item</li>" +
            "<li style='width: 200px'>Something else</li>" +
            "<li>Item</li>" +
            "<li></li>" +
            "</ul>";

        var $elems = $("<div>").html(html).find("li"),
            $items = $elems.where({
                width: 200
            }),
            $noresult = $elems.where({
                width: 201
            });

        assert.equal($items.length, 1);
        assert.equal($noresult.length, 0);

    });

    QUnit.test("should evaluate function if function is given", function (assert) {

        var html = "" +
            "<ul>" +
            "<li style='width: 1px'>Item 1</li>" +
            "<li style='width: 200px'>Something else</li>" +
            "<li>Item 2</li>" +
            "<li></li>" +
            "</ul>";

        var $elems = $("<div>").html(html).find("li"),
            $item = $elems.where({
                width: function(width) {
                    return width > 1;
                }
            }),
            $someresults = $elems.where({
                width: function(width) {
                    return width >= 1;
                }
            }),
            $empty = $elems.where({
                width: function(width) {
                    return width === 20;
                }
            });

        assert.equal($item.length, 1);
        assert.equal($someresults.length, 2);
        assert.equal($empty.length, 0);

    });

}(jQuery));