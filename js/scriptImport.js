// Récupérer les données JSON du fichier et créer un objet à partir des données JSON
export async function gridChoose() {

	let grids = [];
	let gridsInStorage = [];

	gridsInStorage = JSON.parse(localStorage.getItem("grids"));
	console.log(gridsInStorage);

	if (gridsInStorage) {
		grids = gridsInStorage;
	} else {
		grids = await fetch("grilles.json").then((response) => {
			if (response.ok) {
				return response.json();
			} else {
				return Promise.reject("Error reading file !");
			}
		});
	}

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
			input.classList.remove("invalide");
			if (value != null) {
				input.readOnly = true;
			}
		}
	}
}

const randomNumber = (max) => {
	return Math.trunc(Math.random() * max + 1);
};

// Importer la(les) grille(s) depuis un fichier JSON
export function gridImport() {

	// Afficher la modale
	const modal = document.getElementById("importModal");
	modal.style.display = "block";

	// Le bouton OK sauvegarde les données et ferme la modale
	const icloseBtn = document.getElementsByClassName("iclose")[0];

	// La valeur est enregistrée et la modale fermée
	icloseBtn.onclick = function (event) {
		event.preventDefault();
		const fileObject = document.getElementById("inputFile").files[0];

		var reader = new FileReader();
		reader.readAsText(fileObject);

		reader.onload = function () {
			localStorage.setItem("grids", reader.result);
			modal.style.display = "none";
			location.reload();
		};

		reader.onerror = function () {
			alert(reader.error);
		};
	};

	// Get the CANCEL button element that closes the modal
	const icancelBtn = document.getElementsByClassName("icancel")[0];

	// When the user clicks on CANCEL, just close the modal
	icancelBtn.onclick = function (event) {
		event.preventDefault();
		modal.style.display = "none";
	};

	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function (event) {
		if (event.target == modal) {
			modal.style.display = "none";
		}
	};
}

/**
 *
 * @param {*} tagName
 * @param {*} attributes
 */
export function createElement(tagName, attributes = {}) {
	const element = document.createElement(tagName);
	for (const [attribute, value] of Object.entries(attributes)) {
		if (value !== null) {
			element.setAttribute(attribute, value);
		}
	}
	return element;
}
