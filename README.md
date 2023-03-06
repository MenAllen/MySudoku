# Code base for Project Sudoku
Description: A sudoku grid based on HTML/CSS & Javascript to help solve or build sudoku grid 

## Software tools used
 - Visual Studio Code V1.71
 - ESlint Linter
 - Prettier Code formater V9
 - P42 code analyser V2

# Getting Started

## Frontend
clone this repo https://menallen.github.io/MySudoku/
### Start
Just launch index.html with browser
### Github Pages
App is available from https://menallen.github.io/MySudoku/

## Nav Menu
1) Choisir: choose a grid
2) Tester: check for errors
3) Importer: Import grids from JSON file
4) Resoudre: launch resolve process (Note this can take several hours for difficult grids)
Note to build a grid, just define a candidate grid, import it and solve it

# Documentation
Exemple de fichier JSON pour l'import:
[
  {
    "difficulte": "facile",
    "grille":[
      [null,null,5,9,null,null,4,2,null],
      [null,7,1,null,null,4,6,8,null],
      [null,null,null,6,null,7,9,null,null],
      [3,4,null,null,null,2,null,null,8],
      [8,null,6,null,7,null,null,null,null],
      [null,9,2,5,null,null,7,null,null],
      [null,null,null,null,2,6,3,null,9],
      [2,6,null,null,4,5,null,7,1],
      [7,3,null,8,null,1,null,5,null]
    ]
  },
  {
    "difficulte": "moyen",
    "grille":[
      [8,9,null,7,null,4,null,null,null],
      [2,3,null,null,null,null,null,null,9],
      [null,null,7,null,null,null,5,3,null],
      [9,4,null,null,5,1,null,null,6],
      [null,7,8,null,2,6,null,4,null],
      [null,null,null,4,null,3,null,null,1],
      [7,null,4,null,null,8,null,1,null],
      [null,null,null,3,null,null,null,null,null],
      [null,null,6,null,null,null,2,null,null]
    ]
  }
  ]


