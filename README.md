# SoftJS
**Script like jQ**

## How to use?

**Including SoftJS:**
```html
<script src="js/min/sf.js"></script>
```

**Using:**
`sf(some selector or node)` - returns an object with nodes found with the specified selector and with the desired properties for further work.

Example:
```javascript
  sf('body > *')
```
Result: Object { 0: `<div.form>`, 1: `<some-node>`, 2: `<some-node>`, ..., length: n}


