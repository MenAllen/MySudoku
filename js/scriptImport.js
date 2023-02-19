const randomNumber = (max) => {
	return Math.trunc(Math.random() * max + 1);
};

const gridImport = async () => {
	// Récupérer les données JSON du fichier et créer un objet à partir des données JSON
	const grids = await fetch("grilles.json").then((response) => {
		if (response.ok) {
			return response.json();
		} else {
			return Promise.reject("Error reading file !");
		}
	});

	// Choisir aléatoirement une grille dans la liste
	const myGridNumber = randomNumber(grids.length);
	const sudoku = grids[myGridNumber - 1];
	const myGrid = sudoku.grille;

	// Parcourir la grille
	for (let line = 0; line < 9; line++) {
		for (let col = 0; col < 9; col++) {
			const value = myGrid[line][col];
			const ident = "cel" + "-" + line + "-" + col;
			const input = document.getElementById(ident);
			input.value = value;
			if (value != null) {
				input.readOnly = true;
			}
		}
	}
};

gridImport();
