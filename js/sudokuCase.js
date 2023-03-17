export default class SudokuCase {
    constructor() {
        this.isInitialValue = false;
        this.possibleValues = [];
        this.initializeValues();
    }
    initializeValues() {
        this.possibleValues = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    }
    defineInitialValue(value) {
        this.value = value;
        this.isInitialValue = true;
    }
    nextValue() {
        this.value = this.possibleValues.shift();
        return this.value;
    }
}
