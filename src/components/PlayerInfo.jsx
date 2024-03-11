import React, { useState } from 'react'

export default function PlayerInfo(props) {

    let [p1, setP1] = useState(`Player 1`);
    let [p2, setP2] = useState(`Player 2`);

    let saveP1 = () => { props.sendP1(p1); }

    let saveP2 = () => { props.sendP2(p2); }    

    let handleP1Change = (event) => { setP1(event.target.value) }
    let handleP2Change = (event) => { setP2(event.target.value) }

    let activePlayer1 = `bg-slate-400 border-4 rounded-full border-red-700 p-2 text-center`
    let activePlayer2 = `bg-slate-400 border-4 rounded-full border-green-700 p-2 text-center`
    let inactivePlayer = `bg-slate-400 border rounded-full border-slate-700 p-2 text-center`

  return (
    <div className='flex flex-col bg-slate-400 p-3 space-y-2 md:justify-center md:flex-row  md:space-x-5 md:space-y-0'>
        <div className='flex space-x-5 justify-center'>
          <input type='text' name='p1Name' 
          className={props.turn? activePlayer1:inactivePlayer}
          value={p1} onChange={handleP1Change}></input>        
          <button className='text-red-600 text-3xl'>X</button>
          <button onClick={saveP1} 
          className='border border-slate-700 hover:bg-slate-600 hover:text-gray-300 p-3 rounded-full'>SAVE NAME</button>
        </div>
        <div className='flex space-x-5 justify-center'>
          <input type='text' name='p2Name' 
          className={props.turn? inactivePlayer:activePlayer2}
          value={p2} onChange={handleP2Change}></input>
          <button className='text-green-700 text-3xl'>O</button>
          <button onClick={saveP2} 
          className='border border-slate-700 hover:bg-slate-600 hover:text-gray-300 p-3 rounded-full'>SAVE NAME</button>
        </div>        
    </div>
  )
}
