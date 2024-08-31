/**
 * Implementación estructura 'SinglyLinkedList'
 * Mediante clase 'Node' y 'SinglyLinkedList'
 * @author dalopezgu
 */
class Node<T>{

    public key: T;
    public next: Node<T> | null | undefined;

    
    /**@constructor*/

    constructor(key: T){
        this.key = key;
        this.next = null;
    }
}


export class SinglyLinkedList<T>{
    
    private head: Node<T> | null | undefined;
    private tail: Node<T> | null | undefined;


    /**@constructor*/

    constructor(){
        this.head = null;
        this.tail = null;
    }


    /**@method pushFront - Agrega un Nodo con un valor al inicio de la lista */

    pushFront(key: T): void{
        let node = new Node<T>(key);
    
        node.next = this.head;
        this.head = node;
    
        if(this.tail == null){
            this.tail = node;
        }
    }


    /**@method topFront - Retorna el valor del Nodo al inicio de la Lista */

    topFront(): T | null{
         if(this.head?.key == null){
            return null;
         }else{
            return this.head?.key;
         }
    }


    /**@method popFront - Elimina un Nodo al inicio de la lista */

    popFront(): void{
        if(this.head == null){
            throw new Error("---  .popFront() invalido. Lista vacia  ---");
        }else{
            this.head = this.head.next;
        }
    }


    /**@method pushBack - Agrega un Nodo con un valor al final de la lista */

    pushBack(key: T): void{
        let node = new Node<T>(key);

        if(this.tail == null){
            this.head = node;
            this.tail = node;
        }else{
            this.tail.next = node;
            this.tail = node;
        }
    }


    /**@method topBack - Retorna el valor del nodo al final de la lista */

    topBack(): T | null{
        if(this.tail?.key == null){
            return null;
        }else{
            return this.tail?.key;
        }
    }


    /**@method popBack - Elimina el Nodo al final de la lista  -  En caso de no esta el Nodo lanza ERROR */

    popBack(): void{
        if(this.head == null){
            throw new Error("---  .popBack() invalido. Lista vacia  ---");
        }if(this.head == this.tail){
            this.head = null;
            this.tail = null;
        }else{

            let temp = new Node<T>(this.head.key);
            
            temp = this.head;

            while(temp.next?.next != null){
                temp = temp.next;
            }

            temp.next = null;
            this.tail = temp;

        }
    }


    /**@method find - Retorna un booleano que verifica si un valor esta en algún nodo de la lista */

    find(key: T): boolean{

        if(this.head != null) {

            let notFind = true;
            let node = new Node<T>(this.head?.key);
            
            node = this.head;
            
            while(notFind){
                if(node.key == key){
                    notFind = false;
                }
            }

            return notFind;
            
        }else{
            return false;
        }

    }

    
    /**@method erase - Elimina el nodo cuyo valor sea ingresado  -  En caso de no ser encontrado lanza ERRROR */

    erase(key: T): void{
        
        if(this.head == null){
            throw new Error("---  .erase() invalido. Lista vacia  ---");
        }
        if(this.head.key == key){
            this.head = this.head.next;
            
            if(this.head == null){
                this.tail = null;
            }

        }else{

            let node = new Node<T>(this.head.key);
            node = this.head;

            while(node.next?.key != key   &&   node != this.tail){
                if(node.next != null){
                    node = node.next;
                }
            }

            if(node != this.tail){
                node.next = node.next?.next;
                
                if(node.next == null){
                    this.tail = node;
                }
            }else{
                throw new Error("---  .erase() invalido. Elemento no encontrado  ---");
            }

        }

    }


    /**@method empty - Retorna un booleano verificando si la lista está vacia */

    empty(): boolean{
        return this.head == null;
    }


    /**@method addBefore - Agrega un valor antes de un item ingresado  -  En caso de no esncontrar el item o que la lista esté vaicia lanza ERROR */

    addBefore(node: Node<T>, key: T): void{
        if(this.head == null){
            throw new Error("---  .addBefore() invalido. Lista vacia  ---");
        }

        let refNode = new Node<T>(this.head.key);
        let newNode = new Node<T>(key);

        if(this.head == node){
            newNode.next = this.head.next;
            this.head = newNode;
        
        }else{

            refNode = this.head;

            while(refNode.next != node   &&   refNode != this.tail) {
                if(refNode.next != null){
                    refNode = refNode.next;
                }
            }
         
            if(refNode != this.tail){
                newNode.next = refNode.next;
                refNode.next = newNode;
            }else{
                throw new Error("---  .addBefore() invalido. Nodo no encontrado  ---");
            }

        }

    }
    

    /**@method addAfter - Agrega un valor después de un item ingresado  -  En caso de no esncontrar el item o que la lista esté vaicia lanza ERROR */
    
    addAfter(node: Node<T>, key: T): void{
        
        if(this.head == null){
            throw new Error("---  .addAfter() invalido. Lista vacia  ---");
        }

        let newNode = new Node<T>(key);

        if(this.find(node.key)){
             
            newNode.next = node.next;
            node.next = newNode;

            if(this.tail == node){
                this.tail = node;
            }
        }else{
            throw new Error("---  .addAfter() invalido. Nodo no encontrado  ---");
        }
    }


    /**@method prettyPrint - Imprime el valor de cada elemento de la linkedlist */

    prettyPrint(): void{
        let current = this.head;

        while(current != null){
            console.log(current.key);

            current = current.next;
        }

    }

}