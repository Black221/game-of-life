

export class Header {

    constructor (mode, dialog) {
        this.mode = mode;
        this.dialog = dialog;

        this.testBtn = document.getElementById('btn-test');
        this.challengeBtn = document.getElementById('btn-challenge');
    
        this.testBtn.addEventListener('click', () => {
            this.mode.toogleMode('test');
            this.dialog.showDialog(
                'Test Mode',
                'You are now in test mode.'
            );
        });

        this.challengeBtn.addEventListener('click', () => {
            this.mode.toogleMode('challenge');
            console.log('challenge');
            this.dialog.showDialog(
                'Challenge Mode',
                'This mode is not yet implemented.'
            );
        });
    }
}