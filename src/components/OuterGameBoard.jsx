import React, { useState, useEffect } from 'react'
import InnerGameBoard from './InnerGameBoard';

export default function OuterGameBoard(props) {

    let [outerTiles, setOuterTiles] = useState([
        [`_`, `_`, `_`],
        [`_`, `_`, `_`],
        [`_`, `_`, `_`],
    ]);

    let [flag, setFlag] = useState(false)

    let [score, setScore] = useState([0, 0]);

    function checkDraw() {
        for (let i=0; i<3; i++)
            for (let j=0; j<3; j++)
                if (outerTiles[i][j] == '_')
                    return;
        // setEditing(false);
        console.log(`Draw!`);
        if (score[0] > score[1])
            props.sendFinalWinner(1, false);
        else if (score[0] < score[1])
            props.sendFinalWinner(2, false);
        else
            props.sendFinalWinner(3, false);
    }

    function checkWinner (t) {
        let player;
        let playerSymbol;
        if (!t){
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
                if (outerTiles[i][j] != playerSymbol)
                    break;
                count++;
                arr.push(`${i}${j}`);
                if (count == 3){              
                    console.log(`${player} wins!`);
                    props.sendFinalWinner(player, true);
                    props.sendChangeTurn();
                    return;
                }
            }            
        }
        //col check
        for(let i=0; i<3; i++){
            let count = 0;
            for(let j=0; j<3; j++){       
                if (outerTiles[j][i] != playerSymbol){
                    break;
                  }
                count++;
                if (count == 3){                
                    console.log(`${player} wins!`);
                    props.sendChangeTurn();
                    props.sendFinalWinner(player, true);
                    return;
                }
            }            
        }
  
        //diag 1 check
        let count1 = 0
        let arr = [];
  
        for (let i=0; i<3; i++){
            if (outerTiles[i][i] == playerSymbol){
                count1++;
                arr.push(`${i}${i}`);
            } else break;
            if (count1 == 3){
                console.log(`${player} wins!`);
                props.sendChangeTurn();
                props.sendFinalWinner(player, true);
                return;
            }
        }
  
        //diag 2 check
        let count2 = 0;
        arr = [];
  
        for (let i=0; i<3; i++){            
            if (outerTiles[i][2-i] == playerSymbol){
                count2++;
                arr.push(`${i}${2-i}`);
            }
            if (count2 == 3){                
                console.log(`${player} wins!`);
                props.sendChangeTurn();
                props.sendFinalWinner(player, true);
                return;
            }
        }
        checkDraw();
    }

    let getChangeTurn = () => { props.sendChangeTurn(); }
  
    let getInnerWinner = (player) =>{
        // setTurn((prev)=>{ return !prev });
        setFlag(true)
        let row = player.split('')[0]
        let col = player.split('')[1]
        let user = player.split('')[2]
        setOuterTiles((prev)=>{
            let arr = prev;
            arr[row][col] = (user==1) ? `X` : (user==2)? `O` : `D`;
            return [...arr];
        });
        (user==1 || user==2)? setScore((prev) => {
            let arr = prev;
            arr[user-1] += 1;
            return [...arr];
        }) : null;
    }

    useEffect(()=>{
        if (flag) {
          checkWinner(props.turn);
      }
      }, [outerTiles])

    let renderOuterBoard = outerTiles.map((item, indexout) => {
        return <div className='outerTileRow flex w-fit justify-center items-center mx-auto bg-slate-700' key={`outer-${indexout}`}>
            {item.map((i, indexin) => {
                        return <InnerGameBoard key={`${indexout}${indexin}`}
                        gameOver = {props.gameOver}
                        boardID={`${indexout}${indexin}`} turn={props.turn} 
                        sendChangeTurn={getChangeTurn} sendInnerWinner={getInnerWinner} 
                        won={(outerTiles[indexout][indexin]=='_')? 0 :
                        (outerTiles[indexout][indexin]=='X')? 1 :
                        (outerTiles[indexout][indexin]=='O')? 2 : 3} />
                })
            }
        </div>
    })  

    

  return (
    <div className='p-10 flex-col justify-center items-center'>
        {renderOuterBoard}
    </div>
  )
}
