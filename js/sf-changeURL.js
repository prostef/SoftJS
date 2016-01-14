sf.changeURL = function (url) {
	history.pushState(null, null, url);
	history.replaceState(null, null, url);
}
