import React, { useCallback, useEffect, useState } from 'react';
import { calculatePossibleMoves } from "../utils/movesUtils";
import { clone, getRandomElem, getRange } from "../utils/indexUtils";
import { addNewNumbers, getRandomField, removeEmptyRows } from "../utils/stateUtils";

const initialState = JSON.parse(localStorage.getItem("field") || '0') || [
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
  const [totalMoves, setTotalMoves] = useState(JSON.parse(localStorage.getItem("totalMoves") || '0'));
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);

  const handleClick = useCallback((ri, ci) => {
    if (field[ri][ci][1]) {
      return;
    }
    if (selectedCell?.[1] === ri && selectedCell?.[2] === ci) {
      setSelectedCell(null);
    } else if (!selectedCell || !possibleMoves.find(([c1, c2]) => JSON.stringify(c1) === JSON.stringify([ri, ci]) && JSON.stringify(c2) === JSON.stringify([selectedCell[1], selectedCell[2]]))) {
      setSelectedCell([field[ri][ci], ri, ci]);
    } else {
      setField(prev => {
        prevField = clone(prev);
        let newState = clone(prev);
        newState[ri][ci][1] = true;
        newState[selectedCell[1]][selectedCell[2]][1] = true;
        newState = removeEmptyRows(newState);
        setPossibleMoves(calculatePossibleMoves(newState));
        localStorage.setItem("field", JSON.stringify(newState));
        return newState;
      });
      setTotalMoves(prev => {
        localStorage.setItem('totalMoves', prev + 1)
        return prev + 1
      })
      setCurrentHint(null);
      setSelectedCell(null);
    }
  }, [selectedCell, field, possibleMoves]);

  useEffect(() => {
    if (!possibleMoves.length && !gameOver && !win) {
      setField(prev => {
        if (prev.every(r => r.every(c => c[1])) || !prev.length) {
          setWin(true);
          return prev;
        }
        const newState = addNewNumbers(prev);
        setPossibleMoves(() => {
          const newMoves = calculatePossibleMoves(newState);
          if (!newMoves.length) {
            setGameOver(true);
          }
          return newMoves;
        });
        localStorage.setItem("field", JSON.stringify(newState));
        return newState
      })
    }
  }, [possibleMoves, gameOver, win]);

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

  const handleRestart = useCallback((e, isClassic) => {
    const newField = isClassic ? clone(initialState) : getRandomField();
    setField(newField);
    setPossibleMoves(calculatePossibleMoves(newField));
    setWin(false);
    setGameOver(false);
  }, []);

  return (
    <div>
      <div className="flex items-center text-slate-50 justify-between">
        <button onClick={handleUndo} className="border border-slate-900 px-4 rounded bg-slate-800">
          Undo
        </button>
        <button onClick={handleHint} className="border border-slate-900 px-4 rounded bg-slate-800">
          Hint
        </button>
        <button onClick={handleAddNums} className="border border-slate-900 px-4 rounded bg-slate-800">
          Add numbers
        </button>
        <button onClick={handleRestart} className="border border-slate-900 px-4 rounded bg-slate-800">
          Restart
        </button>
      </div>
      <p className="text-slate-50 text-xs my-2">Possible moves: {possibleMoves.length / 2}</p>
      <p className="text-slate-50 text-xs my-2">Total moves: {totalMoves}</p>
      <div className="bg-slate-100 border-2 border-slate-600 relative min-h-[124px] max-h-[75vh] overflow-auto">
        {field.map((r, ri) => (
          <div key={ri} className="flex">
            {r.map((n, ni) => (
              <button
                key={ni}
                className={`border-slate-600 ${isHinted(ri, ni) ? "border-4" : "border"} ${
                  selectedCell?.[1] === ri && selectedCell?.[2] === ni ? 'bg-slate-400' : " bg-slate-100"
                } w-10 h-10 flex items-center justify-center cursor-pointer relative font-bold`}
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
        {(win || gameOver) && (
          <div className="absolute top-0 bottom-0 left-0 right-0 backdrop-blur-sm bg-opacity-40 bg-slate-100 flex flex-col items-center justify-start gap-3">
            <p className="text-xl mt-2">{win ? "You won! Congrats!" : "Game over, looser..."}</p>
            <button
              onClick={handleRestart}
              className="border border-slate-900 px-4 rounded bg-slate-300"
            >
              Start with random numbers
            </button>
            <button
              onClick={(e) => handleRestart(e, true)}
              className="border border-slate-900 px-4 rounded bg-slate-300"
            >
              Start classic game
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Field;
