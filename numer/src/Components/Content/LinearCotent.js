import React, { useState } from "react";
import Paper from '@mui/material/Paper';
import { MenuButton } from "../Menu/Button.element"
import { Line } from 'react-chartjs-2';

const Test = () => {

let data = [{x: 0, y: 2},{x: 1, y: 3},{x: 2, y: 12},{x: 5, y: 147}];
const [sample,setsample] = useState([]);
const [chartData, setChartData] = useState(sample);
const [isSolve,setisSolve] = useState(false);
const cal = () => {
    setisSolve(true);
    setChartData(data);
}
class Data
{
    constructor(x,y)
    {
        this.x=x;
        this.y=y;
    }
}

function interpolate(f,xi,n)
{
    let result = 0; // Initialize result
   
    for (let i = 0; i < n; i++)
    {
        // Compute individual terms of above formula
        let term = f[i].y;
        for (let j = 0; j < n; j++)
        {
            if (j != i)
                term = term*(xi - f[j].x) / (f[i].x - f[j].x);
        }
   
        // Add current term to result
        result += term;
    }
   
    return result;
}
 
let f=[new Data(0, 2), new Data(1, 3),new Data(2, 12), new Data(5, 147)];
console.log("Value of f(3) is : " + interpolate(f, 3, 4));

  return (
    <>
      <MenuButton onClick={cal}>Solve</MenuButton>
    </>
  );
};
export default Test;