import { 
    MIN_COLS, 
    MIN_ROWS,
    MIN_RANDOM,
    MAX_COLS,
    MAX_ROWS,
    MAX_RANDOM,
    DEFAULT_ROWS,
    DEFAULT_COLS,
    DEFAULT_RANDOM

} from "./constants.js";

export class Setting {

    constructor() {
        this.form = document.getElementById('setting-form');

        this.minRows = this.form.querySelector('#rows-min');
        this.minRows.textContent = MIN_ROWS;

        this.minCols = this.form.querySelector('#cols-min');
        this.minCols.textContent = MIN_COLS;

        this.maxRows = this.form.querySelector('#rows-max');
        this.maxRows.textContent = MAX_ROWS;
        
        this.maxCols = this.form.querySelector('#cols-max');
        this.maxCols.textContent = MAX_COLS;

        this.minRandom = this.form.querySelector('#random-min');
        this.minRandom.textContent = MIN_RANDOM;

        this.maxRandom = this.form.querySelector('#random-max');
        this.maxRandom.textContent = MAX_RANDOM;

        this.inputRows = this.form.querySelector('#input-rows');
        this.inputRows.value = DEFAULT_ROWS;

        this.inputCols = this.form.querySelector('#input-cols');
        this.inputCols.value = DEFAULT_COLS;

        this.inputRandom = this.form.querySelector('#input-random');
        this.inputRandom.value = DEFAULT_RANDOM;
    }
}