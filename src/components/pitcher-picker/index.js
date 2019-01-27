import React, { Component } from 'react';
import styled from '@emotion/styled';

import Pitcher from '../pitcher';

const Pitchers = styled.nav`
  display: flex;
  text-align: center;
  justify-content: center;
  flex-direction: column;
  h3 {
    border-bottom: 1px grey solid;
    padding-bottom 0.5rem;
  }
`

class PitcherPicker extends Component {
  render() {
    const { pitchers, selected, handleSelect } = this.props;
    return(
      <Pitchers>
        <h3>Select Pitcher</h3> 
        { pitchers.map( pitcher => (
          <Pitcher handleSelect={handleSelect} pitcher={pitcher} selected={selected}/>
        ))}
      </Pitchers>
    )
  }
}

export default PitcherPicker;