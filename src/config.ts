let config: {[index: string]:any} = {
    fieldSize: 1000,
    sizeCell: 10,
    numberCells: Math.floor(1000 / 10),//fieldSize / sizeCell
    startCell: "vertical",
    childrenToDeath: 0,
    minLife: 150,
    bonusLifeFromPart: 100,
    stopSpeedFromPart: 2,
    plantSpawnChance: 0.3,
    chanceEvolution: 0.75,
    chanceAddPart: 0.33,
    chanceDeletePart: 0.33,
    chanceChangePart: 0.33,
    chanceMoveUp: 0.25,
    chanceMoveDown: 0.25,
    chanceMoveRight: 0.25,
    chanceMoveLeft: 0.25,
    movementChange: 0.05,
    cellNutrition: 0.6,
    meatSpoilageTime: 200,
    rotSpoilageTime: 800,
    minSpeedPart: 1.1,
    maxSpeedPart: 1.4,
    minAttackPart: 0.8,
    maxAttackPart: 1.1,
    minDefensePart: 0.5,
    maxDefensePart: 0.8,
    speedBonusEaterPlant: 0.3,
    attackBonusEaterMeat: 0.1,
    defenseBonusEaterRot: 0.08,
};
let defConfig = Object.assign({}, config);

export default config;
export {defConfig};