import React, { useCallback, useEffect, useState } from 'react';
import { calculatePossibleMoves } from "../utils/movesUtils";
import { clone, getRandomElem, getRange } from "../utils/indexUtils";
import { addNewNumbers, removeEmptyRows } from "../utils/stateUtils";

const initialState = [
  [[1, false],[2, false],[3, false],[4, false],[5, false],[6, false],[7, false],[8, false],[9, false]],
  [[1, false],[1, false],[1, false],[2, false],[1, false],[3, false],[1, false],[4, false],[1, false]],
  [[5, false],[1, false],[6, false],[1, false],[7, false],[1, false],[8, false],[1, false],[9, false]]
];

const initialPossibleMoves = calculatePossibleMoves(initialState);

let prevField;

function Field() {
  const [field, setField] = useState(initialState);
  const [selectedCell, setSelectedCell] = useState(null);
  const [possibleMoves, setPossibleMoves] = useState(initialPossibleMoves);
  const [currentHint, setCurrentHint] = useState(null);

  const handleClick = useCallback((ri, ci) => {
    if (field[ri][ci][1]) {
      return;
    }
    if (!selectedCell || !possibleMoves.find(([c1, c2]) => JSON.stringify(c1) === JSON.stringify([ri, ci]) && JSON.stringify(c2) === JSON.stringify([selectedCell[1], selectedCell[2]]))) {
      setSelectedCell([field[ri][ci], ri, ci]);
    } else if (selectedCell[1] === ri && selectedCell[2] === ci) {
      setSelectedCell(null);
    } else {
      setField(prev => {
        prevField = clone(prev);
        let newState = clone(prev);
        newState[ri][ci][1] = true;
        newState[selectedCell[1]][selectedCell[2]][1] = true;
        newState = removeEmptyRows(newState);
        setPossibleMoves(calculatePossibleMoves(newState));
        return newState;
      });
      setCurrentHint(null);
      setSelectedCell(null);
    }
  }, [selectedCell, field, possibleMoves]);

  useEffect(() => {
    if (!possibleMoves.length) {
      setField(prev => {
        const newState = addNewNumbers(prev);
        setPossibleMoves(() => calculatePossibleMoves(newState));
        return newState
      })
    }
  }, [possibleMoves]);

  const handleUndo = useCallback(() => {
    if (prevField) {
      setField(clone(prevField));
      setPossibleMoves(() => calculatePossibleMoves(prevField));
    }
  }, [])

  const handleHint = useCallback(() => {
    setCurrentHint(getRandomElem(possibleMoves))
  }, [possibleMoves]);

  const isHinted = useCallback((ri, ci) => {
    if (!currentHint) {
      return false;
    }
    if ((currentHint[0][0] === ri && currentHint[0][1] === ci) ||
      (currentHint[1][0] === ri && currentHint[1][1] === ci)) {
      return true;
    }
  }, [currentHint]);

  const handleAddNums = useCallback(() => {
    setField(prev => {
      const newState = addNewNumbers(prev);
      setPossibleMoves(() => calculatePossibleMoves(newState));
      return newState;
    });
  } , []);

  return (
    <div className="bg-slate-100 border-2 border-slate-600">
      <div className="flex items-center gap-4">
        <button onClick={handleUndo}>Undo</button>
        <button onClick={handleHint}>Hint</button>
        <button onClick={handleAddNums}>Add numbers</button>
      </div>
      <p>Possible moves: {possibleMoves.length / 2}</p>
      {field.map((r, ri) => (
        <div key={ri} className="flex">
          {r.map((n, ni) => (
            <button
              key={ni}
              className={`border-slate-600 ${isHinted(ri, ni) ? "border-4" : "border"} ${
                selectedCell?.[1] === ri && selectedCell?.[2] === ni ? 'bg-slate-400' : " bg-slate-100"
              } w-10 h-10 flex items-center justify-center cursor-pointer relative`}
              onClick={() => handleClick(ri, ni)}
            >
              {n[1] && (<span className={"w-9 h-9 inline-block absolute bg-slate-900 bg-opacity-90"}/>)}
              {n[0]}
            </button>
          ))}
          {r.length < field[0].length && getRange(field[0].length - r.length).map(n => (
            <div key={'empty-' + n} className="border border-slate-600 bg-slate-100 w-10 h-10" />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Field;
