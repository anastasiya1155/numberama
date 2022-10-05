
export const getLeftSibling = (state, ri, ci) => {
  const rowLastIndex = state[0].length - 1;
  let leftSibling = null;
  row: for (let r = ri; r >= 0; r--) {
    for (let c = r === ri ? ci - 1 : rowLastIndex; c >= 0; c--) {
      if (!state[r][c][1]) {
        leftSibling = [r, c];
        break row;
      }
    }
  }

  return leftSibling;
}

export const getRightSibling = (state, ri, ci) => {
  const rowLastIndex = state[0].length - 1;
  let rightSibling = null;
  row: for (let r = ri; r < state.length; r++) {
    for (let c = r === ri ? ci + 1 : 0; c <= rowLastIndex; c++) {
      if (state[r][c] && !state[r][c][1]) {
        rightSibling = [r, c];
        break row;
      }
    }
  }

  return rightSibling;
}

export const getTopSibling = (state, ri, ci) => {
  let topSibling = null;
  for (let r = ri - 1; r >= 0; r--) {
      if (!state[r][ci][1]) {
        topSibling = [r, ci];
        break;
      }
  }

  return topSibling;
}

export const getBottomSibling = (state, ri, ci) => {
  let bottomSibling = null;
  for (let r = ri + 1; r < state.length; r++) {
      if (state[r][ci] && !state[r][ci][1]) {
        bottomSibling = [r, ci];
        break;
      }
  }

  return bottomSibling;
}

const isEqualOrSumUp = (a, b) => a === b || a + b === 10;

export const calculatePossibleMoves = state => {
  const possibleMoves = [];
  state.forEach((row, ri) => row.forEach((cell, ci) => {
    if (!cell[1]) {
      const isAllowed = (coords) => isEqualOrSumUp(state[coords[0]][coords[1]][0], state[ri][ci][0])
      const left = getLeftSibling(state, ri, ci);
      if (left && isAllowed(left)) {
        possibleMoves.push([[ri, ci], left])
      }
      const right = getRightSibling(state, ri, ci);
      if (right && isAllowed(right)) {
        possibleMoves.push([[ri, ci], right])
      }
      const top = getTopSibling(state, ri, ci);
      if (top && isAllowed(top)) {
        possibleMoves.push([[ri, ci], top])
      }
      const bottom = getBottomSibling(state, ri, ci);
      if (bottom && isAllowed(bottom)) {
        possibleMoves.push([[ri, ci], bottom])
      }
    }
  }));
  return possibleMoves;
}
