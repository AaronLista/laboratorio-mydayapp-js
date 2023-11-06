export class LocalStorageReader {

    constructor(key){
        this.key = key;

        if(!localStorage.getItem(this.key)){
            localStorage.setItem(this.key,JSON.stringify([
                {
                    id:"0",
                    title:"Hola Pais",
                    completed:false
                },
                {
                    id:"1",
                    title:"Hola mundo",
                    completed:false
                },
                {
                    id:"2",
                    title:"Hola Sistema Solar",
                    completed:false
                }
            ]));
            console.log("se creo un nuevo item")
        } 
    }

    getLocalSotageInfo(){
        return JSON.parse(localStorage.getItem(this.key));
    }

    updateLocalStorage(array){
        let stringArray = JSON.stringify(array);
        localStorage.setItem(this.key,stringArray);
    }


}