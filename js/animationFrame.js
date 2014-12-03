var lastTimeAnimationCall = 0;
(function() {
	var lastTimeAnimation = 0;
	var vendors = [ 'ms', 'moz', 'webkit', 'o' ];
	for (var x = 0; (x < vendors.length) && !window.requestAnimationFrame; ++x) {
		window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
		window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame']
				|| window[vendors[x] + 'CancelRequestAnimationFrame'];
	}

	if (true /* !window.requestAnimationFrame */) {
		window.requestAnimationFrame = function(callback, element) {
			var currTime = new Date().getTime();
			var timeToCall = Math.max(0, 25 - (currTime - lastTimeAnimation));
			var id = window.setTimeout(function() {
				lastTimeAnimationCall = new Date().getTime();
				callback(currTime + timeToCall);
			}, timeToCall);
			lastTimeAnimation = currTime + timeToCall;
			return id;
		};
	}

	if (!window.cancelAnimationFrame) {
		window.cancelAnimationFrame = function(id) {
			window.clearTimeout(id);
		};
	}
})();
