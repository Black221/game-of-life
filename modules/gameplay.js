import { COLOR, MAX_SPEED } from "./constants.js";
import { World } from "./world.js";
import { Canvas } from "./canvas.js";
import { GameplayButtonManager } from "./gameplayButtonManager.js";

export class Gameplay {

    constructor(
        canvas, dimension, mode, footer, dialog, mobile
    ) {
        // gameplay options
        this.canvas = canvas;
        this.dimension = dimension;
        this.world = new World(this.dimension.rows, this.dimension.cols);
        this.mode = mode;
        this.footer = footer;
        this.dialog = dialog;

        // on mobile devices
        this.mobile = mobile;
        this.event = 'mouse'
        if (this.mobile)
            this.event = 'pointer'
        else
            this.event = 'mouse'
    
        // speed and timer variables
        this.speed = MAX_SPEED / 4;
        document.getElementById('display-speed').innerHTML = this.speed;
        this.count = 0;

        // previous world variables
        this.previousWorld = [];
        this.previousCount = 0;
        this.maxPrevious = 15;

        // drag variables
        this.x = 0;
        this.y = 0;

        // usecases toggle variables
        this.container = document.getElementById('container-canvas');
        this.dropping = false;
        this.droppingObject = null;
        this.drawing = false;
        this.erasing = false;
        this.isPlaying = false;
        this.interval = null;
        this.multiColor = false;
        
        // mode civilization variables
        this.civilizations = 1;
        this.currentCivilization = 1;
        
        // colors
        this.colors = [
            COLOR.primary,
            "#00DFA2",
            "#F6FA70",
            "#FF0060"
        ]

        // get rand color
        this.color = this.colors[1];

        // init states
        this.buttonManager = new GameplayButtonManager(this, dialog, canvas, mode);
        this.zoomOut();
    }

    toogleClass(elt,rm, add) {
        elt.classList.remove(rm)
        elt.classList.add(add)
    }

    play() {
        if (this.isPlaying) {
            this.stop();
            
            return;
        }
        this.isPlaying = true;
        this.toogleClass(document.getElementById('icon-play'), 'fa-play', 'fa-pause')

        this.interval = setInterval(() => {

            if (this.mode.getCurrentMode() === 'original'){
                this.world.nextGeneration();
                this.canvas.drawCells(this.world.getCellsChange(), this.color);
                this.footer.setStats({
                    alive: this.world.getAlive(),
                    dead: this.world.getDead(),
                    born: this.world.getBorn(),
                    generation: this.count + 1,
                    deadFreq: this.world.getDeadFreq()
                });

            } else {
                this.world.nextGenerationVersion2(this.civilizations);
                this.canvas.drawCellsWithColors(this.world.getCellsChange(), this.colors.slice(0, this.civilizations));
            }


            this.count++;
            if (this.count % 25 === 0 && this.multiColor)
                this.getNextColors();

            document.getElementById('display-time').innerHTML = this.count;
        }, 2500 / this.speed);
    }

    stop() {
        this.isPlaying = false;
        this.toogleClass(document.getElementById('icon-play'), 'fa-pause', 'fa-play')
        clearInterval(this.interval);
    }

    reset() {
        this.stop();
        this.count = 0;
        document.getElementById('display-time').innerHTML = this.count;
        this.world.init();
        this.canvas.redraw(this.world.getWorld(), this.color);
    }

    onModeChange(mode) {
        this.mode.toogleMode(mode)
        this.permissions = this.mode.getPermissions(mode)
        this.civilizations = this.permissions.minCivilization;
        document.getElementById('display-civilizations').innerHTML = this.civilizations;

        this.stop();
        this.count = 0;
        document.getElementById('display-time').innerHTML = this.count;
        this.world.init();
        this.canvas.redraw(this.world.getWorld(), this.color);
    }

    getPermission() {
        return this.permissions;
    }

    random() {
        this.reset();
        if (this.mode.getCurrentMode() === 'original') {
            this.world.random();
            this.canvas.redraw(this.world.getWorld(), this.color);
        } else {
            // 2 random colors
            let c = this.colors.slice(0, 2);
            this.world.randomVersion2();
            this.canvas.reDrawWithColor(this.world.getWorld(), c);
        }
    }

    next() {
        this.stop();
        if (this.mode.getCurrentMode() === 'original'){
            this.world.nextGeneration();
            this.canvas.redraw(this.world.getWorld());
        }else {
            this.world.nextGenerationVersion2(this.civilizations);
            this.canvas.reDrawWithColor(this.world.getWorld(), this.colors.slice(0, this.civilizations));
        }
    }

    previous() {
        this.stop();
        this.world.previousGeneration();
        this.canvas.redraw(this.world.getWorld());
    }

    addCivilization (n) {
        if (this.civilizations + n >= this.permissions.minCivilization && this.civilizations + n <= this.permissions.maxCivilization)
            this.civilizations += n
        document.getElementById('display-civilizations').innerHTML = this.civilizations;
    }

    changeCivilization(n) {
        if (this.currentCivilization + n >= 1 && this.currentCivilization + n <= this.civilizations)
            this.currentCivilization += n
        document.getElementById('display-current-civilization').innerHTML = this.currentCivilization;
    }

    zoomIn() {
        // this.stop();
        this.dimension.zoomIn();
        if (this.mode.getCurrentMode() === 'original')
            this.canvas.resize(this.dimension.width, this.dimension.height, this.dimension.cellSize, this.world.getWorld(), this.color);
        else {
            let c = this.colors.slice(0, this.civilizations);
            this.canvas.resizeWithColors(this.dimension.width, this.dimension.height, this.dimension.cellSize, this.world.getWorld(), c);
        }
    }

    zoomOut() {
        // this.stop();
        this.dimension.zoomOut();
        if (this.mode.getCurrentMode() === 'original')
            this.canvas.resize(this.dimension.width, this.dimension.height, this.dimension.cellSize, this.world.getWorld(), this.color);
        else {
            let c = this.colors.slice(0, this.civilizations);
            this.canvas.resizeWithColors(this.dimension.width, this.dimension.height, this.dimension.cellSize, this.world.getWorld(), c);
        }
    }

    resetZoom() {
        // this.stop();
        this.dimension.reset();
        if (this.mode.getCurrentMode() === 'original')
            this.canvas.resize(this.dimension.width, this.dimension.height, this.dimension.cellSize, this.world.getWorld(), this.color);
        else {
            this.canvas.resizeWithColors(this.dimension.width, this.dimension.height, this.dimension.cellSize, this.world.getWorld(), this.color);
        }
    }


    changeSpeed(step) {
        if (this.speed + step > 5 && this.speed + step <= MAX_SPEED)
            this.speed = this.speed + step;
        
        document.getElementById('display-speed').innerHTML = this.speed;

        if (this.isPlaying) {
            this.stop();
            this.play();
        }
    }


    addEvent(element, event, callback) {
        element.addEventListener(event, (e) => {
            this.editIterval = setInterval(() => callback(e), 175);
        }, false);
    }

    removeEvent(element, event, callback) {
        element.removeEventListener(event, (e) => {
            this.editIterval = setInterval(() => callback(e), 175);
        }, false);
    }

    toogleEditOption(draw, erase) {
        this.drawing = draw;
        this.erasing = erase;

        this.buttonManager.eraseButton.style.backgroundColor = COLOR.primary;
        this.buttonManager.drawerButton.style.backgroundColor = COLOR.primary;

        if (this.drawing) {
            this.buttonManager.drawerButton.style.backgroundColor = 'rgb(0, 255, 0)';
        } else if (this.erasing) {
            this.buttonManager.eraseButton.style.backgroundColor = 'rgb(0, 255, 0)';
        }
    }



    toogleDrawer() {
       this.toogleEditOption(!this.drawing, false);
        if (!this.drawing)
            return;

        this.canvas.canvas.addEventListener(this.event+'down', () => {
            
            this.canEdit = true;
            this.canvas.canvas.addEventListener(this.event+'move', (e) => {
                if (this.canEdit)
                    this.editInterval = setInterval(this.edit(e), 50);
            });

            this.canvas.canvas.addEventListener(this.event+'up', () => {
                this.canEdit = false;
                clearInterval(this.editInterval);
            });
        });

    }

    edit(e) {
        let x = Math.floor(e.offsetX / this.dimension.cellSize);
        let y = Math.floor(e.offsetY / this.dimension.cellSize);
        if (this.drawing) {
            if (this.mode.getCurrentMode() === 'original') {
                this.world.setCellToTrue(y, x);
                this.canvas.drawCellWithColor(x, y, this.color);
            } else {
                this.world.setCell(y, x, this.currentCivilization)
                this.canvas.drawCellWithColor(x, y, this.colors[this.currentCivilization - 1]);
            }
        } else if (this.erasing){
            this.world.setCellToFalse(y, x);
            this.canvas.drawCellWithColor(x, y, COLOR.black);
        }
    }

    toogleErase() {
        this.toogleEditOption(false, !this.erasing);
        if (!this.erasing)
            return;

        this.canvas.canvas.addEventListener(this.event+'down', () => {
            this.canEdit = true;
            this.canvas.canvas.addEventListener(this.event+'move', (e) => {
                if (this.canEdit)
                    this.editInterval = setInterval(this.edit(e), 50);
            });

            this.canvas.canvas.addEventListener(this.event+'up', () => {
                this.canEdit = false;
                clearInterval(this.editInterval);
            });
        });

    }


    moveTo(x, y) {
        // translate container
        this.x += x * (this.dimension.cellSize + this.dimension.cellSize / 3) ;
        this.y += y * (this.dimension.cellSize + this.dimension.cellSize / 3) ;
        this.canvas.canvas.style.transform = `translate(${this.x}px, ${this.y}px)`;
    }

    addObject(object) {
        let element = this.cursorFocusElement(object);
        this.dropping = true;
        this.droppingObject = object;
        if (this.dropping) {
            this.deleteButton(element);
            
            this.canvas.canvas.addEventListener(this.event+'move', (e) => this.onFucus(e), false);
            this.canvas.canvas.addEventListener('click', (e) => this.onDrop(e), false)
        }
    }

    getNextColors() {
        let index = this.colors.indexOf(this.color);
        index = (index + 1) % this.colors.length;
        this.color =  this.colors[index];
        this.buttonManager.colorButton.style.backgroundColor = this.color;
    }


    onFucus (e) {
        if (!this.dropping) return;
        
        let x = Math.floor(e.offsetX / this.dimension.cellSize);
        let y = Math.floor(e.offsetY / this.dimension.cellSize);
        document.getElementById('cursor-focus').style.top = `${y * this.dimension.cellSize + this.dimension.cellSize + this.y}px`;
        document.getElementById('cursor-focus').style.left = `${x * this.dimension.cellSize + this.dimension.cellSize + this.x}px`;
    }

    onDrop(e) {
        if (!this.dropping) return;

        let x = Math.floor(e.offsetX / this.dimension.cellSize);
        let y = Math.floor(e.offsetY / this.dimension.cellSize);

        this.world.addObject(this.droppingObject.cells, x + 1, y + 1, this.currentCivilization);
        if (this.mode.getCurrentMode() === 'original') {
            this.canvas.drawCells(this.world.getCellsChange(), this.color);
        } else {
            this.canvas.drawCellsWithColors(this.world.getCellsChange(), this.colors.slice(0, this.civilizations));
        }

        this.container.removeChild(document.getElementById("cursor-focus"));
        document.querySelector('.top-left').removeChild(document.getElementById("delete-button"));

        this.canvas.canvas.removeEventListener(this.event+'move', (e) => this.onFucus(e), false)
        this.canvas.canvas.removeEventListener('click', (e) => this.onDrop(e), false)
        this.dropping = false;
    }

    cursorFocusElement(obj) {
        let elt;
        let img = Canvas.createImage(
            obj.size * this.dimension.cellSize, 
            obj.size * this.dimension.cellSize, 
            obj.cells, 
            obj.size
        );

        if (this.dropping){
            elt = document.getElementById("cursor-focus")
            elt.removeChild(elt.querySelector('canvas'))
        }else {
            elt = document.createElement('div');
            elt.id = 'cursor-focus';
            elt.style.position = 'absolute';
            elt.style.zIndex = '5';
            elt.style.border = '1px solid #000000';
            elt.style.borderRadius = '5px';
            elt.style.backgroundColor = '#ffffff';
            elt.style.top = '0px';
            elt.style.left = '0px';
        }


        elt.appendChild(img)

        
        elt.style.width = obj.size * this.dimension.cellSize + 'px';
        elt.style.height = obj.size * this.dimension.cellSize + 'px';
        
        if (this.container.contains(elt)) return elt;
        this.container.appendChild(elt);
        return elt;
    }

    deleteButton(element) {
        // delete button
        let div = document.createElement('div');
        div.className = 'btn btn-delete';
        div.id = 'delete-button';
        document.querySelector('.top-left').appendChild(div);   
        let deleteButton = document.createElement('button');
            deleteButton.className = 'btn btn-delete';
            deleteButton.innerHTML = '<i class="fa-solid fa-trash fa-xl" style="color: #ffffff;"></i>';
            deleteButton.addEventListener('click', () => {
                if (this.dropping) {
                    this.dropping = false;
                    this.droppingObject = null;
                    this.container.removeChild(element);
                    document.querySelector('.top-left').removeChild(div);

                    this.canvas.canvas.removeEventListener('click', (e) => this.onFucus(e), false)
                    this.canvas.canvas.removeEventListener('click', (e) => this.onDrop(e), false)
                }
            });
        div.appendChild(deleteButton);    

        return div;
    }
}