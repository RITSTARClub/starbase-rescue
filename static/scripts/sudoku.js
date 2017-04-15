(function () {
	var SOLUTION = [
		[4,3,1, 8,7,2, 5,6,9],
		[5,8,7, 6,4,9, 2,1,3],
		[6,2,9, 3,5,1, 8,7,4],
		
		[2,4,5, 9,6,8, 7,3,1],
		[1,6,8, 7,2,3, 4,9,5],
		[9,7,3, 4,1,5, 6,2,8],
		
		[3,9,4, 2,8,6, 1,5,7],
		[7,1,6, 5,9,4, 3,8,2],
		[8,5,2, 1,3,7, 9,4,6]
	];
	var AUTOFILLED = [
		[ true,false,false,  true, true, true,  true,false,false],
		[ true,false,false,  true, true,false,  true, true, true],
		[false, true, true, false,false,false,  true,false,false],
		
		[false,false,false, false, true,false,  true, true,false],
		[ true,false, true, false,false,false,  true,false,false],
		[ true, true,false, false, true, true, false, true,false],
		
		[ true,false,false,  true,false,false,  true,false,false],
		[false,false, true,  true, true,false, false,false, true],
		[ true,false, true, false, true, true,  true, true, true]
	];
	var CODE = [
		[false,false,false, false,false,false, false,false,false],
		[false,false,false, false,false,false, false,false,false],
		[false,false,false, false,false,false, false,false,false],
		
		//[ true,false,false, false,false,false, false,false,false],
		//[false,false,false, false, true,false, false, true,false],
		//[false,false,false, false,false,false, false,false,false],
		
		[false,false,false, false, true,false,  true,false,false],
		[false,false, true, false,false,false, false,false,false],
		[false,false,false, false,false,false, false,false,false],
		
		[false,false,false, false,false,false, false,false,false],
		[false,false,false, false,false,false, false,false,false],
		[false,false,false, false,false,false, false,false,false]
	];
	
	var grid,
		gridTable,
		focusedCell;
	
	window.onload = function () {
		gridTable = document.getElementById('gameGrid');
		
		var buttonPanel = document.getElementById('buttonPanel');
		for (var n = 1; n <= 9; n++) {
			var newButton = document.createElement('button');
			newButton.innerHTML = n;
			(function (currentNum) {
				newButton.onclick = function () {
					setNumber(currentNum);
				};
			})(n);
			buttonPanel.appendChild(newButton);
			if (n % 2 === 0) {
				buttonPanel.appendChild(document.createElement('br'));
				buttonPanel.appendChild(document.createElement('br'));
			} else {
				var spaces = document.createElement('span');
				spaces.innerHTML = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
				buttonPanel.appendChild(spaces);
			}
		}
		
		var clearButton = document.createElement('button');
		clearButton.innerHTML = '&times;';
		clearButton.onclick = clearCell;
		buttonPanel.appendChild(clearButton);
		
		
		buttonPanel.appendChild(document.createElement('br'));
		buttonPanel.appendChild(document.createElement('br'));
		buttonPanel.appendChild(document.createElement('br'));
		
		var resetButton = document.createElement('button');
		resetButton.innerHTML = 'Reset';
		resetButton.style.display = 'block';
		resetButton.style.margin = '0 auto';
		resetButton.onclick = reset;
		buttonPanel.appendChild(resetButton);
		
		reset();
	};
	
	function reset() {
		gridTable.innerHTML = '';
		grid = [];
		
		for (var r = 0; r < 9; r++) {
			var newRow = document.createElement('tr');
			grid[r] = [];
			
			for (var c = 0; c < 9; c++) {
				var newCell = document.createElement('td');
				
				if (CODE[r][c]) {
					newCell.classList.add('codePiece');
				}
				
				(function (currentR, currentC) {
					newCell.onclick = function () {
						focusCell(currentR, currentC);
					};
				})(r, c);
				
				if (AUTOFILLED[r][c]) {
					newCell.classList.add('autofilled');
					newCell.innerHTML = SOLUTION[r][c];
					grid[r][c] = {
						value: SOLUTION[r][c],
						elem: newCell
					};
				} else {
					grid[r][c] = {
						value: 0,
						elem: newCell
					};
				}
				
				newRow.appendChild(newCell);
			}
			
			gridTable.appendChild(newRow);
		}
		
		focusedCell = {
			r: 4,
			c: 4
		};
		grid[4][4].elem.classList.add('focused');
	}
	
	function focusCell(r, c) {
		// Do not focus autofilled cells.
		if (AUTOFILLED[r][c]) {
			return;
		}
		
		grid[focusedCell.r][focusedCell.c].elem.classList.remove('focused');
		
		focusedCell = {
			r: r,
			c: c
		};
		
		grid[focusedCell.r][focusedCell.c].elem.classList.add('focused');
	}
	
	function setNumber(num) {
		// Do not set autofilled cells.
		if (AUTOFILLED[focusedCell.r][focusedCell.c]) {
			return;
		}
		grid[focusedCell.r][focusedCell.c].elem.innerHTML = num;
		grid[focusedCell.r][focusedCell.c].value = num;
		
		checkCompletion();
	}
	
	function clearCell() {
		// Do not clear autofilled cells.
		if (AUTOFILLED[focusedCell.r][focusedCell.c]) {
			return;
		}
		grid[focusedCell.r][focusedCell.c].elem.innerHTML = '';
		grid[focusedCell.r][focusedCell.c].value = 0;
	}
	
	function checkCompletion() {
		for (var r = 0; r < 9; r++) {
			for (var c = 0; c < 9; c++) {
				if (SOLUTION[r][c] !== grid[r][c].value) {
					return false;
				}
			}
		}
		
		document.body.classList.add('unlocked');
		
		var numberButtons = document.getElementById('buttonPanel').getElementsByTagName('button');
		for (var i = 0; i < numberButtons.length; i++) {
			numberButtons[i].disabled = true;
		}
		
		return true;
	}
})();
