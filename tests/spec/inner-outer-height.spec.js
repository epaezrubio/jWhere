(function ($) {

    "use strict";

    QUnit.module("innerHeight");
    QUnit.test("should accept number or function", function (assert) {
        var $elem = $("<div>");

        $elem.where({
            innerHeight: 100
        });

        assert.ok(true, "innerHeight accepts number");

        $elem.where({
            innerHeight: function (innerHeight) {
                return true;
            }
        });

        assert.ok(true, "innerHeight accepts function");

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
                innerHeight: 200
            }),
            $noresult = $elems.where({
                innerHeight: 201
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
                innerHeight: function(innerHeight) {
                    return innerHeight > 1;
                }
            }),
            $someresults = $elems.where({
                innerHeight: function(innerHeight) {
                    return innerHeight >= 1;
                }
            }),
            $empty = $elems.where({
                innerHeight: function(innerHeight) {
                    return innerHeight === 20;
                }
            });

        assert.equal($item.length, 1);
        assert.equal($someresults.length, 2);
        assert.equal($empty.length, 0);

    });


    QUnit.module("outerHeight");
    QUnit.test("should accept number or function", function (assert) {
        var $elem = $("<div>");

        $elem.where({
            outerHeight: 100
        });

        assert.ok(true, "outerHeight accepts number");

        $elem.where({
            outerHeight: function (outerHeight) {
                return true;
            }
        });

        assert.ok(true, "outerHeight accepts function");

    });

    QUnit.test("should should filter by value if number is given", function (assert) {

        var html = "" +
            "<ul>" +
            "<li>Item</li>" +
            "<li style='height: 200px; padding: 10px'>Something else</li>" +
            "<li>Item</li>" +
            "<li></li>" +
            "</ul>";

        var $elems = $("<div>").html(html).find("li"),
            $items = $elems.where({
                outerHeight: 220
            }),
            $noresult = $elems.where({
                outerHeight: 201
            });

        assert.equal($items.length, 1);
        assert.equal($noresult.length, 0);

    });

    QUnit.test("should evaluate function if function is given", function (assert) {

        var html = "" +
            "<ul>" +
            "<li style='height: 1px; padding: 10px'>Item 1</li>" +
            "<li style='height: 200px'>Something else</li>" +
            "<li>Item 2</li>" +
            "<li></li>" +
            "</ul>";

        var $elems = $("<div>").html(html).find("li"),
            $item = $elems.where({
                outerHeight: function(outerHeight) {
                    return outerHeight > 21;
                }
            }),
            $someresults = $elems.where({
                outerHeight: function(outerHeight) {
                    return outerHeight >= 21;
                }
            }),
            $empty = $elems.where({
                outerHeight: function(outerHeight) {
                    return outerHeight === 20;
                }
            });

        assert.equal($item.length, 1);
        assert.equal($someresults.length, 2);
        assert.equal($empty.length, 0);

    });

}(jQuery));