

export class Header {

    constructor (gameplay, mode, dialog) {
        this.gameplay = gameplay;
        this.mode = mode;
        this.dialog = dialog;

        this.originalModeBtn = document.getElementById('btn-original');
        this.originalModeBtn.addEventListener('click', () => {
            this.toogleMode('original')            
            // this.gameplay.onModechange();
        });

        this.cohabitationModeBtn = document.getElementById('btn-cohabitation');
        this.cohabitationModeBtn.addEventListener('click', () => {
            this.toogleMode('coha-exp')
        })

        this.prohibitionModeBtn = document.getElementById('btn-prohibition');
        this.prohibitionModeBtn.addEventListener('click', () => {
            this.toogleMode('prohi-exp')
        })

        this.mixteModeBtn = document.getElementById('btn-mixte');
        this.mixteModeBtn.addEventListener('click', () => {
            this.dialog.showDialog(
                'Mixte mode',
                `
                    <div>This mode is a mixte of cohabitation and prohibition mode</div>
                    <div>Not implemented yet</div>
                `
            )
        })

        this.toogleMode('original')
    }

    toogleMode(mode) {
        let m = this.mode.getMode(mode);
        this.gameplay.onModeChange(mode)
        this.dialog.showDialog(
            `${m}`,
            `${this.mode.getModeDescription(mode)}`
        )
    }


}