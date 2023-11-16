

import { Canvas } from "./canvas.js";


export class Sidebar {

    
    constructor(gameplay, stills) {
        this.gameplay = gameplay;
        this.stills = stills;

        this.isOpen = true;

        this.sidebar = document.getElementById('sidebar');
        this.sidebarContent = document.getElementById('sidebar-content');
        this.sidebarBtn = document.querySelector('#sidebar .btn-open');

        this.selectCategory = document.querySelector('#categories');
        this.selectCategory.addEventListener('change', (e) => {
            let category = e.target.value;
            this.objectRender.innerHTML = '';
            if (category === 'all') {
                this.render();
            } else {
                for (let i = 0; i < this.stills.length; i++) {
                    let object = this.stills[i];
                    if (object.category === category) {
                        let objectElement = this.createObject(object);
                        this.objectRender.appendChild(objectElement)
                    }
                }
            }
        });


        this.toggleSidebar();
        this.sidebarBtn.addEventListener('click', () => {
            this.toggleSidebar();
        });
        
        this.objectRender = document.getElementById('object-render');
        this.objectRender.innerHTML = '';



        this.render();

    }

    render() {
        for (let i = 0; i < this.stills.length; i++) {
            let object = this.stills[i];
            let objectElement = this.createObject(object);
            this.objectRender.appendChild(objectElement)
        }
    }

    toggleSidebar() {
        if (this.isOpen) {
            
            this.sidebarContent.style.display = 'none';
            this.sidebarBtn.innerHTML = '<i class="fa-solid fa-arrow-right fa-xl" style="color: #ffffff;"></i>';
            this.isOpen = false;
        } else {
            
            this.sidebarContent.style.display = 'block';
            this.sidebarBtn.innerHTML = '<i class="fa-solid fa-arrow-left fa-xl" style="color: #ffffff;"></i>';
            this.isOpen = true;
        }
    }

    createObject (obj) {
        let object = this.createElement('div', 'object', `object_${obj.id}`, '');
        let objectBtn = this.createElement('div', 'object-btn', '', '');
        let objectName = this.createElement('div', 'object-name', '', obj.name);
        let objectImage = this.createElement('div', 'object-image', '', '');
        let objectDescription = this.createElement('div', 'object-description', '', 'Usecases: ' + obj.usecases.slice(' '));
        let objectCategory = this.createElement('div', 'object-cost', '', obj.category);

        let btn = this.createButton(
            'btn btn-add', `btn_${obj.id}`, 
            '<i class="fa-solid fa-plus fa-xl" style="color: #ffffff;"></i>', 
            'click', () => this.getElement(obj)
        );

        let img = Canvas.createImage(100, 100, obj.cells, obj.size);

        object.appendChild(objectBtn);
        objectBtn.appendChild(btn);
        object.appendChild(objectName);
        objectImage.appendChild(img);
        object.appendChild(objectImage);
        object.appendChild(objectDescription);
        object.appendChild(objectCategory);

        return object;
    }


    createElement (elt, className, id, content) {
        let element = document.createElement(elt);
            element.className = className;
            element.id = id;
            element.innerHTML = content;
        return element;
    }

    createButton (className, id, content, event, callback) {
        let button = document.createElement('button');
            button.className = className;
            button.id = id;
            button.innerHTML = content;
            button.addEventListener(event, (e) => callback(e));
        return button;
    }

    
    getElement(obj) {
        this.gameplay.addObject(obj);
    }
}