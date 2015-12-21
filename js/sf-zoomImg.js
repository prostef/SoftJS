sf.zoomImg = function(src, srcLoader) {
	sf.requireCss('css/sf.css');
	self = this;
	self('#sf-popupContainer')[0] ? self.rmNode(self('#sf-popupContainer')[0]) : '';
	src && (function(){
		popupWindow = self.newNode('div');
		style = srcLoader ? 'style="background-image: url(' + srcLoader + ');"' : '';
		popupWindow.id = 'sf-popupContainer';
		popupWindow.innerHTML = '<div id="sf-popupLine" ' + style + '></div><div id="sf-popupContent"><img id="sf-popupImg" src=""></div>';
		popupWindow.onclick = function (event) {
			var event = event ? event : window.event;
			event.target.id == popupWindow.id ? self.rmNode(popupWindow) : '';
		};
		self.addNode(popupWindow);
		setTimeout(function () {
			self('#sf-popupImg').attr('src', src);
		}, 100);
	})();
}
