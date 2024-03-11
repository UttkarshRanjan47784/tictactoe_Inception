import React, { useEffect } from 'react'
import { useState } from 'react'

export default function InnergameBoard(props) {

  const blank = '_';

    let [innerTile, setInnerTile] = useState([
      [`_`, `_`, `_`],
      [`_`, `_`, `_`],
      [`_`, `_`, `_`],
    ])

    let [flag, setFlag] = useState(false)

    function checkDraw() {
      for (let i=0; i<3; i++)
          for (let j=0; j<3; j++)
              if (innerTile[i][j] == blank)
                  return;
      props.sendInnerWinner(`${props.boardID}3`);
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
              if (innerTile[i][j] != playerSymbol)
                  break;
              count++;
              arr.push(`${i}${j}`);
              if (count == 3){              
                  props.sendInnerWinner(`${props.boardID}${player}`);
                  // setEditing(false);
                  return;
              }
          }            
      }
      //col check
      for(let i=0; i<3; i++){
          let count = 0;
          for(let j=0; j<3; j++){
              if (innerTile[j][i] != playerSymbol){
                  break;
                }
              count++;
              if (count == 3){                
                  props.sendInnerWinner(`${props.boardID}${player}`);
                  // setEditing(false);
                  return;
              }
          }            
      }

      //diag 1 check
      let count1 = 0
      let arr = [];

      for (let i=0; i<3; i++){
          if (innerTile[i][i] == playerSymbol){
              count1++;
              arr.push(`${i}${i}`);
          } else break;
          if (count1 == 3){
              props.sendInnerWinner(`${props.boardID}${player}`);
              // setEditing(false);
              return;
          }
      }

      //diag 2 check
      let count2 = 0;
      arr = [];

      for (let i=0; i<3; i++){            
          if (innerTile[i][2-i] == playerSymbol){
              count2++;
              arr.push(`${i}${2-i}`);
          }
          if (count2 == 3){                
              props.sendInnerWinner(`${props.boardID}${player}`);
              // setEditing(false);
              return;
          }
      }
      checkDraw();
  }

    let handleInnerTileClick = (event) => {
      setFlag(true);
      let row = event.target.id.split('')[2];
      let col = event.target.id.split('')[3];
      if (innerTile[row][col] !== `_`){
        alert(`Select Empty Tiles Only`);
        return;
      }      
      setInnerTile((prev) => {
        let arr = prev;        
        arr[row][col] = props.turn?`X`:`O`;
        return [...arr];
      });
    }

    useEffect(()=>{
      if (flag) {
        checkWinner(props.turn);
        props.sendChangeTurn();
    }
    }, [innerTile])

    let diag = [`00`, `11`, `22`, `02`, `20`]

    let innerBoardTile = 'InnerTile border border-black size-8 md:size-12'
    let innerBoardXTile = 'InnerTile border border-black size-8 md:size-12 text-red-600'
    let innerBoardOTile = 'InnerTile border border-black size-8 md:size-12 text-green-700'

    let innerWonXTile = 'InnerTile border border-black size-8 md:size-12 bg-red-500 text-red-600'
    let innerWonOTile = 'InnerTile border border-black size-8 md:size-12 bg-green-700 text-red-600'
    let innerWonTile = 'InnerTile border border-black size-8 md:size-12'
    let innerDrawTile = `InnerTile border border-slate-400 size-8 md:size-12`

    let renderInnerBoard = innerTile.map((item, indexout) => {
      return <div className={`InnerTileRow flex justify-center items-center bg-slate-400`} key={`outer-${indexout}`}>
          {item.map((i, indexin) => {
                  return (props.won == 0) ? <button 
                    className={(i==`_`)? innerBoardTile
                    : (i == `X`)? innerBoardXTile : innerBoardOTile} 
                    key={`${props.boardID}${indexout}${indexin}`} 
                    id={`${props.boardID}${indexout}${indexin}`}
                    onClick={(props.gameOver==0)?handleInnerTileClick:null}>{i}</button>
                  : (props.won==1) ? <button 
                      className={(diag.includes(`${indexout}${indexin}`))? innerWonXTile : innerWonTile} 
                      key={`${props.boardID}${indexout}${indexin}`} 
                      id={`${props.boardID}${indexout}${indexin}`}></button>
                    : (props.won==2) ? <button 
                      className={(`${indexout}${indexin}` == `11`)? innerWonTile : innerWonOTile} 
                      key={`${props.boardID}${indexout}${indexin}`} 
                      id={`${props.boardID}${indexout}${indexin}`}></button>
                      : <button 
                        className={innerDrawTile} 
                        key={`${props.boardID}${indexout}${indexin}`} 
                        id={`${props.boardID}${indexout}${indexin}`}></button>
              })
          }
      </div>
  }) 

  return (
    <div className={`OuterTile border-collapse border-2 border-slate-700 flex-col justify-center items-center bg-slate-700`}>
      {renderInnerBoard}
    </div>
  )
}

