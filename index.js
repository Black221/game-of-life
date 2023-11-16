import { DEFAULT_CELL_SIZE, MIN_COLS, MIN_ROWS } from "./modules/constants.js";
import { Canvas } from "./modules/canvas.js";
import { Dimension } from "./modules/dimension.js";
import { Sidebar } from "./modules/sidebar.js";
import { Footer } from "./modules/footer.js";
import { Gameplay } from "./modules/gameplay.js";
import { STILL_LIFE } from './modules/lab.js';
import { Modal } from "./modules/modal.js";
import { Dialog } from "./modules/dialog.js";
import { Mode } from "./modules/mode.js";
import { Header } from "./modules/header.js";

let dimension = new Dimension(MIN_ROWS, MIN_COLS, DEFAULT_CELL_SIZE);

let canvasElement = document.querySelector('#canvas');
let canvas = new Canvas(canvasElement, dimension.width, dimension.height, dimension.cellSize);
canvas.init();

let dialog = new Dialog();

let mode = new Mode();
let footer = new Footer();

let gameplay = new Gameplay(canvas, dimension, mode, footer, dialog);

new Sidebar(gameplay, STILL_LIFE);
new Header(gameplay, mode, dialog);

new Modal();
