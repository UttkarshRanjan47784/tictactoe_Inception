import React, { useState } from 'react'

export default function GameBoard(props) {

    let blank = `_`;

    let [gameBoard, setGameBoard] = useState([
        [blank, blank, blank],
        [blank, blank, blank],
        [blank, blank, blank],
    ]);

    let [winningTiles, setWinningTiles] = useState(null);

    let [editing, setEditing] = useState(true);

    const handleClick = (event) => {        
        let x = event.target.id.split('');
        let row = Number(x[2]), col = Number(x[3]);
        if (gameBoard[row][col] == blank){
            setGameBoard((prev) => {
                let arr = prev;
                arr[row][col] = props.turn?`X`:`O`;
                return arr;
            })
            checkWinner(props.turn);
            props.sendChangeTurn();
        }
        else {
            alert(`Please select an empty tile only`);
        }
    }

    function checkWinner (t) {
        let player;
        let playerSymbol;
        if (t){
            player = 1
            playerSymbol =`X`;
        }
        else{
            player = 2
            playerSymbol =`O`;
        }
        //row check
        for(let i=0; i<3; i++){
            let count = 0;
            let arr = [];
            for(let j=0; j<3; j++){
                if (gameBoard[i][j] != playerSymbol)
                    break;
                count++;
                arr.push(`${i}${j}`);
                if (count == 3){                
                    props.sendWinner(player);
                    setWinningTiles(arr);
                    setEditing(false);
                    return;
                }
            }            
        }
        //col check
        for(let i=0; i<3; i++){
            let count = 0;
            let arr = [];
            for(let j=0; j<3; j++){                
                if (gameBoard[j][i] != playerSymbol)
                    break;
                count++;
                arr.push(`${j}${i}`);
                if (count == 3){                
                    props.sendWinner(player);
                    setWinningTiles(arr);
                    setEditing(false);
                    return;
                }
            }            
        }

        //diag 1 check
        let count1 = 0
        let arr = [];

        for (let i=0; i<3; i++){
            if (gameBoard[i][i] == playerSymbol){
                count1++;
                arr.push(`${i}${i}`);
            } else break;
            if (count1 == 3){
                props.sendWinner(player);
                setWinningTiles(arr);
                setEditing(false);
                return;
            }
        }

        //diag 2 check
        let count2 = 0;
        arr = [];

        for (let i=0; i<3; i++){            
            if (gameBoard[i][2-i] == playerSymbol){
                count2++;
                arr.push(`${i}${2-i}`);
            }
            if (count2 == 3){                
                props.sendWinner(player);
                setWinningTiles(arr);
                setEditing(false);
                return;
            }
        }
        checkDraw();
    }

    function checkDraw() {
        for (let i=0; i<3; i++)
            for (let j=0; j<3; j++)
                if (gameBoard[i][j] == blank)
                    return;
        setEditing(false);
        props.sendWinner(3);
    }

    let blankTile = `size-28 border border-black text-white text`;
    let xTile = `size-28 border border-black text-red-600 text-5xl`;
    let oTile = `size-28 border border-black text-green-700 text-5xl`;
    let winningXTile = `size-28 border border-black text-red-600 bg-slate-400 text-5xl`;
    let winningOTile = `size-28 border border-black text-green-700 bg-slate-400 text-5xl`;
    // className={(i==blank)?`gb-btn`:
    //             (winningTiles == null)?`gb-btn-${i}`:
    //             (winningTiles.includes(`${indexout}${indexin}`))?`gb-btn-${i}-winner`:`gb-btn-${i}`}

    let renderGameBoard = gameBoard.map((item, indexout)=>{
        return <div className='gb-row flex justify-center items-center'
         key={indexout}>{item.map((i, indexin) => {
            return <button 
            className= {(i==blank)? blankTile 
                : (winningTiles == null)? (i=='X')? xTile : oTile 
                : (winningTiles.includes(`${indexout}${indexin}`))? (i=='X')? winningXTile : winningOTile
                : (i=='X')? xTile : oTile }
            key={`${indexout}${indexin}`} 
            id={`gb${indexout}${indexin}`} 
            onClick={(editing)?handleClick:null}>{i}</button>
        })}</div>
    });

  return (
    <div className='p-5 bg-orange-250 h-dvh'>
        {renderGameBoard}
    </div>
  )
}
