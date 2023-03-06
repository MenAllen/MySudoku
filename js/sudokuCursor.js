export default class SudokuCursor {

  constructor() {
    this.line = 0
    this.col = 0
    this.marche = 'avant'
  }

  // progresse indique si le curseur a bien avancé ou reculé
  progress() {
    if (this.marche === 'avant') {
      return this.goForward()
    } else {
      return this.goBackward()
    }

  }

  goForward() {
    // Si le curseur est au bout, retourner faux
    if (this.line === 8 && this.col === 8) {
      return false
    }

    // si le curseur est en bout de ligne, alors ligne suivante col 0
    if (this.col === 8) {
      this.line += 1
      this.col = 0
    } else {
    // sinon, même ligne, colonne suivante
      this.col += 1
    }

    // retourne si le curseur a bien avancé
    return true

  }

  goBackward() {
    if (this.line === 0 && this.col === 0) {
      return false
    }

    if (this.col ===  0) {
      this.line -= 1
      this.col = 8
    } else {
      this.col -= 1
    }

    // retourne si le curseur a bien reculé
    return true
  }

}
