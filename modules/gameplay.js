import { COLOR, MAX_SPEED } from "./constants.js";
import { World } from "./world.js";
import { Canvas } from "./canvas.js";

export class Gameplay {

    constructor(
        canvas, dimension, mode, footer, dialog, mobile
    ) {
        this.canvas = canvas;
        this.dimension = dimension;
        this.world = new World(this.dimension.rows, this.dimension.cols);

        this.mode = mode;
        this.footer = footer;
        this.dialog = dialog;

        this.mobile = mobile;
        
        this.isPlaying = false;
        this.interval = null;

        this.multiColor = false;
        this.autoAdd = false;

        this.speed = MAX_SPEED / 4;
        document.getElementById('display-speed').innerHTML = this.speed;
        this.count = 0;

        this.previousWorld = [];
        this.previousCount = 0;
        this.maxPrevious = 15;

        this.x = 0;
        this.y = 0;

        this.container = document.getElementById('container-canvas');
        this.dropping = false;
        this.droppingObject = null;

        this.drawing = false;
        this.erasing = false;
        
        this.editInterval = null;
        this.zoomChangeInterval = null;
        this.speedChangeInterval = null;
        this.navInterval = null;

        this.colors = [
            COLOR.primary,
            "#00DFA2",
            "#F6FA70",
            "#FF0060"
        ]

        // get rand color
        this.color = this.colors[1];
        this.event = 'mouse'
        if (this.mobile)
            this.event = 'pointer'
        else
            this.event = 'mouse'

        this.initButton();
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

            this.world.nextGeneration();
            this.canvas.drawCells(this.world.getCellsChange(), this.color);

            // if (this.autoAdd && this.count % 50 === 0) {
            //     this.world.random(0.95);
            //     this.canvas.drawCells(this.world.getCellsChange(), this.color);
            // }

            this.footer.setStats({
                alive: this.world.getAlive(),
                dead: this.world.getDead(),
                born: this.world.getBorn(),
                generation: this.count + 1,
                deadFreq: this.world.getDeadFreq()
            });
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

    onModechange() {
        this.stop();
        this.count = 0;
        document.getElementById('display-time').innerHTML = this.count;
        this.world.init();
        this.canvas.redraw(this.world.getWorld(), this.color);
    }

    random() {
        this.reset();
        this.world.random();
        this.canvas.redraw(this.world.getWorld(), this.color);
    }

    next() {
        this.stop();
        this.world.nextGeneration();
        this.canvas.redraw(this.world.getWorld());
    }

    previous() {
        this.stop();
        this.world.previousGeneration();
        this.canvas.redraw(this.world.getWorld());
    }

    zoomIn() {
        // this.stop();
        this.dimension.zoomIn();
        this.canvas.resize(this.dimension.width, this.dimension.height, this.dimension.cellSize, this.world.getWorld(), this.color);
    }

    zoomOut() {
        // this.stop();
        this.dimension.zoomOut();
        this.canvas.resize(this.dimension.width, this.dimension.height, this.dimension.cellSize, this.world.getWorld(), this.color);
    }

    resetZoom() {
        // this.stop();
        this.dimension.reset();
        this.canvas.resize(this.dimension.width, this.dimension.height, this.dimension.cellSize, this.world.getWorld(), this.color);
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

        this.eraseButton.style.backgroundColor = COLOR.primary;
        this.drawerButton.style.backgroundColor = COLOR.primary;

        if (this.drawing) {
            this.drawerButton.style.backgroundColor = 'rgb(0, 255, 0)';
        } else if (this.erasing) {
            this.eraseButton.style.backgroundColor = 'rgb(0, 255, 0)';
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
        if (this.drawing)
            this.world.setCellToTrue(y, x);
        else if (this.erasing)
            this.world.setCellToFalse(y, x);
        if (this.drawing || this.erasing)
        this.canvas.drawCellWithColor(x, y, this.world.getWorld()[y][x] ? this.color : COLOR.black);
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
        this.colorButton.style.backgroundColor = this.color;
    }

    initButton () {

        // auto add button
        // this.autoAddButton = document.getElementById('btn-auto-random');
        // this.autoAddButton.addEventListener('click', () => {
        //     console.log(this.autoAdd)
        //     if (this.autoAdd) {
        //         this.autoAdd = false;
        //         this.autoAddButton.background = COLOR.primary;
        //     } else {
        //         this.autoAdd = true;
        //         this.autoAddButton.background = 'rgb(0, 255, 0)';
        //     }
        // });

        // random color button
        this.randomColorButton = document.getElementById('btn-multi-color');
        this.randomColorButton.addEventListener('click', () => {
            if (this.multiColor) {
                this.multiColor = false;
                this.randomColorButton.style.border = 'none';
            } else {
                this.multiColor = true;
                this.randomColorButton.style.border = '2px solid #ffffff';
            }
        });

        //color button
        this.colorButton = document.getElementById('btn-color');
        this.colorButton.addEventListener('click', () => {
            // get random color
            this.getNextColors();
        });
        // get play button
        this.playButton = document.getElementById('btn-play');
        this.playButton.addEventListener('click', () => this.play());

        // get reset button
        this.resetButton = document.getElementById('btn-reset');
        this.resetButton.addEventListener('click', () => this.reset());

        // get previous button
        this.previousButton = document.getElementById('btn-previous');
        this.previousButton.addEventListener('click', () => this.previous());

        // get next button
        this.nextButton = document.getElementById('btn-next');
        this.nextButton.addEventListener('click', () => this.next());


        // get random button
        this.randomButton = document.getElementById('btn-random');
        this.randomButton.addEventListener('click', () => this.random());

        // get zoom in button
        this.zoomInButton = document.getElementById('btn-zoom-in');
        this.zoomInButton.addEventListener(this.event+'down', () => {
            this.zoomChangeInterval = setInterval(() => this.zoomIn(), 175);

            this.zoomInButton.addEventListener(this.event+'up', () => {
                clearInterval(this.zoomChangeInterval);
            });

            this.zoomInButton.addEventListener(this.event+'leave', () => {
                clearInterval(this.zoomChangeInterval);
            });
        });


        // get zoom out button
        this.zoomOutButton = document.getElementById('btn-zoom-out');   
        this.zoomOutButton.addEventListener(this.event+'down', () => {
            this.zoomChangeInterval = setInterval(() => this.zoomOut(), 175);

            this.zoomOutButton.addEventListener(this.event+'up', () => {
                clearInterval(this.zoomChangeInterval);
            });

            this.zoomOutButton.addEventListener(this.event+'leave', () => {
                clearInterval(this.zoomChangeInterval);
            });
        });


        // get reset zoom button
        this.resetZoomButton = document.getElementById('btn-zoom-reset');
        this.resetZoomButton.addEventListener('click', () => this.resetZoom());

        // get speed input
        this.speedlessButton = document.getElementById('btn-speed-less');
        this.speedlessButton.addEventListener(this.event+'down', () => {
            this.speedChangeInterval = setInterval(() => this.changeSpeed(-5), 175);

            this.speedlessButton.addEventListener(this.event+'up', () => {
                clearInterval(this.speedChangeInterval);
            });

            this.speedlessButton.addEventListener(this.event+'leave', () => {
                clearInterval(this.speedChangeInterval);
            });
        });


        this.speedmoreButton = document.getElementById('btn-speed-more');
        this.speedmoreButton.addEventListener(this.event+'down', () => {
            this.speedChangeInterval = setInterval(() => this.changeSpeed(5), 175);

            this.speedmoreButton.addEventListener(this.event+'up', () => {
                clearInterval(this.speedChangeInterval);
            });

            this.speedmoreButton.addEventListener(this.event+'leave', () => {
                clearInterval(this.speedChangeInterval);
            });
        });


        //get button drawer
        this.drawerButton = document.getElementById('btn-drawer');
        this.drawerButton.addEventListener('click', () => {
            this.toogleDrawer()
            this.canvas.canvas.addEventListener('click', (e) => {
                    this.edit(e);
            }, false)
        });

        //get button erase
        this.eraseButton = document.getElementById('btn-eraser');
        this.eraseButton.addEventListener('click', () => this.toogleErase());

        //get button nav-up
        this.navUpButton = document.getElementById('btn-nav-up');
        this.navUpButton.addEventListener(this.event+'down', () => {
            this.navInterval = setInterval(() => this.moveTo(0, 1), 175);

            this.navUpButton.addEventListener(this.event+'up', () => {
                clearInterval(this.navInterval)
            })

            this.navUpButton.addEventListener(this.event+'leave', () => {
                clearInterval(this.navInterval)
            })
        });


        //get button nav-down
        this.navDownButton = document.getElementById('btn-nav-down');
        this.navDownButton.addEventListener(this.event+'down', () => {
            this.navInterval = setInterval(() => this.moveTo(0, -1), 175)

            this.navDownButton.addEventListener(this.event+'up', () => {
                clearInterval(this.navInterval)
            })

            this.navDownButton.addEventListener(this.event+'leave', () => {
                clearInterval(this.navInterval)
            })
        });


        //get button nav-left
        this.navLeftButton = document.getElementById('btn-nav-left');
        this.navLeftButton.addEventListener(this.event+'down', () => {
            this.navInterval = setInterval(() => this.moveTo(1, 0), 175)

            this.navLeftButton.addEventListener(this.event+'up', () => {
                clearInterval(this.navInterval)
            })

            this.navLeftButton.addEventListener(this.event+'leave', () => {
                clearInterval(this.navInterval)
            })
        });


        //get button nav-right
        this.navRightButton = document.getElementById('btn-nav-right');
        this.navRightButton.addEventListener(this.event+'down', () => {
            this.navInterval = setInterval(() => this.moveTo(-1, 0), 175)

            this.navRightButton.addEventListener(this.event+'up', () => {
                clearInterval(this.navInterval)
            })

            this.navRightButton.addEventListener(this.event+'leave', () => {
                clearInterval(this.navInterval)
            })
        });


        //get button nav-left-up
        this.navLeftUpButton = document.getElementById('btn-nav-left-up');
        this.navLeftUpButton.addEventListener(this.event+'down', () => {
            this.navInterval = setInterval(() => this.moveTo(1, 1), 175)

            this.navLeftUpButton.addEventListener(this.event+'up', () => {
                clearInterval(this.navInterval)
            })

            this.navLeftUpButton.addEventListener(this.event+'leave', () => {
                clearInterval(this.navInterval)
            })
        });


        //get button nav-right-up
        this.navRightUpButton = document.getElementById('btn-nav-right-up');
        this.navRightUpButton.addEventListener(this.event+'down', () => {
            this.navInterval = setInterval(() => this.moveTo(-1, 1), 175)

            this.navRightUpButton.addEventListener(this.event+'up', () => {
                clearInterval(this.navInterval)
            })

            this.navRightUpButton.addEventListener(this.event+'leave', () => {
                clearInterval(this.navInterval)
            })
        });


        //get button nav-left-down
        this.navLeftDownButton = document.getElementById('btn-nav-left-down');
        this.navLeftDownButton.addEventListener(this.event+'down', () => {
            this.navInterval = setInterval(() => this.moveTo(1, -1), 175)

            this.navLeftDownButton.addEventListener(this.event+'up', () => {
                clearInterval(this.navInterval)
            })

            this.navLeftDownButton.addEventListener(this.event+'leave', () => {
                clearInterval(this.navInterval)
            })
        });


        //get button nav-right-down
        this.navRightDownButton = document.getElementById('btn-nav-right-down');
        this.navRightDownButton.addEventListener(this.event+'down', () => {
            this.navInterval = setInterval(() => this.moveTo(-1, -1), 175)

            this.navRightDownButton.addEventListener(this.event+'up', () => {
                clearInterval(this.navInterval)
            })

            this.navRightDownButton.addEventListener(this.event+'leave', () => {
                clearInterval(this.navInterval)
            })
        });


        //get button btn-nav-center
        this.navCenterButton = document.getElementById('btn-nav-center');
        this.navCenterButton.addEventListener('click', () => {
            this.x = 0;
            this.y = 0;
            this.canvas.canvas.style.transform = `translate(${this.x}px, ${this.y}px)`;
        });

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

        this.world.addObject(this.droppingObject.cells, x + 1, y + 1);
        this.canvas.drawCells(this.world.getCellsChange(), this.color);

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