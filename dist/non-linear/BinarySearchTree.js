/**
 * Implementación para arbol BST
 * @author Vaulentzc
 */

// Se tiene la clase BinarySearchTree
class BinarySearchTree {
    constructor() {
        this.root = null; // Referencia a la raíz del árbol
    }

    // Método para obtener la raíz del árbol
    getRoot() {
        return this.root;
    }

    // Método para vaciar el árbol, establece la raíz a null
    makeEmpty() {
        this.root = null;
    }

    // Método para comprobar si el árbol está vacío
    isEmpty() {
        return this.root === null;
    }

    // Método para insertar un valor en el árbol
    insert(x) {
        this.root = this.insertNode(x, this.root);
    }

    // Método privado recursivo que inserta el valor x en el árbol cuya raíz es t
    insertNode(x, t) {
        if (t === null) {
            return new BinaryNode(x);
        }

        if (x < t.element) {
            t.left = this.insertNode(x, t.left);
        } else if (x > t.element) {
            t.right = this.insertNode(x, t.right);
        } else {
            console.log("Item en el árbol, no insertado.");
        }

        return t;
    }

    // Método que verifica si un valor ya está en el árbol
    contains(x) {
        return this.containsNode(x, this.root);
    }

    // Método privado recursivo para verificar si un valor está en el árbol
    containsNode(x, t) {
        if (t === null) {
            return false;
        }

        if (x < t.element) {
            return this.containsNode(x, t.left);
        } else if (x > t.element) {
            return this.containsNode(x, t.right);
        } else {
            return true;
        }
    }

    // Método para encontrar el valor mínimo en el árbol
    findMin() {
        if (this.isEmpty()) {
            throw new Error("¡El árbol está vacío!");
        }

        return this.findMinNode(this.root).element;
    }

    // Método privado recursivo para encontrar el nodo con el valor mínimo
    findMinNode(t) {
        if (t === null) {
            return null;
        } else if (t.left === null) {
            return t;
        }
        return this.findMinNode(t.left);
    }

    // Método público para eliminar un valor del árbol
    remove(x) {
        this.root = this.removeNode(x, this.root);
    }

    // Método privado recursivo para eliminar un valor del árbol
    removeNode(x, t) {
        if (t === null) {
            return t;
        }

        if (x < t.element) {
            t.left = this.removeNode(x, t.left);
        } else if (x > t.element) {
            t.right = this.removeNode(x, t.right);
        } else if (t.left !== null && t.right !== null) {
            const minNode = this.findMinNode(t.right);
            t.element = minNode.element;
            t.right = this.removeNode(t.element, t.right);
        } else {
            t = (t.left !== null) ? t.left : t.right;
        }

        return t;
    }

    // Método para calcular la altura del árbol
    height() {
        return this.heightNode(this.root);
    }

    // Método privado recursivo para calcular la altura del árbol
    heightNode(t) {
        if (t === null) {
            return -1;
        } else {
            return 1 + Math.max(this.heightNode(t.left), this.heightNode(t.right));
        }
    }
}

// Clase BinaryNode que define un nodo en el árbol binario
class BinaryNode {
    constructor(data) {
        this.left = null;  // Hijo izquierdo
        this.element = data; // Valor almacenado en el nodo
        this.right = null; // Hijo derecho
    }
}

