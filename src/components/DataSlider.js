import React from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
// import CartActions from '@material-ui/core/CardActions';

let DataSlider = (props) => {

  return (
    <div>
      { props.contentType === "dataSlider" ? (
        <Card variant="outlined">
          <CardContent>
            <Typography gutterBottom variant="headline" component="h4">
              {props.headingText}
            </Typography>
            <Typography component="p">
              Content Type is {props.contentType}
            </Typography>
            <Typography component="p">
              Range is {props.xRangeLo} to {props.xRangeHi}
            </Typography>
            <div className="slidecontainer">
              <input class="slider" id={props.contentName} type="range" min={props.xRangeLo} max={props.xRangeHi} defaultValue={props.xRangeLo} step="1" />
              <p>Value: <span id={props.contentName + "val"}></span></p>
            </div>
          </CardContent>
        </Card>
      ) : console.log("no dataslider content")}
    </div>
  )
}
export default DataSlider