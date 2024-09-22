/**Implementación para Tablas Hash
 * @author Vaulentzc
 *Se utilizan listas simplemente enlazadas para manejar las colisiones*/

// Clase que representa un par clave-valor en la tabla hash.
class Entry {
    /**
     * @param {*} key - La clave del par.
     * @param {*} value - El valor asociado a la clave.
     */
    constructor(key, value) {
        this.key = key;
        this.value = value;
    }

    /**
     * Retorna la clave.
     * @returns {*} La clave.
     */
    getKey() {
        return this.key;
    }

    /**
     * Retorna el valor.
     * @returns {*} El valor asociado a la clave.
     */
    getValue() {
        return this.value;
    }

    /**
     * Actualiza el valor.
     * @param {*} value - El nuevo valor.
     */
    setValue(value) {
        this.value = value;
    }
}

// Clase que representa un nodo en una lista enlazada simple.
class SinglyLinkedListNode {
    /**
     * @param {*} key - El objeto almacenado en el nodo (normalmente un Entry).
     */
    constructor(key) {
        this.key = key;
        this.next = null;
    }
}

// Clase que representa una lista enlazada simple.
class SinglyLinkedList {
    constructor() {
        this.head = null;
    }

    /**
     * Añade un nodo al final de la lista enlazada.
     * @param {*} key - El objeto a añadir (normalmente un Entry).
     */
    pushBack(key) {
        const newNode = new SinglyLinkedListNode(key);
        if (!this.head) {
            this.head = newNode; // Si la lista está vacía, el nuevo nodo es la cabeza.
        } else {
            let current = this.head;
            while (current.next) { // Itera hasta el último nodo.
                current = current.next;
            }
            current.next = newNode; // Añade el nuevo nodo al final.
        }
    }

    /**
     * Elimina un nodo de la lista enlazada basado en el objeto almacenado.
     * @param {*} key - El objeto a eliminar (normalmente un Entry).
     */
    delete(key) {
        if (!this.head) return; // Si la lista está vacía, no hace nada.

        if (this.head.key === key) {
            this.head = this.head.next; // Si la cabeza es el nodo a eliminar, se elimina.
            return;
        }

        let current = this.head;
        while (current.next && current.next.key !== key) {
            current = current.next; // Itera hasta encontrar el nodo a eliminar.
        }

        if (current.next) {
            current.next = current.next.next; // Elimina el nodo saltándolo.
        }
    }
}

class HashTable {
    // Capacidad por defecto de la tabla hash.
    static DEFAULT_CAPACITY = 16;

    // Factor de carga para determinar cuándo redimensionar.
    static LOAD_FACTOR = 0.75;

    /**
     * Constructor que inicializa la tabla con una capacidad opcional, por defecto es 16.
     * @param {number} [capacity=HashTable.DEFAULT_CAPACITY] - La capacidad inicial de la tabla hash.
     */
    constructor(capacity = HashTable.DEFAULT_CAPACITY) {
        this.table = new Array(capacity).fill(null).map(() => null);
        this._size = 0;
    }

    /**
     * Obtiene el índice en la tabla hash basado en la clave.
     * @param {*} key - La clave para calcular el índice.
     * @returns {number} El índice calculado.
     */
    getIndex(key) {
        const hashCode = this.hashCode(key); // Calcula el hash de la clave.
        return Math.abs(hashCode) % this.table.length; // Asegura que el índice esté dentro del rango.
    }

    /**
     * Calcula un código hash para la clave.
     * @param {*} key - La clave para calcular el hash.
     * @returns {number} El código hash.
     */
    hashCode(key) {
        if (typeof key === 'number') {
            return key; // Si la clave es un número, se usa directamente como hash.
        } else {
            let hash = 0;
            const keyString = key.toString(); // Convierte la clave a string.
            for (let i = 0; i < keyString.length; i++) {
                const char = keyString.charCodeAt(i); // Obtiene el código de carácter de cada letra.
                hash = (hash << 5) - hash + char; // Operación de desplazamiento y suma para crear el hash.
                hash |= 0; // Convierte el hash a un entero de 32 bits.
            }
            return hash;
        }
    }

    /**
     * Obtiene la lista enlazada en un índice específico de la tabla.
     * Crea una nueva lista si no existe.
     * @param {number} index - El índice de la tabla hash.
     * @returns {SinglyLinkedList} La lista enlazada en el índice.
     */
    getList(index) {
        if (!this.table[index]) {
            this.table[index] = new SinglyLinkedList(); // Crea una nueva lista si no existe.
        }
        return this.table[index];
    }

    /**
     * Inserta o actualiza un valor en la tabla hash.
     * @param {*} key - La clave del elemento.
     * @param {*} value - El valor a asociar con la clave.
     */
    put(key, value) {
        const index = this.getIndex(key); // Obtiene el índice para la clave.
        const list = this.getList(index); // Obtiene la lista enlazada correspondiente.

        const entry = this.findEntry(list, key); // Busca si ya existe un par clave-valor.
        if (entry) {
            entry.setValue(value); // Si existe, actualiza el valor.
        } else {
            list.pushBack(new Entry(key, value)); // Si no existe, añade un nuevo par clave-valor.
            this._size++; // Incrementa el tamaño de la tabla.

            // Verifica si se necesita redimensionar la tabla.
            if (this._size / this.table.length > HashTable.LOAD_FACTOR) {
                this.resize(this.table.length * 2); // Duplica la capacidad.
            }
        }
    }

    /**
     * Redimensiona la tabla hash a una nueva capacidad y reinsertar todos los elementos.
     * @param {number} newCapacity - La nueva capacidad de la tabla hash.
     */
    resize(newCapacity) {
        const oldTable = this.table;
        this.table = new Array(newCapacity).fill(null).map(() => null);
        this._size = 0; // Reinicia el tamaño, se volverá a calcular al reinsertar.

        for (const list of oldTable) { // Itera sobre cada lista en la tabla antigua.
            if (list) {
                let node = list.head;
                while (node) { // Itera sobre cada nodo en la lista enlazada.
                    const entry = node.key;
                    this.put(entry.getKey(), entry.getValue()); // Re-inserta el par clave-valor.
                    node = node.next;
                }
            }
        }
    }

    /**
     * Obtiene un valor asociado a una clave.
     * @param {*} key - La clave a buscar.
     * @returns {*} El valor asociado a la clave o null si no se encuentra.
     */
    get(key) {
        const index = this.getIndex(key); // Obtiene el índice para la clave.
        const list = this.getList(index); // Obtiene la lista enlazada correspondiente.

        const entry = this.findEntry(list, key); // Busca el par clave-valor.
        return entry ? entry.getValue() : null; // Retorna el valor o null si no se encuentra.
    }

    /**
     * Elimina un par clave-valor de la tabla hash.
     * @param {*} key - La clave del elemento a eliminar.
     */
    remove(key) {
        const index = this.getIndex(key); // Obtiene el índice para la clave.
        const list = this.getList(index); // Obtiene la lista enlazada correspondiente.

        const entry = this.findEntry(list, key); // Busca el par clave-valor.
        if (entry) {
            list.delete(entry); // Si existe, lo elimina de la lista.
            this._size--; // Decrementa el tamaño de la tabla.
        }
    }

    /**
     * Verifica si una clave existe en la tabla hash.
     * @param {*} key - La clave a verificar.
     * @returns {boolean} True si la clave existe, false si no.
     */
    containsKey(key) {
        const index = this.getIndex(key); // Obtiene el índice para la clave.
        const list = this.getList(index); // Obtiene la lista enlazada correspondiente.

        return this.findEntry(list, key) !== null; // Retorna true si se encuentra la clave, false si no.
    }

    /**
     * Verifica si la tabla hash está vacía.
     * @returns {boolean} True si está vacía, false si no.
     */
    isEmpty() {
        return this._size === 0;
    }

    /**
     * Obtiene el número de elementos en la tabla hash.
     * @returns {number} El tamaño de la tabla.
     */
    getSize() {
        return this._size;
    }

    /**
     * Obtiene todos los valores almacenados en la tabla hash.
     * @returns {Array} Un arreglo con todos los valores.
     */
    getAllObjects() {
        const objects = [];
        for (const list of this.table) { // Itera sobre cada lista en la tabla.
            if (list) {
                let node = list.head;
                while (node) { // Itera sobre cada nodo en la lista enlazada.
                    objects.push(node.key.getValue()); // Añade el valor a la lista de objetos.
                    node = node.next;
                }
            }
        }
        return objects;
    }

    /**
     * Edita el valor asociado a una clave existente.
     * @param {*} key - La clave del elemento a editar.
     * @param {*} newValue - El nuevo valor a asociar.
     */
    editObject(key, newValue) {
        const index = this.getIndex(key); // Obtiene el índice para la clave.
        const list = this.getList(index); // Obtiene la lista enlazada correspondiente.

        const entry = this.findEntry(list, key); // Busca el par clave-valor.
        if (entry) {
            entry.setValue(newValue); // Si existe, actualiza el valor.
        }
    }

    /**
     * Obtiene un conjunto con todas las claves de la tabla hash.
     * @returns {Set} Un conjunto con todas las claves.
     */
    keySet() {
        const keySet = new Set();
        for (const list of this.table) { // Itera sobre cada lista en la tabla.
            if (list) {
                let node = list.head;
                while (node) { // Itera sobre cada nodo en la lista enlazada.
                    keySet.add(node.key.getKey()); // Añade la clave al conjunto.
                    node = node.next;
                }
            }
        }
        return keySet;
    }

    /**
     * Busca un par clave-valor en una lista enlazada.
     * @param {SinglyLinkedList} list - La lista enlazada donde buscar.
     * @param {*} key - La clave a buscar.
     * @returns {Entry|null} El Entry encontrado o null si no se encuentra.
     */
    findEntry(list, key) {
        let node = list.head;
        while (node) { // Itera sobre cada nodo en la lista.
            if (node.key.getKey() === key) {
                return node.key; // Retorna el nodo si la clave coincide.
            }
            node = node.next;
        }
        return null; // Retorna null si no se encuentra la clave.
    }
}

// Ejemplo de Uso:

// Supongamos que tienes una clase Libro.
class Libro {
    /**
     * @param {string} titulo - El título del libro.
     * @param {string} autor - El autor del libro.
     * @param {string} categoria - La categoría del libro.
     */
    constructor(titulo, autor, categoria) {
        this.titulo = titulo;
        this.autor = autor;
        this.categoria = categoria;
    }
}

// Crear una instancia de HashTable donde la clave es la categoría y el valor es una lista de libros.
const tablaHash = new HashTable();

// Función para agregar un libro a una categoría.
function agregarLibro(libro) {
    if (tablaHash.containsKey(libro.categoria)) {
        const librosExistentes = tablaHash.get(libro.categoria);
        librosExistentes.push(libro);
        tablaHash.editObject(libro.categoria, librosExistentes);
    } else {
        tablaHash.put(libro.categoria, [libro]);
    }
}

// Agregar algunos libros.
agregarLibro(new Libro("Cien Años de Soledad", "Gabriel García Márquez", "Realismo Mágico"));
agregarLibro(new Libro("1984", "George Orwell", "Distopía"));
agregarLibro(new Libro("El Principito", "Antoine de Saint-Exupéry", "Fantasía"));

// Obtener libros por categoría.
const distopia = tablaHash.get("Distopía");
console.log("Libros en la categoría 'Distopía':", distopia);

// Agregar más libros para probar el rehashing.
for (let i = 0; i < 30; i++) {
    agregarLibro(new Libro(`Libro ${i}`, `Autor ${i}`, "Fantasía"));
}

console.log("Número de elementos en la tabla hash:", tablaHash.getSize());
console.log("Todas las claves (categorías):", tablaHash.keySet());
console.log("Todos los libros almacenados:", tablaHash.getAllObjects());
