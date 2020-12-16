import React from 'react';
import { Line } from 'react-chartjs-2';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const lineChart = (props, chartData, rainfallData) => {
  console.log('chartdata =', chartData)
  var xLabels = [];
  var rainAmounts = [];
  for (var o in rainfallData) {
    xLabels.push(rainfallData[o].day);
    rainAmounts.push(rainfallData[o].amount);
  }
  return (
    <div>
      { props.contentType === "chart" ? (
        <Card variant="outlined">
          <CardContent>
            <Line
              data={{
                labels: xLabels,
                datasets: [{
                  label: props.headingText,
                  data: chartData,
                  backgroundColor: 'rgba(240,120,60, 0.66)'
                }],
              }}
              options={{
                scales: {
                  yAxes: [{
                    ticks: {
                      min: props.yRangeLo,
                      max: props.yRangeHi
                    },
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
export default lineChart