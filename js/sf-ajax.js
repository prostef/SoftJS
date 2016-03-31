sf.ajax = (function(){

	var ajax = function(data){

		data.dst = (data.dst && typeof(data.dst) == 'string') ? data.dst : '/';
		data.callback = (data.callback && typeof(data.callback) == 'function') ? data.callback : function(){};
		data.fallback = (data.fallback && typeof(data.fallback) == 'function') ? data.fallback : function(){};
		data.method = (data.method && typeof(data.method) == 'string') ? data.method : 'POST';
		data.headers = (data.headers && typeof(data.headers) == 'object') ? data.headers : {};

		var req = new XMLHttpRequest();

		return (req.readyState == 4 || req.readyState == 0) ? (function(){

			req.open(data.method, data.dst, true);

			req.onreadystatechange = function(){

				if(req.readyState == 4) (function(){
					if(req.status == 200){ data.callback(req); }
					else data.fallback(req);
				})();

			};

			for(h in data.headers) req.setRequestHeader(h, data.headers[h]);
			req.setRequestHeader('X-REQUESTED-WITH', 'XMLHttpRequest');
			return req;

		})() : (data.fallback ? data.fallback(req) : false);

	}

	ajax.json = function(dst, body, callback, fallback){

		var body = (body && typeof(body)=='object') ? body: {};

		var data = {
			dst: dst,
			callback: callback,
			fallback: fallback,
			headers: {'Content-type': 'application/json'}
		}

		var req = this(data);
		req && req.send(JSON.stringify(body));
	}

	return ajax;

})();
