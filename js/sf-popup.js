sf.popup = function(data, srcLoader){

	sf.popup.open(srcLoader);
	sf.popup.insert(data);

}

sf.popup.open = function(srcLoader){

	sf.requireCss('/css/sf.css');
	this.close();

	var self = sf;
	var style = srcLoader ? 'style="background-image: url(' + srcLoader + ');"' : '';
	var popupWindow = self.newNode('div');

	popupWindow.id = 'sf-popupContainer';
	popupWindow.innerHTML = '<div id="sf-popupLine"' + style + '></div><div id="sf-popupContent"></div>';

	popupWindow.onclick = function (event) {
		var event = event ? event : window.event;
		if(event.target.id == popupWindow.id) this.close();
	};

	self.addNode(popupWindow);

}

sf.popup.insert = function(data){

	var self = sf;
	sf('#sf-popupContent').inner = data ? data : '';

}

sf.popup.close = function(){

	var self = sf;
	if(self('#sf-popupContainer')[0]) self.rmNode(self('#sf-popupContainer'));

}

