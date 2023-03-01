import SudokuCase from "./sudokuCase.js";
import SudokuCursor from "./sudokuCursor.js";

export default class Sudoku {
	constructor(grille) {
		this.grid = [];
		this.events = new Map();

		for (let line = 0; line < 9; line++) {
			let gridLine = [];
			for (let col = 0; col < 9; col++) {
				const value = grille[line][col];
				const cell = new SudokuCase();

				if (value !== "") {
					cell.defineInitialValue(value);
				}
				gridLine.push(cell);
			}
			this.grid.push(gridLine);
		}
	}

	async resolve() {
		// Instancier le cursor
		const cursor = new SudokuCursor();

		// Effectuer les recherches tant que pas bloqué
		do {
			const cell = this.grid[cursor.line][cursor.col];
			console.log("cell:", cell);

			if (cell.isInitialValue) {
				// Ne rien faire
			} else {
				let continueSearch = true;

				while (continueSearch) {
					// Récupérer la prochaine valeur à tester
					const value = cell.nextValue();
					console.log("value:", value);
					// Lancer l'évènement valeur pour afficher
					const callback = this.events.get("value");
					if (callback != null) {
						callback(cursor.line, cursor.col, value);
					}

					if (value != null) {
						// Tester le sudoku
						if (this.isValid()) {
							console.log("isvalid is true");
							continueSearch = false;
							cursor.marche = "avant";
						} else {
							// Si le sudoku comporte une erreur, continuer les recherches
							console.log("isvalid is false");
						}
					} else {
						// S'il n'y a plus de possibilités
						continueSearch = false;
						cursor.marche = "arriere";
						cell.initializeValues();
					}
				}
			}

			// Délai d'attente
			await new Promise((resolve) => setTimeout(resolve, 2));
		} while (cursor.progress());
	}

	// Retourne si oui ou non le sudoku est valide, i.e. il ne contient pas d'erreurs
	isValid() {
		// Vérifier qu'il n'y a pas de doublons dans les lignes
		console.log("this.grid :", this.grid);
		// Parcourir les lignes
		for (let line = 0; line < 9; line++) {
			const list = new Set();
			for (let col = 0; col < 9; col++) {
				// si l'element est vide, on ne fait rien
				const sudokuCase = this.grid[line][col];
				const value = sudokuCase.value;
				//console.log('sudokuCase.value: ', value)
				if (value == null) {
					// Si la valeur est vide, ne rien faire
				} else {
          const valueExists = list.has(value)
					// si l'element n'est pas déjà dans la liste, on l'ajoute
          if (valueExists) {
            console.log('Erreur doublon ligne' + line + '-' + col)
            return false
          } else {
						list.add(value);
          }
				}
			}
		}

		// Vérifier qu'il n'y a pas de doublons dans les colonnes
		// Parcourir les colonnes
		for (let col = 0; col < 9; col++) {
			const list = new Set();
			for (let line = 0; line < 9; line++) {
				// si l'element est vide, on ne fait rien
				const sudokuCase = this.grid[line][col];
				const value = sudokuCase.value;

				if (value == null) {
					// Si la valeur est vide, ne rien faire
				} else {
          const valueExists = list.has(value)
					// si l'element n'est pas déjà dans la liste, on l'ajoute
          if (valueExists) {
            console.log('Erreur doublon colonne' + line + '-' + col)
            return false
          } else {
						list.add(value);
          }
				}
			}
		}

		// Vérifier qu'il n'y a pas de doublons dnas chaque carré
		const carres = [
			[
				[0, 0],
				[0, 1],
				[0, 2],
				[1, 0],
				[1, 1],
				[1, 2],
				[2, 0],
				[2, 1],
				[2, 2],
			],
			[
				[0, 3],
				[0, 4],
				[0, 5],
				[1, 3],
				[1, 4],
				[1, 5],
				[2, 3],
				[2, 4],
				[2, 5],
			],
			[
				[0, 6],
				[0, 7],
				[0, 8],
				[1, 6],
				[1, 7],
				[1, 8],
				[2, 6],
				[2, 7],
				[2, 8],
			],
			[
				[3, 0],
				[3, 1],
				[3, 2],
				[4, 0],
				[4, 1],
				[4, 2],
				[5, 0],
				[5, 1],
				[5, 2],
			],
			[
				[3, 3],
				[3, 4],
				[3, 5],
				[4, 3],
				[4, 4],
				[4, 5],
				[5, 3],
				[5, 4],
				[5, 5],
			],
			[
				[3, 6],
				[3, 7],
				[3, 8],
				[4, 6],
				[4, 7],
				[4, 8],
				[5, 6],
				[5, 7],
				[5, 8],
			],
			[
				[6, 0],
				[6, 1],
				[6, 2],
				[7, 0],
				[7, 1],
				[7, 2],
				[8, 0],
				[8, 1],
				[8, 2],
			],
			[
				[6, 3],
				[6, 4],
				[6, 5],
				[7, 3],
				[7, 4],
				[7, 5],
				[8, 3],
				[8, 4],
				[8, 5],
			],
			[
				[6, 6],
				[6, 7],
				[6, 8],
				[7, 6],
				[7, 7],
				[7, 8],
				[8, 6],
				[8, 7],
				[8, 8],
			],
		];

		// Parcourir les éléments du carré
		for (const carre of carres) {
			const list = new Set();

			// Pour chaque carre
			for (const element of carre) {
				const line = element[0];
				const col = element[1];

				const sudokuCase = this.grid[line][col];
				const value = sudokuCase.value;

				if (value == null) {
					// Si la valeur est vide, ne rien faire
				} else {
          const valueExists = list.has(value)
					// si l'element n'est pas déjà dans la liste, on l'ajoute
          if (valueExists) {
            console.log('Erreur doublon carré' + line + '-' + col)
            return false
          } else {
						list.add(value);
          }
				}
			}
		}

		return true;
	}

	addEvent(name, callback) {
		this.events.set(name, callback);
	}
}
