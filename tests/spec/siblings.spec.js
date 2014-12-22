(function ($) {

    "use strict";

    QUnit.module("siblings");
    QUnit.test("should accept number or function", function (assert) {
        var $elem = $("<ul>");

        var elemHTML = "<li>1</li><li>2</li><li>3</li>" +
            "<li>a</li><li>b</li><li>c</li>";

        $elem.html(elemHTML);

        $elem.where({
            siblings: 1
        });

        assert.ok(true, "siblings accepts number");

        $elem.where({
            siblings: function () {

            }
        });

        assert.ok(true, "siblings accepts function");

    });

    QUnit.test("should count siblings if number is given", function (assert) {

        var $elem1 = $("<ul>");
        $elem1.html("<li>1</li><li>2</li><li>3</li>" +
            "<li>a</li><li>b</li><li>c</li>");

        var $elem2 = $("<ul>");
        $elem2.html("<li>1</li><li>2</li>" +
            "<li>a</li><li>b</li>");

        var $elems = $([$elem1.find("li").eq(0), $elem2.find("li").eq(0)]);

        var $items = $elems.where({
            siblings: 3
        });

        assert.equal($items.length, 1);

    });

    QUnit.test("should evaluate function if function is given", function (assert) {

        var $elem1 = $("<ul>");
        $elem1.html("<li>1</li><li>2</li><li>3</li>" +
            "<li>a</li><li>b</li><li>c</li>");

        var $elem2 = $("<ul>");
        $elem2.html("<li>1</li><li>2</li>" +
            "<li>a</li><li>b</li>");

        var $elems = $([$elem1.find("li").eq(0), $elem2.find("li").eq(0)]);

        var $items = $elems.where({
            siblings: function (siblings) {
                return siblings.where({
                    text: "c"
                }).length === 1;
            }
        });

        assert.equal($items.length, 1);

    });
}(jQuery));