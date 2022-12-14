import { clone, getRandomElem, getRange } from "./indexUtils";

export const addNewNumbers = state => {
  const newState = clone(state);
  const uncheckedNums = [];
  state.forEach(r => r.forEach(c => {
    if (!c[1]) {
      uncheckedNums.push(c[0]);
    }
  }));
  const rowLength = state[0].length;
  const lastRowLength = state[state.length - 1].length;
  if (lastRowLength < rowLength) {
    for (let i = lastRowLength; i < rowLength; i++) {
      if (!uncheckedNums.length) {
        break;
      }
      newState[newState.length - 1].push([uncheckedNums.shift(), false])
    }
  }
  let newRow = [];
  while (uncheckedNums.length) {
    for (let i = 0; i < rowLength; i++) {
      if (!uncheckedNums.length) {
        break;
      }
      newRow.push([uncheckedNums.shift(), false])
      if (newRow.length === rowLength) {
        newState.push(newRow);
        newRow = [];
      }
    }
  }
  if (newRow.length){
    newState.push(newRow);
  }

  return newState;
}

export const removeEmptyRows = state => {
  const newState = [];
  state.forEach(r => {
    if (!r.every(c => c[1]) || r.length < state[0].length) {
      newState.push(r)
    }
  });
  return newState;
};

export const getRandomField = () => {
  const state = [];
  for (let i = 0; i < 3; i++) {
    const newRow = [];
    for (let j = 0; j < 9; j++) {
      newRow.push([getRandomElem(getRange(9).map(l => l + 1)), false])
    }
    console.log('newRow', newRow)
    state.push(newRow);
  }
  console.log('state', state)
  return state;
}
