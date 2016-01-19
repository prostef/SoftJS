
sf.notify = function(text, type){

	self = this.notify;
	var queue = Array.isArray(text) ? text : [ { text: text, type: type } ];
	self.init();
	for(var i = 0 ; i != queue.length ; i++)
		self.push(queue[i].text, queue[i].type);
	self.shift();

}

sf.notify.queue = [];
sf.notify.delay= 1500;
sf.notify.max = 5;

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

sf.notify.shift = function(){

	var notifys = sf('.sf-notify', this.container);
	var count = - (notifys.length - this.max);

	while(count-- && this.queue.length){
		this.show(this.queue.shift());
	}

	return ;
}

sf.notify.show = function(notify){

	var type = notify.type;
	var text = notify.text ? '<div class="text">' + notify.text + '</div>' : '';

	notify = sf.newNode('div');
	notify.className = 'sf-notify ' + type;
	notify.innerHTML = text;

	var notifys = sf('.sf-notify', this.container);
	var delay = this.delay * (notifys.length + 1);

	if(notifys.length){
		sf.addNodeBefore(notify, notifys[0]);
	}
	else sf.addNode(notify, this.container);

	var timeOut;

	notify.onclick = function(){
		clearTimeout(timeOut);
		sf.rmNode(notify);
		sf.notify.shift();
	};

	timeOut = setTimeout(function(){
		sf.rmNode(notify);
		sf.notify.shift();
	}, delay);

}
