function getRandomFloat(min:number, max:number):number {
    const str = (Math.random() * (max - min) + min).toFixed(5);
  
    return parseFloat(str);
}

function getRandomInt(min:number, max:number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export {getRandomFloat, getRandomInt};