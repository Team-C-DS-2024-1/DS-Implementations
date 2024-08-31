/**
 * Implementación estructura 'Queue'
 * Mediante clase 'Queue'
 * @author dalopezgu
 */
export class Queue<T>{
    private length: number
    private count: number
    private top: number
    private rear: number
    private list: T[]


    /** @constructor */
    
    constructor(length: number){
        this.length = length;
        this.count = 0;
        this.top = 0;
        this.rear = 0
        this.list = []; 
    }


    /**@method  full - Notifica si la 'Queue' está llena*/

    full(): boolean{
        return this.count >= this.length;
    }


    /**@method empty - Notifica si la 'Queue' está llena */

    empty(): boolean{
        return this.count <= 0;
    }


    /**@method enqueue - Agrega un elemento a la 'Queue' */

    enqueue(item: T): void{

        if(this.full()){
            throw new Error("---  .enqueue() invalido. Queue llena  ---");
        }

        this.list[this.rear] = item;
        this.rear = (this.rear + 1) % this.length;
        this.count++;
    }


    /**@method dequeue - Quita elemento de la 'Queue', retornando a la vez este elemento */

    dequeue(): T{

        if(this.empty()) {
            throw new Error("---  .dequeue() invalido. Queue vacia  ---");
        }

        const item: T = this.list[this.top];
        this.top = (this.top + 1) % this.length;
        this.count--;

        return item;
    }

}