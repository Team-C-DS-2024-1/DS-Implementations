"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Queue = void 0;
/**
 * Implementación estructura 'Queue'
 * Mediante clase 'Queue'
 * @author dalopezgu
 */
class Queue {
    /** @constructor */
    constructor(length) {
        this.length = length;
        this.count = 0;
        this.top = 0;
        this.rear = 0;
        this.list = [];
    }
    /**@method  full - Notifica si la 'Queue' está llena*/
    full() {
        return this.count >= this.length;
    }
    /**@method empty - Notifica si la 'Queue' está llena */
    empty() {
        return this.count <= 0;
    }
    /**@method enqueue - Agrega un elemento a la 'Queue' */
    enqueue(item) {
        if (this.full()) {
            throw new Error("---  .enqueue() invalido. Queue llena  ---");
        }
        this.list[this.rear] = item;
        this.rear = (this.rear + 1) % this.length;
        this.count++;
    }
    /**@method dequeue - Quita elemento de la 'Queue', retornando a la vez este elemento */
    dequeue() {
        if (this.empty()) {
            throw new Error("---  .dequeue() invalido. Queue vacia  ---");
        }
        const item = this.list[this.top];
        this.top = (this.top + 1) % this.length;
        this.count--;
        return item;
    }
}
exports.Queue = Queue;
