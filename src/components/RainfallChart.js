import React from 'react';
import { Bar } from 'react-chartjs-2';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';



const RainfallChart = (props, rainfallData) => {
  var xLabels = [];
  var rainAmounts = [];
  for (var o in rainfallData) {
    xLabels.push(rainfallData[o].day);
    rainAmounts.push(rainfallData[o].amount);
  }
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
                  backgroundColor: 'rgba(60,120,240, 0.66)'
                }],
              }}
              options={{
                scales: {
                  yAxes: [{
                    scaleLabel: {
                      display: true,
                      labelString: props.yUnits
                    }
                  }],
                  xAxes: [{
                    scaleLabel: {
                      display: true,
                      labelString: props.xUnits
                    }
                  }]
                }
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