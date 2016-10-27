var GAME = {
	TRACK_AIMY: 0,
	TRACK_JAR_EL: 1,
	
	STATE_IDLE: 0,
	STATE_FIRST: 1, // First room
	STATE_FINAL: 2, // Final room
	STATE_VICTORY: 3,
	
	currentState: this.STATE_IDLE,
	startTime: 0,
	
	initSocket: function (token) {
		var channel = new goog.appengine.Channel(token);
		var handler = {
			'onopen': function () {},
			'onerror': function() {},
			'onclose': function() {},
			'onmessage': function (message) {
				try {
					data = JSON.parse(message.data);
					GAME.startTime = data.startTime;
					GAME.currentState = data.state;
					if (GAME.currentState === GAME.STATE_IDLE) {
						window.location.reload();
						return;
					}
					if (typeof GAME.onstatechange === 'function') {
						GAME.onstatechange(GAME.currentState);
					}
				} catch (ex) {}
			}
		};
		var socket = channel.open(handler);
	},
	
	pushState: function (track, newState) {
		var query = '/api?track=' + track +
				'&new_state=' + newState;
		
		var xhr = new XMLHttpRequest();
		xhr.open('GET', query, true);
		xhr.send();
	}
};
