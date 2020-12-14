import React from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
// import CartActions from '@material-ui/core/CardActions';

const DataSlider = (props) => {
  return (
    <div>
      { props.contentType === "dataSlider" ? (
        <Card variant="outlined">
          <CardContent>
            <Typography gutterBottom variant="headline" component="h5">
              {props.headingText}
            </Typography>
            <Typography component="p">
              Content Type is {props.contentType}
            </Typography>
            <Typography component="p">
              xRange is {props.xRangeLo} to {props.xRangeHi}
            </Typography>
          </CardContent>
        </Card>
      ) : console.log("no dataslider content")}
    </div>
  )
}
export default DataSlider