

export class Modal {

    constructor() {
        this.modal = document.getElementById('modal');
        this.modalContent = document.getElementById('modal-content');
        this.modalBtn = document.getElementById('btn-close-modal');
        this.modalBtn.addEventListener('click', () => {
            this.closeModal();
        });
        
        this.isOpen = true;

        this.showModalBtn = document.getElementById('btn-sho-modal');
        this.showModalBtn.addEventListener('click', () => {
            this.showModal();
        });
    }


    showModal() {
        this.modal.style.display = 'block';
        this.modalContent.style.display = 'block';
        this.isOpen = true;
    }

    closeModal() {
        this.modal.style.display = 'none';
        this.modalContent.style.display = 'none';
        this.isOpen = false;
    }
}