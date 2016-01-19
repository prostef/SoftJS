sf.alert = function(text, type){

	self = this.alert;
	var queue = Array.isArray(text) ? text : [ { text: text, type: type } ];
	self.init();
	for(var i = 0 ; i != queue.length ; i++)
		self.push(queue[i].text, queue[i].type);
	self.shift();

}

sf.alert.queue = [];
sf.alert.delay= 1500;
sf.alert.max = 5;

sf.alert.init = function(){

	sf.requireCss('css/sf.css');

	var node = sf('body>#sf-alerts')[0];
	if(!node){
		node = sf.newNode('div');
		node.id = 'sf-alerts';
	}

	sf.addNode(node);
	this.container = node;

}

sf.alert.push = function(text, type){

	this.queue.push({
		text: text,
		type: type ? type : ''
	});

}

sf.alert.shift = function(){

	var alerts = sf('.sf-alert', this.container);
	var count = - (alerts.length - this.max);

	while(count-- && this.queue.length){
		this.show(this.queue.shift());
	}

	return ;
}

sf.alert.show = function(alert){

	var type = alert.type;
	var text = alert.text ? '<div class="text">' + alert.text + '</div>' : '';

	alert = sf.newNode('div');
	alert.className = 'sf-alert ' + type;
	alert.innerHTML = text;

	var alerts = sf('.sf-alert', this.container);
	var delay = this.delay * (alerts.length + 1);

	if(alerts.length){
		sf.addNodeBefore(alert, alerts[0]);
	}
	else sf.addNode(alert, this.container);

	var timeOut;

	alert.onclick = function(){
		clearTimeout(timeOut);
		sf.rmNode(alert);
		sf.alert.shift();
	};

	timeOut = setTimeout(function(){
		sf.rmNode(alert);
		sf.alert.shift();
	}, delay);

}
