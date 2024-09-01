/**
 * Binary Search Tree implementation
 * @author Vaulentzc
 */
// clase BinarySearchTree 
class BinarySearchTree<T extends Comparable<T>> {
    private root: BinaryNode<T> | null; // Referencia a la raíz del árbol.

    // se crea un árbol vacío.
    constructor() {
        this.root = null;
    }

    // Método para obtener la raíz del árbol.
    public getRoot(): BinaryNode<T> | null {
        return this.root;
    }

    // Método para vaciar el árbol, establece la raíz a null.
    public makeEmpty(): void {
        this.root = null;
    }

    // Método para comprobar si el árbol está vacío.
    public isEmpty(): boolean {
        return this.root === null;
    }

    // Método para insertar un valor en el árbol.
    public insert(x: T): void {
        this.root = this.insertNode(x, this.root);
    }

    // Método privado recursivo que inserta el valor x en el árbol cuya raíz es t.
    private insertNode(x: T, t: BinaryNode<T> | null): BinaryNode<T> {
        // Si el árbol está vacío, se crea un nuevo nodo con el valor x.
        if (t === null) {
            return new BinaryNode(x);
        }

        // Aquí se compara el valor a insertar con el valor del nodo actual.
        // Si es menor, se inserta en el subárbol izquierdo.
        if (x.compareTo(t.element) < 0) {
            t.left = this.insertNode(x, t.left);
        }
        // Si es mayor, se inserta en el subárbol derecho.
        else if (x.compareTo(t.element) > 0) {
            t.right = this.insertNode(x, t.right);
        }
        // En caso de que el valor sea igual, el valor ya está en el árbol y no se inserta de nuevo.
        else {
            console.log("Item en el árbol, no insertado.");
        }

        return t;
    }

    // Método que verifica si un valor ya está en el árbol.
    public contains(x: T): boolean {
        return this.containsNode(x, this.root);
    }

    // Método privado recursivo para verificar si un valor está en el árbol.
    private containsNode(x: T, t: BinaryNode<T> | null): boolean {
        // Si el árbol está vacío, el valor no se encuentra.
        if (t === null) {
            return false;
        }

        // Comparar el valor buscado con el valor del nodo actual.

        // Si es menor, se busca en el subárbol izquierdo.
        if (x.compareTo(t.element) < 0) {
            return this.containsNode(x, t.left);
        }
        // Si es mayor, se busca en el subárbol derecho.
        else if (x.compareTo(t.element) > 0) {
            return this.containsNode(x, t.right); // Corrección aquí, debe ser t.right
        }
        // Si es igual, el valor se ha encontrado.
        else {
            return true;
        }
    }

    // Método para encontrar el valor mínimo en el árbol.
    public findMin(): T {
        if (this.isEmpty()) {
            throw new Error("¡El árbol está vacío!");
        }

        const minNode = this.findMinNode(this.root);
        if (minNode === null) {
            throw new Error("No se encontró un valor mínimo."); // Manejo de error adicional
        }
        return minNode.element;
    }

    // Método privado recursivo para encontrar el nodo con el valor mínimo.
    private findMinNode(t: BinaryNode<T> | null): BinaryNode<T> | null {
        // Si el nodo es null, no hay mínimo.
        if (t === null) {
            return null;
        }
        // Si el nodo no tiene hijo izquierdo, es el nodo con el valor mínimo.
        else if (t.left === null) {
            return t;
        }
        // Continuar buscando en el subárbol izquierdo.
        return this.findMinNode(t.left);
    }

    // Método público para eliminar un valor del árbol.
    public remove(x: T): void {
        this.root = this.removeNode(x, this.root);
    }

    // Método privado recursivo para eliminar un valor del árbol.
    private removeNode(x: T, t: BinaryNode<T> | null): BinaryNode<T> | null {
        // Si el nodo es null, el valor no se encuentra.
        if (t === null) {
            return t;
        }

        // Comparar el valor a eliminar con el valor del nodo actual.
        // Si es menor, se elimina del subárbol izquierdo.
        if (x.compareTo(t.element) < 0) {
            t.left = this.removeNode(x, t.left);
        }
        // Si es mayor, se elimina del subárbol derecho.
        else if (x.compareTo(t.element) > 0) {
            t.right = this.removeNode(x, t.right);
        }
        // Si se encuentra el valor a eliminar
        else if (t.left !== null && t.right !== null) {
            // Nodo con dos hijos: se reemplaza por el mínimo de su subárbol derecho.
            const minNode = this.findMinNode(t.right);
            if (minNode !== null) {
                t.element = minNode.element;
                // Se elimina el nodo que se usó para reemplazar.
                t.right = this.removeNode(t.element, t.right);
            }
        } else {
            // Nodo con un hijo o sin hijos: se reemplaza por su hijo o se elimina.
            t = (t.left !== null) ? t.left : t.right;
        }

        return t;
    }

    // Método para calcular la altura del árbol.
    private height(t: BinaryNode<T> | null): number {
        // Si el nodo es null, la altura es -1.
        if (t === null) {
            return -1;
        }
        // Altura es 1 más la mayor altura de sus subárboles izquierdo y derecho.
        else {
            return 1 + Math.max(this.height(t.left), this.height(t.right));
        }
    }
}

// Interfaz Comparable que requiere la implementación del método compareTo.
interface Comparable<T> {
    compareTo(other: T): number;
}

// Clase interna que define un nodo en el árbol binario.
class BinaryNode<T> {
    left: BinaryNode<T> | null;  // Hijo izquierdo
    element: T;                  // Valor almacenado en el nodo
    right: BinaryNode<T> | null; // Hijo derecho

    // Constructor que inicializa un nodo con un valor específico.
    constructor(data: T) {
        this.left = null;
        this.element = data;
        this.right = null;
    }
}
