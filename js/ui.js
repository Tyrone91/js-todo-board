import { Controller } from "./Controller.js";
import { List } from "./List.js";
import { Task } from "./Task.js";

function ifExits(pivot, callback){
    if(pivot){
        callback(pivot);
    }
}

/**
 * 
 * @param {Object} pivot 
 */
function isOptionsObject(pivot){
    return pivot.hasOwnProperty("classes") ||
            pivot.hasOwnProperty("onclick") ||
            pivot.hasOwnProperty("onchange") ||
            pivot.hasOwnProperty("id")
    ;
}

/**
 * @typedef Options
 * @property {string[]} [classes]
 * @property {string} [id]
 * @property {function(event)} [onclick]
 * @property {function(event)} [onchange]
 * 
 * @typedef AugemntedHTMLElement
 * @property {function(...string):AugemntedHTMLElement} addClass
 * @property {function(string, callback):AugemntedHTMLElement} on
 * 
 * @param {string} elementName 
 * @param {Options} [options] 
 * @param {...HTMLElement|...string} [childs] 
 */
function html(elementName, options, ...childs){
    const args = Array.prototype.slice.call(arguments);
    const res  = document.createElement(elementName);
    if(options && !isOptionsObject(options) ){
        if(!Array.isArray(options)){
            options = [options];
        }
        childs = options.concat(...childs);
        options = null;
    }

    ifExits(options, () => {
        ifExits(options.classes, classes => classes.forEach( clazz => res.classList.add(clazz)));
    });

    ifExits(childs, () => childs.forEach( child => {
        if(typeof child === "string" || typeof child === "number" || typeof child === "boolean"){
            res.appendChild( document.createTextNode(child) );
        }else{
            res.appendChild(child);
        }
    }));

    res.on = function(eventName, callback){
        res.addEventListener(eventName, callback);
        return res;
    }

    res.addClass = function(...classes){
        res.classList.add(...classes);
        return res;
    }

    res.attr = function(key, value){
        res.setAttribute(key,value);
        return this;
    }

    return res;
}

export class UI {
    /**
     * 
     * @param {Controller} controller 
     */
    constructor(controller){
        this._controller = controller;
    }

    /**
     * 
     * @param {List} list 
     */
    buildListElement(list){
        const listHeader = html("div", {classes:["list-header"]}, 
            html("input").attr("value", list.name).attr("placeholder", "List name").on("change", event => this._controller.changeNameOfList(list, event.currentTarget.value)),
            html("div",
                html("button", "New").on("click", () => this._controller.createNewTask(list, "New Task", "" , 10) ),
                html("button", "Sort").on("click", () => this._controller.sortListByPrio(list, "", "" , 0) ),
                html("button", "X").on("click", () => this._controller.deleteList(list) )
            ).addClass("list-controls")
        );

        const res = html("div", {classes: ["task-list"]},
            listHeader,
            this.buildListBody(list.getSortedByPrio(),list)
        );
        return res;
    }

    /**
     * 
     * @param {Task[]} tasks 
     */
    buildListBody(tasks, parent){
        
        const listBody = html("div",
            tasks.map( task => this.buildTaskElement(task, tasks) )
        ).addClass("list-body");
        return listBody;
    }

    /**
     * 
     * @param {Task} task 
     */
    buildTaskElement(task, list){
        const header = html("div", 
            html("input").attr("placeholder","name").attr("value", task.name).addClass("task-name")
            .on("change", (event) => this._controller.changeNameOfTask(task, event.currentTarget.value)),

            html("input").attr("placeholder","prio").attr("value", task.prio).addClass("task-prio")
            .on("change", (event) => this._controller.changePrioOfTask(task, event.currentTarget.value))

        ).addClass("task-header");
        
        const body = html("div", 
            html("input").attr("placeholder","Description").attr("value", task.desc).addClass("task-desc")
            .on("change", (event) => this._controller.changeDescTask(task, event.currentTarget.value))
        );
        const deleteBttn = html("button", "X").on("click", event => this._controller.deleteTask(task,list));
        const controls = html("div", deleteBttn);
        return html("div", header, body, controls).addClass("task-element");
    }

    buildBoardElement(){
        const controls = html("div", html("button", "New List").on("click", event => this._controller.createNewList("New List") ));
        return html("div", 
            controls, 
            html("div",
                this._controller.getLists().map( l=> this.buildListElement(l)) 
            )
        ).addClass("todo-board");
    }
}