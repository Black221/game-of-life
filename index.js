import { DEFAULT_CELL_SIZE, MIN_COLS, MIN_ROWS } from "./modules/constants.js";
import { Canvas } from "./modules/canvas.js";
import { Dimension } from "./modules/dimension.js";
import { Sidebar } from "./modules/sidebar.js";
import { Footer } from "./modules/footer.js";
import { Gameplay } from "./modules/gameplay.js";
import { STILL_LIFE } from './modules/lab.js';

let dimension = new Dimension(MIN_ROWS, MIN_COLS, DEFAULT_CELL_SIZE);

let canvasElement = document.querySelector('#canvas');
let canvas = new Canvas(canvasElement, dimension.width, dimension.height, dimension.cellSize);
canvas.init();

let gameplay = new Gameplay(canvas, dimension);
new Sidebar(gameplay, STILL_LIFE);
new Footer(gameplay, dimension);