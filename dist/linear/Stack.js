"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stack = void 0;
/**
 * Implementación estructura 'Stack'
 * Mediante clase 'Stack'
 * @author dalopezgu
 */
class Stack {
    /**@constructor */
    constructor(length) {
        this.length = length;
        this.top = 0;
        this.list = [];
    }
    /**@method empty - Notifica si la 'Stack' está vacia */
    empty() {
        return this.top == 0;
    }
    /**@method  full - Notifica si la 'Stack' está llena */
    full() {
        return this.top >= this.length;
    }
    /**@method pop - Quita elemento de la 'Stack' */
    pop() {
        if (this.empty()) {
            throw new Error("---  .pop() invalido. Stack vacia  ---");
        }
        this.top--;
        return this.list[this.top];
    }
    /**@method push - Agrega elemento a la 'Stack' */
    push(item) {
        if (this.full()) {
            throw new Error("---  .push() invalido. Stack llena  ---");
        }
        this.list[this.top] = item;
        this.top++;
    }
    /**@method last - Retorna el ultimo item de la 'Stack' */
    last() {
        return this.list[this.top - 1];
    }
}
exports.Stack = Stack;
