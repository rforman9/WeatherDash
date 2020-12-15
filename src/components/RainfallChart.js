import React from 'react';
import { Bar } from 'react-chartjs-2';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';



const RainfallChart = (props, rainfallData) => {
  console.log('rainfalldata = ', rainfallData);
  // var xLabels = [];
  // for (var o in rainfallData) {
  //   xLabels.push(o.day);
  // }
  // console.log(xLabels);
  return (
    <div>
      { props.contentType === "rainfallChart" ? (
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
            <Bar
              height={400}
              width={600}
            />
          </CardContent>
        </Card>
      ) : console.log("no dataslider content")}
    </div>
  )
}
export default RainfallChart