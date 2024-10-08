/**
 * Naive DSU implementation
 * @author sgewux
 */

class NaiveDSU {
    private parent: (number | null)[];
    private N: number;

    constructor(N: number){
        this.N = N+1;
        this.parent = Array(N+1).fill(null);
    }

    public make_set(v: number): void {
        if(this.parent[v] === null){
            this.parent[v] = v;
        } else {
            throw new Error(`Element: "${v}" already belongs to a disjoint set.`);
        }
    }

    public find(v: number | null): number | null{
        if(v === null || this.parent[v] === null){
            return null;
        } else {
            if(this.parent[v] === v){
                return v;
            } else {
                return this.find(this.parent[v]);
            }
        }
    }

    public union_sets(u: number, v: number): void{
        const a = this.find(u);
        const b = this.find(v);

        if(a === null || b === null){
            throw new Error(`Can not perform union with ${u} and ${v}, either one of them dont belong to a disjoint set`);
        }

        if(a !== b){
            this.parent[b] = a;
        }
    }

}

const s = new NaiveDSU(10);

s.make_set(3);
s.make_set(2);
s.make_set(1);


console.log(s.find(3) === s.find(2));
s.union_sets(3,2);
console.log(s.find(3) === s.find(2));
console.log(s.find(1) === s.find(2));
s.union_sets(1,2);
console.log(s.find(1) === s.find(2));

export default NaiveDSU;