import {useState,useEffect, startTransition} from "react";

const ProgressLoad=()=>{
    const [style,setStyle]=useState({});
    const [loadCount,setLoadCount]=useState(50);

    
    const newStyle={
        opacity:1,
        width:`${loadCount}%`
    }
  const setint=()=>{
    setStyle(newStyle)
  }

    if(loadCount<100){  
  setInterval(()=>{
    setint()
    setLoadCount(loadCount+10)
},1000)
    }
else{
    window.location.reload(true);
}


    return(
        <div className="progress">
        <div className="progress-done" 
       style={style}
        >
            {loadCount}%
        </div>
    </div>
    )
}

export default ProgressLoad;