import { useEffect, useState } from 'react';
import './App.css';

import blank from "./Images/blank.png";
import blueCandy from "./Images/blue-candy.png"
import greenCandy from "./Images/green-candy.png"
import orangeCandy from "./Images/orange-candy.png"
import purpleCandy from "./Images/purple-candy.png"
import redCandy from "./Images/red-candy.png"
import yellowCandy from "./Images/yellow-candy.png"
import sweet from "./Images/sweet.jpg"
import scores from "./Images/score.png"
import arrow from "./Images/arrow.png"
import candyModalBg from "./Images/candycrush-modalbg.png"
import candyBg from "./Images/1.jpg"
import ProgressLoad from './ProgressLoad';


const width = 8;

const candyColors = [
  blueCandy,
  greenCandy,
  orangeCandy,
  purpleCandy,
  redCandy,
  yellowCandy
];
const App = () => {
  const [currentColorArrangement, setCurrentColorArrangement] = useState([]);
  const [squareBeingDragged,setSquareBeingDragged]=useState(null);
  const [squareBeingReplaced,setSquareBeingReplaced]=useState(null);
  const [logo,setLogo]=useState(false);
  const [score,setScore]=useState(0);
  const [modal,setModal]=useState(false);
  // const [load,isLoading]=useState(true);
  // const [progressCount,setProgressCount]=useState(0);



  const checkForColumnOfThree=()=>{
    for(let i=0;i<=47;i++){
      const columnOfThree=[i,i+width,i+width*2];
      const decidedColor=currentColorArrangement[i];
      const isBlank=currentColorArrangement[i]===blank;

      if(columnOfThree.every(square=>currentColorArrangement[square]===decidedColor && !isBlank)){
        setScore((score)=>score+3);
        columnOfThree.forEach(number=>currentColorArrangement[number]=blank);
        return true;
      }
   
    }
  }

  const checkForRowsOfThree=()=>{
    for(let i=0;i<64;i++){
      const rowsOfThree=[i,i+1,i+2];
      const decidedColor=currentColorArrangement[i];
      const notValid=[6,7,14,15,22,23,30,31,38,39,46,47,54,55,63,64];
      const isBlank=currentColorArrangement[i]===blank;

      if(notValid.includes(i)) continue

      if(rowsOfThree.every(square=>currentColorArrangement[square]===decidedColor && !isBlank)){
        setScore((score)=>score+3);
        rowsOfThree.forEach(number=>currentColorArrangement[number]=blank);
        return true;
      }
   
    }
  }

  const checkForColumnOfFour=()=>{
    for(let i=0;i<=39;i++){
      const columnOfFour=[i,i+width,i+width*2,i+width*3];
      const decidedColor=currentColorArrangement[i];
      const isBlank=currentColorArrangement[i]===blank;

      if(columnOfFour.every(square=>currentColorArrangement[square]===decidedColor && !isBlank)){
        setScore((score)=>score+4);
        columnOfFour.forEach(number=>currentColorArrangement[number]=blank);
        return true;
      }
   
    }
  }

  const checkForRowsOfFour=()=>{
    for(let i=0;i<64;i++){
      const rowsOfFour=[i,i+1,i+2,i+3];
      const decidedColor=currentColorArrangement[i];
      const notValid=[5,6,7,13,14,15,21,22,23,29,30,31,37,38,39,45,46,47,53,54,55,62,63,64];
      const isBlank=currentColorArrangement[i]===blank;

      if(notValid.includes(i)) continue

      if(rowsOfFour.every(square=>currentColorArrangement[square]===decidedColor && !isBlank)){
        setScore((score)=>score+4);
        rowsOfFour.forEach(number=>currentColorArrangement[number]=blank);
        return true;
      }
   
    }
  }

  const createBoard = () => {
    const randomColorArrangement = [];
    for (let i = 0; i < width * width; i++) {
      const randomColor = candyColors[Math.floor(Math.random() * candyColors.length)];
      randomColorArrangement.push(randomColor);
    }
    setCurrentColorArrangement(randomColorArrangement);
  }

  const moveIntoSquaresBelow=()=>{
    for(let i=0;i<=55;i++){

      const firstRow=[0,1,2,3,4,5,6,7];
      const isFirstRow=firstRow.includes(i);

      if(isFirstRow && currentColorArrangement[i]==blank){
        let randomNumber=Math.floor(Math.random()*candyColors.length);
        currentColorArrangement[i]=candyColors[randomNumber];
      }
      
      if((currentColorArrangement[i+width])===blank){
        currentColorArrangement[i+width]=currentColorArrangement[i];
        currentColorArrangement[i]=blank;
      }
    }
  }


  useEffect(() => {
    createBoard();
  }, [])
  // console.log(currentColorArrangement);

  useEffect(()=>{
    const timer=setInterval(() => {

      //we need to place columnof four first
      checkForColumnOfFour();
      checkForColumnOfThree();
      checkForRowsOfThree();
      checkForRowsOfFour();
      moveIntoSquaresBelow();
      //to update the display
      setCurrentColorArrangement([...currentColorArrangement])
    }, 500);
   
    return ()=>clearInterval(timer) 

  },[checkForRowsOfFour,checkForRowsOfThree,checkForColumnOfFour,checkForColumnOfThree,moveIntoSquaresBelow,currentColorArrangement])


  const dragStart=(e)=>{
    // console.log("drag start");
    // console.log(e.target);
    setSquareBeingDragged(e.target)
  }

  const dragDrop=(e)=>{
    // console.log("drag drop");
    // console.log(e.target);
    setSquareBeingReplaced(e.target)
  }

  const dragEnd=()=>{
    // console.log("drag End");
    const squareBeingDraggedId=parseInt(squareBeingDragged.getAttribute('data-id'));
    const squareBeingReplacedId=parseInt(squareBeingReplaced.getAttribute('data-id'));
    
    const validMoves=[
      squareBeingDraggedId + 1,
      squareBeingDraggedId - width,
      squareBeingDraggedId - 1,
      squareBeingDraggedId + width
    ]
      if(validMoves.includes(squareBeingReplacedId)){
        currentColorArrangement[squareBeingDraggedId]=squareBeingReplaced.getAttribute('src');
     currentColorArrangement[squareBeingReplacedId]=squareBeingDragged.getAttribute('src');
      }
      else{
        currentColorArrangement[squareBeingDraggedId]=squareBeingDragged.getAttribute('src');
      currentColorArrangement[squareBeingReplacedId]=squareBeingReplaced.getAttribute('src');
      }
     

    // console.log("dragged"+squareBeingDraggedId);
    // console.log("replaced"+squareBeingReplacedId);

   

    const validMove=validMoves.includes(squareBeingReplacedId);
    
     
    const isColumnOfFour=checkForColumnOfFour();
    const isColumnOfThree=checkForColumnOfThree();
    const isRowOfFour=checkForRowsOfFour();
    const isRowOfThree=checkForRowsOfThree();

    if(squareBeingReplacedId  &&
       validMove  &&
        (isColumnOfFour||isColumnOfThree||isRowOfFour||isRowOfThree)){
      setSquareBeingDragged(null);
      setSquareBeingReplaced(null);
      setLogo(true);
      
    }
    else{
      currentColorArrangement[squareBeingDraggedId]=squareBeingDragged.getAttribute('src');
      currentColorArrangement[squareBeingReplacedId]=squareBeingReplaced.getAttribute('src');
      setCurrentColorArrangement([...currentColorArrangement])
     
    }
  }



  useEffect(()=>{
   setTimeout(()=> setLogo(false),2000)
  },[logo])

  const reload=()=>{
    // window.location.reload(true);
    setModal(true);
  }
  
  const newGame=()=>{
    window.location.reload(true);
  }
  const closeModal=()=>{
      setModal(false);
  }

  return (
    <div className="app">
     
     <>
      <img src={candyBg}  className="candy__bg"/>
      <button onClick={reload} className="reload">Reload</button>
      <p className='score__container'>
      <img src={scores} className="score__img"/>
      <h3 className='score'>{score}</h3>
      </p>
      <div className={modal?'opacity':'game'}>
        {currentColorArrangement.map((candyColor, index) => (
          <img className='container'
            key={index}
            src={candyColor}
            alt={index}
            data-id={index}
            draggable={true}
            onDragStart={dragStart}
            onDragOver={(e=>e.preventDefault())}
            onDragEnter={(e=>e.preventDefault())}
            onDragLeave={(e=>e.preventDefault())}
            onDrop={dragDrop}
            onDragEnd={dragEnd}

          />
        ))}
        {logo &&<img src={sweet} className="sweet" />}
        
        </div>

      {
        modal &&
        <div>
      <div className='modal'>
       <span className='continue'> Continue ?</span>
       <button className='close' onClick={closeModal}>X</button>
         <div className='container'>
        <img src={arrow} className="arrow"/>
      <span className='score__modal'> {score}</span>
      <button className='play__on' onClick={closeModal}>Play On!</button>
      <button className='new__game'  onClick={newGame}>New Game!</button>
         </div>
         <button className='info'>i</button>
      </div>
      <img src={candyModalBg} className="candy__modalbg"/>
      </div>
}
</>
    </div>

  );
}

export default App;
