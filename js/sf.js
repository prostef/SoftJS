var sf = (function() {

	var Actions = function() {

		// inner magic
		this.getInner = function() {
			var self = this;
			return this.length == 1 ? this[0].innerHTML : (function() {
				var inner = [];
				sortOut(self, function(el) {
					inner.push(el.innerHTML);
				});
				return inner.reverse();
			})();
		}

		this.setInner = function(str) {
			sortOut(this, function(el){
				el.innerHTML = str;
			});
		}

		// class magic
		this.getClass = function() {
			var self = this;
			return this.length == 1 ? this[0].className : (function() {
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
			return this.length == 1 ? (function(){
				var arr = self[0].style.cssText.split(';');
				return arr.slice(0, arr.length - 1);
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
			return this.length == 1 ? this[0].style[at] : (function() {
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
			return this.length == 1 ? this[0].getAttribute(at) : (function() {
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

		this.node = function() {
			var node = this[0].nodeName.toLowerCase();
			if (this[0].id) {
				node += '#' + this[0].id;
			} else if (this[0].className) {
				node += '.' + this[0].className.split(' ').join('.');
			}
			return node;
		}

		this.cssPath = function() {
			var path = this.node() + ' ';
			var parent = this.parent();
			while (true) {
				if (!parent.node() || parent.node() == '#document') break;
				path += parent.node() != 'html' ? parent.node() + ' ' : parent.node();
				parent = parent.parent();
			}
			return path = path.split(' ').reverse().join(' > ');
		}

	};

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
	};

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
	};

	// core
	var sortOut = function(object, callback) {
		var i = object.length;
		while (i--) callback(object[i]);
	};

	var inherit = function(proto) {
		var nullF = function() {};
		nullF.prototype = proto;
		var object = new nullF;
		return object;
	};

	var sf = function(selector, parent) {
		Actions.prototype = Array.prototype;
		var object = addMagic(inherit(new Actions));
		var parent = parent ? parent : document;
		var nodeArray = [].slice.call(typeof(selector) != 'string' ? [selector] : parent.querySelectorAll(selector));

		for (var i = 0; i != nodeArray.length; i++) {
			object.push(nodeArray[i]);
		}

		return object;
	};

	sf.ready = function(callback) {
		sf(document).addEv('readystatechange', function() {
			(document.readyState == 'complete') && callback();
		});
	}

	// incudes
	sf.require = function(path) {
		var node = document.createElement('script');
		this(node).attr('type', 'text/javascript');
		this(node).attr('src', path);
		this('script[src="' + path + '"]')[0] ? false : document.body.appendChild(node);
	}

	sf.requireCss = function(path) {
		var node = document.createElement('link');
		this(node).attr('rel', 'stylesheet');
		this(node).attr('type', 'text/css');
		this(node).attr('href', path);
		this('head > link[href="' + path + '"]')[0] ? false : document.head.appendChild(node);
	}

	return sf;
})();
