import { Setting } from "./setting.js";

export class Footer {

    constructor(gameplay) {
        this.gameplay = gameplay;
        this.setting = new Setting();
        
        this.footer = document.getElementById('footer');
        this.footerBtn = document.querySelector('#btn-open-footer');
        this.footerContent = document.getElementById('footer-content');
        
        this.isOpen = false;
        this.toggleFooter();

        this.footerBtn.addEventListener('click', () => {
            this.toggleFooter();
        });
    }

    setRows(rows) {
    }

    setCols(cols) {
    }

    setCellSize(cellSize) {
    }



    toggleFooter() {
        this.footerContent.style.height = this.isOpen ? '0px' : '480px';
        this.footerContent.style.overflow = this.isOpen ? 'hidden' : 'auto';
        this.footerBtn.innerHTML = this.isOpen ? '<i class="fa-solid fa-chevron-up fa-xl" style="color: #fff"></i>' : '<i class="fa-solid fa-chevron-down fa-xl" style="color: #fff"></i>';
        this.isOpen = !this.isOpen;
    }
}