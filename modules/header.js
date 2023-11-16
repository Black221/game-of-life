

export class Header {

    constructor (gameplay, mode, dialog) {
        this.gameplay = gameplay;
        this.mode = mode;
        this.dialog = dialog;

        this.testBtn = document.getElementById('btn-test');
        this.challengeBtn = document.getElementById('btn-challenge');
    
        this.testBtn.addEventListener('click', () => {
            if (this.mode.mode === 'test') return;

            this.mode.toogleMode('test');
            this.dialog.showDialog(
                'Test Mode',
                'You are now in test mode.'
            );
            
            // this.gameplay.onModechange();
        });

        this.challengeBtn.addEventListener('click', () => {
            if (this.mode.mode === 'challenge') return;

            this.mode.toogleMode('challenge');
            this.dialog.showDialog(
                'Challenge Mode',
                'This mode is not yet implemented.'
            );
            
            this.gameplay.onModechange();
        });
    }


}