"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EnhancedDSU {
    constructor(N) {
        this.N = N;
        this.parent = Array(N + 1).fill(null);
        this.sz = Array(N).fill(0);
    }
    make_set(v) {
        if (this.parent[v] === null) {
            this.parent[v] = v;
            this.sz[v] = 1;
        }
        else {
            throw new Error(`Element: "${v}" already belongs to a disjoint set.`);
        }
    }
    find(v) {
        if (v === null || this.parent[v] === null) {
            return null;
        }
        else {
            if (this.parent[v] === v) {
                return v;
            }
            else {
                this.parent[v] = this.find(this.parent[v]);
                return this.parent[v];
            }
        }
    }
    union_sets(u, v) {
        const a = this.find(u);
        const b = this.find(v);
        if (a === null || b === null) {
            throw new Error(`Can not perform union with ${u} and ${v}, either one of them dont belong to a disjoint set`);
        }
        if (a !== b) {
            if (this.sz[a] >= this.sz[b]) {
                this.parent[b] = a;
                this.sz[a] += this.sz[b];
            }
            else {
                this.parent[a] = b;
                this.sz[b] += this.sz[a];
            }
        }
    }
}
const s = new EnhancedDSU(10);
s.make_set(3);
s.make_set(2);
s.make_set(1);
console.log(s.find(3) === s.find(2));
s.union_sets(3, 2);
console.log(s.find(3) === s.find(2));
console.log(s.find(1) === s.find(2));
s.union_sets(1, 2);
console.log(s.find(1) === s.find(2));
exports.default = EnhancedDSU;
