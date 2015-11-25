sf.changeURL = function (url) {
	var reg = /\/?\?(.*)$/;
	(matches = url.match(reg)) && matches[1] ? (function(){
		history.pushState(null, null, '?' + matches[1]);
		history.replaceState(null, null, '?' + matches[1]);
	})() : '';
}
