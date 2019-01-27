import React, { Component } from 'react';
import Papa from 'papaparse';
import ContourPlot from '../contour-plot';
import { data } from '../../lib/pitch-data';

import { calcProb } from '../../util';

class Main extends Component {
  state = {
    contourData: [],
    selectedPitcher: '',
    selectedVelocity: ''
  }

  componentDidMount() {
    //parse local csv string to JSON object
    const parsedData = Papa.parse(data, { header: true });
    const contourData = parsedData.data.map(dataPoint => {
      return (({ plate_x, plate_z, release_speed }) => ({ plate_x, plate_z, release_speed }))(dataPoint)
    })

    const contourMap = contourData.map(dp => {
      const converted = [dp.plate_x, dp.plate_z, dp.release_speed].map(Number);
      return {x: converted[0], y: converted[1], color: calcProb(...converted) }
    })
    this.setState({contourData: contourMap});
  }

  
  handlePitcherSelected = () => {
    console.log('pitcher selection');
  }
  
  render() {
    const { contourData } = this.state;
    return (
      <div>
        <p> Baltimore Pitch View </p>
        <ContourPlot data={contourData} />
      </div>
    );
  }
}

export default Main;
