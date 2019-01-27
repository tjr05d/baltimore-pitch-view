import React from 'react';
import { 
  XYPlot, 
  ContourSeries, 
  MarkSeriesCanvas, 
  XAxis, 
  YAxis, 
  Borders,
  VerticalGridLines,
  HorizontalGridLines
 } from 'react-vis';

const ContourPlot = ({ data }) => {
  return (
      <XYPlot 
        width={500}
        xDomain={[-1, 1]}
        yDomain={[1.5, 3.5]}
        height={700}
        style={{position: 'relative'}}
      >
        <ContourSeries
          animation
          style={{
            stroke: '#125C77',
            strokeLinejoin: 'round',
            position: 'absolute'
          }}
          colorRange={[
            '#79C7E3',
            '#FF9833'
          ]}
          data={data}
        />

        <MarkSeriesCanvas 
          animation 
          data={data} 
          size={1} 
          color={'#125C77'} 
          style={{position: 'absolute'}}
          onSeriesMouseOver={(datapoint, event)=>{
            console.log(datapoint);
          }}
        />

      <Borders style={{all: {fill: '#fff'}}} />
      <VerticalGridLines />
      <HorizontalGridLines />
      <XAxis />
      <YAxis />
    </XYPlot>
  )
}

export default ContourPlot;