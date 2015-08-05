var sf = (function(){

	var actions=function(nodeList){
		this.test = function(){}
	}


	var sortOut = function (object, callback) {
		tmp = [];
		var i = object.length;
		while (i--) tmp.push(callback(object[i]));
		return tmp.reverse();
	}

	var sf=function(argument){
		var v=document.querySelectorAll(argument);
		actions.prototype=v;
		return new actions;
	}
	return sf;
})()
