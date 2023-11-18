
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
                this.world[i][j] = 0;
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



    addObject(matrix, x, y, civilization = 1) {
        // this.newCells = [];
        for (let i = 0; i < matrix.length; i++) {
            let row = matrix[i];
            for (let j = 0; j < row.length; j++) {
                let col = row[j];
                if (col) {
                    this.world[y + i][x + j] = civilization;
                    this.newCells.push({x: x + j, y: y + i, alive: civilization});
                }
            }
        }
    }

    setCellToTrue(row, col) {
        this.world[row][col] = 1;
    }

    setCellToFalse(row, col) {
        this.world[row][col] = 0;
    }

    setCell(row, col, value) {
        this.world[row][col] = value;
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
                return 0;
            }
            this.born++;
            return 1;
        } else {
            if (aliveNeighbours === 3) {
                return 1;
            }
            return 0;
        }
    }


    checkCellVersion2(x, y, civilization = 2) {
        let aliveNoNeutralNeighbours = [];
        for (let i = 0; i < civilization; i++)
            aliveNoNeutralNeighbours[i] = 0;

        let totalAlive = 0;
        let totalNeutre = 0;
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
                let cell = this.world[x + i][y + j];
                if (cell !== 0) {
                    if (cell !== -1)
                        aliveNoNeutralNeighbours[cell - 1]++;
                    else 
                        totalNeutre++;
                    totalAlive++;
                }
            }
        }

        let max = 0;
        let egalite = true;
        let maxIndex = -1;
        for (let i = 0; i < civilization; i++) {
            if (aliveNoNeutralNeighbours[i] > max) {
                max = aliveNoNeutralNeighbours[i];
                maxIndex = i;
            }
        }

        for (let i = 0; i < civilization; i++) {
            if (aliveNoNeutralNeighbours[i] === max && i !== maxIndex) {
                egalite = false;
            }
        }
        
        if (this.world[x][y] === 0) {
            if (totalAlive === 3) {
                // return the civilization with the most alive neighbours
                if (totalNeutre >= 2 || max === 1){
                    return -1;
                }
                return maxIndex + 1;
            }
            return 0;
        } else {
            if (totalAlive === 2) {
                if (totalNeutre === 2 || this.world[x][y] === -1 && (max === 1 || totalNeutre === 1)){
                    return -1;
                }else {
                    // return the civilization with the most alive neighbours
                    if (totalNeutre === 1 || max === 1){
                        return this.world[x][y];
                    }else{
                        return maxIndex + 1;
                    }
                }
            } else if (totalAlive === 3) {
                if (this.totalNeutre >= 2  || this.world[x][y] === -1 && (totalNeutre === 1 && max === 1)){
                    return -1;
                }else {
                    // return the civilization with the most alive neighbours
                    if (totalNeutre === 1 && max === 1){
                        return this.world[x][y];
                    }else{
                        return maxIndex + 1;
                    }
                }
            }
            return 0;
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

    nextGenerationVersion2(civilization = 2) {
        let nextGeneration = [];
        this.newCells = [];
        this.dead = 0;
        this.born = 0;
        for (let i = 0; i < this.rows; i++) {
            nextGeneration[i] = [];
            for (let j = 0; j < this.cols; j++) { 
                let check = this.checkCellVersion2(i, j, civilization);
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

    randomVersion2(civilization = 2) {

        let tabOfRand = [0,2,0,1,0]

        for (let i = 0; i < this.rows; i++) {
            this.world[i] = [];
            for (let j = 0; j < this.cols; j++) {
                // take random number in tabOfRand
                let ran = tabOfRand[Math.floor(Math.random() * tabOfRand.length)];
                console.log(ran)
                this.world[i][j] = ran;
            }
        }
    }
}