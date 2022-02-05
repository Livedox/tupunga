import config from "./config";

class Fit {
    protected getNewValueIfNotFit(value:number) {
        let v = value;

        if(v >= config.numberCells) v -= config.numberCells;
        if(v < 0) v += config.numberCells;

        return v;
    }
}

export default Fit;