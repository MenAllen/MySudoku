import { gridImport, gridChoose, createElement } from "./scriptImport.js";

// Vérifier les valeurs du tableau sur click
const controlValues = () => {
	let sudoku = [];

	const addError = (line, col) => {
		const cel = "cel" + "-" + line + "-" + col;
		document.getElementById(cel).classList.add("invalide");
		document.addEventListener(
			"input",
			() => {
				document.getElementById(cel).classList.remove("invalide");
			},
			{ once: true }
		);
	};

	const checkValues = () => {
		// Récupérer toutes les valeurs du tableau
		const inputList = document.querySelectorAll("input");

		// Rénitialiser les états invalides
		for (const input of inputList) {
			input.classList.remove("invalide");
		}

		// Vérifier que chaque valeur est valide
		for (const input of inputList) {
			const valid = input.checkValidity();
			if (!valid) {
				return;
			}
		}
	};

	// Construire le tableau sudoku avec les valeurs rentrées
	const getValues = () => {
		for (let line = 0; line < 9; line++) {
			let sudokuLine = [];
			for (let col = 0; col < 9; col++) {
				const ident = "cel" + "-" + line + "-" + col;
				const input = document.getElementById(ident);
				const number = input.value === "" ? "" : parseInt(input.value, 10);
				sudokuLine.push(number);
			}
			sudoku.push(sudokuLine);
		}
	};

	// Vérifier qu'il n'y a pas de doublons dans les lignes
	const checkLines = () => {
		// Parcourir les lignes
		for (let line = 0; line < 9; line++) {
			const list = new Set();
			for (let col = 0; col < 9; col++) {
				// si l'element est vide, on ne fait rien
				if (sudoku[line][col] !== "") {
					// si l'element n'est pas déjà dans la liste, on l'ajoute
					if (!list.has(sudoku[line][col])) {
						list.add(sudoku[line][col]);
					} else {
						// sinon on ajouter une classe d'erreur pour indiquer le doublon
						addError(line, col);
					}
				}
			}
		}
	};

	// Vérifier qu'il n'y a pas de doublons dans les colonnes
	const checkCol = () => {
		// Parcourir les colonnes
		for (let col = 0; col < 9; col++) {
			const list = new Set();
			for (let line = 0; line < 9; line++) {
				// si l'element est vide, on ne fait rien
				if (sudoku[line][col] !== "") {
					// si l'element n'est pas déjà dans la liste, on l'ajoute
					if (!list.has(sudoku[line][col])) {
						list.add(sudoku[line][col]);
					} else {
						// sinon on ajoute une classe d'erreur pour indiquer le doublon
						addError(line, col);
					}
				}
			}
		}
	};

	// Vérifier qu'il n'y a pas de doublons dans chaque carré
	const checkSquare = () => {
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

				if (sudoku[line][col] !== "") {
					// si l'element n'est pas déjà dans la liste, on l'ajoute
					if (!list.has(sudoku[line][col])) {
						list.add(sudoku[line][col]);
					} else {
						// sinon on ajoute une classe d'erreur pour indiquer le doublon
						addError(line, col);
					}
				}
			}
		}
	};

	// ================================= Main ========================================

	checkValues();
	getValues();
	checkLines();
	checkCol();
	checkSquare();
};

// Recupérer les boutons verifier et choisir
const buttonCheck = document.getElementById("check-button");
buttonCheck.addEventListener("click", controlValues);

const buttonChoose = document.getElementById("choose-button");
buttonChoose.addEventListener("click", gridChoose);

const buttonImport = document.getElementById("import-button");
buttonImport.addEventListener("click", gridImport);
