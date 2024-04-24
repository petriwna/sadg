import {Catalog} from "./Catalog";

export function init() {
    document.getElementById('up').addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    })
    new Catalog();
}

document.addEventListener('DOMContentLoaded', init);
