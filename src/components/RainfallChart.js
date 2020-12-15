import React from 'react';
import { Bar } from 'react-chartjs-2';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';



const RainfallChart = (props, rainfallData) => {
  console.log('rainfalldata = ', rainfallData);
  var xLabels = [];
  var rainAmounts = [];
  for (var o in rainfallData) {
    xLabels.push(rainfallData[o].day);
    rainAmounts.push(rainfallData[o].amount);
  }
  console.log(xLabels);
  return (
    <div>
      { props.contentType === "rainfallChart" ? (
        <Card variant="outlined">
          <CardContent>
            <Bar
              data={{
                labels: xLabels,
                datasets: [{
                  label: props.headingText,
                  data: rainAmounts,
                }]
              }}
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