var sf = (function(){

	// Methods

	var actions = function(nodeList){
		this.test = function(){
			sortOut(this,function(el){
				console.log(el);
			});
		}

		this.css = {}

	}

	// Setters and Getters

	var mixins = function(obj){

		// inner

		def.get(obj, 'inner' ,function(){
			var self = this;
			return this.length == 1 ? this[0].innerHTML : (function(){
				var inner = [];
				sortOut(self, function(el){
					inner.push(el.innerHTML);
				});
				return inner.reverse();
			})();
		});

		def.set(obj, 'inner', function(str){
			sortOut(this, function(el){
				el.innerHTML = str;
			});
		});

		// class

		def.get(obj, 'class', function(){
			var self = this;
			return this.length == 1 ? this[0].className : (function(){
				var cls = [];
				sortOut(self, function(el){
					cls.push(el.className);
				});
				return cls.reverse();
			})();
		});
		
		def.set(obj, 'class', function(str){
			sortOut(this, function(el){
				el.setAttribute('class',str);
			});
		});

		// css

		def.set(obj, 'css', function(props){
			var propsStr = '';
			for(key in props)propsStr+=(key+':'+props[key]+';');
			sortOut(this, function(el){
				el.style.cssText = propsStr;
			});
		});

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
								return tmp;
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

	var sf = function(argument, callback){
		var Objects = document.querySelectorAll(argument);
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
