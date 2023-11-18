

export class Dialog {

    constructor(options) {
        this.options = options;

        this.dialog = document.getElementById('dialog');
        this.dialogTitle = document.querySelector('#dialog .title');
        this.dialogContent = document.getElementById('dialog-content');

        this.dialogBtn = document.getElementById('btn-close-dialog');
        this.dialogBtn.addEventListener('click', () => {
            this.closeDialog();
        });
        
        this.isOpen = true;
        this.showDialog(
            'Welcome',
            `This is a Conway's Game of Life simulator.
             You can draw your own patterns or choose one from the sidebar.`
        )
        this.closeDialog();
    }

    closeDialog() {
        this.dialog.style.display = 'none';
        this.isOpen = false;
    }

    showDialog(title, content) {
        this.dialog.style.display = 'flex';

        this.dialogTitle.textContent = title;
        this.dialogContent.innerHTML = content;
        this.isOpen = true;
    }


}