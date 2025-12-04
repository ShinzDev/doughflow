'use client'

import { useState } from "react";

export default function BakeryCost() {
  
  //bakery cost for bread 
  
  let bakerycostforsmallbread = 200;
  let bakerycostforbigbread = 240;
  
  //amount of bread big and small
  
  
  let totalBigBread = 290
  
const [smallBread, setSmallBread] = useState(0)
const [bigBread, setBigBread] = useState(0)
  
  
  let BakeryCost = totalBigBread * 230
  console.log(BakeryCost)
  
  return (
    <div className="p-3.5 text-center align-middle bg-amber-200 grid grid-cols-2">
      <label>input here</label>
      
      <input type="number" placeholder="number "/>
    </div>
  );
}
