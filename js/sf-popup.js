sf.popup = function(layout, srcLoader) {
	sf.requireCss('css/sf.css');

	var self = this;
	self('#sf-popupContainer')[0] ? self.rmNode(self('#sf-popupContainer')) : '';

	var style = srcLoader ? 'style="background-image: url(' + srcLoader + ');"' : '';
	var popupWindow = self.newNode('div');

	popupWindow.id = 'sf-popupContainer';
	popupWindow.innerHTML = '<div id="sf-popupLine"' + style + '></div><div id="sf-popupContent"></div>';
	popupWindow.onclick = function (event) {
		var event = event ? event : window.event;
		event.target.id == popupWindow.id ? self.rmNode(popupWindow) : '';
	};
	self.addNode(popupWindow);
	setTimeout(function () {
		self('#sf-popupContent').inner = layout;
	}, 100);
}
