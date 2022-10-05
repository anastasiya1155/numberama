import { calculatePossibleMoves, getBottomSibling, getLeftSibling, getRightSibling, getTopSibling } from "./movesUtils";

const mockState = [
  [[1, false],[2, false],[3, false],[4, false],[5, false],[6, false],[7, false],[8, false],[9, false]],
  [[1, true ],[1, true ],[1, false],[2, false],[1, false],[3, false],[1, false],[4, false],[1, true ]],
  [[5, false],[1, false],[6, false],[1, false],[7, false],[1, false],[8, false],[1, false],[9, true ]]
];

const mockState2 = [
  [[1, false],[2, false],[3, false],[4, false],[5, false],[6, false],[7, false],[8, false],[9, true]],
  [[1, true ],[1, true ],[1, false],[2, false],[1, false],[3, false],[1, false],[4, false],[1, true ]],
  [[5, false],[1, false],[6, false],[1, false],[7, false],[1, false],[8, false]]
];

describe('movesUtils', () => {
  describe('getLeftSibling', () => {
    it('returns null for first element', () => {
      expect(getLeftSibling(mockState, 0, 0)).toEqual(null);
    })
    it('returns left cell', () => {
      expect(JSON.stringify(getLeftSibling(mockState, 0, 3))).toEqual("[0,2]");
      expect(JSON.stringify(getLeftSibling(mockState, 1, 5))).toEqual("[1,4]");
      expect(JSON.stringify(getLeftSibling(mockState, 2, 7))).toEqual("[2,6]");
    })
    it('returns cell from previous row if it is first', () => {
      expect(JSON.stringify(getLeftSibling(mockState, 2, 0))).toEqual("[1,7]");
    })
    it('skips checked cells', () => {
      expect(JSON.stringify(getLeftSibling(mockState, 1, 2))).toEqual("[0,8]");
    })
  })
  describe('getRightSibling', () => {
    it('returns null for last element', () => {
      expect(getRightSibling(mockState, 2, 8)).toEqual(null);
      expect(getRightSibling(mockState, 2, 7)).toEqual(null);
      expect(getRightSibling(mockState2, 2, 6)).toEqual(null);
    })
    it('returns right cell', () => {
      expect(JSON.stringify(getRightSibling(mockState, 0, 3))).toEqual("[0,4]");
      expect(JSON.stringify(getRightSibling(mockState, 1, 5))).toEqual("[1,6]");
      expect(JSON.stringify(getRightSibling(mockState, 2, 0))).toEqual("[2,1]");
    })
    it('returns cell from next row if it is last', () => {
      expect(JSON.stringify(getRightSibling(mockState, 0, 8))).toEqual("[1,2]");
      expect(JSON.stringify(getRightSibling(mockState, 1, 7))).toEqual("[2,0]");
    });
  })
  describe('getTopSibling', () => {
    it('returns null for first row', () => {
      expect(getTopSibling(mockState, 0, 1)).toEqual(null);
      expect(getTopSibling(mockState, 0, 7)).toEqual(null);
    })
    it('returns top cell', () => {
      expect(JSON.stringify(getTopSibling(mockState, 1, 5))).toEqual("[0,5]");
      expect(JSON.stringify(getTopSibling(mockState, 2, 3))).toEqual("[1,3]");
    })
    it('skips checked cells', () => {
      expect(JSON.stringify(getTopSibling(mockState, 1, 0))).toEqual("[0,0]");
    });
  })
  describe('getBottomSibling', () => {
    it('returns null for last row', () => {
      expect(getBottomSibling(mockState, 2, 1)).toEqual(null);
      expect(getBottomSibling(mockState, 2, 7)).toEqual(null);
    })
    it('returns null if there is no cell below', () => {
      expect(getBottomSibling(mockState2, 1, 8)).toEqual(null);
    })
    it('returns null if there is no unchecked cell below', () => {
      expect(getBottomSibling(mockState, 0, 8)).toEqual(null);
    })
    it('returns bottom cell', () => {
      expect(JSON.stringify(getBottomSibling(mockState, 1, 5))).toEqual("[2,5]");
      expect(JSON.stringify(getBottomSibling(mockState, 0, 3))).toEqual("[1,3]");
    })
    it('skips checked cells', () => {
      expect(JSON.stringify(getBottomSibling(mockState, 0, 0))).toEqual("[2,0]");
    })
  })

  describe('calculatePossibleMoves', () => {
    it('returns all possible moves, test 1', () => {
      const possibleMoves = calculatePossibleMoves(mockState);
      expect(JSON.stringify(possibleMoves)).toEqual("[[[0,8],[1,2]],[[1,2],[0,8]]]")
    })
    it('returns all possible moves, test 2', () => {
      const possibleMoves = calculatePossibleMoves(mockState.map(r => r.map(c => [c[0], false])));
      expect(JSON.stringify(possibleMoves)).toEqual("[[[0,0],[1,0]],[[0,8],[1,0]],[[0,8],[1,8]],[[1,0],[0,8]],[[1,0],[1,1]],[[1,0],[0,0]],[[1,1],[1,0]],[[1,1],[1,2]],[[1,1],[2,1]],[[1,2],[1,1]],[[1,8],[0,8]],[[1,8],[2,8]],[[2,1],[1,1]],[[2,7],[2,8]],[[2,8],[2,7]],[[2,8],[1,8]]]")
    })
  })
})
