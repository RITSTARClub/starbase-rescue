var GAME = {
	TRACK_AIMY: 0,
	TRACK_JAR_EL: 1,
	
	STATE_IDLE: 0,
	STATE_FIRST: 1, // First room
	STATE_FINAL: 2, // Final room
	STATE_FAILURE: 3,
	STATE_VICTORY: 4,
	
	currentTrack: undefined,
	currentState: this.STATE_IDLE,
	startTime: 0,
	
	stateListeners: [],
	
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
					console.log('New state: ' + data.state);
					if (GAME.currentState === GAME.STATE_IDLE) {
						window.location.reload();
						return;
					}
					if (GAME.stateListeners.length > 0) {
						GAME.stateListeners.forEach(function (listener) {
							listener(GAME.currentState);
						});
					}
				} catch (ex) {}
			}
		};
		var socket = channel.open(handler);
	},
	
	addStateListener: function (listener) {
		this.stateListeners.push(listener);
	},
	
	pushState: function (newState) {
		var query = '/api?track=' + this.currentTrack +
				'&new_state=' + newState;
		
		var xhr = new XMLHttpRequest();
		xhr.open('GET', query, true);
		xhr.send();
	}
};
