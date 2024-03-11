import React, { useState } from 'react'
import PlayerInfo from './PlayerInfo'
import OuterGameBoard from './OuterGameBoard';

export default function GameArea() {

  let [turn, setTurn] = useState(true);

  let [playerNames, setPlayerName] = useState({
    player1 : `Player 1`,
    player2 : `Player 2`,
  });

  let [finalWinner, setFinalWinner] = useState({
    victor: 0,
    trueVictor: false,
  });

  let [render1, setRender1] = useState(true);
  let [render2, setRender2] = useState(false);


  let getP1 = (pName) => {
      setPlayerName((prev)=>{
        return {
          ...prev,
          player1: pName,
        }
      });
    }
  
    let getP2 = (pName) => {
      setPlayerName((prev)=>{
        return {
          ...prev,
          player2: pName,
        }
      })
    }

  let getChangeTurn = () => {
    setTurn((prev) => {return !prev})
  }

  let getFinalWinner = (winner, trueVictory) => {
    setFinalWinner({
      victor: winner,
      trueVictor: trueVictory,
    });
  }

  let handleReset = () => {
    setRender1((prev)=>{
      let temp = prev;
      return !temp;
    })
    setRender2((prev)=>{
      let temp = prev;
      return !temp;
    })
    setFinalWinner({
      victor: 0,
      trueVictor: false,
    })
    setTurn(true);
  }

  return (
    <div className='flex-col'>
        <PlayerInfo turn={turn} sendP1={getP1} sendP2={getP2}  />
        {(render1)?<OuterGameBoard gameOver={finalWinner.victor} turn={turn}
         sendFinalWinner={getFinalWinner} sendChangeTurn={getChangeTurn}  /> : null}
         {(render2)?<OuterGameBoard gameOver={finalWinner.victor} turn={turn}
         sendFinalWinner={getFinalWinner} sendChangeTurn={getChangeTurn}  /> : null}

        {(finalWinner.victor == 0)?null: (finalWinner.victor == 3) ? <div className='flex space-x-5 justify-center items-center'><h1 
        className='text-xl'>DRAW! No Victors this time</h1> 
        <button className='border border-slate-700 hover:bg-slate-600 hover:text-gray-300 p-3 rounded-full'
        onClick={handleReset}>RESET</button></div>
          : (finalWinner.victor == 1) ? <div className='flex space-x-5 justify-center items-center'><h1 
          className='text-xl'>{playerNames.player1} WINS! {(finalWinner.trueVictor)?`Absolute Victory`:`Victory by Score`}</h1>
          <button className='border border-slate-700 hover:bg-slate-600 hover:text-gray-300 p-3 rounded-full'
          onClick={handleReset}>RESET</button></div>
            : <div className='flex space-x-5 justify-center items-center'><h1 
            className='text-xl'>{playerNames.player2} WINS! {(finalWinner.trueVictor)?`Absolute Victory`:`Victory by Score`}</h1>
            <button className='border border-slate-700 hover:bg-slate-600 hover:text-gray-300 p-3 rounded-full'
            onClick={handleReset}>RESET</button></div> }
    </div>
  )
}
