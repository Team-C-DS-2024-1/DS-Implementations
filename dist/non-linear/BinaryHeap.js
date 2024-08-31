"use strict";
/**
 * Binary Heap implementation
 * @author sgewux
 */
Object.defineProperty(exports, "__esModule", { value: true });
class BinaryHeap {
    constructor(capacity) {
        this._size = 0;
        this.lastLeaf = 0;
        this.capacity = capacity;
        this.t = Array(4 * capacity);
    }
    siftUp(n) {
        if (n === 1)
            return;
        if (this.t[n] > this.t[Math.floor(n / 2)]) {
            const temp = this.t[Math.floor(n / 2)];
            this.t[Math.floor(n / 2)] = this.t[n];
            this.t[n] = temp;
            this.siftUp(Math.floor(n / 2));
        }
        else {
            return;
        }
    }
    siftDown(n) {
        if (this.lastLeaf < 2 * n)
            return;
        if (this.lastLeaf >= 2 * n + 1) {
            const mx = this.t[2 * n] > this.t[2 * n + 1] ? this.t[2 * n] : this.t[2 * n + 1];
            if (mx > this.t[n]) {
                if (this.t[2 * n] > this.t[2 * n + 1]) {
                    const temp = this.t[2 * n];
                    this.t[2 * n] = this.t[n];
                    this.t[n] = temp;
                    this.siftDown(2 * n);
                }
                else {
                    const temp = this.t[2 * n + 1];
                    this.t[2 * n + 1] = this.t[n];
                    this.t[n] = temp;
                    this.siftDown(2 * n + 1);
                }
            }
            else {
                return;
            }
        }
        else {
            if (this.t[2 * n] > this.t[n]) {
                const temp = this.t[2 * n];
                this.t[2 * n] = this.t[n];
                this.t[n] = temp;
                this.siftDown(2 * n);
            }
            else {
                return;
            }
        }
    }
    get size() {
        return this._size;
    }
    empty() {
        return this._size == 0;
    }
    extractMax() {
        if (!this.empty()) {
            const toReturn = this.t[1];
            this.t[1] = this.t[this.lastLeaf];
            this.lastLeaf--;
            this._size--;
            this.siftDown(1);
            return toReturn;
        }
        else {
            throw new Error("Heap is empty");
        }
    }
    insert(val) {
        if (this._size == this.capacity) {
            throw new Error("Heap is full");
        }
        else {
            this._size++;
            this.lastLeaf++;
            this.t[this.lastLeaf] = val;
            this.siftUp(this.lastLeaf);
        }
    }
}
exports.default = BinaryHeap;
