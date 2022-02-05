import ChanceCheker from "./ChanceChecker";
import config from "./config";
import Fit from "./Fit";
import Food, { Meat, Plant, Rot } from "./Food";
import { getRandomInt } from "./getRandom";
import KeyKeyValueMap from "./KeyKeyValueMap";
import Part, { getRandomPart } from "./Part";
let id = 0;

class Cell extends Fit{
    private x = 5;
    private y = 5;
    private distanceTraveled = 0; 
    public eaten = 0;
    private evolving = false;
    private timeToDie = 15;
    public readonly id;
    private isDie = false;
    private readonly parentId;
    private chanceMovement;
    private allMovement;
    private childrenToDeath = config.childrenToDeath;
    private parts: KeyKeyValueMap<Part> = new KeyKeyValueMap<Part>();
    // Only the part class edits these properties, 
    //they are public because friend classes are not implemented in js.
    //https://en.wikipedia.org/wiki/Friend_class
    //individual methods are ugly
    public plantEat = false;
    public meatEat = false;
    public rotEat = false;
    public speed = 0;
    public attack = 0;
    public defense = 0;
    public breeds = false;


    
    constructor(
      parts: KeyKeyValueMap<Part>,
      x: number = 5,
      y: number = 5,
      parentId: number = -1,
      chanceMovement: number[] = [
        config.chanceMoveUp,
        config.chanceMoveRight,
        config.chanceMoveDown,
        config.chanceMoveLeft]
    ) {
        super();
        this.x = x;
        this.y = y;
        this.parts = parts;
        this.evolving = Math.random() < config.chanceEvolution;
        this.timeToDie = config.minLife + this.parts.size() * config.bonusLifeFromPart;
        this.id = id++;
        this.parentId = parentId;
        this.chanceMovement = chanceMovement;
        this.allMovement = this.chanceMovement.reduce((acc, a) => acc+a, 0);

        parts.forEach((part) => part.bonus(this));

        this.speed /= config.stopSpeedFromPart * this.parts.size();
    };

    public step(foods: KeyKeyValueMap<Food>, cells: Cell[]) {
        this.distanceTraveled += this.speed;

        for(;this.distanceTraveled >= 1;--this.distanceTraveled) {
            const chance = new ChanceCheker(this.allMovement);
            if (chance.check(this.chanceMovement[0]))
                this.y = this.getNewValueIfNotFit(this.y - 1);
            else if (chance.check(this.chanceMovement[1]))
                this.x = this.getNewValueIfNotFit(this.x + 1);
            else if (chance.check(this.chanceMovement[2]))
                this.y = this.getNewValueIfNotFit(this.y + 1);
            else
                this.x = this.getNewValueIfNotFit(this.x - 1);

            this.eat(foods, cells);
            this.multiply(cells);
        }

        this.die(foods);
    }

    private die(foods: KeyKeyValueMap<Food>) {
        if(--this.timeToDie < 0 && this.childrenToDeath <= 0) {
            const meatCount = this.parts.size() + this.eaten;
            const meatPerCell = meatCount/this.parts.size();
            this.parts.forEach((_, dx, dy) => {
                foods.set(this.x + dx, this.y + dy, new Meat(meatPerCell));
            });
            this.isDie = true;
        }
    }

    public checkIsDie() {
        return this.isDie;
    }

    private eat(foods: KeyKeyValueMap<Food>, cells: Cell[]) {
        this.parts.forEach((_, dx, dy) => {
            const food = foods.get(this.x + dx, this.y + dy);
            if(!food) return;

            if(
              (food instanceof Plant && this.plantEat) ||
              (food instanceof Rot && this.rotEat) || 
              (food instanceof Meat && this.meatEat)
            ) {
                this.eaten += food.value;
                foods.delete(this.x + dx, this.y + dy);
            }
            if(this.meatEat) 
                this.eatAnotherCell(cells, dx, dy);
        }); 
    }

    private eatAnotherCell(cells: Cell[], dx: number, dy: number) {
        cells.forEach(cell => {
            if(cell.parentId === this.id || this.parentId === cell.parentId) return;
            cell.parts.forEach((_, x, y) => {
                if(
                  (cell.x + x === this.x + dx && cell.y + y === this.y + dy)
                  && (this.attack > cell.defense)
                  && !cell.isDie
                ) {
                    cell.isDie = true;
                    this.eaten += (cell.parts.size() + cell.eaten)*config.cellNutrition;
                }
            });
        });
    } 

    private multiply(cells: Cell[]) {
        if(!this.breeds || !(this.eaten >= this.parts.size() + +this.evolving)) return;

        let parts: KeyKeyValueMap<Part> = this.parts;
        let chanceMovement = [...this.chanceMovement];
        if(this.evolving) {
            const chance = new ChanceCheker(
              config.chanceAddPart +
              config.chanceDeletePart +
              config.chanceChangePart);
            
            if (chance.check(config.chanceDeletePart)) {
                parts = this.deletePart();
            } else if (chance.check(config.chanceChangePart)) {
                parts = this.changePart();
            } else {
                parts = this.addPart();
                this.eaten -= +this.evolving;
            }

            chanceMovement[getRandomInt(0, 3)] += Math.random() > 0.5
                ? config.movementChange : -config.movementChange;
        }

        cells.push(new Cell(parts, this.x, this.y, this.id, chanceMovement));

        --this.childrenToDeath;
        this.eaten -= this.parts.size();
    }

    private addPart() {
        const randCoords: number[][] = [];
        this.parts.forEach((_, x, y) => {
            if(!this.parts.get(x-1, y)) randCoords.push([x-1, y]);
            if(!this.parts.get(x+1, y)) randCoords.push([x+1, y]);
            if(!this.parts.get(x, y-1)) randCoords.push([x, y-1]);
            if(!this.parts.get(x, y+1)) randCoords.push([x, y+1]);
        });
        const newParts = this.parts.copy();
        const coords = randCoords[getRandomInt(0, randCoords.length-1)];
        newParts.set(coords[0], coords[1], getRandomPart());
        return newParts;
    }

    private changePart() {
        return this.partChanger("change");
    }

    private deletePart() {
        return this.partChanger("delete");
    }

    private partChanger(type: "delete" | "change") {
        const newParts = this.parts.copy();
        const max = newParts.size();
        let isChange = false;
        //I know it doesn't always work
        this.parts.forEach((_, x, y) => {
            if((Math.random() > 1/max) && !isChange) {
                if(type === "delete") newParts.delete(x, y);
                else if (type === "change") newParts.set(x, y, getRandomPart());
                isChange = true;
            }     
        });
        return newParts;
    }

    public getParts() {
        return this.parts;
    }

    public getX() {
        return this.x;
    }

    public getY() {
        return this.y;
    }
}

export default Cell;