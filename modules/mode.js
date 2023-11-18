

export class Mode {

    constructor () {
        this.mode = "origial";

        this.modeList = [
            'original', 'coha-exp', 'prohi-exp'
        ]
        this.modes = {
            'original' : 'Original version',
            'coha-exp' : 'Cohabitation Experimentation',
            'prohi-exp' : 'Prohibition Experimentation',
            'mixte' : 'Mixte Experimentation'
        }

        this.permissions = {
            'original' : {
                changeColor: true,
                addCivilization: false,
                changeCivilization: false,
                minCivilization: 1,
                maxCivilization: 1,
                draw: true,
                erase: true,
                random: true
            },
            'coha-exp': {
                changeColor: false,
                addCivilization: true,
                changeCivilization: true,
                minCivilization: 2,
                maxCivilization: 2,
                draw: true,
                erase: true,
                random: true
            },
            'prohi-exp' : {
                changeColor: false,
                addCivilization: true,
                changeCivilization: true,
                minCivilization: 2,
                maxCivilization: 2,
                draw: true,
                erase: true,
                random: true
            },
            'mixte' : {
                changeColor: false,
                addCivilization: true,
                changeCivilization: true,
                minCivilization: 2,
                maxCivilization: 2,
                draw: true,
                erase: true,
                random: true
            }
        };

        this.descriptions = {
            'original' : `
                <div style="text-align: start; margin-bottom: 10px; font-weight: bold;">
                    This is the original version of the game of life.
                    The rules are simple :
                </div>
                <div style="text-align: start;">
                    <ol>
                        <li>Any live cell with fewer than two live neighbours dies, as if by underpopulation.</li>
                        <li>Any live cell with two or three live neighbours lives on to the next generation.</li>
                        <li>Any live cell with more than three live neighbours dies, as if by overpopulation.</li>
                        <li>Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.</li>
                    </ol>
                </div>
            `,
            'coha-exp': `
                <div style="text-align: start; margin-bottom: 10px; font-weight: bold;">
                    This feature implict a color for each civilization. We make no changes to the rules <br/>
                    of the game. But we add only new perspectives :
                </div>
                <ul style="text-align: start; margin-top: 10px">
                    <li>Each civilization has its own color</li>
                    <li>If a cell is born, it will be the color of the civilization with the most neighbors</li>
                    <li>If a cell has more than one neighbor of another civilization, it will be contaminate</li>
                    <li>If a cell has same number of neighbors of two or more civilizations, it will be neutral</li>
                </ul>
                <div style="text-align: start; margin-top: 10px;">
                    <b>Warning</b> : This feature is experimental and can be very slow.
                </div>
            `,
            'prohi-exp': `
                <div>
                    this is the description
                </div>
            `
        }
    }

    getMode(mode) {
        return this.modes[mode]
    }

    getCurrentMode() {
        return this.mode
    }

    getModeDescription (mode) {
        return this.descriptions[mode];
    }

    toogleMode(mode){
        this.mode = mode
    }

    getPermissions(mode) {
        return this.permissions[mode]
    }

    setScores(scores){
        this.scores = scores
    }
}