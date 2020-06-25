"use strict";

let boxes = [
	new Set([[0, 0], [1, 0]]),
	new Set([[2, 0], [3, 0]]),
	new Set([[4, 0], [3, 1], [3, 2]]),
	new Set([[5, 0], [6, 0], [5, 1]]),
	new Set([[7, 0], [6, 1], [7, 1], [6, 2]]),
	new Set([[8, 0], [8, 1], [8, 2]]),
	new Set([[0, 1], [0, 2], [0, 3]]),
	new Set([[1, 1], [2, 1], [1, 2], [2, 2], [1, 3]]),
	new Set([[3, 2], [4, 2], [5, 2]]),
	new Set([[7, 2], [6, 3], [7, 3]]),
	new Set([[8, 3], [7, 4], [8, 4]]),
	new Set([[0, 4], [1, 4], [2, 4], [0, 5]]),
	new Set([[6, 4], [6, 5], [7, 5]]),
	new Set([[8, 5], [8, 6]]),
	new Set([[0, 6], [0, 7]]),
	new Set([[1, 6], [2, 6]]),
	new Set([[3, 6], [4, 6], [3, 7], [4, 7]]),
	new Set([[5, 6], [5, 7], [5, 8]]),
	new Set([[6, 6], [6, 7]]),
	new Set([[0, 7], [1, 7]]),
	new Set([[6, 7], [7, 7], [8, 7]]),
	new Set([[0, 8], [1, 8], [2, 8]]),
	new Set([[3, 8], [4, 8]]),
	new Set([[6, 8], [7, 8], [8, 8]]),
];

let locToBox = Object();

for(let box of boxes)
	for(let loc of box)
		locToBox[loc] = box;

let sudoku = [];

for(let x = 0; x < 9; ++x) {
	let col = new Array(9).fill(0);
	sudoku.push(col);
}

function check_row(y) {
	let seen = new Set();
	for(let x = 0; x < 9; ++x) {
		let v = sudoku[x][y];
		if(v != 0) {
			if(seen.has(v))
				return false;
			seen.add(v);
		}
	}
	return true;
}

function check_col(x) {
	let seen = new Set();
	for(let y = 0; y < 9; ++y) {
		let v = sudoku[x][y];
		if(v != 0) {
			if(seen.has(v))
				return false;
			seen.add(v);
		}
	}
	return true;
}

function check_box(loc) {
	return true;
}

function fill(x, y) {
	for(let v = 1; v <= 9; ++v) {
		sudoku[x][y] = v;
		if(check_row(y) && check_col(x) && check_box([x, y])) {
			if(x == 8 && y == 8)
				return true;
			
			let next = x == 8 ? [0, y + 1] : [x + 1, y];
			if(fill(next[0], next[1]))
				return true;
		}
	}
	sudoku[x][y] = 0;
	return false;
}

fill(0, 0);

for(let y = 0; y < 9; ++y) {
	for(let x = 0; x < 9; ++x)
		process.stdout.write(sudoku[x][y].toString());
	console.log();
}
