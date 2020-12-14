import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import DataSlider from '../components/DataSlider'
import Chart from '../components/Chart'

const RAINFALL_API_CALL = 'http://private-4945e-weather34.apiary-proxy.com/weather34/rain';

class DisplayDashboard extends Component {
  state = {
    sections: []
  }

  constructor() {
    super()
    this.state = {
      display: true,
      contentList: [],
      rainfallByDay: []
    };
  }

  componentDidMount() {
    fetch('./data.json')
      .then(response => response.json())
      .then(result => {
        const tempList = result.map(item => {
          return item;
        })
        this.setState({
          contentList: tempList
        })
      });
    fetch(RAINFALL_API_CALL)
      .then(response => response.json())
      .then(result => {
        const tempRainfall = result.map(item => {
          return item;
        })
        this.setState({
          rainfallByDay: tempRainfall
        })
      });

  }

  CardMaker(sectionData) {
    switch (sectionData.contentType) {
      case "bar chart":
        return Chart(sectionData);
      case "line chart":
        return Chart(sectionData);
      default:
        return DataSlider(sectionData);
    }
  }

  render() {
    return (
      <div>
        {this.state.contentList ? (
          <div>
            <Grid container spacing={24} style={{ padding: 24 }}>
              {this.state.contentList.map(currentSection => (
                <Grid item xs={12} sm={6} >
                  {this.CardMaker(currentSection)}
                </Grid>
              ))}
            </Grid>
          </div>
        ) : "no Dashboard Sections found"}
      </div>
    )
  }
}

export default DisplayDashboard;