import { getRandomFloat } from "./getRandom";

class ChanceCheker {
    private acc = 0;
    private readonly chance;
    constructor(maxChance: number) {
        this.chance = getRandomFloat(0, maxChance);
    }

    public check(chance:number) {
        return this.chance < (this.acc += chance);
    }
}

export default ChanceCheker;