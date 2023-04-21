import React, {useState, useEffect} from "react";
import {BG, Box, Item} from './BackendCompo.element'
const Backend = () => {
    
    const [Data, setData] = useState([]);
    useEffect(() => {
      fetch(`http://localhost:5000/root`)
      .then((response) => response.json())
      .then((actualData) => setData(actualData))
    }, []);
    return(
        <>
            <BG>
                {Data.map((i,index) => {
                    return(
                        <Box>
                            <Item>_id: {i._id}</Item>
                            <Item>EQ: {i.EQ}</Item>
                            <Item>a: {i.a}</Item>
                            <Item>b: {i.b}</Item>
                        </Box>
                    )
                })}
            </BG>
        </>
    )
}
export default Backend;
