# jWhere

jWhere is a jQuery plugin useful to avoid the tedious task of using iterators to check conditions in a given set of elements.

For example, imagine that you want to change the color of some `<li>` based on a regex matching its content. In traditional jQuery you should do something like:

```js
var elements = [];
$("li").each(function (index, element) {
    if ($(this).html().match(new RegExp("Item \\d"))) {
        elements.push(this)
    }
});
$(elements).css("color", "red");
```

What you do with jWhere:

```js
$("li").where({
    html: new RegExp("Item \\d")
}).css("color", "red");
```

