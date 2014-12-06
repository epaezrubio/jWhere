(function ($) {

    "use strict";

    QUnit.module("height");
    QUnit.test("should accept number or function", function (assert) {
        var $elem = $("<div>");

        $elem.where({
            height: 100
        });

        assert.ok(true, "height accepts number");

        $elem.where({
            height: function (height) {
                return true;
            }
        });

        assert.ok(true, "height accepts function");

    });

    QUnit.test("should should filter by value if number is given", function (assert) {

        var html = "" +
            "<ul>" +
            "<li>Item</li>" +
            "<li style='height: 200px'>Something else</li>" +
            "<li>Item</li>" +
            "<li></li>" +
            "</ul>";

        var $elems = $("<div>").html(html).find("li"),
            $items = $elems.where({
                height: 200
            }),
            $noresult = $elems.where({
                height: 201
            });

        assert.equal($items.length, 1);
        assert.equal($noresult.length, 0);

    });

    QUnit.test("should evaluate function if function is given", function (assert) {

        var html = "" +
            "<ul>" +
            "<li style='height: 1px'>Item 1</li>" +
            "<li style='height: 200px'>Something else</li>" +
            "<li>Item 2</li>" +
            "<li></li>" +
            "</ul>";

        var $elems = $("<div>").html(html).find("li"),
            $item = $elems.where({
                height: function(height) {
                    return height > 1;
                }
            }),
            $someresults = $elems.where({
                height: function(height) {
                    return height >= 1;
                }
            }),
            $empty = $elems.where({
                height: function(height) {
                    return height === 20;
                }
            });

        assert.equal($item.length, 1);
        assert.equal($someresults.length, 2);
        assert.equal($empty.length, 0);

    });

}(jQuery));