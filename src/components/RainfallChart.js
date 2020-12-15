import React from 'react';
import ReactDOM from 'react-dom';
import * as V from 'victory';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';



const RainfallChart = (props, chartData) => {
  console.log(chartData)
  return (
    <div>
      { props.contentType === "bar chart" || "line chart" ? (
        <Card variant="outlined">
          <CardContent>
            <Typography gutterBottom variant="headline" component="h4">
              {props.headingText}
            </Typography>
            <Typography component="p">
              Content Type is {props.contentType}
            </Typography>
            <Typography component="p">
              Chart Type is {props.chartType}
            </Typography>
            <Typography component="p">
              xRange is {props.xRangeLo} to {props.xRangeHi}
            </Typography>
            <Typography component="p">
              yRange is {props.yRangeLo} to {props.yRangeHi}
            </Typography>
          </CardContent>
        </Card>
      ) : console.log("no dataslider content")}
    </div>
  )
}
export default RainfallChart