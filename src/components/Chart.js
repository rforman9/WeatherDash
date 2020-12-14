import React from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
// import CartActions from '@material-ui/core/CardActions';

const Chart = (props) => {
  return (
    <div>
      { props.contentType === "chart" ? (
        <Card variant="outlined">
          <CardContent>
            <Typography gutterBottom variant="headline" component="h5">
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
export default Chart