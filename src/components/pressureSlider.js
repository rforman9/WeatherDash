import React from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
// import CardActions from '@material-ui/core/CardActions';

const PressureSlider = (props) => {
  return (
    <div style={{ height: '100%' }}>
      {props.contentType === "pressureSlider" ? (
        <Card variant="outlined" style={{ height: '100%' }}>
          <CardContent style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
            <Typography gutterBottom variant="h5" component="h4">
              {props.headingText}
            </Typography>
            <Typography component="p">
              Range is {props.xRangeLo} to {props.xRangeHi}
            </Typography>
            <div className="slidecontainer">
              <input
                className="slider"
                id={props.contentName}
                type="range"
                min={props.xRangeLo}
                max={props.xRangeHi}
                value={props.value}
                onChange={props.onChange}
                step="1"
              />
              <p>Value: <span>{props.value}</span></p>
            </div>
          </CardContent>
        </Card>
      ) : console.log("no dataslider content")}
    </div>
  )
}
export default PressureSlider;