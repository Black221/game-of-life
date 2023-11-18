import { DomUtils } from './domUtils.js';

export class GameplayButtonManager {

    constructor(gameplay, dialog, canvas, mode) {
        this.gameplay = gameplay;
        this.dialog = dialog;
        this.canvas = canvas;
        this.mode = mode
       
        this.initButton();
    }

    
    initButton () {

        // get next current civilization button
        this.currentCivilizationButton = document.getElementById('btn-current-civilization-next');
        this.currentCivilizationButton.addEventListener('click', () => {
            if (this.gameplay.getPermission().changeCivilization) {
                this.gameplay.changeCivilization(+1);
            }
        });

        // get previous current civilization button
        this.currentCivilizationButton = document.getElementById('btn-current-civilization-previous');
        this.currentCivilizationButton.addEventListener('click', () => {
            if (this.gameplay.getPermission().changeCivilization) {
                this.gameplay.changeCivilization(-1);
            }
        });


        // get civilization-less button
        this.civilizationLessButton = document.getElementById('btn-civilization-less');
        this.civilizationLessButton.addEventListener('click', () => {
            if (this.gameplay.getPermission().addCivilization) {
                this.gameplay.addCivilization(-1)
            }
        });

        // get civilization-more button
        this.civilizationMoreButton = document.getElementById('btn-civilization-more');
        this.civilizationMoreButton.addEventListener('click', () => {
            if (this.gameplay.getPermission().addCivilization) {
                this.gameplay.addCivilization(1)
            }
        });

        // random color button
        this.randomColorButton = document.getElementById('btn-multi-color');
        this.randomColorButton.addEventListener('click', () => {
            if (this.gameplay.getPermission().changeColor) {
                if (this.gameplay.multiColor) {
                    this.gameplay.multiColor = false;
                    this.randomColorButton.style.border = 'none';
                } else {
                    this.gameplay.multiColor = true;
                    this.randomColorButton.style.border = '2px solid #ffffff';
                }
            }
        });

        //color button
        this.colorButton = document.getElementById('btn-color');
        this.colorButton.addEventListener('click', () => {
            if (this.gameplay.getPermission().changeColor) {
                // get random color
                this.gameplay.getNextColors();
            }
        });
        // get play button
        this.playButton = document.getElementById('btn-play');
        this.playButton.addEventListener('click', () => this.gameplay.play());

        // get reset button
        this.resetButton = document.getElementById('btn-reset');
        this.resetButton.addEventListener('click', () => this.gameplay.reset());

        // get previous button
        this.previousButton = document.getElementById('btn-previous');
        this.previousButton.addEventListener('click', () => this.gameplay.previous());

        // get next button
        this.nextButton = document.getElementById('btn-next');
        this.nextButton.addEventListener('click', () => this.gameplay.next());


        // get random button
        this.randomButton = document.getElementById('btn-random');
        this.randomButton.addEventListener('click', () => this.gameplay.random());

        // get zoom in button
        this.zoomInButton = document.getElementById('btn-zoom-in');
        this.zoomInButton.addEventListener(this.gameplay.event+'down', () => {
            this.zoomChangeInterval = setInterval(() => this.gameplay.zoomIn(), 175);

            this.zoomInButton.addEventListener(this.gameplay.event+'up', () => {
                clearInterval(this.zoomChangeInterval);
            });

            this.zoomInButton.addEventListener(this.gameplay.event+'leave', () => {
                clearInterval(this.zoomChangeInterval);
            });
        });


        // get zoom out button
        this.zoomOutButton = document.getElementById('btn-zoom-out');   
        this.zoomOutButton.addEventListener(this.gameplay.event+'down', () => {
            this.zoomChangeInterval = setInterval(() => this.gameplay.zoomOut(), 175);

            this.zoomOutButton.addEventListener(this.gameplay.event+'up', () => {
                clearInterval(this.zoomChangeInterval);
            });

            this.zoomOutButton.addEventListener(this.gameplay.event+'leave', () => {
                clearInterval(this.zoomChangeInterval);
            });
        });


        // get reset zoom button
        this.resetZoomButton = document.getElementById('btn-zoom-reset');
        this.resetZoomButton.addEventListener('click', () => this.gameplay.resetZoom());

        // get speed input
        this.speedlessButton = document.getElementById('btn-speed-less');
        this.speedlessButton.addEventListener(this.gameplay.event+'down', () => {
            this.speedChangeInterval = setInterval(() => this.gameplay.changeSpeed(-5), 175);

            this.speedlessButton.addEventListener(this.gameplay.event+'up', () => {
                clearInterval(this.speedChangeInterval);
            });

            this.speedlessButton.addEventListener(this.gameplay.event+'leave', () => {
                clearInterval(this.speedChangeInterval);
            });
        });


        this.speedmoreButton = document.getElementById('btn-speed-more');
        this.speedmoreButton.addEventListener(this.gameplay.event+'down', () => {
            this.speedChangeInterval = setInterval(() => this.gameplay.changeSpeed(5), 175);

            this.speedmoreButton.addEventListener(this.gameplay.event+'up', () => {
                clearInterval(this.speedChangeInterval);
            });

            this.speedmoreButton.addEventListener(this.gameplay.event+'leave', () => {
                clearInterval(this.speedChangeInterval);
            });
        });


        //get button drawer
        this.drawerButton = document.getElementById('btn-drawer');
        this.drawerButton.addEventListener('click', () => {
            if (this.gameplay.getPermission().draw) {

                this.gameplay.toogleDrawer()
                this.canvas.canvas.addEventListener('click', (e) => {
                    this.gameplay.edit(e);
                }, false)
            }
        });

        //get button erase
        this.eraseButton = document.getElementById('btn-eraser');
        this.eraseButton.addEventListener('click', () => {
            if (this.gameplay.getPermission().erase) {
                this.gameplay.toogleErase()
            }
        });

        //get button nav-up
        this.navUpButton = document.getElementById('btn-nav-up');
        this.navUpButton.addEventListener(this.gameplay.event+'down', () => {
            this.navInterval = setInterval(() => this.gameplay.moveTo(0, 1), 175);

            this.navUpButton.addEventListener(this.gameplay.event+'up', () => {
                clearInterval(this.navInterval)
            })

            this.navUpButton.addEventListener(this.gameplay.event+'leave', () => {
                clearInterval(this.navInterval)
            })
        });


        //get button nav-down
        this.navDownButton = document.getElementById('btn-nav-down');
        this.navDownButton.addEventListener(this.gameplay.event+'down', () => {
            this.navInterval = setInterval(() => this.gameplay.moveTo(0, -1), 175)

            this.navDownButton.addEventListener(this.gameplay.event+'up', () => {
                clearInterval(this.navInterval)
            })

            this.navDownButton.addEventListener(this.gameplay.event+'leave', () => {
                clearInterval(this.navInterval)
            })
        });


        //get button nav-left
        this.navLeftButton = document.getElementById('btn-nav-left');
        this.navLeftButton.addEventListener(this.gameplay.event+'down', () => {
            this.navInterval = setInterval(() => this.gameplay.moveTo(1, 0), 175)

            this.navLeftButton.addEventListener(this.gameplay.event+'up', () => {
                clearInterval(this.navInterval)
            })

            this.navLeftButton.addEventListener(this.gameplay.event+'leave', () => {
                clearInterval(this.navInterval)
            })
        });


        //get button nav-right
        this.navRightButton = document.getElementById('btn-nav-right');
        this.navRightButton.addEventListener(this.gameplay.event+'down', () => {
            this.navInterval = setInterval(() => this.gameplay.moveTo(-1, 0), 175)

            this.navRightButton.addEventListener(this.gameplay.event+'up', () => {
                clearInterval(this.navInterval)
            })

            this.navRightButton.addEventListener(this.gameplay.event+'leave', () => {
                clearInterval(this.navInterval)
            })
        });


        //get button nav-left-up
        this.navLeftUpButton = document.getElementById('btn-nav-left-up');
        this.navLeftUpButton.addEventListener(this.gameplay.event+'down', () => {
            this.navInterval = setInterval(() => this.gameplay.moveTo(1, 1), 175)

            this.navLeftUpButton.addEventListener(this.gameplay.event+'up', () => {
                clearInterval(this.navInterval)
            })

            this.navLeftUpButton.addEventListener(this.gameplay.event+'leave', () => {
                clearInterval(this.navInterval)
            })
        });


        //get button nav-right-up
        this.navRightUpButton = document.getElementById('btn-nav-right-up');
        this.navRightUpButton.addEventListener(this.gameplay.event+'down', () => {
            this.navInterval = setInterval(() => this.gameplay.moveTo(-1, 1), 175)

            this.navRightUpButton.addEventListener(this.gameplay.event+'up', () => {
                clearInterval(this.navInterval)
            })

            this.navRightUpButton.addEventListener(this.gameplay.event+'leave', () => {
                clearInterval(this.navInterval)
            })
        });


        //get button nav-left-down
        this.navLeftDownButton = document.getElementById('btn-nav-left-down');
        this.navLeftDownButton.addEventListener(this.gameplay.event+'down', () => {
            this.navInterval = setInterval(() => this.gameplay.moveTo(1, -1), 175)

            this.navLeftDownButton.addEventListener(this.gameplay.event+'up', () => {
                clearInterval(this.navInterval)
            })

            this.navLeftDownButton.addEventListener(this.gameplay.event+'leave', () => {
                clearInterval(this.navInterval)
            })
        });


        //get button nav-right-down
        this.navRightDownButton = document.getElementById('btn-nav-right-down');
        this.navRightDownButton.addEventListener(this.gameplay.event+'down', () => {
            this.navInterval = setInterval(() => this.gameplay.moveTo(-1, -1), 175)

            this.navRightDownButton.addEventListener(this.gameplay.event+'up', () => {
                clearInterval(this.navInterval)
            })

            this.navRightDownButton.addEventListener(this.gameplay.event+'leave', () => {
                clearInterval(this.navInterval)
            })
        });


        //get button btn-nav-center
        this.navCenterButton = document.getElementById('btn-nav-center');
        this.navCenterButton.addEventListener('click', () => {
            this.gameplay.x = 0;
            this.gameplay.y = 0;
            this.canvas.canvas.style.transform = `translate(${this.gameplay.x}px, ${this.gameplay.y}px)`;
        });

    }
}