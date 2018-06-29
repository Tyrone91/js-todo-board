import { List } from "./List.js";
import { Task } from "./Task.js";
import { UI } from "./ui.js";

export class Controller{

    /**
     * 
     * @param {HTMLElement} domTarget 
     */
    constructor(domTarget){
        this._lists = [];
        this._dom = domTarget;
        this._ui = new UI(this);
    }

    createNewList(name){
        const list = new List(name);
        this._lists.push(list);
        this.render();
        return true;
    }

    /**
     * 
     * @param {List} list 
     * @param {string} name 
     * @param {string} desc 
     * @param {number} prio 
     */
    createNewTask(list, name, desc, prio){
        list.addEntry(new Task(name,prio,desc));
        this.render();
        return true;
    }

    /**
     * @returns {List[]}
     */
    getLists(){
        return this._lists;
    }

    deleteList(list){
        const index = this._lists.indexOf(list);
        if(index === -1){
            return false;
        }
        this._lists.splice(index,1);
        this.render();
        return true;
    }

    deleteTask(task,list){
        const index = list.indexOf(task);
        list.splice(index,1);
        this.render();
    }

    /**
     * 
     * @param {Task} task 
     * @param {number} newprio 
     */
    changePrioOfTask(task, newprio){
        
        newprio = parseInt(newprio);
        if(typeof newprio !== "undefined"){
            task.prio = newprio;    
        }
        this.render();
    }

    /**
     * 
     * @param {Task} task 
     * @param {string} name 
     */
    changeNameOfTask(task, name){
        task.name = name;
        this.render();
    }

    /**
     * 
     * @param {List} list 
     * @param {string} name 
     */
    changeNameOfList(list, name){
        list.name = name;
        this.render();
    }

    changeDescTask(task, str){
        task.desc = str;
        this.render();
    }

    /**
     * 
     * @param {List} list 
     */
    sortListByPrio(list){
        
    }

    /**
     * 
     * @param {List[]} array 
     */
    load(array){
        console.log(array);    
        array.forEach( entry => {
            const res = new List(entry._name);
            entry._entries.forEach(task => {
                res._entries.push( new Task(task._name, task._prio, task._desc) );
            });
            this._lists.push(res);
        });
    }

    render(){
        while(this._dom.firstChild){
            this._dom.removeChild(this._dom.firstChild);
        }
        this._dom.appendChild(this._ui.buildBoardElement());
    }
}