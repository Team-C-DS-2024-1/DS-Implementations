/**
 * Binary Heap implementation
 * @author sgewux
 */

class BinaryHeap<T>{
    private capacity: number;
    private _size = 0;
    private lastLeaf = 0;
    private t: T[];

    constructor(capacity: number){
        this.capacity = capacity;
        this.t = Array(4*capacity);
    }

    private siftUp(n: number): void {
        if(n === 1) return;

        if(this.t[n] > this.t[Math.floor(n/2)]){
            const temp = this.t[Math.floor(n/2)];
            this.t[Math.floor(n/2)] = this.t[n];
            this.t[n] = temp;

            this.siftUp(Math.floor(n/2));

        } else {
            return;
        }
    }

    private siftDown(n : number): void {
        if(this.lastLeaf < 2*n) return;

        if(this.lastLeaf >= 2*n + 1){
            const mx = this.t[2*n] > this.t[2*n + 1] ? this.t[2*n] : this.t[2*n + 1];
            
            if(mx > this.t[n]){
                if(this.t[2*n] > this.t[2*n + 1]){
                    const temp = this.t[2*n];
                    this.t[2*n] = this.t[n];
                    this.t[n] = temp;

                    this.siftDown(2*n);
                } else {
                    const temp = this.t[2*n + 1];
                    this.t[2*n + 1] = this.t[n];
                    this.t[n] = temp;

                    this.siftDown(2*n + 1);
                }
            } else {
                return;
            }

        } else {
            if(this.t[2*n] > this.t[n]){
                const temp = this.t[2*n];
                this.t[2*n] = this.t[n];
                this.t[n] = temp;

                this.siftDown(2*n);
            } else {
                return;
            }
        }
    }

    public get size(){
        return this._size;
    }

    public empty(): boolean {
        return this._size == 0;
    }

    public extractMax(): T {
        if(!this.empty()){
            const toReturn = this.t[1];
            this.t[1] = this.t[this.lastLeaf];
            this.lastLeaf--;
            this._size--;
            this.siftDown(1);

            return toReturn;
        } else {
            throw new Error("Heap is empty");
        }
    }

    public insert(val: T): void {
        if(this._size == this.capacity){
            throw new Error("Heap is full");
        } else {
            this._size++;
            this.lastLeaf++;
            this.t[this.lastLeaf] = val;

            this.siftUp(this.lastLeaf);
        }
    }

}

export default BinaryHeap;