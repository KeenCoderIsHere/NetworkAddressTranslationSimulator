'use client'
import { useState, useEffect } from "react";

export default function MovingDiv({ onCycleComplete, buttonClicked,privateIP,publicIP,privatePort,publicPort,destIP,destPort }) {
  const positions = [
    { left: "left-50", top: "top-50" },
    { left: "left-180", top: "top-70" },
    { left: "left-300", top: "top-25" },
    { left: "left-180", top: "top-70" },
    { left: "left-50", top: "top-50" },
  ];

  const [posIndex, setPosIndex] = useState(0);
  const [source,setSource] = useState("")
  const [dest,setDest] = useState("")
  const [type,setType] = useState("Request")
  useEffect(() => {
    if(!buttonClicked) return
    const interval = setInterval(() => {
      setPosIndex((prev) => {
        if(prev === 2){
          setType("Response")
        }
        if(prev === 0){
          setSource(privateIP+":"+privatePort)
          setDest(publicIP+":"+publicPort)
        }
        else if(prev === 1){
          setSource(publicIP+":"+publicPort)
          setDest(destIP+":"+destPort)
        }
        else if(prev === 2){
          setSource(destIP+":"+destPort)
          setDest(publicIP+":"+publicPort)
        }
        else if(prev === 3){
          setSource(publicIP+":"+publicPort)
          setDest(privateIP+":"+privatePort)
        }
        const nextIndex = prev + 1;
        if (nextIndex >= positions.length) {
          if (onCycleComplete) onCycleComplete(true);
          clearInterval(interval)
          return prev;
        }

        return nextIndex;
      });
    }, 8000);

    return () => clearInterval(interval);
  }, [buttonClicked,onCycleComplete]);

  return (
    <div
      className={`p-3 border border-black rounded-xl bg-gray-200 fixed transition-all duration-[4000ms] ease-in-out
        ${positions[posIndex].left} ${positions[posIndex].top}`}
    > 
      <p className="whitespace-wrap text-[15px] font-bold">{type}</p>
      <p className="whitespace-wrap text-[15px] font-bold">Source: {source}</p>
      <p className="whitespace-wrap text-[15px] font-bold">Destination: {dest}</p>
    </div>
  );
}

/**/