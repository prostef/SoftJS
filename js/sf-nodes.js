sf.newNode = function(node) {
	return node ? document.createElement(node) : false;
}

sf.cloneNode = function (node) {
	return node ? node.cloneNode(true) : false;
}

sf.addNode = function(node, parent) {
	parent = parent ? parent : document.body;
	node ? parent.appendChild(node) : false;
}

sf.addNodeBefore = function(node, beforeNode) {
	node && beforeNode ? beforeNode.parentNode.insertBefore(node, beforeNode) : false;
}

sf.rmNode = function(node) {
	node ? node.parentNode.removeChild(node) : false;
}

sf.getNodeInfo = function(node) {
	return node ? node.getBoundingClientRect() : false;
}
