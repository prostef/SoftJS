var sf = (function(){
	
	// Methods

	var actions=function(nodeList){
		this.test = function(){
			sortOut(this,function(el){
				console.log(el);
			});
		}
	}

	// Setters and Getters

	var mixins=function(obj){
		def.get(obj,'inner',function(){
			var inner=[];
			sortOut(this,function(el){
				inner.push(el.innerHTML);
			});
			return inner.reverse().join(', ');
		});

		def.set(obj,'inner',function(str){
			sortOut(this,function(el){
				el.innerHTML=str;
			});
		});

		return obj;
	}

	// Private functions

	var def={
		get:function(obj,prop,func){
			Object.defineProperty(obj,prop,{
				get:func,
				configurable: true,
			});
		},
		set:function(obj,prop,func){
			Object.defineProperty(obj,prop,{
				set:func,
				configurable: true,
			});
		},
	}

	var sortOut = function (object, callback) {
		tmp = [];
		var i = object.length;
		while (i--) tmp.push(callback(object[i]));
		return tmp.reverse();
	}

	// General object and methods

	var sf=function(argument){
		var Objects=document.querySelectorAll(argument);
		actions.prototype=Objects;
		return mixins(new actions);
	}



	return sf;
})()
