sf.newNode = function(node) {
	return node ? document.createElement(node) : false;
}

sf.cloneNode = function (node) {
	var node = node.length ? node[0] : node;
	return node ? node.cloneNode(true) : false;
}

sf.addNode = function(node, parent) {
	var node = node.length ? node[0] : node;
	var parent = parent ? (parent.length ? parent[0] : parent) : document.body;
	node ? parent.appendChild(node) : false;
}

sf.addNodeBefore = function(node, beforeNode) {
	var node = node.length ? node[0] : node;
	var beforeNode = beforeNode.length ? beforeNode[0] : beforeNode;
	node && beforeNode ? beforeNode.parentNode.insertBefore(node, beforeNode) : false;
}

sf.rmNode = function(node) {
	var node = node.length ? node[0] : node;
	node ? node.parentNode.removeChild(node) : false;
}

sf.getNodeInfo = function(node) {
	var node = node.length ? node[0] : node;
	return node ? node.getBoundingClientRect() : false;
}
