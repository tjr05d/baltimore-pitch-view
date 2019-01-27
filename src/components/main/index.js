import React, { Component } from 'react';
import styled from '@emotion/styled';
import Papa from 'papaparse';
import ContourPlot from '../contour-plot';
import PitcherPicker from '../pitcher-picker';
import VelocityPicker from '../velocity-picker';
import { data } from '../../lib/pitch-data';

import { extractPitchers, updateContourSet, minVelo, maxVelo } from '../../util';

const Header = styled.header`
  background-color: black;
  color: white;
  height: 8rem;
  display: flex; 
  justify-content: center;
  align-items: center;
  font-size: 2rem;
`

const Content = styled.div`
  display: flex;
`
const ControlPanel = styled.div`
  flex: 1;
  background-color: #e8ecf2;
  height: 100vh;
`


const PlotContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 3;
  align-items: center;
  text-align: center;
  h3 {
    width: 500px;
  }
`

class Main extends Component {
  state = {
    parsedData: [],
    contourData: [],
    pitchers: [],
    selectedPitcher: '',
    selectedVelocity: ''
  }

  componentDidMount() {
    //parse local csv string to JSON object
    const parsedData = Papa.parse(data, { header: true }).data;
    const pitchers = extractPitchers(parsedData);
    const selectedPitcher = pitchers[0].id;
    const selectedVelocity =  85;
    const contourData = updateContourSet(parsedData, selectedPitcher, selectedVelocity)

    this.setState({
      parsedData: parsedData,
      pitchers: pitchers,
      selectedPitcher: selectedPitcher,
      selectedVelocity: selectedVelocity,
      contourData:contourData
    })
  }
  
  handlePitcherSelected = pitcherId => {
    const { parsedData, selectedVelocity } = this.state;
    const newContourData = updateContourSet(parsedData, pitcherId, selectedVelocity)  
    this.setState(prevState => {
      return (
        { ...prevState, selectedPitcher: pitcherId, contourData: newContourData }
      )
    })
  }

  handleVelocityChange = value => {
    const { parsedData, selectedPitcher } = this.state;
    const newContourData = updateContourSet(parsedData, selectedPitcher, value)

    this.setState(prevState => {
       return (
         { ...prevState, contourData: newContourData, selectedVelocity: value }
      )
    })
  }
  
  
  render() {
    const { contourData, pitchers, selectedPitcher, selectedVelocity } = this.state;

    console.log(selectedVelocity);
    return (
      <div>
        <Header> Baltimore Pitch View </Header>
        <Content>
          <ControlPanel>
            <PitcherPicker
              pitchers={pitchers}
              handleSelect={this.handlePitcherSelected}
              selected={selectedPitcher}
            />
            <VelocityPicker handleChange={this.handleVelocityChange} value={selectedVelocity} minVelo={minVelo}/>
          </ControlPanel>
          
          <PlotContainer>
            <h3> Hit Probability </h3>
            <ContourPlot data={contourData} />
          </PlotContainer>
        </Content>
      </div>
    );
  }
}

export default Main;
