import Fit from "./Fit";

class Dyer extends Fit {
    protected readonly ctx;
    constructor(ctx: CanvasRenderingContext2D) {
        super();
        this.ctx = ctx;
    }
}

export default Dyer;