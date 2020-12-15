import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import DataSlider from '../components/DataSlider'
import Chart from '../components/Chart'
import RainfallChart from '../components/RainfallChart'

const RAINFALL_API_CALL = 'http://private-4945e-weather34.apiary-proxy.com/weather34/rain';

class DisplayDashboard extends Component {

  constructor() {
    super()
    this.state = {
      contentList: [],
      rainfallByDay: [],
    };
  }

  chanceOfRain(pressure, temperature, amount) {
    var score = Math.log(amount + 1) * Math.log(pressure - 929) * Math.log(temperature - 9);
    var mean = Math.min(Math.max(score, 0), 100);
    var upper_bound = Math.min(1.5 * mean, 100);
    var lower_bound = Math.max(0.5 * mean, 0);
    return [lower_bound, mean, upper_bound];
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
      case "rainfall chart":
        return RainfallChart(sectionData, this.state.rainfallByDay);
      case "dataSlider":
        return DataSlider(sectionData);
      default:
        return Chart(sectionData, this.chanceOfRain(970, 10, this.state.rainfallByDay));
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