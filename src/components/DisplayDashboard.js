import React, { useState, useEffect, useCallback } from 'react';
import Grid from '@material-ui/core/Grid';
import TempSlider from '../components/tempSlider'
import PressureSlider from '../components/pressureSlider'
import LineChart from '../components/lineChart'
import RainfallChart from '../components/RainfallChart'
import ChanceOfRain from './ChanceOfRain'

// Using Open-Meteo API for Berlin (default location)
const RAINFALL_API_CALL = 'https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&daily=precipitation_sum&forecast_days=7';

const DisplayDashboard = () => {
  const [contentList, setContentList] = useState([]);
  const [rainfallByDay, setRainfallByDay] = useState({ days: [] });
  const [pressure, setPressure] = useState(1010);
  const [temperature, setTemperature] = useState(15);
  const [chanceOfRainDataSet, setChanceOfRainDataSet] = useState([]);

  // Fetch data on mount
  useEffect(() => {
    fetch('./data.json')
      .then(response => response.json())
      .then(result => {
        setContentList(result);
      });

    fetch(RAINFALL_API_CALL)
      .then(response => response.json())
      .then(result => {
        if (result && result.daily && result.daily.precipitation_sum) {
          // Map Open-Meteo format to app format
          const mappedData = {
            days: result.daily.precipitation_sum.map((amount, index) => ({
              day: index + 1,
              amount: amount
            }))
          };
          setRainfallByDay(mappedData);
        }
      })
      .catch(error => console.error("Error fetching rainfall data:", error));
  }, []);

  // Recalculate chance of rain when dependencies change
  useEffect(() => {
    if (rainfallByDay.days && rainfallByDay.days.length > 0) {
      const tempChanceRain = rainfallByDay.days.map(item => {
        return ChanceOfRain(pressure, temperature, item.amount);
      });
      setChanceOfRainDataSet(tempChanceRain);
    }
  }, [pressure, temperature, rainfallByDay]);

  const handlePressureChange = (event) => {
    setPressure(Number(event.target.value));
  };

  const handleTempChange = (event) => {
    setTemperature(Number(event.target.value));
  };

  const cardMaker = (sectionData) => {
    switch (sectionData.contentType) {
      case "rainfallChart":
        return RainfallChart(sectionData, rainfallByDay.days || []);
      case "tempSlider":
        return TempSlider({
          ...sectionData,
          value: temperature,
          onChange: handleTempChange
        });
      case "pressureSlider":
        return PressureSlider({
          ...sectionData,
          value: pressure,
          onChange: handlePressureChange
        });
      default:
        return LineChart(
          sectionData,
          chanceOfRainDataSet,
          rainfallByDay.days || []
        );
    }
  };

  return (
    <div>
      {contentList.length > 0 ? (
        <div>
          <Grid container spacing={3} style={{ padding: 24 }}>
            {contentList.map((currentSection, index) => (
              <Grid item xs={12} sm={6} key={index}>
                {cardMaker(currentSection)}
              </Grid>
            ))}
          </Grid>
        </div>
      ) : "Loading Dashboard..."}
    </div>
  );
}

export default DisplayDashboard;