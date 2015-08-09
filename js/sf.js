var sf = (function(){

	// Methods

	var actions = function(nodeList){

		// attr

		this.attr=function(at, val){
			return typeof(val) != 'undefined' ? this.setAttr(at, val) : this.getAttr(at);
		}

		this.setAttr=function(at, val){
			sortOut(this,function(el){
				el.setAttribute(at,val);
			});
		}

		this.getAttr=function(at){
			var self = this;
			return this.length == 1 ? this[0].getAttribute(at) : (function(){
				var attr=[];
				sortOut(self,function(el){
					attr.push(el.getAttribute(at));
				});
				return attr.reverse();
			})();
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

		// rmNode

		this.rmNode = function (){
			sortOut(this, function (obj) {
				obj.parentNode.removeChild(obj);
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

		def.get(obj, 'css', function(){
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
		});

		// style

		def.get(obj, 'style', function(){
			var self = this;
			return this.length == 1 ? this[0].style.cssText : (function(){
				var style = [];
				sortOut(self, function(el){
					style.push(el.style.cssText);
				});
				return style.reverse();
			})();
		});
		
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

	var sortOut = function (object, callback) {
		var i = object.length;
		while(i--)callback(object[i]);
	}

	// General object

	var sf = function(arg, callback){
		var Objects = Array.isArray(arg) ? arg : (function(){
			return typeof(arg) != 'string' ? [arg] : document.querySelectorAll(arg);
		})();
		actions.prototype=Objects;
		callback && sortOut(Objects, callback);
		return mixins(new actions);
	}

	// General methods

	sf.test = function(){
		console.log(this);
	}

	return sf;
})();
