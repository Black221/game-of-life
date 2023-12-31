import { Setting } from "./setting.js";

export class Footer {

    constructor() {

        this.setting = new Setting();
        
        this.footer = document.getElementById('footer');
        this.footerBtn = document.querySelector('#btn-open-footer');
        this.footerContent = document.getElementById('footer-content');
        
        this.isOpen = true;
        this.toggleFooter();

        this.footerBtn.addEventListener('click', () => {
            this.toggleFooter();
        });
    }

    setStats(stats) {
        this.setting.setStats(stats);
    }




    toggleFooter() {
        this.footerContent.style.height = this.isOpen ? '0px' : '280px';
        this.footerContent.style.overflow = this.isOpen ? 'hidden' : 'auto';
        this.footerBtn.innerHTML = this.isOpen ? '<i class="fa-solid fa-chevron-up fa-xl" style="color: #fff"></i>' : '<i class="fa-solid fa-chevron-down fa-xl" style="color: #fff"></i>';
        this.isOpen = !this.isOpen;
    }
}