(function () {
	var SOLUTIONS = [
		'ONE',
		'TWO',
		'THREE'
	];
	
	var keys,
		passFields,
		focusedField;
	
	window.addEventListener('load', function () {
		initPassFields();
		initKeys();
	}, false);
	
	function initPassFields() {
		passFields = Array.prototype.slice.call(document.getElementsByClassName('passField'));
		for (var i = 0; i < passFields.length; i++) {
			passFields[i].onfocus = function () {
				focusedField = this;
			};
		}
		
		passFields[0].focus();
		focusedField = passFields[0];
	}
	
	function initKeys() {
		var LETTERS = ('QWERTYUIOP ASDFGHJKL< ZXCVBNM>'.split(' ').map(line => line.split(''))),
			keyContainer = document.getElementById('keyboard');
		
		for (var r = 0; r < LETTERS.length; r++) {
			for (var c = 0; c < LETTERS[r].length; c++) {
				var newKey = document.createElement('button');
				
				if (LETTERS[r][c] === '<') {
					newKey.innerHTML = '&#x232b;';
					newKey.onclick = backspace;
				} else if (LETTERS[r][c] === '>') {
					newKey.innerHTML = '&nbsp;ENTER &#x21e8;';
					newKey.onclick = checkAnswer;
				} else {
					newKey.innerHTML = LETTERS[r][c];
					(function (letter) {
						newKey.onclick = function () {
							typeKey(letter);
						};
					})(LETTERS[r][c]);
				}
				
				keyContainer.appendChild(newKey);
			}
			keyContainer.appendChild(document.createElement('br'));
		}
	}
	
	function typeKey(letter) {
		focusedField.value += letter;
		focusedField.focus();
	}
	
	function backspace() {
		focusedField.value = focusedField.value.substring(0, focusedField.value.length - 1);
		focusedField.focus();
	}
	
	function checkAnswer() {
		var unlockedCount = 0;
		for (var i = 0; i < passFields.length; i++) {
			if (passFields[i].value === SOLUTIONS[i]) {
				passFields[i].classList.add('unlocked');
				unlockedCount++;
			} else {
				passFields[i].classList.remove('unlocked');
			}
		}
		
		if (unlockedCount === 3) {
			document.body.classList.add('unlocked');
			GAME.pushState(GAME.TRACK_AIMY, GAME.STATE_VICTORY);
			setTimeout(function () {
				document.getElementById('bsod').style.display = 'block';
			}, 1500);
		}
	}
})();
