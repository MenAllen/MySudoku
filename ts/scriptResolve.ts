import Sudoku from "./sudoku.js";

const buttonResolve = document.getElementById("resolve-button");

buttonResolve!.addEventListener("click", () => {
	// Suivante le texte du bouton, on lance la résolution ou on l'arrête
	console.log(buttonResolve);
	if (buttonResolve!.innerText === "Résoudre") {
		buttonResolve!.innerText = "Arrêter";

		// Tableau qui contient toutes les lignes
		let grid = [];

		// Récupérer toutes les valeurs
		for (let line = 0; line < 9; line++) {
			let gridLine = [];
			for (let col = 0; col < 9; col++) {
				const ident = `cel-${line}-${col}`;
				const inputValue = (<HTMLInputElement>document.getElementById(ident)).value;
				const number = inputValue === "" ? "" : parseInt(inputValue, 10);
				gridLine.push(number);
			}
			grid.push(gridLine);
		}

		const sudoku = new Sudoku(grid);
		sudoku.addEvent("value", (line: Number, col: Number, value: any) => {
			// récupérer et mettre à jour le champ
			(<HTMLInputElement>document.getElementById(`cel-${line}-${col}`)).value = value;
		});

		sudoku.resolve();
	} else {
		buttonResolve!.innerText = "Résoudre";
		location.reload();
	}
});

// Le bouton OK ferme la modale
const rcloseBtn = <HTMLInputElement>document.getElementsByClassName("rclose")[0];
const modalR = document.getElementById("resolveModal");

// la modale est fermée
rcloseBtn.onclick = function (event: any) {
	event.preventDefault();
	buttonResolve!.innerText = "Résoudre";
	modalR!.style.display = "none";
};
