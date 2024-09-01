class MyNode {
    key: number;
    height: number;
    left: MyNode | null = null;
    right: MyNode | null = null;

    constructor(key: number) {
        this.key = key;
        this.height = 1; // Altura inicial del nodo
    }
}

class AVLTree {
    root: (MyNode | null) = null;

    // Obtener la altura de un nodo
    public height(node: MyNode | null): number {
        return node === null ? 0 : node.height;
    }

    // Obtener el balance de un nodo
    public getBalance(node: MyNode | null): number {
        return node === null ? 0 : this.height(node.left) - this.height(node.right);
    }

    // Rotación simple a la derecha
    public rotateRight(y: MyNode): MyNode {
        const x = y.left!;
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
    public rotateLeft(x: MyNode): MyNode {
        const y = x.right!;
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
    public insert(node: MyNode | null, key: number): MyNode {
        if (node === null) return new MyNode(key);

        if (key < node.key) {
            node.left = this.insert(node.left, key);
        } else if (key > node.key) {
            node.right = this.insert(node.right, key);
        } else {
            return node; // No se permiten claves duplicadas
        }

        node.height = 1 + Math.max(this.height(node.left), this.height(node.right));
        const balance = this.getBalance(node);

        // Casos de rotaciones para mantener el balance
        if (balance > 1 && key < node.left!.key) {
            return this.rotateRight(node);
        }

        if (balance < -1 && key > node.right!.key) {
            return this.rotateLeft(node);
        }

        if (balance > 1 && key > node.left!.key) {
            node.left = this.rotateLeft(node.left!);
            return this.rotateRight(node);
        }

        if (balance < -1 && key < node.right!.key) {
            node.right = this.rotateRight(node.right!);
            return this.rotateLeft(node);
        }

        return node;
    }

    // Encontrar el nodo con el valor mínimo en el árbol
    public minValueNode(node: MyNode): MyNode {
        let current = node;
        while (current.left !== null) {
            current = current.left;
        }
        return current;
    }

    // Eliminar un nodo
    public delete(node: MyNode | null, key: number): MyNode | null {
        if (node === null) return node;

        if (key < node.key) {
            node.left = this.delete(node.left, key);
        } else if (key > node.key) {
            node.right = this.delete(node.right, key);
        } else {
            if (node.left === null || node.right === null) {
                const temp = node.left !== null ? node.left : node.right;

                if (temp === null) {
                    return null;
                } else {
                    node = temp;
                }
            } else {
                const temp = this.minValueNode(node.right);
                node.key = temp.key;
                node.right = this.delete(node.right, temp.key);
            }
        }

        if (node === null) return node;

        node.height = 1 + Math.max(this.height(node.left), this.height(node.right));
        const balance = this.getBalance(node);

        if (balance > 1 && this.getBalance(node.left) >= 0) {
            return this.rotateRight(node);
        }

        if (balance > 1 && this.getBalance(node.left) < 0) {
            node.left = this.rotateLeft(node.left!);
            return this.rotateRight(node);
        }

        if (balance < -1 && this.getBalance(node.right) <= 0) {
            return this.rotateLeft(node);
        }

        if (balance < -1 && this.getBalance(node.right) > 0) {
            node.right = this.rotateRight(node.right!);
            return this.rotateLeft(node);
        }

        return node;
    }

    // Método para insertar un nodo desde la raíz
    public insertKey(key: number): void {
        this.root = this.insert(this.root, key);
    }

    // Método para eliminar un nodo desde la raíz
    public deleteKey(key: number): void {
        this.root = this.delete(this.root, key);
    }

    // Método para imprimir el árbol en orden
    public inOrder(node: MyNode | null, result: number[] = []): number[] {
        if (node !== null) {
            this.inOrder(node.left, result);
            result.push(node.key);
            this.inOrder(node.right, result);
        }
        return result;
    }

    // Método para imprimir el árbol en orden desde la raíz
    public inOrderTraversal(): number[] {
        return this.inOrder(this.root);
    }
}


const tree = new AVLTree();

const startInsertTime = performance.now();

for(let i=0; i<1000; i++){
    tree.insertKey(i);
}

const endInsertTime = performance.now();
const insertDuration = endInsertTime - startInsertTime;

console.log(`Tiempo de ejecución de la inserción: ${insertDuration} milisegundos`);