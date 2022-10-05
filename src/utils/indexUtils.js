export const clone = item => JSON.parse(JSON.stringify(item));

export const getRange = length => Array.from(new Array(length).keys());

export const getRandomElem = arr => arr.sort(() => 0.5 - Math.random())[0];
