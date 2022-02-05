import Cell from "./Cell";
import config from "./config";
import { getRandomFloat, getRandomInt } from "./getRandom";

interface Part {
    color: string;
    bonus(item: Cell): void;
}

interface Eater extends Part {
}

class PlantEater implements Eater {
    color = "#27ae60";
    public bonus(item: Cell): void {
        item.plantEat = true;
        item.speed += config.speedBonusEaterPlant;
    }
}

class RotEater implements Eater {
    color = "#34495e";
    public bonus(item: Cell): void {
        item.rotEat = true;
        item.defense += config.defenseBonusEaterRot;
    }
}

class MeatEater implements Eater {
    color = "#c0392b";
    public bonus(item: Cell): void {
        item.attack += config.attackBonusEaterMeat;
        item.meatEat = true;
    }
}

class Breeder implements Part {
    color = "#8e44ad";
    public bonus(item: Cell): void {
        item.breeds = true;
    }
}

class Speed implements Part {
    color = "#3498db";
    public bonus(item: Cell): void {
        item.speed += getRandomFloat(config.minSpeedPart, config.maxSpeedPart);
    }
}

class Attack implements Part {
    color = "#ff00ff";
    public bonus(item: Cell): void {
        item.attack += getRandomFloat(config.minAttackPart, config.maxAttackPart);
    }
}

class Defense implements Part {
    color = "#f1c40f";
    public bonus(item: Cell): void {
        item.defense += getRandomFloat(config.minDefensePart, config.maxDefensePart);
    }
}

function getRandomPart(): Part {
    const numberParts = 7;
    switch (getRandomInt(0, numberParts-1)) {
        case 0: return new PlantEater();
        case 1: return new Breeder();
        case 2: return new Speed();
        case 3: return new Attack();
        case 4: return new Defense();
        case 5: return new RotEater();
        case 6: return new MeatEater();

        default: return new Breeder();
    }
}

export {PlantEater, Speed, Breeder, getRandomPart};
export default Part;