sf.ready(function(){

	sf(window).addEv('popstate', sf.popstate);

});

sf.popstate = function(){ window.location.reload(); }

sf.changeURL = function (url) {
	history.pushState(null, null, url);
	history.replaceState(null, null, url);
}
