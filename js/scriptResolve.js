import Sudoku from './sudoku.js'

const buttonResolve = document.getElementById("resolve-button");

buttonResolve.addEventListener("click", () => {
	// Tableau qui contient toutes les lignes
	let grid = [];

	// Récupérer toutes les valeurs
	for (let line = 0; line < 9; line++) {
		let gridLine = [];
		for (let col = 0; col < 9; col++) {
			const ident = "cel" + "-" + line + "-" + col;
			const input = document.getElementById(ident);
			const number = input.value === "" ? "" : parseInt(input.value, 10);
			gridLine.push(number);
		}
		grid.push(gridLine);
	}

	const sudoku = new Sudoku(grid);
  sudoku.addEvent('value', (line, col, value) => {
    // récupérer et mettre à jour le champ
    const input = document.getElementById("cel" + "-" + line + "-" + col)
    input.value = value
  })
	sudoku.resolve();
  
});
