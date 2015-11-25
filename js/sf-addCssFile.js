sf.addCssFile = function(path) {
	var node = this.newNode('link');
	this(node).attr('rel', 'stylesheet');
	this(node).attr('type', 'text/css');
	this(node).attr('href', path);
	this('head > link[href="' + path + '"]')[0] ? false : this.addNode(node, document.head);
}
