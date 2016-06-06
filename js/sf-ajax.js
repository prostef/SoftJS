sf.ajax = (function(){

	var ajax = function(data){

		data.dst = (data.dst && typeof(data.dst) == 'string') ? data.dst : window.location.href;
		data.callback = (data.callback && typeof(data.callback) == 'function') ? data.callback : function(){};
		data.fallback = (data.fallback && typeof(data.fallback) == 'function') ? data.fallback : function(){};
		data.method = (data.method && typeof(data.method) == 'string') ? data.method : 'POST';
		data.headers = (data.headers && typeof(data.headers) == 'object') ? data.headers : {};
		data.context = (data.context && typeof(data.context) == 'object') ? data.context : {};

		var req = new XMLHttpRequest();

		return (req.readyState == 4 || req.readyState == 0) ? (function(){

			req.open(data.method, data.dst, true);

			req.onreadystatechange = function(){

				req.readyState == 4 && (function(){
					req.status == 200
					? data.callback.apply(data.context, [req])
					: data.fallback.apply(data.context, [req]);
				})();

			};

			for(h in data.headers) req.setRequestHeader(h, data.headers[h]);
			req.setRequestHeader('X-REQUESTED-WITH', 'XMLHttpRequest');
			return req;

		})() : (data.fallback ? data.fallback(req) : false);

	}

	ajax.json = function(dst, body, callback, fallback, context){

		var body = (body && typeof(body)=='object') ? body: {};

		var data = {
			dst: dst,
			callback: callback,
			fallback: fallback,
			context: context,
			headers: {'Content-type': 'application/json'}
		}

		var req = this(data);
		req && req.send(JSON.stringify(body));
	}

	return ajax;

})();
