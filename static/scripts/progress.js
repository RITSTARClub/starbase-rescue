(function () {
	var MAX_SECONDS = 10;//2700;
	
	var interval,
		progressBar,
		message;
	
	window.addEventListener('load', function () {
		progressBar = document.getElementById('progressBar');
		message = document.getElementById('message');
		
		progressBar.max = MAX_SECONDS;
		progressBar.value = 0;
		
		GAME.onstatechange = function (state) {
			if (state === GAME.STATE_IDLE || state === GAME.STATE_VICTORY) {
				if (interval) {
					clearInterval(interval);
					interval = undefined;
				}
			} else if (state === GAME.STATE_FIRST) {
				startClock();
			}
		};
	}, false);
	
	function startClock() {
		interval = setInterval(function () {
			var seconds = ((new Date()).getTime() / 1000) - GAME.startTime;
			progressBar.value = seconds;
			if (MAX_SECONDS - seconds < 120) {
				message.style.color = 'red';
				progressBar.style.backgroundColor = 'red';
			}
		}, 1000);
	}
})();
