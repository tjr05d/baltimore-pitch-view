import React, { Component } from 'react';
import styled from '@emotion/styled';
import Papa from 'papaparse';
import { data } from '../../lib/pitch-data';

class Main extends Component {
  state = {
    data: {}
  }

  componentDidMount() {
    //parses local csv string to JSON object
    const parsedData = Papa.parse(data, { header: true });
    this.setState({data: parsedData});
  }

  render() {
    return (
      <div>
        <p> Baltimore Pitch View </p>
      </div>
    );
  }
}

export default Main;
