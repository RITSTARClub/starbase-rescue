(function () {
	var grid,
		gridTable,
		outputs,
		outputTable;
	
	window.addEventListener('load', function () {
		gridTable = document.getElementById('gameGrid');
		outputTable = document.getElementById('outputGrid');
		
		reset();
	}, false);
	
	function reset() {
		grid = [];
		gridTable.innerHTML = '';
		outputs = [];
		outputTable.innerHTML = '';
		
		for (var r = 0; r < 5; r++) {
			var newRow = document.createElement('tr');
			grid[r] = [];
			
			for (var c = 0; c < 5; c++) {
				var newCell = document.createElement('td');
				(function (currentR, currentC) {
					newCell.onclick = function () {
						toggleFrom(currentR, currentC);
					};
				})(r, c);
				
				if ((r >= 1 && r <= 3 && c === 2) ||
						(r === 2 && c >= 1 && c <= 3)) {
					newCell.classList.add('filled');
					grid[r][c] = {
						enabled: true,
						elem: newCell
					};
				} else {
					grid[r][c] = {
						enabled: false,
						elem: newCell
					};
				}
				
				newRow.appendChild(newCell);
			}
			
			gridTable.appendChild(newRow);
		}
		
		for (var r = 0; r < 5; r++) {
			var newRow = document.createElement('tr'),
				arrowCell = document.createElement('td'),
				outputCell = document.createElement('td');
			
			arrowCell.innerHTML = '&#x21d2;';
			outputCell.innerHTML = 0;
			outputs[r] = {
				value: 0,
				row: newRow,
				cell: outputCell
			};
			
			newRow.appendChild(arrowCell);
			newRow.appendChild(outputCell);
			outputTable.appendChild(newRow);
		}
		
		updateTotals();
	}
	
	function toggleFrom(tapR, tapC) {
		for (var r = tapR - 1; r <= tapR + 1; r++) {
			if (r < 0 || r >= 5) {
				continue;
			}
			for (var c = tapC - 1; c <= tapC + 1; c++) {
				if (c < 0 || c >= 5) {
					continue;
				}
				if ((r >= tapR - 1 && r <= tapR + 1 && c === tapC) ||
						(r === tapR && c >= tapC - 1 && c <= tapC + 1)) {
					toggleCell(r, c);
				}
			}
		}
		updateTotals();
	}
	
	function toggleCell(r, c) {
		grid[r][c].elem.classList.toggle('filled');
		grid[r][c].enabled = !grid[r][c].enabled;
	}
	
	function updateTotals() {
		for (var r = 0; r < 5; r++) {
			var newValue = 0;
			for (var c = 0; c < 5; c++) {
				if (grid[r][c].enabled) {
					newValue++;
				}
			}
			
			// Highlight the output number if the row is full.
			outputs[r].row.className = (newValue === 5 ? 'complete' : '');
			
			outputs[r].cell.innerHTML =
				outputs[r].value = newValue;
		}
		
		checkCompletion();
	}
	
	function checkCompletion() {
		for (var n = 0; n < 5; n++) {
			console.log(outputs[n].value);
			if (outputs[n].value !== 5) {
				return false;
			}
		}
		
		console.log('\n---\n');
		document.body.classList.add('unlocked');
		for (var r = 0; r < 5; r++) {
			for (var c = 0; c < 5; c++) {
				delete grid[r][c].elem.onclick;
				console.log('Removed event listener.');
			}
		}
		return true;
	}
})();
