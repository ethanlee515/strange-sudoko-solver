"use strict";

let cages = [
	[[0, 0], [1, 0]],
	[[2, 0], [3, 0]],
	[[4, 0], [3, 1], [4, 1]],
	[[5, 0], [6, 0], [5, 1]],
	[[7, 0], [6, 1], [7, 1], [6, 2]],
	[[8, 0], [8, 1], [8, 2]],
	[[0, 1], [0, 2], [0, 3]],
	[[1, 1], [2, 1], [1, 2], [2, 2], [1, 3]],
	[[3, 2], [4, 2], [5, 2]],
	[[7, 2], [6, 3], [7, 3]],
	[[8, 3], [7, 4], [8, 4]],
	[[0, 4], [1, 4], [2, 4], [0, 5]],
	[[6, 4], [6, 5], [7, 5]],
	[[8, 5], [8, 6]],
	[[0, 6], [0, 7]],
	[[1, 6], [2, 6]],
	[[3, 6], [4, 6], [3, 7], [4, 7]],
	[[5, 6], [5, 7], [5, 8]],
	[[6, 6], [6, 7]],
	[[0, 7], [1, 7]],
	[[6, 7], [7, 7], [8, 7]],
	[[0, 8], [1, 8], [2, 8]],
	[[3, 8], [4, 8]],
	[[6, 8], [7, 8], [8, 8]]
];

let locToCage = new Object();

for(let cage of cages)
	for(let loc of cage) {
		locToCage[loc] = cage;
	}

let squares = new Set([1, 4, 9, 16, 25, 36, 49, 64]);

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

function check_box(x, y) {
	x -= x % 3;
	y -= y % 3;

	let seen = new Set();
	for(let i = x; i <= x + 2; ++i)
		for(let j = y; j <= y + 2; ++j) {
			let v = sudoku[i][j];
			if(v != 0) {
				if(seen.has(v))
					return false;
				seen.add(v);
			}
		}
	return true;
}

function check_cage(loc) {
	let cage = locToCage[loc];
	if(!cage)
		return true;
	let sum = 0;
	for(let l of cage) {
		let v = sudoku[l[0]][l[1]];
		if(v == 0)
			return true;
		sum += v;
	}
	return squares.has(sum);
}

function fill(x, y) {
	for(let v = 1; v <= 9; ++v) {
		sudoku[x][y] = v;
		if(check_row(y) && check_col(x) && check_box(x, y) && check_cage([x, y])) {
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
