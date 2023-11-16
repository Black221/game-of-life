

export class Modal {

    constructor() {
        this.modal = document.getElementById('modal');
        this.modalBtn = document.getElementById('btn-close-modal');
        this.modalBtn.addEventListener('click', () => {
            this.closeModal();
        });
        
        this.isOpen = true;

        this.showModalBtn = document.getElementById('btn-details');
        this.showModalBtn.addEventListener('click', () => {
            this.showModal();
        });
    }


    showModal() {
        this.modal.style.display = 'flex';
        this.isOpen = true;
    }

    closeModal() {
        this.modal.style.display = 'none';
        this.isOpen = false;
    }
}