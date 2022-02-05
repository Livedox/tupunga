class KeyKeyValueMap<T> {
    private map = new Map<number, T>();

    constructor(map: Map<number, T> | void) {
        if(map) this.map = new Map(map);
    }

    private getKey(key1: number, key2: number) {
        return 50005000 + key1*10000 + key2;
    }

    public set(key1:number, key2:number, value:T): KeyKeyValueMap<T> {
        this.map.set(this.getKey(key1, key2), value);
        return this;
    }

    public get(key1:number, key2:number) {
        return this.map.get(this.getKey(key1, key2));
    }

    public size() {
        return this.map.size;
    }

    public delete(key1:number, key2:number) {
        return this.map.delete(this.getKey(key1, key2));
    }

    public copy() {
        return new KeyKeyValueMap<T>(this.map);
    }

    public forEach(callback: (value: T, key1: number, key2:number) => void) {
        this.map.forEach((value, key) => {
            const key1 = Math.floor(key/10000) - 5000;
            const key2 = key % 10000 - 5000;
            callback(value, key1, key2);
        });
    }
}

export default KeyKeyValueMap;