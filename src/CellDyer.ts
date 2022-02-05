import Cell from "./Cell";
import Dyer from "./Dyer";
import config from "./config";

class CellDyer extends Dyer {
    constructor(ctx: CanvasRenderingContext2D) {
        super(ctx);
    }

    public paint(cells: Cell[]) {
        this.ctx.clearRect(0, 0, config.fieldSize, config.fieldSize);
        cells.forEach((cell) => {
            const x = cell.getX();
            const y = cell.getY();

            cell.getParts().forEach((part, dx, dy) => {
                let currentX = this.getNewValueIfNotFit(x+dx);
                let currentY = this.getNewValueIfNotFit(y+dy);
                this.ctx.fillStyle = part.color;
                this.ctx.fillRect(
                    (currentX)*config.sizeCell,
                    (currentY)*config.sizeCell,
                    config.sizeCell,
                    config.sizeCell);
            });
        });
    }
}

export default CellDyer;