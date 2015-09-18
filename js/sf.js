var sf = (function(){

	// Methods

	var actions = function(nodeList){

		// attr

		this.attr = function(at, val){
			return typeof(val) != 'undefined' ? this.setAttr(at, val) : this.getAttr(at);
		}

		this.setAttr = function(at, val){
			sortOut(this,function(el){
				el.setAttribute(at,val);
			});
		}

		this.getAttr = function(at){
			var self = this;
			return this.length == 1 ? this[0].getAttribute(at) : (function(){
				var attr=[];
				sortOut(self,function(el){
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

		// inner

		this.getInner = function(){
			var self = this;
			return this.length == 1 ? this[0].innerHTML : (function(){
				var inner = [];
				sortOut(self, function(el){
					inner.push(el.innerHTML);
				});
				return inner.reverse();
			})();
		}

		this.setInner = function(str){
			sortOut(this, function(el){
				el.innerHTML = str;
			});
		}

		// class

		this.getClass = function(){
			var self = this;
			return this.length == 1 ? this[0].className : (function(){
				var cls = [];
				sortOut(self, function(el){
					cls.push(el.className);
				});
				return cls.reverse();
			})();
		}

		this.setClass = function(str){
			sortOut(this, function(el){
				el.setAttribute('class',str);
			});
		}

		// css

		this.setCss = function(props){
			var propsStr = '';
			for(key in props)propsStr+=(key+':'+props[key]+';');
			sortOut(this, function(el){
				el.style.cssText = propsStr;
			});
		}

		this.getCss = function(){
			var self = this;
			var css = {};
			sortOut(self, function(el){

				for(key in el.style){
					def.get(css, key, function(key){
						return function(){
							return self.length == 1 ? self[0].style[key] : (function(){
								var tmp = [];
								sortOut(self, function(el){
									tmp.push(el.style[key]);
								});
								return tmp.reverse();
							})();
						}
					}(key));

					def.set(css, key, function(key){
						return function(val){
							sortOut(self, function(el){
								el.style[key] = val;
							});
						}
					}(key));
				}

			});
			return css;
		}

		// style

		this.getStyle = function(){
			var self = this;
			return this.length == 1 ? this[0].style.cssText : (function(){
				var style = [];
				sortOut(self, function(el){
					style.push(el.style.cssText);
				});
				return style.reverse();
			})();
		}

		// events

		this.addEv = function(ev, func, capt){
			sortOut(this, function(obj){
				obj.addEventListener(ev, func, capt);
			});
			return func;
		}

		this.rmEv = function(ev, func, capt){
			sortOut(this, function (obj){
				obj.removeEventListener(ev, func, capt);
			});
		}

	}

	// Setters and Getters

	var mixins = function(obj){

		// inner

		def.get(obj, 'inner' , obj.getInner);

		def.set(obj, 'inner', obj.setInner);

		// class

		def.get(obj, 'class', obj.getClass);

		def.set(obj, 'class', obj.setClass);

		// css

		def.set(obj, 'css', obj.setCss);

		def.get(obj, 'css', obj.getCss);

		// style

		def.get(obj, 'style', obj.getStyle);

		return obj;
	}

	// Private functions

	var def = {
		get:function(obj, prop, func){
			Object.defineProperty(obj, prop, {
				get:func,
				configurable:true,
			});
		},
		set:function(obj, prop, func){
			Object.defineProperty(obj, prop, {
				set:func,
				configurable:true,
			});
		},
	}

	var sortOut = function(object, callback) {
		var i = object.length;
		while(i--)callback(object[i]);
	}

	// General object

	var sf = function(arg, callback){
		var Objects = Array.isArray(arg) ? arg : (function(){
			return typeof(arg) != 'string' ? [arg] : document.querySelectorAll(arg);
		})();
		actions.prototype = Array.prototype.slice.call(Objects);
		callback && sortOut(Objects, callback);
		return mixins(new actions);
	}

	// General methods

	sf.ajax = function (dst, fd, callback, fallback) {
		if (typeof(dst) != 'string') return false;
		if (typeof(fd) != 'object') return false;
		if ((fd.constructor.name && fd.constructor.name != 'FormData') && fd.constructor != FormData) fd = new FormData(fd);
		var req = new XMLHttpRequest();
		if (req.readyState == 4 || req.readyState == 0) {
			req.open('POST', dst, true);
			req.onreadystatechange = function(){
				if (req.readyState == 4) {
					if (req.status == 200 && typeof(callback) == 'function') callback(req);
					else if (typeof(fallback) == 'function') fallback(req);
				}
			};
			req.send(fd);
		}
		else if (typeof(fallback) == 'function') fallback(req);
	}

	sf.changeURL = function (url) {
		var reg = /\/?\?(.*)$/;
		(matches = url.match(reg)) && matches[1] ? (function(){
			history.pushState(null, null, '?' + matches[1]);
			history.replaceState(null, null, '?' + matches[1]);
		})() : '';
	}

	sf.ajax.json = function(dst,data,callback,fallback){
		var dst = (dst && typeof(dst)=='string') ? dst : '/';
		var data = (data && typeof(data)=='object') ? data : {};
		var req = new XMLHttpRequest();
		if (req.readyState == 4 || req.readyState == 0) {
			req.open('POST', dst, true);
			req.onreadystatechange = function(){
				if (req.readyState == 4) {
					if (req.status == 200 && typeof(callback) == 'function') callback(req);
					else if (typeof(fallback) == 'function') fallback(req);
				}
			};
			req.setRequestHeader('Content-type','application/json');
			req.send(JSON.stringify(data));
		}
		else if (typeof(fallback) == 'function') fallback(req);
	}

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

	sf.addCssFile = function(path) {
		var node = this.newNode('link');
		this(node).attr('rel', 'stylesheet');
		this(node).attr('type', 'text/css');
		this(node).attr('href', path);
		this('head > link[href="' + path + '"]')[0] ? false : this.addNode(node, document.head);
	}

	sf.alert = function(contentText, titleText, titleColor, fontFamily) {
		self = this;
		self.addCssFile('css/sf.css');
		var timeOut;
		var titleColor = titleColor ? titleColor : '#3B414F';
		var titleText = titleText ? '<h1 class="sf-Alert-Title" style="color: ' + titleColor + ';">' + titleText + '</h1>' : '';
		var contentText = contentText ? '<div class="sf-Alert-Content">' + contentText + '</div>' : '';
		var fontFamily = fontFamily ? fontFamily : '';

		var mainWindow = self('#sf-Alerts')[0];
		!mainWindow && function(){
			mainWindow = self.newNode('div');
			mainWindow.id = 'sf-Alerts';
			self.addNode(mainWindow);
		}();

		var item = self.newNode('div');
		item.className = 'sf-Alert';
		item.onclick = function () {
			clearTimeout(timeOut);
			self.rmNode(item);
		};
		item.style.fontFamily = fontFamily;
		item.style.opacity='0.97';
		item.innerHTML = titleText+contentText;
		self.addNode(item,mainWindow);
		timeOut = setTimeout(
			function () {
				item.style.opacity='0';
				setTimeout(function () {self.rmNode(item);}, 300);
			},
			5000
		);
	}

	sf.zoomImg = function(src, srcLoader) {
		self = this;
		self.addCssFile('css/sf.css');
		self('#sf-popupContainer')[0] ? self.rmNode(self('#sf-popupContainer')[0]) : '';
		src && (function(){
			popupWindow = self.newNode('div');
			style = srcLoader ? 'style="background-image: url(' + srcLoader + ');"' : '';
			popupWindow.id = 'sf-popupContainer';
			popupWindow.innerHTML = '<div id="sf-popupLine" ' + style + '></div><div id="sf-popupContent"><img id="sf-popupImg" src=""></div>';
			popupWindow.onclick = function (event) {
				var event = event ? event : window.event;
				event.target.id == popupWindow.id ? self.rmNode(popupWindow) : '';
			};
			self.addNode(popupWindow);
			setTimeout(function () {
				self('#sf-popupImg').attr('src', src);
			}, 100);
		})();
	}

	sf.animate = (function(){
		var animate = function(struct){
			var start = performance.now();
			requestAnimationFrame(function req(time) {

				// timeFraction от 0 до 1
				var timeFraction = (time - start) / struct.duration;
				(timeFraction > 1) && (timeFraction = 1);

				// текущее состояние анимации
				var progress = struct.timing(timeFraction)

				struct.draw((progress * 100));

				(timeFraction < 1) && requestAnimationFrame(req);

			});
		}

		animate.linear = function(struct){
			struct.timing = function(timeFraction){return timeFraction;}
			this(struct);
		}

		animate.cubic = function(struct, coords){
			var coords = coords ? coords : [0.65,0.05,0.36,1];
			var p1 = [0,0];
			var p2 = [coords[0],coords[1]];
			var p3 = [coords[2],coords[3]];
			var p4 = [1,1];

			struct.timing = function(timeFraction){
				var x = (Math.pow((1-timeFraction),3)*p1[0]) + (3*Math.pow((1-timeFraction),2)*timeFraction*p2[0]);
				x = x + (3*(1-timeFraction)*Math.pow(timeFraction,2)*p3[0]) + (Math.pow(timeFraction,3)*p4[0]);
				var y= (Math.pow((1-timeFraction),3)*p1[1]) + (3*Math.pow((1-timeFraction),2)*timeFraction*p2[1]);
				y = y + (3*(1-timeFraction)*Math.pow(timeFraction,2)*p3[1]) + (Math.pow(timeFraction,3)*p4[1]);
				return y;
			}
			this(struct);
		}

		return animate;
	})();

	return sf;

})();
