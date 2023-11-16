

export class Mode {

    constructor () {
        this.mode = "test"
        this.scores = {
            generations: 0,
            time: 0,
            dead: 0,
            deadFrequency: 0,
            alive: 0,
            born: 0,
        }

        this.testPermissions = {
            time: 'inifinity',
            hints: 0,
            undo: 0,
            reset: 0,
        }

        this.challengePermissions = {
            time: 'inifinity',
            hints: 0,
            undo: 0,
            reset: 0,
        }

        this.permissions = this.testPermissions
    }

    toogleMode(mode){
        this.mode = mode
        this.permissions = mode === 'test' ? this.testPermissions : this.challengePermissions
    }

    setScores(scores){
        this.scores = scores
    }
}