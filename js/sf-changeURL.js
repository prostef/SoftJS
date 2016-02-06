sf(window).addEv('load', function(){

	setTimeout(function(){

		sf(window).addEv('popstate', sf.popstate);

	}, 0);

});

sf.popstate = function(){ window.location.reload(); }

sf.changeURL = function (url) {
	history.pushState(null, null, url);
	history.replaceState(null, null, url);
}
