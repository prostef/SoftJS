# SoftJS
**Script like jQuery**

## How to use?

**Including SoftJS:**
```html
<script src="js/min/sf.js"></script>
```

**Using:**

`sf(some-selector or node)` - returns an object with nodes found with the specified selector and with the desired methods for further work.
Example:

_HTML:_
```html
<div id="test">
    <div class="some-class">
        <span id="some-id">Test</span>
    </div>
    <div class="some-class-2">
        <input type="button" class="test-btn" value="Test" />
    </div>
</div>
```
_JS:_
```javascript
  sf('#test *');
```
> Result: Object { 0: `<div.some-class>`, 1: `<span#some-id>`, 2: `<div.some-class-2>`, 3: `<input.test-btn>`, length: 4 }

```javascript
  sf('#test > div');
```
> Result: Object { 0: `<div.some-class>`, 1: `<div.some-class-2>`, length: 2 }

```javascript
  sf('#some-id');
```
> Result: Object { 0: `<span#some-id>`, length: 1 }



### sf-object main-methods:

* `sf(some-selector or node).css(property[, value])` - Gets or sets value for this property for the found nodes with the specified selector.

* `sf(some-selector or node).attr(attribute[, value])` - Gets or sets value for this attribute for the found nodes with the specified selector.

* `sf(some-selector or node).addAttr(attribute, value)` - Adds value for this attribute for the found nodes with the specified selector.

* `sf(some-selector or node).rmAttr(attribute, value)` - Removes value for this attribute for the found nodes with the specified selector.

* `sf(some-selector or node).addEv(event, function[, capture])` - Sets this function on this event for the found nodes with the specified selector. Returns your function (It's necessary to remove it).

* `sf(some-selector or node).rmEv(event, function[, capture])` - Removes saved function on this event for the found nodes with the specified selector.

### sf-object magic-methods:

* `sf(some-selector or node).inner [= 'text or layout']` - Gets or sets innerHTML for the found nodes with the specified selector.

* `sf(some-selector or node).class [= 'class']` - Gets or sets className for the found nodes with the specified selector.

* `sf(some-selector or node).style [= 'css properties']` - Gets or sets style for the found nodes with the specified selector.

### sf-object other-methods:

* `sf(some-selector or node).parent()` - Returns parent node into sf object for the found first node with the specified selector.

* `sf(some-selector or node).children()` - Returns children nodes into sf object for the found first node with the specified selector.

* `sf(some-selector or node).index()` - Returns positions of index among similar nodes for the found first node with the specified selector.

* `sf(some-selector or node).next()` - Returns next node in the same scope info sf object for the found first node with the specified selector.

* `sf(some-selector or node).prev()` - Returns previous node in the same scope info sf object for the found first node with the specified selector.

* `sf(some-selector or node).first()` - Returns first node in the same scope info sf object for the found first node with the specified selector.

* `sf(some-selector or node).last()` - Returns last node in the same scope info sf object for the found first node with the specified selector.

* `sf(some-selector or node).stringNode()` - Returns css selector for the found first node with the specified selector.

* `sf(some-selector or node).cssPath()` - Returns full css path for the found first node with the specified selector.

* `sf(some-selector or node).each()` - Iterate founded nodes with the specified selector with access to each of them.

### SoftJS Methods:

* `sf.ready(function)` - Perform this function when all document will be ready.
Example:
```javascript
sf.ready(function() {
    alert('This is perform when all document will be ready');
});
```
Or:
```javascript
function testReadyAlert() {
    alert('This is perform when all document will be ready');
}
sf.ready( testReadyAlert() );
```

* `sf.requireCss(path-to-ccs-file)` - Include this css file into `<head>` block.
Example:
```javascript
sf.ready(function() {
    sf.requireCss('/css/some-style.css');
});
```
