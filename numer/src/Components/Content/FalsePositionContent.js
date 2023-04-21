import React, { useState, useEffect } from "react";
import { BG, ContentSec, InputGroup, InputSec, InputTitle, InputValue, Meme, Method, MethodDescripe, MethodTopic } from "./FalsePositionContent.element";
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
const FalsePositionContent = ({MethodTopicText,MethodDescripeText,Memes}) => {

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
          label: 'XL',
          dataKey: 'fat',
          numeric: false,
        },
        {
          width: 70,
          label: 'XR',
          dataKey: 'carbs',
          numeric: false,
        },
        {
          width: 70,
          label: 'XM',
          dataKey: 'protein',
          numeric: false,
        },
        {
          width: 50,
          label: 'FX',
          dataKey: 'FX',
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
        setEQ(Data[1].EQ)
        seta(Data[1].a);
        setb(Data[1].b);
      }
      
      const FalsePocal = () => {
        let A = a;
        let B = b;
        let t = 0;    //midpoint 
        let Fa = 0;   //total of f(a) XL
        let Fb = 0;   //total of f(b) XR
        let Ft = 0;   //total of f(t) XM
        let MidpointEqs = '((a*q)-(b*w))/(q-w)';
        let CountRound = 0;
        let i = 1;
        console.log(EQ);
        //calculater
        while(true) {
          Fa = math.parse(EQ).evaluate({x: A});
          Fb = math.parse(EQ).evaluate({x: B});
          t = math.parse(MidpointEqs).evaluate({a: A, b: B, w: Fa, q: Fb});
          Ft = math.parse(EQ).evaluate({x: t});
          CountRound = parseFloat(A).toFixed(4);
          data.push({calories:"Iteration "+i, fat:parseFloat(A).toFixed(8), carbs:parseFloat(B).toFixed(8), protein:parseFloat(t).toFixed(8), FX:math.abs(Ft), Ct:CountRound})
          if(Ft > 0){
              B = t;
          }
          else{
              A = t;
          }
          if(math.abs(Ft) < 0.0000001 || i == 50){
              break;
          }
          i++;
        }
        setisSolve(true)
        setsample(data)
        setans(t);
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
                                <InputTitle>a</InputTitle><InputValue onChange={ahandleChange} value={a}/>
                            </InputGroup>
                            <InputGroup>
                                <InputTitle>b</InputTitle><InputValue onChange={bhandleChange} value={b}/>
                            </InputGroup>
                            <InputGroup>
                            <InputTitle></InputTitle><MenuButton style={{background:'#0A1929'}} onClick={FalsePocal}>SOLVE</MenuButton>
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
                      <ArgumentScale factory={() => scalePoint().padding(1)} />
                      {isSolve ? <ArgumentAxis showGrid={true} />
                       : null}
                       {isSolve ? <ValueAxis showGrid={true}/>
                       : null}

                      <LineSeries
                        name="F(x)"
                        valueField="FX"
                        argumentField="Ct"
                        seriesComponent={Line}
                      />
                    
                      <Legend position="bottom" rootComponent={Root} itemComponent={Item} labelComponent={Label} />
                      <Title
                        text="False Position Method\n(Plot-of-False Position)"
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

export default FalsePositionContent;