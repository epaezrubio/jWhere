(function ($) {

    "use strict";

    QUnit.module("innerWidth");
    QUnit.test("should accept number or function", function (assert) {
        var $elem = $("<div>");

        $elem.where({
            innerWidth: 100
        });

        assert.ok(true, "innerWidth accepts number");

        $elem.where({
            innerWidth: function (innerWidth) {
                return true;
            }
        });

        assert.ok(true, "innerWidth accepts function");

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
                innerWidth: 200
            }),
            $noresult = $elems.where({
                innerWidth: 201
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
                innerWidth: function(innerWidth) {
                    return innerWidth > 1;
                }
            }),
            $someresults = $elems.where({
                innerWidth: function(innerWidth) {
                    return innerWidth >= 1;
                }
            }),
            $empty = $elems.where({
                innerWidth: function(innerWidth) {
                    return innerWidth === 20;
                }
            });

        assert.equal($item.length, 1);
        assert.equal($someresults.length, 2);
        assert.equal($empty.length, 0);

    });


    QUnit.module("outerWidth");
    QUnit.test("should accept number or function", function (assert) {
        var $elem = $("<div>");

        $elem.where({
            outerWidth: 100
        });

        assert.ok(true, "outerWidth accepts number");

        $elem.where({
            outerWidth: function (outerWidth) {
                return true;
            }
        });

        assert.ok(true, "outerWidth accepts function");

    });

    QUnit.test("should should filter by value if number is given", function (assert) {

        var html = "" +
            "<ul>" +
            "<li>Item</li>" +
            "<li style='width: 200px; padding: 10px'>Something else</li>" +
            "<li>Item</li>" +
            "<li></li>" +
            "</ul>";

        var $elems = $("<div>").html(html).find("li"),
            $items = $elems.where({
                outerWidth: 220
            }),
            $noresult = $elems.where({
                outerWidth: 201
            });

        assert.equal($items.length, 1);
        assert.equal($noresult.length, 0);

    });

    QUnit.test("should evaluate function if function is given", function (assert) {

        var html = "" +
            "<ul>" +
            "<li style='width: 1px; padding: 10px'>Item 1</li>" +
            "<li style='width: 200px'>Something else</li>" +
            "<li>Item 2</li>" +
            "<li></li>" +
            "</ul>";

        var $elems = $("<div>").html(html).find("li"),
            $item = $elems.where({
                outerWidth: function(outerWidth) {
                    return outerWidth > 21;
                }
            }),
            $someresults = $elems.where({
                outerWidth: function(outerWidth) {
                    return outerWidth >= 21;
                }
            }),
            $empty = $elems.where({
                outerWidth: function(outerWidth) {
                    return outerWidth === 20;
                }
            });

        assert.equal($item.length, 1);
        assert.equal($someresults.length, 2);
        assert.equal($empty.length, 0);

    });

}(jQuery));