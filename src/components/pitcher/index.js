import React, { Component } from 'react';
import styled from '@emotion/styled';

const PitcherContainer = styled.button`
  height: 2rem;
  width: 90%;
  display: flex;
  margin: 0.5rem 1rem;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  font-size: 1rem;
  background-color: ${p => p.selected ? "orange" : "white"};
  &:focus {
    border: none;
  }
`

class Pitcher extends Component {

  handleSelect = e => {
    const { handleSelect, pitcher } = this.props;
    handleSelect(pitcher.id);
  }

  render() {
    const { pitcher, selected } = this.props;
    const currentlySelected = selected === pitcher.id;
    return (
      <PitcherContainer selected={currentlySelected} onClick={this.handleSelect}>
          {pitcher.name}
      </PitcherContainer>
    )
  }
}

export default Pitcher;