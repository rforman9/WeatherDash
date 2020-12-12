import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
// import Slider from '../components/Slider'
// import Graph from '../components/Graph'
// import Section from '../components/Section'

const RAINFALL_API_CALL = 'http://private-4945e-weather34.apiary-proxy.com/weather34/rain'
const SECTIONS = [
  <div>
    <h1>Pressure [hPa]</h1>
  </div>,
  <div>
    <h1>% Chance of Rain</h1>
  </div>,
  <div>
    <h1>Temperature [°C]</h1>
  </div>,
  <div>
    <h1>Amount of Rainfall</h1>
  </div>,]

class SectionList extends Component {
  state = {
    sections: []
  }

  constructor() {
    super()
    this.makeTempSections()
  }

  makeTempSections = () => {
    this.setState({
      sections: SECTIONS
    })
  }

  render() {
    return (
      <div>
        {this.state.sections ? (
          <div>
            <Grid container spacing={24} style={{ padding: 24 }}>
              {this.state.sections.map(currentSection => (
                <Grid item xs={12} sm={6} lg={4} xl={3}>
                  <Card variant="outlined">
                    <CardContent>
                      <h5>
                        {currentSection}
                      </h5>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </div>
        ) : "no Dashboard Sections found"}
      </div>
    )
  }
}

export default SectionList;