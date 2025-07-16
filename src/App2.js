import { useState,useContext } from "react";
import React from "react";
import { CountContext } from "./context";

export function App2(){
    const [count,setCount] = useState(0);
    return(
       <CountContext.Provider value={{count,setCount}}>
            <Count/>
       </CountContext.Provider>
    );
}

function Count(){
    return(
        <div>
            <CountRender/>
            <Button/>
        </div>
    );
}

function CountRender(){
    const {count} = useContext(CountContext);
    return(
        <div>
            {count}
        </div>
    )
}

function Button(){
    const {count,setCount} = useContext(CountContext);
    return(
        <div>
            <button onClick={()=>setCount(count+1)}>Increment</button>
            <button onClick={()=>setCount(count-1)}>Decrement</button>
        </div>
    );
}
