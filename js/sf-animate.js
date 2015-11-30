sf.animate = (function(){
	var animate = function(struct){
		var start = performance.now();
		requestAnimationFrame(function req(time) {

			// timeFraction от 0 до 1
			var timeFraction = (time - start) / struct.duration;
			(timeFraction > 1) && (timeFraction = 1);

			// текущее состояние анимации
			var progress = struct.timing(timeFraction)

			struct.draw((progress * 100));

			(timeFraction < 1) && requestAnimationFrame(req);

		});
	}

	animate.linear = function(struct){
		struct.timing = function(timeFraction){return timeFraction;}
		this(struct);
	}

	animate.cubic = function(struct, coords){
		var coords = coords ? coords : [0.65,0.05,0.36,1];
		var p1 = [0,0];
		var p2 = [coords[0],coords[1]];
		var p3 = [coords[2],coords[3]];
		var p4 = [1,1];

		struct.timing = function(timeFraction){
			var x = (Math.pow((1-timeFraction),3)*p1[0]) + (3*Math.pow((1-timeFraction),2)*timeFraction*p2[0]);
			x = x + (3*(1-timeFraction)*Math.pow(timeFraction,2)*p3[0]) + (Math.pow(timeFraction,3)*p4[0]);
			var y= (Math.pow((1-timeFraction),3)*p1[1]) + (3*Math.pow((1-timeFraction),2)*timeFraction*p2[1]);
			y = y + (3*(1-timeFraction)*Math.pow(timeFraction,2)*p3[1]) + (Math.pow(timeFraction,3)*p4[1]);
			return y;
		}
		this(struct);
	}

	return animate;
})();
