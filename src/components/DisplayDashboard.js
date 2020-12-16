import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import DataSlider from '../components/DataSlider'
import lineChart from '../components/lineChart'
import RainfallChart from '../components/RainfallChart'
import chanceOfRain from '../components/chanceOfRain'

const RAINFALL_API_CALL = 'http://private-4945e-weather34.apiary-proxy.com/weather34/rain';

class DisplayDashboard extends Component {

  constructor() {
    super()
    this.state = {
      contentList: [],
      rainfallByDay: [],
      pressure: 1010,
      temperature: 15,
      chanceOfRainDataSet: []
    };
    this.calcChanceOfRainState = this.calcChanceOfRainState.bind(this)
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
          rainfallByDay: tempRainfall[0]
        })
      })
      .then(this.calcChanceOfRainState);
  }

  calcChanceOfRainState() {
    const tempChanceRain = this.state.rainfallByDay.days.map(item => {
      return chanceOfRain(this.state.pressure, this.state.temperature, item.amount)
    })
    this.setState({
      chanceOfRainDataSet: tempChanceRain
    })
  }

  CardMaker(sectionData) {
    switch (sectionData.contentType) {
      case "rainfallChart":
        return RainfallChart(sectionData, this.state.rainfallByDay.days);
      case "dataSlider":
        return DataSlider(sectionData);
      default:
        return lineChart(
          sectionData,
          this.chanceOfRainDataSet,
          this.state.rainfallByDay.days
        );
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