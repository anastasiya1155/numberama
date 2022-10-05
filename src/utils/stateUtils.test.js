import { addNewNumbers, removeEmptyRows } from "./stateUtils";

const mockState1 = [
  [[1, true ],[2, false],[3, false],[4, false],[5, false],[6, false],[7, false],[8, true ],[9, true ]],
  [[1, true ],[1, true ],[1, true ],[2, true ],[1, false],[3, false],[1, false],[4, false],[1, true ]],
  [[5, false],[1, false],[6, false],[1, false],[7, false],[1, false],[8, false],[1, true ],[9, true ]]
];

const mockState2 = [
  [[1, true ],[2, false],[3, false],[4, false],[5, false],[6, false],[7, false],[8, true ],[9, true ]],
  [[1, true ],[1, true ],[1, true ],[2, true ],[1, false],[3, false],[1, false],[4, false],[1, true ]],
  [[5, false],[1, false],[6, false],[1, false],[7, false],[1, false],[8, false]]
];

const mockState3 = [
  [[1, true ],[2, false],[3, false],[4, false],[5, false],[6, false],[7, false],[8, true ],[9, true ]],
  [[1, true ],[1, true ],[1, true ],[2, true ],[1, true ],[3, true ],[1, true ],[4, true ],[1, true ]],
  [[5, false],[1, false],[6, false],[1, false],[7, false],[1, false],[8, false]]
]

describe('stateUtils', () => {
  describe('addNewNumbers', () => {
    it('adds new rows', () => {
      const newState = addNewNumbers(mockState1);
      expect(JSON.stringify(newState.slice(0, mockState1.length))).toEqual(JSON.stringify(mockState1))
      expect(JSON.stringify(newState.slice(mockState1.length))).toEqual(JSON.stringify([
        [[2,false],[3,false],[4,false],[5,false],[6,false],[7,false],[1,false],[3,false],[1,false]],
        [[4,false],[5,false],[1,false],[6,false],[1,false],[7,false],[1,false],[8,false]]
      ]))
    })
    it('fills last row if empty', () => {
      const newState = addNewNumbers(mockState2);
      expect(JSON.stringify(newState)).toEqual(JSON.stringify([
        [[1, true ],[2, false],[3, false],[4, false],[5, false],[6, false],[7, false],[8, true ],[9, true ]],
        [[1, true ],[1, true ],[1, true ],[2, true ],[1, false],[3, false],[1, false],[4, false],[1, true ]],
        [[5, false],[1, false],[6, false],[1, false],[7, false],[1, false],[8, false],[2, false],[3, false]],
        [[4, false],[5, false],[6, false],[7, false],[1, false],[3, false],[1, false],[4, false],[5, false]],
        [[1, false],[6, false],[1, false],[7, false],[1, false],[8, false]]
      ]))
    })
  })

  describe('removeEmptyRows', () => {
    it('does not remove unnecessary rows', () => {
      expect(JSON.stringify(removeEmptyRows(mockState2))).toEqual(JSON.stringify(mockState2));
    })
    it('removes checked rows', () => {
      expect(JSON.stringify(removeEmptyRows(mockState3))).toEqual(JSON.stringify([mockState2[0], mockState2[2]]));
    })
  })
})
