sf.require('js/sf-nodes.js');
sf.requireCss('css/sf.css');
sf.alert = function(contentText, titleText, titleColor, fontFamily) {
	self = this;
	var timeOut;
	var titleColor = titleColor ? titleColor : '#3B414F';
	var titleText = titleText ? '<h1 class="sf-Alert-Title" style="color: ' + titleColor + ';">' + titleText + '</h1>' : '';
	var contentText = contentText ? '<div class="sf-Alert-Content">' + contentText + '</div>' : '';
	var fontFamily = fontFamily ? fontFamily : '';

	var mainWindow = self('#sf-Alerts')[0];
	!mainWindow && function(){
		mainWindow = self.newNode('div');
		mainWindow.id = 'sf-Alerts';
		self.addNode(mainWindow);
	}();

	var item = self.newNode('div');
	item.className = 'sf-Alert';
	item.onclick = function () {
		clearTimeout(timeOut);
		self.rmNode(item);
	};
	item.style.fontFamily = fontFamily;
	item.style.opacity='0.97';
	item.innerHTML = titleText+contentText;
	self.addNode(item,mainWindow);
	timeOut = setTimeout(
		function () {
			item.style.opacity='0';
			setTimeout(function () {self.rmNode(item);}, 300);
		},
		5000
	);
}
