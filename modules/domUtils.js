

export class DomUtils {

    constructor() {}

    static createElement(tag, id, className, content) {
        let element = document.createElement(tag);
        if (id) element.id = id;
        if (className) element.className = className;
        if (content) element.innerHTML = content;
        return element;
    }

    static createButton(id, className, content, event, callback) {
        let button = DomUtils.createElement('button', id, className, content);
        button.addEventListener("click", (e) => {
            console.log("test")
        });
        console.log(button)
        return button;
    }
}