export default class SudokuCase {

  isInitialValue: Boolean;
  possibleValues: Array<number>;
  value: number | undefined;

  constructor() {
    this.isInitialValue = false
    this.possibleValues = []
    this.initializeValues()
  }

  initializeValues(): void {
    this.possibleValues = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  }

  defineInitialValue(value: number): void {
    this.value = value
    this.isInitialValue = true
  }
  nextValue(): number | undefined {
    this.value = this.possibleValues.shift()
    return this.value
  }
}
