#include <iostream>
#include <map>
#include <set>
#include <vector>
#include <tuple>

using std::pair;
using std::vector;
using std::map;
using std::set;
using std::cout;
using std::endl;
using std::make_pair;

struct solver {
	int sudoku[9][9] = {};
	vector<vector<pair<int, int>>> cages {
		{{0, 0}, {1, 0}},
		{{2, 0}, {3, 0}},
		{{4, 0}, {3, 1}, {4, 1}},
		{{5, 0}, {6, 0}, {5, 1}},
		{{7, 0}, {6, 1}, {7, 1}, {6, 2}},
		{{8, 0}, {8, 1}, {8, 2}},
		{{0, 1}, {0, 2}, {0, 3}},
		{{1, 1}, {2, 1}, {1, 2}, {2, 2}, {1, 3}},
		{{3, 2}, {4, 2}, {5, 2}},
		{{7, 2}, {6, 3}, {7, 3}},
		{{8, 3}, {7, 4}, {8, 4}},
		{{0, 4}, {1, 4}, {2, 4}, {0, 5}},
		{{6, 4}, {6, 5}, {7, 5}},
		{{8, 5}, {8, 6}},
		{{0, 6}, {0, 7}},
		{{1, 6}, {2, 6}},
		{{3, 6}, {4, 6}, {3, 7}, {4, 7}},
		{{5, 6}, {5, 7}, {5, 8}},
		{{6, 6}, {6, 7}},
		{{1, 7}, {2, 7}},
		{{6, 7}, {7, 7}, {8, 7}},
		{{0, 8}, {1, 8}, {2, 8}},
		{{3, 8}, {4, 8}},
		{{6, 8}, {7, 8}, {8, 8}}
	};

	map<pair<int, int>, vector<pair<int, int>>> locToCage;

	solver() {
		for(auto cage : cages)
			for(auto loc : cage)
				locToCage[loc] = cage;
	}

	set<int> squares {1, 4, 9, 16, 25, 36, 49, 64};

	bool check_row(int y) {
		set<int> seen;
		for(int x = 0; x < 9; ++x) {
			int v = sudoku[x][y];
			if(v != 0) {
				if(seen.contains(v))
					return false;
				seen.insert(v);
			}
		}
		return true;
	}

	bool check_col(int x) {
		set<int> seen;
		for(int y = 0; y < 9; ++y) {
			int v = sudoku[x][y];
			if(v != 0) {
				if(seen.contains(v))
					return false;
				seen.insert(v);
			}
		}
		return true;
	}

	bool check_box(int x, int y) {
		x -= x % 3;
		y -= y % 3;
		set<int> seen;
		for(int i = x; i <= x + 2; ++i)
			for(int j = y; j <= y + 2; ++j) {
				int v = sudoku[i][j];
				if(v != 0) {
					if(seen.contains(v))
						return false;
					seen.insert(v);
				}
			}
		return true;
	}

	bool check_cage(pair<int, int> loc) {
		auto it = locToCage.find(loc);
		if(it == locToCage.end())
			return true;
		auto cage = (*it).second;
		int sum = 0;
		for(auto l : cage) {
			int v = sudoku[l.first][l.second];
			if(v == 0)
				return true;
			sum += v;
		}
		return squares.contains(sum);
	}

	bool fill(int x, int y) {
		for(int v = 1; v <= 9; ++v) {
			sudoku[x][y] = v;
			if(check_row(y) && check_col(x) && check_box(x, y) &&
					check_cage(make_pair(x, y))) {
				if(x == 8 && y == 8)
					return true;

				auto next = x == 8 ? make_pair(0, y + 1) : make_pair(x + 1, y);
				if(fill(next.first, next.second))
					return true;
			}
		}
		sudoku[x][y] = 0;
		return false;
	}

	bool solve() {
		return fill(0, 0);
	}

	void print() {
		for(int y = 0; y < 9; ++y) {
			for(int x = 0; x < 9; ++x)
				cout << sudoku[x][y];
			cout << endl;
		}
	}
};


int main() {
	solver s;
	s.solve();
	s.print();
}
