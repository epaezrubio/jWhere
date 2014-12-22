(function ($) {

    "use strict";

    QUnit.module("parents");
    QUnit.test("should accept number or function", function (assert) {
        var $elem = $("<ul>");

        var elemHTML = "<li>1</li><li>2</li><li>3</li>" +
            "<li>a</li><li>b</li><li>c</li>";

        $elem.html(elemHTML);

        $elem.where({
            parents: 1
        });

        assert.ok(true, "parents accepts number");

        $elem.where({
            parents: function () {

            }
        });

        assert.ok(true, "parents accepts function");

    });

    QUnit.test("should count parents if number is given", function (assert) {

        var $elem1 = $("<ul>");
        $elem1.html("<li><span>1</span></li><li>2</li><li>3</li>" +
            "<li>a</li><li>b</li><li>c</li>");

        var $elem2 = $("<ul>");
        $elem2.html("<li>1</li><li>2</li>" +
            "<li>a</li><li>b</li>");

        var $elems = $([$elem1.find("li").eq(0).find("span").eq(0), $elem2.find("li").eq(0)]);

        var $items = $elems.where({
            parents: 2
        });

        assert.equal($items.length, 1);

    });

    QUnit.test("should evaluate function if function is given", function (assert) {

        var $elem1 = $("<ul>");
        $elem1.html("<li><span>1</span></li><li>2</li><li>3</li>" +
            "<li>a</li><li>b</li><li>c</li>");

        var $elem2 = $("<ul>");
        $elem2.html("<li><span>1</span></li><li>2</li>" +
            "<li>a</li><li>b</li>");

        var $elems = $([$elem1.find("li").eq(0).find("span").eq(0), $elem2.find("li").eq(0).find("span").eq(0)]);

        var $items = $elems.where({
            parents: function (parents) {
                return parents.where({
                    children: 6
                }).length === 1;
            }
        });

        assert.equal($items.length, 1);

    });
}(jQuery));