"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoublyLinkedList = void 0;
/**Implementación estructura DoublyLinkedList
 * Clase 'Node' y 'DoublyLinkedList'
 * @author Vaulentzc
 */
class Node {
    constructor(key) {
        this.key = key;
        this.prev = null; //la lista está vacía al principio
        this.next = null;
    }
}
/**Aquí se implementa la lista doblemente enlazada.*/
class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
    }
    /** pushfront-Agrega un nodo con un valor al inicio de la lista.*/
    pushFront(key) {
        const newNode = new Node(key);
        if (this.head === null) { //se crea un nuevo nodo y se verifica si la lista está vacía, si es así head y tal apuntan al nuevo nodo
            this.head = newNode;
            this.tail = newNode;
        }
        else {
            newNode.next = this.head; //sino, el nuevo nodo se conecta al frente de la lista
            this.head.prev = newNode;
            this.head = newNode;
        }
    }
    /** Retorna el valor del primer nodo de la lista.*/
    topFront() {
        return this.head !== null ? this.head.key : null;
    }
    /** popFront - Elimina un nodo al inicio de la lista.*/
    popFront() {
        if (this.head !== null) {
            this.head = this.head.next;
            if (this.head !== null) {
                this.head.prev = null;
            }
            else {
                this.tail = null;
            }
        }
    }
    /** pushBack - Agrega un nodo con un valor al final de la lista.*/
    pushBack(key) {
        const newNode = new Node(key);
        if (this.tail === null) {
            this.head = newNode;
            this.tail = newNode;
        }
        else {
            this.tail.next = newNode; //el nuevo nodo se conecta al final de la lista y se actualizan los punteros
            newNode.prev = this.tail;
            this.tail = newNode;
        }
    }
    /** topBack() - Retorna el valor del último nodo de la lista.*/
    topBack() {
        return this.tail !== null ? this.tail.key : null;
    }
    /** popBack() - elimina el último nodo de la lista, reduciendo así la longitud de la lista.*/
    popBack() {
        if (this.tail === null) {
            throw new Error("--- .popBack() inválido. Lista vacía ---");
        }
        else {
            if (this.head === this.tail) {
                this.head = null;
                this.tail = null;
            }
            else {
                this.tail = this.tail.prev;
                if (this.tail !== null) {
                    this.tail.next = null;
                }
            }
        }
    }
    /** find - Busca un valor específico en la lista y devuelve un booleano indicando
     * si se encuentra o no.*/
    find(key) {
        let current = this.head;
        while (current !== null) {
            if (current.key === key) {
                return true;
            }
            current = current.next;
        }
        return false;
    } //se recorre la lista y se verifica si el valor buscado está presente en algún nodo.
    /** erase - elimina un nodo específico que contiene un valor dado.
     * Si el valor no se encuentra en la lista, se lanzaun error.
     */
    erase(key) {
        let current = this.head;
        while (current !== null) {
            if (current.key === key) {
                if (current === this.head) {
                    this.head = current.next;
                    if (this.head !== null) {
                        this.head.prev = null;
                    }
                    if (current === this.tail) {
                        this.tail = null;
                    }
                }
                else if (current === this.tail) {
                    this.tail = current.prev;
                    if (this.tail !== null) {
                        this.tail.next = null;
                    }
                }
                else {
                    current.prev.next = current.next;
                    current.next.prev = current.prev;
                }
                return;
            }
            current = current.next;
        }
        throw new Error("--- .erase() inválido. Elemento no encontrado ---");
    } /*se busca el nodo con el valor dado y
    se elimina de la lista. Si el nodo no se encuentra, se lanza un error.*/
    /** empty() - sólo verifica si la lista está vacía o no.
     * Devuelve verdadero si la lista está vacía y falso si contiene al menos un elemento.
     */
    empty() {
        return this.head === null;
    }
    /** addBefore() - agrega un nuevo nodo antes de otro nodo específico en la lista.
     * se busca el nodo deseado y se agrega un nuevo nodo justo antes de este.
    */
    addBefore(node, key) {
        if (node === null) {
            throw new Error("--- .addBefore() inválido. Nodo nulo ---");
        }
        const newNode = new Node(key);
        if (node === this.head) {
            newNode.next = this.head;
            this.head.prev = newNode;
            this.head = newNode;
        }
        else {
            newNode.prev = node.prev;
            newNode.next = node;
            node.prev.next = newNode;
            node.prev = newNode;
        }
    }
    /** addAfter() - agrega un nuevo nodo después de otro nodo específico en la lista.
     * se busca el nodo deseado y se agrega un nuevo nodo justo después de este.
    */
    addAfter(node, key) {
        if (node === null) {
            throw new Error("--- .addAfter() inválido. La lista se encuentra vacía ---");
        }
        const newNode = new Node(key);
        if (node === this.tail) {
            newNode.prev = this.tail;
            this.tail.next = newNode;
            this.tail = newNode;
        }
        else {
            newNode.prev = node;
            newNode.next = node.next;
            node.next.prev = newNode;
            node.next = newNode;
        }
    }
    /**@method prettyPrint - Imprime el valor de cada elemento de la DoubleLinkedList */
    prettyPrint() {
        let current = this.head;
        while (current != null) {
            console.log(current.key);
            current = current.next;
        }
    }
}
exports.DoublyLinkedList = DoublyLinkedList;
