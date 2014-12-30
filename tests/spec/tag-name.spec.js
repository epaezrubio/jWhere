(function ($) {

    "use strict";

    QUnit.module("tagName");
    QUnit.test("should accept string, regex or function", function (assert) {
        var $elem = $("<div>");

        $elem.where({
            tagName: "test"
        });

        assert.ok(true, "tagName accepts string");

        $elem.where({
            tagName: new RegExp(".*")
        });

        $elem.where({
            tagName: /.*/
        });

        assert.ok(true, "tagName accepts regex");

        $elem.where({
            tagName: function () {

            }
        });

        assert.ok(true, "tagName accepts function");

    });

    QUnit.test("should should filter by literal if string is given", function (assert) {

        var html = "" +
            "<div></div>" +
            "<span>Item</span>" +
            "<b>Something else</b>" +
            "<i>Item</i>" +
            "<span></span>";

        var $elems = $("<div>").html(html).find("*"),
            $spans = $elems.where({
                tagName: "span"
            }),
            $bs = $elems.where({
                tagName: "b"
            }),
            $uls = $elems.where({
                tagName: "ul"
            });

        assert.equal($spans.length, 2);
        assert.equal($bs.length, 1);
        assert.equal($uls.length, 0);

    });

    QUnit.test("should evaluate regex if regex is given", function (assert) {


        var html = "" +
            "<div></div>" +
            "<span>Item</span>" +
            "<b>Something else</b>" +
            "<i>Item</i>" +
            "<span></span>";

        var $elems = $("<div>").html(html).find("*"),
            $items = $elems.where({
                tagName: new RegExp(".*i.*")
            });

        assert.equal($items.length, 2);

    });

    QUnit.test("should evaluate function if function is given", function (assert) {

        var html = "" +
            "<div></div>" +
            "<span>Item</span>" +
            "<b>Something else</b>" +
            "<i>Item</i>" +
            "<span></span>";

        var $elems = $("<div>").html(html).find("*"),
            $items = $elems.where({
                tagName: function (tagName) {
                    return tagName.length > 1;
                }
            });

        assert.equal($items.length, 3);

    });

}(jQuery));