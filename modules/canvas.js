import { COLOR } from "./constants.js";


export class Canvas {

    constructor (
        canvas,
        height,
        widhth,
        cellSize
    ) {
        this.canvas = canvas;
        this.height = height;
        this.width = widhth;
        this.cellSize = cellSize;
        this.ctx = this.canvas.getContext('2d');
        this.target = null;
    }


    init() {
        this.canvas.height = this.height;
        this.canvas.width = this.width;
        //set background color to black
        this.ctx.fillStyle = '#000000';
        this.ctx.fillRect(0, 0, this.width, this.height);
        //draw the grid
        this.drawGrid();
    }

    static createImage(width, height, matrix, size) {

        let canvasElement = document.createElement('canvas');
        let canvas = new Canvas(canvasElement, width, height, width / size);
        canvas.init();
        canvas.redraw(matrix);

        return canvasElement;
    }

    drawGrid() {
        this.ctx.strokeStyle = COLOR.gray;
        
        this.ctx.lineWidth = 1;
        for (let x = 0; x <= this.width; x += this.cellSize) {

            // if (x / (this.cellSize * 3)) this.ctx.strokeStyle = COLOR.secondary;
            // else this.ctx.strokeStyle = COLOR.gray;

            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.height);
        }
        for (let y = 0; y <= this.height; y += this.cellSize) {

            // if (y % (4  * this.cellSize)) this.ctx.strokeStyle = COLOR.secondary;
            // else this.ctx.strokeStyle = COLOR.gray;

            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.width, y);
        }
        this.ctx.stroke();
    }

    drawCell(x, y) {
        //draw with stroke
        this.ctx.strokeStyle = COLOR.gray;
        this.ctx.lineWidth = 1;
        this.ctx.strokeRect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize);
        //draw with fill
        this.ctx.fillStyle = COLOR.primary;
        this.ctx.fillRect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize);
    }

    drawCellWithColor(x, y, color) {
        //draw with stroke
        this.ctx.strokeStyle = COLOR.gray;
        this.ctx.lineWidth = 1;
        this.ctx.strokeRect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize);
        //draw with fill
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize);
    }

    drawCells(cells) {
        for (let cell of cells) {
            let color = cell.alive ? COLOR.primary : '#000000';
            this.drawCellWithColor(cell.x, cell.y, color);
        }
    }

    redraw(map) {
        this.init();
        for (let x = 0; x < map.length; x++) {
            for (let y = 0; y < map[x].length; y++) {
                if (map[x][y]) {
                    this.drawCell(y, x);
                }
            }
        }
    }


    resize(width, height, cellSize, map) {
        this.width = width;
        this.height = height;
        this.cellSize = cellSize;
        this.redraw(map);
    }

}