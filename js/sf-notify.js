
sf.notify = function(text, type){

	self = this.notify;
	self.init();
	self.push(text, type);
	self.pop();

}

sf.notify.queue = [];

sf.notify.init = function(){

	sf.requireCss('css/sf.css');

	var node = sf('body>#sf-notifys')[0];
	if(!node){
		node = sf.newNode('div');
		node.id = 'sf-notifys';
	}

	sf.addNode(node);
	this.container = node;

}

sf.notify.push = function(text, type){

	this.queue.push({
		text: text,
		type: type ? type : ''
	});

}

sf.notify.pop = function(count){

var count = count ? count : this.queue.length;
	while(count-- && this.queue.length){
		this.show(this.queue.shift());
	}

}

sf.notify.show = function(notify){

	var type = notify.type;
	var text = notify.text ? '<div class="text">' + notify.text + '</div>' : '';
	notify = sf.newNode('div');
	notify.className = 'sf-notify ' + type;
	notify.innerHTML = text;
	sf.addNode(notify, this.container);
	var timeOut;
	notify.onclick = function(){
		clearTimeout(timeOut);
		sf.rmNode(notify);
	};
	timeOut = setTimeout(function(){
		setTimeout(function(){ sf.rmNode(notify); }, 300);
	}, 5000);

}
