import { List } from "./List.js";
import { Task } from "./Task.js";
import { UI } from "./ui.js";
import { Controller } from "./Controller.js";

window.addEventListener("load", main);
function main(){
    
    const controller = new Controller(document.body);
    const oldState = JSON.parse(window.localStorage.saved_state || "[]");

    if(oldState && oldState.length !== 0){
        controller.load(oldState);
    }else{
        controller._lists.push( new List("New List") );
    }
    controller.render();

    window.addEventListener("unload", () => {
        window.localStorage.saved_state = JSON.stringify(controller._lists);
    });
}