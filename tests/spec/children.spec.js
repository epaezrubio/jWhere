(function ($) {

    "use strict";

    QUnit.module("children");
    QUnit.test("should accept number or function", function (assert) {
        var $elem = $("<ul>");

        var elemHTML = "<li>1</li><li>2</li><li>3</li>" +
            "<li>a</li><li>b</li><li>c</li>";

        $elem.html(elemHTML);

        $elem.where({
            children: 1
        });

        assert.ok(true, "children accepts number");

        $elem.where({
            children: function () {

            }
        });

        assert.ok(true, "children accepts function");

    });

    QUnit.test("should count children if number is given", function (assert) {

        var $elem1 = $("<ul>");
        $elem1.html("<li>1</li><li>2</li><li>3</li>" +
            "<li>a</li><li>b</li><li>c</li>");

        var $elem2 = $("<ul>");
        $elem2.html("<li>1</li><li>2</li>" +
            "<li>a</li><li>b</li>");

        var $elems = $([$elem1, $elem2]);

        var $items = $elems.where({
            children: 6
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

        var $elems = $([$elem1, $elem2]);

        var $items = $elems.where({
            children: function (children) {
                return children.where({
                    text: "c"
                }).length === 1;
            }
        });

        assert.equal($items.length, 1);

    });
}(jQuery));