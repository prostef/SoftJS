var sf = (function() {

	// core
	var sf = function(selector, parent) {
		Methods.prototype = Array.prototype;
		var tmp = inherit(new Methods);
		var object = addMagic(tmp);
		var parent = parent ? (parent.length ? parent[0] : parent) : document;
		var nodesArray = [].slice.call( typeof(selector) != 'string' ? [ selector ] : parent.querySelectorAll(selector) );

		for (var i = 0; i != nodesArray.length; i++) {
			object.push(nodesArray[i]);
		}

		return object;
	}

	var inherit = function(proto) {
		var nullF = function() {};
		nullF.prototype = proto;
		var object = new nullF;
		return object;
	}

	var sortOut = function(object, callback) {
		var i = object.length;
		while (i--) { callback.apply(object[i], [ object[i] ]); }
	}

	sf.ready = function(callback, context) {
		var context = (context && typeof(context) == 'object') ? context : window;
		(document.readyState == 'complete') ? callback.apply(context) : sf(document).addEv('readystatechange', function() {
			(document.readyState == 'complete') && callback.apply(context);
		});
	}

	sf.requireCss = function(path) {

		var self = this;
		var path = Array.isArray(path) ? path : [path];

		sortOut(path, function(path) {
			var node = self.newNode('link');

			self(node).attr('rel', 'stylesheet');
			self(node).attr('type', 'text/css');
			self(node).attr('href', path);
			!self('head > link[href="' + path + '"]').length && self.addNode(node, document.head);
		});

	}

	sf.requireJs = function(path) {

		var self = this;
		var path = Array.isArray(path) ? path : [path];

		sortOut(path, function(path) {
			var node = self.newNode('script');

			self(node).attr('src', path);
			!self('body > script[src="' + path + '"]').length && self.addNode(node);
		});

	}

	sf.destroyCss = function(path) {

		var self = this;
		var path = Array.isArray(path) ? path : [path];

		sortOut(path, function(path) {
			var node = self('head > link[href="' + path + '"]');

			node.length && self.rmNode(node);
		});
		
	}

	// magic
	var magic = {
		get: function(object, prop, func) {
			Object.defineProperty(object, prop, {
				get: func,
				configurable: true
			});
		},
		set: function(object, prop, func) {
			Object.defineProperty(object, prop, {
				set: func,
				configurable: true
			});
		}
	}

	var addMagic = function(object) {

		// inner
		magic.get(object, 'inner' , object.getInner);
		magic.set(object, 'inner', object.setInner);

		// class
		magic.get(object, 'class', object.getClass);
		magic.set(object, 'class', object.setClass);

		// style
		magic.get(object, 'style', object.getStyle);
		magic.set(object, 'style', object.setStyle);

		return object;
	}

	// methods
	var Methods = function() {

		// inner magic
		this.getInner = function() {
			var self = this;
			return (this.length == 1) ? this[0].innerHTML : (function() {
				var inner = [];
				sortOut(self, function(el) {
					inner.push(el.innerHTML);
				});
				return inner.reverse();
			})();
		}

		this.setInner = function(str) {
			sortOut(this, function(el) {
				el.innerHTML = str;
			});
		}

		// class magic
		this.getClass = function() {
			var self = this;
			return (this.length == 1) ? this[0].className : (function() {
				var cls = [];
				sortOut(self, function(el) {
					cls.push(el.className);
				});
				return cls.reverse();
			})();
		}

		this.setClass = function(str) {
			sortOut(this, function(el) {
				el.setAttribute('class', str);
			});
		}

		// style magic
		this.getStyle = function() {
			var self = this;
			return (this.length == 1) ? (function(){
				var arr = self[0].style.cssText.split(';');
				arr.pop();
				return arr;
			})() : (function() {
				var style = [];
				sortOut(self, function(el) {
					style.push(el.style.cssText);
				});
				return style.reverse();
			})();
		}

		this.setStyle = function(props) {
			var propsStr = '';
			for (key in props) propsStr += (key + ':' + props[key] + ';');
			sortOut(this, function(el) {
				el.style.cssText = propsStr;
			});
		}

		// css
		this.css = function(at, val) {
			return typeof(val) != 'undefined' ? this.setCss(at, val) : this.getCss(at);
		}

		this.getCss = function(at) {
			var self = this;
			return (this.length == 1) ? this[0].style[at] : (function() {
				var inner = [];
				sortOut(self, function(el) {
					inner.push(el.style[at]);
				});
				return inner.reverse();
			})();
		}

		this.setCss = function(at, val) {
			sortOut(this, function(el) {
				el.style[at] = val;
			});
		}

		// attr
		this.attr = function(at, val) {
			return typeof(val) != 'undefined' ? this.setAttr(at, val) : this.getAttr(at);
		}

		this.setAttr = function(at, val) {
			sortOut(this, function(el) {
				el.setAttribute(at, val);
			});
		}

		this.getAttr = function(at) {
			var self = this;
			return (this.length == 1) ? this[0].getAttribute(at) : (function() {
				var attr = [];
				sortOut(self, function(el) {
					attr.push(el.getAttribute(at));
				});
				return attr.reverse();
			})();
		}

		this.addAttr = function(at, val) {
			sortOut(this, function (obj) {
				var v = obj.getAttribute(at) || val;
				obj.setAttribute(at, v.match(val) ? v : v + ' ' + val);
			});
		}

		this.rmAttr = function(at, val) {
			sortOut(this, function (obj) {
				var v = (obj.getAttribute(at) || val).replace(val, '').replace(/(^\s+|\s+$)/, '');
				v ? obj.setAttribute(at, v) : obj.removeAttribute(at);
			});
		}

		// events
		this.addEv = function(ev, func, capt) {
			sortOut(this, function(obj) {
				var capt = capt ? capt : false;
				obj.addEventListener(ev, func, capt);
			});
			return func;
		}

		this.rmEv = function(ev, func, capt) {
			sortOut(this, function (obj) {
				var capt = capt ? capt : false;
				obj.removeEventListener(ev, func, capt);
			});
		}

		// other
		this.parent = function() {
			return sf(this[0].parentNode);
		}

		this.children = function() {
			return sf(this.stringNode() + ' > *');
		}

		this.index = function() {
			return this.parent().children().indexOf(this[0]);
		}

		this.next = function() {
			return this[0].nextElementSibling ? sf(this[0].nextElementSibling) : this.first();
		}

		this.prev = function() {
			return this[0].previousElementSibling ? sf(this[0].previousElementSibling) : this.last();
		}

		this.first = function() {
			return sf(this.parent()[0].firstElementChild);
		}

		this.last = function() {
			return sf(this.parent()[this.length - 1].lastElementChild);
		}

		this.stringNode = function() {
			var node = this[0].nodeName.toLowerCase();
			if (this[0].id) {
				node += '#' + this[0].id;
			} else if (this[0].className) {
				node += '.' + this[0].className.split(' ').join('.');
			}
			return node;
		}

		this.cssPath = function() {
			var path = this.stringNode() + ' ';
			var parent = this.parent();
			while (true) {
				if (!parent.stringNode() || parent.stringNode() == '#document') break;
				path += parent.stringNode() != 'html' ? parent.stringNode() + ' ' : parent.stringNode();
				parent = parent.parent();
			}
			return path = path.split(' ').reverse().join(' > ');
		}

		this.each = function(callback) { sortOut(this, callback); }
	}

	return sf;

})();
