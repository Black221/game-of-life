import { Canvas } from "./canvas.js";

export class Modal {

    constructor() {
        this.modal = document.getElementById('modal');
        this.modalBtn = document.getElementById('btn-close-modal');
        this.modalBtn.addEventListener('click', () => {
            this.closeModal();
        });
        
        this.isOpen = true;

        this.rules = [{
            rule: 'Any live cell with fewer than two live neighbours dies, as if by underpopulation.',
            matrix: [
                [0, 0, 0],
                [1, 2, 0],
                [0, 0, 0]
            ]},{
            rule: 'Any live cell with more than tree live neighbours dies, as if by superpopulation.',
            matrix: [
                [0, 1, 0],
                [1, 2, 1],
                [0, 1, 0]
            ]},{
                rule: 'Any live cell with two or tree live neighbours lives on to the next generation.',
            matrix: [
                [0, 0, 0],
                [1, 2, 1],
                [0, 1, 0]
            ]},{
            rule: 'Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.',
            matrix: [
                [0, 1, 0],
                [1, 0, 1],
                [0, 0, 0]
            ]
        }]

        this.rulesImgs = document.querySelectorAll('.rule-img');
        this.rulesImgs.forEach((img, index) => {
            // create canvas img
            let canvas = Canvas.createImage(150, 150, this.rules[index].matrix, 3);
            img.appendChild(canvas);
        });

        this.rulesDisplay = document.querySelectorAll('.rule-display');
        this.rulesDisplay.forEach((display, index) => {
            display.innerHTML = this.rules[index].rule;
        });

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