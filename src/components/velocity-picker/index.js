import React, { Component } from 'react';
import styled from '@emotion/styled';

const VeloSlider = styled.div`
  display: flex;
  justify-content: center;
  input {
    width: 60%;
    margin: 0.25rem;
  }
`;

const VeloContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  h3 {
    border-bottom: 1px grey solid;
    padding-bottom 0.5rem;
  }
`;

const ManualVelo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 1rem;
  input {
    height: 1.5rem;
    width: 4rem;
    margin: 1rem auto;
    text-align: center;
    font-size: 1.5rem;
  }
`

const CurrentVelo = styled.div`
  font-size: 2rem;
`
class VelocityPicker extends Component {

  handleChange = e => {
    this.props.handleChange(e.target.value)
  }

  render() {
    const { value } = this.props;
    const rangeTop = Number(value) + 1;
    return(
      <VeloContainer>
        <h3> Velocity Controls </h3>
        <VeloSlider>
          <label> 70mph </label>
          <input 
            type='range'
            min="70"
            max="100"
            step="1"
            value={value}
            onChange={this.handleChange}
          />
          <label> 100mph </label>
        </VeloSlider>

        <ManualVelo>
          <label>Manual Entry</label>
          <input type="text" onChange={this.handleChange} value={value}/>
        </ManualVelo>

        <CurrentVelo>
          <h5>Displayed Velocity Range</h5>
          {`${value}-${rangeTop}`}<span> MPH</span>
        </CurrentVelo>
      </VeloContainer>
    )
  }
}

export default VelocityPicker;
