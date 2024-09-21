"use strict";
/**
 * AVL Implementation
 * @author dalopezgu
 */
class MyNode {
    constructor(key) {
        this.key = key;
        this.left = null;
        this.right = null;
        this.height = 1;
    }
}
class AVLTree {
    constructor() {
        this.root = null;
    }
    // Obtener la altura de un nodo
    height(node) {
        return node === null ? 0 : node.height;
    }
    // Obtener el balance de un nodo
    getBalance(node) {
        return node === null ? 0 : this.height(node.left) - this.height(node.right);
    }
    // Rotación simple a la derecha
    rotateRight(y) {
        const x = y.left;
        const T2 = x.right;
        // Realizar la rotación
        x.right = y;
        y.left = T2;
        // Actualizar alturas
        y.height = Math.max(this.height(y.left), this.height(y.right)) + 1;
        x.height = Math.max(this.height(x.left), this.height(x.right)) + 1;
        // Retornar nueva raíz
        return x;
    }
    // Rotación simple a la izquierda
    rotateLeft(x) {
        const y = x.right;
        const T2 = y.left;
        // Realizar la rotación
        y.left = x;
        x.right = T2;
        // Actualizar alturas
        x.height = Math.max(this.height(x.left), this.height(x.right)) + 1;
        y.height = Math.max(this.height(y.left), this.height(y.right)) + 1;
        // Retornar nueva raíz
        return y;
    }
    // Insertar un nodo
    insert(node, key) {
        if (node === null)
            return new MyNode(key);
        if (key.compareTo(node.key) < 0) {
            node.left = this.insert(node.left, key);
        }
        else if (key.compareTo(node.key) > 0) {
            node.right = this.insert(node.right, key);
        }
        else {
            return node; // No se permiten claves duplicados
        }
        node.height = 1 + Math.max(this.height(node.left), this.height(node.right));
        const balance = this.getBalance(node);
        // Casos de rotaciones para mantener el balance
        if (balance > 1 && key < node.left.key) {
            return this.rotateRight(node);
        }
        if (balance < -1 && key > node.right.key) {
            return this.rotateLeft(node);
        }
        if (balance > 1 && key > node.left.key) {
            node.left = this.rotateLeft(node.left);
            return this.rotateRight(node);
        }
        if (balance < -1 && key < node.right.key) {
            node.right = this.rotateRight(node.right);
            return this.rotateLeft(node);
        }
        return node;
    }
    // Encontrar el nodo con el valor mínimo en el árbol
    minValueNode(node) {
        let current = node;
        while (current.left !== null) {
            current = current.left;
        }
        return current;
    }
    // Eliminar un nodo
    delete(node, key) {
        if (node === null)
            return node;
        if (key.compareTo(node.key) < 0) {
            node.left = this.delete(node.left, key);
        }
        else if (key.compareTo(node.key) > 0) {
            node.right = this.delete(node.right, key);
        }
        else {
            if (node.left === null || node.right === null) {
                const temp = node.left !== null ? node.left : node.right;
                if (temp === null) {
                    return null;
                }
                else {
                    node = temp;
                }
            }
            else {
                const temp = this.minValueNode(node.right);
                node.key = temp.key;
                node.right = this.delete(node.right, temp.key);
            }
        }
        if (node === null)
            return node;
        node.height = 1 + Math.max(this.height(node.left), this.height(node.right));
        const balance = this.getBalance(node);
        if (balance > 1 && this.getBalance(node.left) >= 0) {
            return this.rotateRight(node);
        }
        if (balance > 1 && this.getBalance(node.left) < 0) {
            node.left = this.rotateLeft(node.left);
            return this.rotateRight(node);
        }
        if (balance < -1 && this.getBalance(node.right) <= 0) {
            return this.rotateLeft(node);
        }
        if (balance < -1 && this.getBalance(node.right) > 0) {
            node.right = this.rotateRight(node.right);
            return this.rotateLeft(node);
        }
        return node;
    }
    // Método para insertar un nodo desde la raíz
    insertKey(key) {
        this.root = this.insert(this.root, key);
    }
    // Método para eliminar un nodo desde la raíz
    deleteKey(key) {
        this.root = this.delete(this.root, key);
    }
    // Método para imprimir el árbol en orden
    inOrder(node, result = []) {
        if (node !== null) {
            this.inOrder(node.left, result);
            result.push(node.key);
            this.inOrder(node.right, result);
        }
        return result;
    }
    // Método para imprimir el árbol en orden desde la raíz
    inOrderTraversal() {
        return this.inOrder(this.root);
    }
    // Método para buscar un valor
    find(value) {
        return this.findNode(this.root, value);
    }
    findNode(node, value) {
        if (node === null) {
            return null;
        }
        if (value.compareTo(node.key) < 0) {
            return this.findNode(node.left, value);
        }
        else if (value.compareTo(node.key) > 0) {
            return this.findNode(node.right, value);
        }
        else {
            return node;
        }
    }
}
