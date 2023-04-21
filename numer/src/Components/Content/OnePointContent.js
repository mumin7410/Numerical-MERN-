import React, { useState, useEffect } from "react";
import { BG, ContentSec, InputGroup, InputSec, InputTitle, InputValue, Meme, Method, MethodDescripe, MethodTopic } from "./OnePointContent.element";
import { MenuButton } from "../Menu/Button.element"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableVirtuoso } from 'react-virtuoso';
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  LineSeries,
  Title,
  Legend,
} from '@devexpress/dx-react-chart-material-ui';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { ArgumentScale, Animation } from '@devexpress/dx-react-chart';
import {
  curveCatmullRom,
  line,
} from 'd3-shape';
import { scalePoint } from 'd3-scale';
const math = require('mathjs');

// Chart Part----------------------------------------------------------------------------------------------------------------

const PREFIX = 'Demo';
const classes = {
  title: `${PREFIX}-title`,
  chart: `${PREFIX}-chart`,
};

const Line = props => (
  <LineSeries.Path
    {...props}
    path={line()
      .x(({ arg }) => arg)
      .y(({ val }) => val)
      .curve(curveCatmullRom)}
  />
);

const StyledDiv = styled('div')(() => ({
  [`&.${classes.title}`]: {
    textAlign: 'center',
    width: '100%',
    marginBottom: '10px',
  },
}));

const Text = ({ text }) => {
  const [mainText, subText] = text.split('\\n');
  return (
    <StyledDiv className={classes.title}>
      <Typography component="h3" variant="h5">
        {mainText}
      </Typography>
      <Typography variant="subtitle1">{subText}</Typography>
    </StyledDiv>
  );
};

const Root = props => (
  <Legend.Root {...props} sx={{ display: 'flex', margin: 'auto', flexDirection: 'row' }} />
);
const Label = props => (
  <Legend.Label {...props} sx={{ mb: 1, whiteSpace: 'nowrap' }} />
);
const Item = props => (
  <Legend.Item {...props} sx={{ flexDirection: 'column-reverse' }} />
);

const StyledChart = styled(Chart)(() => ({
  [`&.${classes.chart}`]: {
    paddingRight: '30px',
  },
}));
// End Chart Part--------------------------------------------------------------------------------------------------------------------------------

//Table and Input Part--------------------------------------------------------------------------------------------------------------------------------
const Onepoint = ({MethodTopicText,MethodDescripeText,Memes}) => {

      //Columns
      const columns = [
        {
          width: 60,
          label: 'Iteration',
          dataKey: 'calories',
          numeric: false,
        },
        {
          width: 70,
          label: 'X',
          dataKey: 'fat',
          numeric: false,
        },
        {
          width: 70,
          label: 'Error',
          dataKey: 'carbs',
          numeric: false,
        }
      ];
      //Fetch from MongoDB
      const [Data, setData] = useState([]);
      useEffect(() => {
        fetch(`http://localhost:5000/root`)
        .then((response) => response.json())
        .then((actualData) => setData(actualData))

      }, []);
      //calculation
      let data = [];
      const [sample,setsample] = useState([]);
      const [EQ,setEQ] = useState('');
      const [a,seta] = useState();
      const [b,setb] = useState();
      const [isSolve,setisSolve] = useState(false);
      const [ans, setans] = useState('?');
      const [chartData, setChartData] = useState(sample);
      const FxhandleChange = (e) => {
        setEQ(e.target.value)
      }
      const ahandleChange = (e) => {
        seta(e.target.value);
      }
      const bhandleChange = (e) => {
        setb(e.target.value)
      }
      //Set value 
      const Random = () => {
        setEQ(Data[2].EQ)
        seta(Data[2].a);
      }
      
      const BisectionCal = () => {
        let A = a;
        // let B = b;
        // let t = 0;    //midpoint 
        let Fa = 0;   //total of f(a) XL
        // let Fb = 0;   //total of f(b) XR
        // let Ft = 0;   //total of f(t) XM
        // let MidpointEq = '(a+b)/2';
        let Err = 1;
        let ErrEquation = '(xnew-xold)/(xnew)';
        let CountRound = 0;
        let i = 1;

        //calculater
        while(true) {
          Fa = math.parse(EQ).evaluate({x: A});
          Err = math.parse(ErrEquation).evaluate({xnew:Fa, xold:A});
          data.push({calories:"Iteration "+i, fat:A, carbs:math.abs(Err),Ct:parseFloat(A).toFixed(4)});
          A = Fa;
          if(math.abs(Err) < 0.0001 || i == 50){
              break;
          }
          i++;
        }
        setisSolve(true)
        setsample(data)
        setans(A);
        setChartData(data)
        data = [];
      }

      //Table---------------------------------------------------------------------------------------
      const VirtuosoTableComponents = {
        Scroller: React.forwardRef((props, ref) => (
          <TableContainer component={Paper} {...props} ref={ref} />
        )),
        Table: (props) => <Table {...props} style={{ borderCollapse: 'separate'}} />,
        TableHead,
        TableRow: ({ item: _item, ...props }) => <TableRow {...props}/>,
        TableBody: React.forwardRef((props, ref) => <TableBody {...props} ref={ref} />),
      };
      
      function fixedHeaderContent() {
        return (
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.dataKey}
                variant="head"
                align={column.numeric || false ? 'right' : 'left'}
                style={{ width: column.width, backgroundColor: '#0A1929',color: '#E4E4E4' }}
                sx={{
                  backgroundColor: 'background.paper',
                }}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        );
      }
  
      function rowContent(_index, row) {
        return (
          <React.Fragment>
            {columns.map((column) => (
              <TableCell
                key={column.dataKey}
                align={column.numeric || false ? 'right' : 'left'}
              >
                {row[column.dataKey]}
              </TableCell>
            ))}
          </React.Fragment>
        );
      }
      //End Table--------------------------------------------------------------------------------------------------------------------
//End Table and Input Part--------------------------------------------------------------------------------------------------------------------------------
    return(
        <>
            <BG>
                <ContentSec>
                    <Meme>
                      {isSolve ? <Paper style={{ height: '100%', width: '100%'}}>
                            <TableVirtuoso
                                data={sample}
                                components={VirtuosoTableComponents}
                                fixedHeaderContent={fixedHeaderContent}
                                itemContent={rowContent}
                            /> </Paper> : <img src={Memes} alt="loading..." />
                      }
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
                                <InputTitle>F(x)</InputTitle><InputValue onChange={FxhandleChange} value={EQ}/>
                            </InputGroup>
                            <InputGroup>
                                <InputTitle>X0</InputTitle><InputValue onChange={ahandleChange} value={a}/>
                            </InputGroup>
                            <InputGroup>
                            <InputTitle></InputTitle><MenuButton style={{background:'#0A1929'}} onClick={BisectionCal}>SOLVE</MenuButton>
                            <MenuButton style={{background:'#0A1929'}} onClick={Random}>RANDOM</MenuButton>
                            </InputGroup>
                        </InputSec>
                        <div style = {{color:'#E4E4E4', marginTop:'10px',textDecoration:'underline #0A1929'}}>Root of this equation is: {ans}</div>
                    </Method>
                </ContentSec>
                {/* --------------------------------------------------------------------------------------------------------------------------- */}
                {/* Graph plotting part */}
                <div style={{marginTop:'70px'}}>
                  <Paper>
                    <StyledChart
                      data={chartData}
                      className={classes.chart}
                    >
                      {/* We need to give condition becuz these 2 tags give the error: Max render */}
                      {isSolve ? <ArgumentAxis  />
                       : null}
                       {isSolve ? <ValueAxis showGrid={true}/>
                       : null}
                      
                      <ArgumentScale factory={() => scalePoint().padding(1)} />
                      

                      <LineSeries
                        name="Error"
                        valueField="carbs"
                        argumentField="Ct"
                        seriesComponent={Line}
                      />
                    
                      <Legend position="bottom" rootComponent={Root} itemComponent={Item} labelComponent={Label} />
                      <Title
                        text="OnePoint Method\n(Plot-of-OnePoint)"
                        textComponent={Text}
                      />
                      <Animation />
                    </StyledChart>
                  </Paper>
                </div> 
               
            </BG>
        </>
      )
}

export default Onepoint;