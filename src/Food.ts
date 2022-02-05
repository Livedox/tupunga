import config from "./config";

class Food {
    public value = 1;
    public color = "#aaaaaa";
    constructor(value: number | void) {
        if(!value) return;
        this.value = value;
    }
}

class Plant extends Food {
    public readonly color = "#55d98c";
}

class Rotting extends Food{
    timeDecomposition = config.meatSpoilageTime;
    public spoil() {
        return (--this.timeDecomposition < 0);
    }

    public new(value: number | void): Food {
        return new Rot(value);
    }
}

class Meat extends Rotting {
    public readonly color = "#e74c3c";
}

class Rot extends Rotting {
    public readonly color = "#95a5a6";
    timeDecomposition = config.rotSpoilageTime; //step

    public new(value: number | void): Food {
        return new Plant(value);
    }
}

export {Plant, Meat, Rot, Rotting};
export default Food;