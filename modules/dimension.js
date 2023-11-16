import { MIN_COLS, MIN_ROWS, DEFAULT_CELL_SIZE, MIN_CELL_SIZE, MAX_CELL_SIZE, CELL_SIZE_STEP } from './constants.js';

export class Dimension {

    constructor(rows, cols, cellSize) {
        this.rows = rows;
        this.cols = cols;
        this.cellSize = cellSize;
    }

    // change(rows, cols, rand) {
    //     this.rows = rows;
    //     this.cols = cols;
    //     this.cellSize = rand;
    // }

    get width() {
        return this.cols * this.cellSize;
    }

    get height() {
        return this.rows * this.cellSize;
    }

    zoomIn() {
        if (this.cellSize < MAX_CELL_SIZE) {
            // smooth zoom
            this.cellSize += 1;
        }
    }

    zoomOut() {
        if (this.cellSize > MIN_CELL_SIZE) {
            this.cellSize -= 1;
        }
    }

    reset() {
        this.cellSize = DEFAULT_CELL_SIZE;
    }
    
    reSize(width, height, cellSize) {
        this.width = width;
        this.height = height;
        this.cellSize = cellSize;
    }
}