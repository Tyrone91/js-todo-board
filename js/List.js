import { Task } from "./Task.js";

export class List{

    /**
     * 
     * @param {string} listname 
     */
    constructor(listname = "New List"){
        this._name = listname;

        /**@type {Task[]} */
        this._entries = [];
    }

    get name(){
        return this._name;
    }

    set name(newname){
        this._name = newname;
    }

    /**
     * 
     * @param {Task} entry 
     */
    addEntry(entry){
        this._entries.push(entry);
    }

    /**
     * 
     * @param {Task} entry 
     */
    removeEntry(entry){
        const index = this._entries.indexOf(entry);
        if(index === -1){
            return;
        }
        this._entries.splice(index, 1);
    }

    getSortedByName(){
        return this._entries.sort( (a,b) => {
            if(a.name < b.name){
                return -1;
            }
            if(a.name > b.name){
                return 1;
            }
            return 0;
        });
    }

    getSortedByPrio(finishedToLowest){
        return this._entries.sort( (a,b) => {
            if(finishedToLowest){
                if(a.finished && !b.finished){
                    return 1;
                }
                if(!a.finished && b.finished){
                    return -1;
                }
            }
            if(a.prio < b.prio){
                return -1;
            }
            if(a.prio > b.prio){
                return 1;
            }
            return 0;
        });
    }
}