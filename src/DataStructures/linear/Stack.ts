/**
 * Implementación estructura 'Stack'
 * Mediante clase 'Stack'
 * @author dalopezgu
 */
export class Stack<T>{
    private top:number
    private length: number
    private list: T[]


    /**@constructor */

    constructor(length: number){
        this.length = length;
        this.top = 0;
        this.list = [];
    }


    /**@method empty - Notifica si la 'Stack' está vacia */

    empty(): boolean{
        return this.top == 0;
    }


    /**@method  full - Notifica si la 'Stack' está llena */

    full(): boolean{
        return this.top >= this.length;
    }


    /**@method pop - Quita elemento de la 'Stack' */

    pop(): T{

        if(this.empty()){
            throw new Error("---  .pop() invalido. Stack vacia  ---")
        }

        this.top--;
        return this.list[this.top];
    }


    /**@method push - Agrega elemento a la 'Stack' */

    push(item: T): void{
        
        if(this.full()){
            throw new Error("---  .push() invalido. Stack llena  ---");
        }

        this.list[this.top] = item;
        this.top++;
    }

    /**@method last - Retorna el ultimo item de la 'Stack' */

    last(): T{
        return this.list[this.top - 1];
    }

}