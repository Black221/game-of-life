
//game of life world

export class World {

    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.world = new Array(rows);
        for (var i = 0; i < rows.length; i++)
            this.world[i] = new Array(cols);
        
        this.previous = [];
        this.previousCount = 0;
        this.maxPrevious = 15;
        this.newCells = [];

        this.dead = 0;
        this.born = 0;

        this.init();
    }

    init() {
        for (let i = 0; i < this.rows; i++) {
            this.world[i] = [];
            for (let j = 0; j < this.cols; j++) {
                this.world[i][j] = false;
            }
        }
    }

    getWorld() {
        return this.world;
    }

    getCellsChange() {
        return this.newCells;
    }

    setWorld(world) {
        this.world = world;
    }

    getAlive() {
        let alive = 0;
        for (let i = 0; i < this.rows; i++) {
            let row = this.world[i];
            for (let j = 0; j < this.cols; j++) {
                let col = row[j];
                if (col) {
                    alive++;
                }
            }
        }
        return alive;
    }



    addObject(matrix, x, y) {
        this.newCells = [];
        for (let i = 0; i < matrix.length; i++) {
            let row = matrix[i];
            for (let j = 0; j < row.length; j++) {
                let col = row[j];
                if (col) {
                    this.world[y + i][x + j] = true;
                    this.newCells.push({x: x + j, y: y + i, alive: true});
                }
            }
        }
    }

    setCellToTrue(row, col) {
        this.world[row][col] = true;
    }

    setCellToFalse(row, col) {
        this.world[row][col] = false;
    }

    updateCell(row, col) {
        this.world[row][col] = !this.world[row][col];
    }

    checkCell(x, y) {
        let aliveNeighbours = 0;
        for (let i = -1; i < 2; i++) {
            if (x + i < 0 || x + i >= this.rows) {
                continue;
            }
            for (let j = -1; j < 2; j++) {
                if (y + j < 0 || y + j >= this.cols) {
                    continue;
                }
                if (i === 0 && j === 0) {
                    continue;
                }
                if (this.world[x + i][y + j]) {
                    aliveNeighbours++;
                }
            }
        }
        if (this.world[x][y]) {
            if (aliveNeighbours < 2 || aliveNeighbours > 3) {
                this.dead++;
                return false;
            }
            this.born++;
            return true;
        } else {
            if (aliveNeighbours === 3) {
                return true;
            }
            return false;
        }
    }

    getDead() {
        return this.dead;
    }

    getDeadFreq() {
        return this.dead / (this.dead + this.born);
    }

    getBorn() {
        return this.born;
    }

    nextGeneration() {
        let nextGeneration = [];
        this.newCells = [];
        for (let i = 0; i < this.rows; i++) {
            nextGeneration[i] = [];
            for (let j = 0; j < this.cols; j++) { 
                let check = this.checkCell(i, j);
                if (this.world[i][j] !== check)
                    this.newCells.push({x: j, y: i, alive: check});

                nextGeneration[i][j] = check;
            }
        }
        // garder l'ancienne génération
        if (this.previousCount > 0)
            this.previousCount--;

        this.setPreviousWorld(this.world);
        this.world = nextGeneration;
    }

    previousGeneration() {
        if (this.previousCount < this.previous.length && this.previous.length > 0) {
            this.world = this.previous[this.previous.length - this.previousCount - 1];
            this.previousCount++;
        }
    }


    setPreviousWorld(world) {
        this.previous.push(world);
        if (this.previous.length > this.maxPrevious) {
            this.previous.shift();
        }
    }

    random(precision = 0.8) {
        for (let i = 0; i < this.rows; i++) {
            this.world[i] = [];
            for (let j = 0; j < this.cols; j++) {
                let ran = Math.random() >= precision
                this.world[i][j] = ran;
            }
        }
    }
}