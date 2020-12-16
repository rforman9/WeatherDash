import React from 'react';
import { Line } from 'react-chartjs-2';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const defaultChartOptions = {
  displayLegend: true,
  legendPosition: 'right'
}
const lineChart = (props, chartData, rainfallData) => {
  console.log('chartData =', chartData)
  var xLabels = [];
  var rainAmounts = [];
  var mean = [];
  var upper_bound = [];
  var lower_bound = [];
  for (var o in rainfallData) {
    xLabels.push(rainfallData[o].day);
    rainAmounts.push(rainfallData[o].amount);
  }
  for (var a in chartData) {
    lower_bound.push(chartData[a][0]);
    mean.push(chartData[a][1]);
    upper_bound.push(chartData[a][2])

  }
  return (
    <div>
      { props.contentType === "chart" ? (
        <Card variant="outlined">
          <CardContent>
            <Line
              data={{
                labels: xLabels,
                datasets: [
                  {
                    label: "upper",
                    data: upper_bound,
                    backgroundColor: 'rgba(240,180,0, 0.66)'

                  },
                  {
                    label: "mean",
                    data: mean,
                    backgroundColor: 'rgba(240,120,30, 0.66)'

                  },
                  {
                    label: "lower",
                    data: lower_bound,
                    backgroundColor: 'rgba(240,60,60, 0.66)'
                  }
                ],
              }}
              options={{
                legend: {
                  position: "right",
                },
                title: {
                  display: true,
                  text: props.headingText
                },
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