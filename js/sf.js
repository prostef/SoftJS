var sf = new function () {

	// operations
	this.css = function (stl, val) {
		var self = this;
		return typeof(val) != 'undefined' ? setCss(stl, val, self) : getCss(stl, self);
		function setCss (stl, val, self) {
			sortOut(self, function (obj) {
				obj.style[stl] = val;
			});
		}
		function getCss (stl, self) {
			css = [];
			css.push(sortOut(self, function (obj) {
				return obj.style[stl];
			}));
			return css.join(', ');
		}
	}
	this.txt = function (val) {
		var self = this;
		return typeof(val) != 'undefined' ? setTxt(val, self) : getTxt(self);
		function setTxt (val) {
			sortOut(self, function (obj) {
				obj.innerHTML = val;
			});
		}
		function getTxt () {
			txt = [];
			txt.push(sortOut(self, function (obj) {
				return obj.innerHTML;
			}));
			return txt.join(', ');
		}
	}
	this.class = function (val) {
		var self = this;
		return typeof(val) != 'undefined' ? setClass(val, self) : getClass(self);
		function setClass (val) {
			sortOut(self, function (obj) {
				obj.className = val;
			});
		}
		function getClass () {
			cls = [];
			cls.push(sortOut(self, function (obj) {
				return obj.className;
			}));
			return cls.join(', ');
		}
	}
	this.attr = function (at, val) {
		var self = this;
		return typeof(val) != 'undefined' ? setAttr(at, val, self) : getAttr(at, self);
		function setAttr (at, val, self) {
			sortOut(self, function (obj) {
				obj.setAttribute(at, val);
			});
		}
		function getAttr (at, self) {
			attr = [];
			attr.push(sortOut(self, function (obj) {
				return obj.getAttribute(at);
			}));
			return attr.join(', ');
		}
	}
	this.addAttr = function (at, val) {
		sortOut(this, function (obj) {
			var v = obj.getAttribute(at) || val;
			obj.setAttribute(at, v.match(val) ? v : v + ' ' + val);
		});
	}
	this.rmAttr = function (at, val) {
		sortOut(this, function (obj) {
			var v = (obj.getAttribute(at) || val).replace(val, '').replace(/(^\s+|\s+$)/, '');
			v ? obj.setAttribute(at, v) : obj.removeAttribute(at);
		});
	}
	this.addEv = function (ev, func, capt) {
		sortOut(this, function (obj) {
			obj.addEventListener(ev, func, capt);
		});
		return saveEv(ev, func, this.selector);
	}
	this.rmEv = function (ev, func, capt) {
		sortOut(this, function (obj) {
			obj.removeEventListener(ev, func, capt);
		});
	}
	this.rm = function (){
		sortOut(this, function (obj) {
			obj.parentNode.removeChild(obj);
		});
	}

	// vars
	var sortOut = function (object, callback) {
		tmp = [];
		var i = object.length;
		while (i--) tmp.push(callback(object[i]));
		return tmp.reverse();
	}
	var saveEv = function (ev, func, selector) {
		var ev = selector + ':' + ev;
		self.events = self.events ? self.events : {};
		self.events[ev] = self.events[ev] ? self.events[ev] : [];
		self.events[ev].push(func);
		return func;
	}
	var sf = function (self) {
		return function (argument, callback) {
			var obj = document.querySelectorAll(argument);
			obj.selector = argument;
			for (prop in self) obj[prop] = self[prop];
			callback && sortOut(obj, callback);
			return obj;
		}
	}(this);

	// sf methods
	sf.ajax = function (dst, fd, callback, fallback) {
		if (typeof(dst) != 'string') return false;
		if (typeof(fd) == 'string' && (fd = this('#' + fd))) fd = new FormData(fd);
		if (typeof(fd) != 'object') return false;
		if ((fd.constructor.name && fd.constructor.name != 'FormData') && fd.constructor != FormData) fd = new FormData(fd);
		var req = new XMLHttpRequest();
		if (req.readyState == 4 || req.readyState == 0) {
			req.open('POST', dst, true);
			req.onreadystatechange = function (req) {
				return function () {
					if (req.readyState == 4) {
						if (req.status == 200 && typeof(callback) == 'function') callback(req);
						else if (typeof(fallback) == 'function') fallback(req);
					}
				}
			}(req);
			req.send(fd);
		}
		else if (typeof(fallback) == 'function') fallback(req);
	}
	sf.newElem = function (node) {
		return node ? document.createElement(node) : false;
	}
	sf.addElem = function (child, parent) {
		parent = parent ? parent : document.body;
		child ? parent.appendChild(child) : false;
	}
	sf.rmElem = function (child) {
		child ? child.parentNode.removeChild(child) : false;
	}
	sf.addCssFile = function (path) {
		var style = this.newElem('link');
		style.setAttribute('rel', 'stylesheet');
		style.setAttribute('type', 'text/css');
		style.setAttribute('href', path);
		this('head > link[href="' + path + '"]')[0] ? false : this.addElem(style, document.head);
	}
	sf.alert = function (contentText, titleText, titleColor, fontFamily) {
		self = this;
		var titleText = titleText ? titleText : 'Уведомление';
		var titleColor = titleColor ? titleColor : '#000';
		self.addCssFile('css/sf.css');
		self('#sf-Alert')[0] ? [clearTimeout(self.timeOut), self.rmElem(self('#sf-Alert')[0])] : '';
		contentText ? [
			mainWindow = self.newElem('div'),
			mainWindow.id = 'sf-Alert',
			mainWindow.style['font-family'] = fontFamily ? fontFamily : '',
			mainWindow.onclick = function () {
				clearTimeout(self.timeOut);
				self.rmElem(self('#sf-Alert')[0]);
			},
			mainWindow.innerHTML = '<h1 id="sf-Alert-Title" style="color: ' + titleColor + ';">' + titleText + '</h1><div id="sf-Alert-Content">' + contentText + '</div>',
			self.addElem(mainWindow),
			self('#sf-Alert').css('opacity', '0.9'),
			self.timeOut = setTimeout(
				function () {
					self('#sf-Alert').css('opacity', '0');
					setTimeout(function () {self.rmElem(mainWindow);}, 300);
				},
				5000
			)
		] : false;
	}
	sf.animateNumber = function  (number, cssPath, time, stringEnd) {
		self = this;
		self.timeOut ? clearTimeout(self.timeOut) : '';
		self.interaval ? clearInterval(self.interaval) : '';
		number && cssPath ? [
			time = time ? time : 700,
			stringEnd = stringEnd ? stringEnd : '',
			str_number = number.toString(),
			self.interaval = setInterval(function () {
				var arr = [];
				for (var i = 0; i < str_number.length; i ++) {
					arr[i] = (Math.floor((Math.random() * 10))).toString();
				}
				self(cssPath).txt(arr.join('') + stringEnd);
			}, 20),
			self.timeOut = setTimeout(function () {
				clearInterval(self.interaval);
				self(cssPath).txt(str_number + stringEnd);
			}, time)
		] : '';
	}
	sf.zoomImg = function (src, srcLoader) {
		self = this;
		self.addCssFile('css/sf.css');
		self('#sf-popupContainer')[0] ? self.rmElem(self('#sf-popupContainer')[0]) : '';
		src ? [
			popupWindow = self.newElem('div'),
			style = srcLoader ? 'style="background-image: url(' + srcLoader + ');"' : '',
			popupWindow.id = 'sf-popupContainer',
			popupWindow.innerHTML = '<div id="sf-popupLine" ' + style + '></div><div id="sf-popupContent"><img id="sf-popupImg" src=""></div>',
			popupWindow.onclick = function (event) {
				var event = event ? event : window.event;
				event.target.id == popupWindow.id ? self.rmElem(popupWindow) : '';
			},
			self.addElem(popupWindow),
			setTimeout(function () {
				self('#sf-popupImg').attr('src', src);
			}, 100)
		] : '';
	}
	return sf;
}
