export class Task {
    constructor(name = "New Task", prio = 1, desc = ""){
        this._name = name;
        this._prio = prio;
        this._desc = desc;
        this._done = false;
    }

    get desc(){
        return this._desc;
    }

    set desc(newdesc){
        this._desc = newdesc;
    }

    get name(){
        return this._name;
    }

    set name(newname){
        this._name = newname;
    }

    get prio(){
        return this._prio;
    }

    set prio(newvalue){
        this._prio = newvalue;
    }

    get finished(){
        return this._done;
    }

    set finished(newvalue){
        this._done = newvalue;
    }
}