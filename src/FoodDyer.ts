import Dyer from "./Dyer";
import Food from "./Food";
import config from "./config";
import KeyKeyValueMap from "./KeyKeyValueMap";

class FoodDyer extends Dyer {
    constructor(ctx: CanvasRenderingContext2D) {
        super(ctx);
    }

    public paint(foods: KeyKeyValueMap<Food>) {
        this.ctx.clearRect(0, 0, config.fieldSize, config.fieldSize);
        foods.forEach((food, x, y) => {
            this.paintOne(food, x, y);
        });
    }

    public paintOne(food: Food, x: number, y: number) {
        this.ctx.fillStyle = food.color;
        this.ctx.fillRect(
            x*config.sizeCell,
            y*config.sizeCell,
            config.sizeCell,
            config.sizeCell);
    }
}

export default FoodDyer;