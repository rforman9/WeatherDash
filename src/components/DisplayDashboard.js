import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
// import Slider from '../components/Slider'
// import Graph from '../components/Graph'

const RAINFALL_API_CALL = 'http://private-4945e-weather34.apiary-proxy.com/weather34/rain';

class DisplayDashboard extends Component {
  state = {
    sections: []
  }

  constructor() {
    super()
    this.state = {
      display: true,
      contentList: []
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

  }



  render() {
    return (
      <div>
        {this.state.contentList ? (
          <div>
            <Grid container spacing={24} style={{ padding: 24 }}>
              {this.state.contentList.map(currentSection => (
                <Grid item xs={12} sm={6} >
                  <Card variant="outlined">
                    <CardContent>
                      <h5>
                        {currentSection.headingText}
                      </h5>
                      <p>
                        Content Type is {currentSection.contentType}
                      </p>
                      <p>
                        xRange is {currentSection.xRangeLo} to {currentSection.xRangeHi}
                      </p>
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

export default DisplayDashboard;