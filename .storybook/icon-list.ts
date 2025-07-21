import fetch from 'node-fetch';

export class DynamicIconList {
    
    constructor() {}

    configIconList(url) {
        return fetch(url).then((r)=>{ return r});
    }


    setVariable(d) {
        localStorage.setItem('data', JSON.stringify(d));
    }

    setLocalStorageData(d, name) {
        localStorage.setItem(name, JSON.stringify(d));
    }

}

