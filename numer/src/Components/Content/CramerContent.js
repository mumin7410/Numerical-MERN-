import React, { useEffect, useState } from "react";
import { BG, ContentSec, InputGroup, InputSec, InputTitle, InputValue, Meme, Method, MethodDescripe, MethodTopic } from "./CramerContent.element";
import { MenuButton } from "../Menu/Button.element"
const math = require('mathjs');

//Input Part--------------------------------------------------------------------------------------------------------------------------------
const Content = ({MethodTopicText,MethodDescripeText,Memes}) =>{
    const [arr,setArr] = useState([]);
    const [Answer,setAnswer] = useState('');
    let tempArr = [];
    let DetArrTemp = [];
    const testArr = [
        {id:`X${1}_${1}`,xOf:1,value:1},
        {id:`X${2}_${1}`,xOf:1,value:2},
        {id:`T${1}`,xOf:1,value:3},
        {id:`X${1}_${2}`,xOf:2,value:4},
        {id:`X${2}_${2}`,xOf:2,value:5},
        {id:`T${2}`,xOf:2,value:6},
    ];
      //calculation
      const [a,seta] = useState(0);
      const ahandleChange = (e) => {
        seta(e.target.value);
    }
    useEffect(() => {
        BisectionCal();
      }, [a]);

      //Calculator:   
    const BisectionCal = () => {
        let xn = 1;
        let x_of = 1;
        for(let i = 1; i <=((parseInt(a)+1)*(parseInt(a)+1)) - (parseInt(a)+1) ; i++){
            if(xn%(parseInt(a)+1) == 0){
                tempArr.push({id:`T${x_of}`,xOf:x_of,value:0})
                xn=1;
                x_of++;
            }
            else{
                tempArr.push({id:`X${xn}_${x_of}`,xOf:x_of,value:0})
                xn++;
            }
        }
        console.log(tempArr.length);
        setArr(tempArr);
        tempArr = [];
    }

    const getValue = (e,id) => {
        const newArr = [...arr];
        const index = newArr.findIndex((item) => item.id === id);
        newArr[index].value = e.target.value;
        setArr(newArr);
    }

    const Random = () => {
        seta(2);
        setArr(testArr);
    }

    function cramerRule(x) {
        if (x.length !== x[0].length - 1) {
          return 'Input matrix must have n rows and n+1 columns';
        }
        const n = x.length;
        const a = [];
        const b = [];
        for (let i = 0; i < n; i++) {
          a[i] = [];
          for (let j = 0; j < n; j++) {
            a[i][j] = x[i][j];
          }
          b[i] = x[i][n];
        }
        const detA = math.det(a);
        if (detA === 0) {
          return 'System of equations has no unique solution';
        }
        const result = [];
        for (let i = 0; i < n; i++) {
          const ai = [];
          for (let j = 0; j < n; j++) {
            ai[j] = a[j].slice();
          }
          for (let j = 0; j < n; j++) {
            ai[j][i] = b[j];
          }
          result[i] = math.det(ai) / detA;
        }
        return result;
      }

    const Solve = () => {
        for(let i = 0; i <a; i++){
            DetArrTemp.push([]);
            arr.forEach(e => {
                if(e.xOf == i+1){
                    DetArrTemp[i].push(e.value);
                }
            })
        }
        
        const result = cramerRule(DetArrTemp);
        console.log(DetArrTemp);
        setAnswer(result);
        DetArrTemp = [];
    }
    
//End Input Part--------------------------------------------------------------------------------------------------------------------------------
    return(
        <>
            <BG>
                <ContentSec>
                    <Meme>
                        <div style={{display:'grid',gridTemplateColumns: `repeat(${parseInt(a)+1}, 1fr)`,gap: '0px',width:'100%',gap:'15px',justifyItems:'center'}}>
                            {arr.map((i,index) => {
                                return(
                                    <>
                                    <div>
                                        <div style={{color:'#E4E4E4'}}>{i.id}</div>
                                        <InputValue 
                                        key={index}
                                        style={{boxShadow:'inset 10px 10px 10px 5px #1C242B'}}
                                        onChange={(e) => getValue(e,i.id)}
                                        value={i.value}
                                        />
                                    </div>
                                    </>
                                )
                            })}
                        </div>
                    </Meme>
                    <Method>
                        <MethodTopic>
                        {MethodTopicText}
                        </MethodTopic>
                        <MethodDescripe>
                            {MethodDescripeText}
                        </MethodDescripe>
                        <InputSec>
                            <InputGroup>
                                <InputTitle>Dimension:</InputTitle><InputValue onChange={ahandleChange} value = {a}/>
                            </InputGroup>
                            <InputGroup>
                            <MenuButton style={{background:'#0A1929'}} onClick={Solve}>SOLVE</MenuButton>
                            <MenuButton style={{background:'#0A1929'}} onClick={Random}>RANDOM</MenuButton>
                            </InputGroup>
                        </InputSec>
                        <div style={{color:'#E4E4E4', marginTop:'10px',textDecoration:'underline #0A1929'}}>{`The ansewr is: ${Answer}`}</div>
                    </Method>
                </ContentSec>
                {/* --------------------------------------------------------------------------------------------------------------------------- */}
            </BG>
        </>
      )
}

export default Content;