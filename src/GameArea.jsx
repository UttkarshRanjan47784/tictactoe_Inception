import React, { useState } from 'react'
import PlayerInfo from './PlayerInfo'
import GameBoard from './GameBoard';

export default function GameArea() {

    let [turn, setTurn] = useState(true);

    let [playerNames, setPlayerName] = useState({
        player1 : `Player 1`,
        player2 : `Player 2`,
    });

    let [winner, setWinner] = useState(0);

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
    
    let getChangeTurn = () => { setTurn((prev)=>{ return !prev }) }

    let getWinner = (player) =>{
        setWinner(player)
        setTurn((prev)=>{ return !prev });
        console.log(player);
      }


  return (
    <div className='flex-col'>
        <PlayerInfo turn={turn} sendP1={getP1} sendP2={getP2} />
        <GameBoard turn={turn} sendChangeTurn={getChangeTurn} sendWinner={getWinner} />
    </div>
  )
}
