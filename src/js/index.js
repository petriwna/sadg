import {Catalog} from "./Catalog";

export function init() {
    console.log("init");
    new Catalog();
}

document.addEventListener('DOMContentLoaded', init);
