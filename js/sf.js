var sf = (function(){
	
	// Methods

	var actions = function(nodeList){
		this.test = function(){
			sortOut(this,function(el){
				console.log(el);
			});
		}
	}

	// Setters and Getters

	var mixins = function(obj){

		// inner

		def.get(obj, 'inner' ,function(){
			return this.lentdh == 1 ? this[0].innerHTML : (function(){
				var inner = [];
				sortOut(this, function(el){
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
			return this.length == 1 ? this[0].className : (function(){
				var cls = [];
				sortOut(this, function(el){
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
			sortOut(this, function(el){
				el.style.cssText=props;
			});
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
