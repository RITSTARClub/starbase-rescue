(function () {
	var AUDIO_DIR = '/static/audio/',
		interval,
		finalStartTime,
		tracks = {};
	
	window.addEventListener('load', function () {
		// Load all the A.I.M.Y. audio files.
		preloadAudio();
		
		GAME.addStateListener(handleStateChange);
		handleStateChange(GAME.currentState);
	}, false);
	
	function preloadAudio() {
		[
			'puzzle_first00',
			'puzzle_first05',
			'puzzle_first15',
			'puzzle_first20',
			'puzzle_first30',
			'puzzle_final00',
			'puzzle_final05',
			'puzzle_final10',
			'puzzle_failure',
			'puzzle_victory'
		].forEach(function (fileName) {
			var newAudio = new Audio();
			newAudio.src = AUDIO_DIR + fileName + '.mp3';
			tracks[fileName] = newAudio;
		});
	}
	
	function handleStateChange(state) {
		if (state === GAME.STATE_IDLE || state === GAME.STATE_FAILURE || state === GAME.STATE_VICTORY) {
			if (interval) {
				clearInterval(interval);
				interval = undefined;
			}
		}
		
		switch (state) {
			case GAME.STATE_FIRST:
				tracks.puzzle_first00.play();
				interval = setInterval(tick, 1000);
				break;
			case GAME.STATE_FINAL:
				tracks.puzzle_final00.play();
				finalStartTime = (new Date()).getTime() / 1000;
				break;
			case GAME.STATE_FAILURE:
				tracks.puzzle_failure.play();
				break;
			case GAME.STATE_VICTORY:
				tracks.puzzle_victory.play();
				setTimeout(function () {
					document.getElementById('bsod').style.display = 'block';
				}, 8000);
				break;
		}
	}
	
	function tick() {
		if (GAME.currentState === GAME.STATE_FIRST) {
			var seconds = Math.floor(((new Date()).getTime() / 1000) - GAME.startTime);
			switch (seconds) {
				case (5 * 60):
					tracks.puzzle_first05.play();
					break;
				case (/*15*/10 * 60):
					tracks.puzzle_first15.play();
					break;
				case (/*20*/15 * 60):
					tracks.puzzle_first20.play();
					break;
				case (/*30*/20 * 60):
					tracks.puzzle_first30.play();
					break;
			}
		} else if (GAME.currentState === GAME.STATE_FINAL) {
			var seconds = Math.floor(((new Date()).getTime() / 1000) - finalStartTime);
			switch (seconds) {
				case (5 * 60):
					tracks.puzzle_final05.play();
					break;
				case (10 * 60):
					tracks.puzzle_final10.play();
					break;
			}
		}
	}
	
})();
