import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
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

  // Location State
  const [city, setCity] = useState('');
  const [region, setRegion] = useState('');
  const [country, setCountry] = useState('');

  const fetchWeatherData = (lat, lon) => {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=precipitation_sum&forecast_days=7`;

    fetch(url)
      .then(response => response.json())
      .then(result => {
        if (result && result.daily && result.daily.precipitation_sum) {
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
  };

  const handleLocationSubmit = () => {
    const queryParts = [city, region, country].filter(part => part.trim() !== '');
    if (queryParts.length === 0) return;

    // Use space separator - works better with Open-Meteo API
    const query = queryParts.join(' ');
    const geocodingUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=1&language=en&format=json`;

    console.log('Searching for location:', query);
    console.log('Geocoding URL:', geocodingUrl);

    fetch(geocodingUrl)
      .then(res => res.json())
      .then(data => {
        console.log('Geocoding API response:', data);
        if (data.results && data.results.length > 0) {
          const { latitude, longitude, name, country } = data.results[0];
          console.log(`Found: ${name}, ${country} (${latitude}, ${longitude})`);
          fetchWeatherData(latitude, longitude);
        } else {
          // Fallback: try just the city if we have multiple parts
          if (city && queryParts.length > 1) {
            console.log('Full search failed, trying city only:', city);
            const cityUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;
            fetch(cityUrl)
              .then(res => res.json())
              .then(cityData => {
                console.log('City-only API response:', cityData);
                if (cityData.results && cityData.results.length > 0) {
                  const { latitude, longitude, name, country } = cityData.results[0];
                  console.log(`Found: ${name}, ${country} (${latitude}, ${longitude})`);
                  fetchWeatherData(latitude, longitude);
                } else {
                  console.warn('Location not found');
                  alert('Location not found. Please check your spelling.');
                }
              })
              .catch(err => console.error('City search error:', err));
          } else {
            console.warn('Location not found');
            alert('Location not found. Please check your spelling.');
          }
        }
      })
      .catch(err => console.error('Geocoding error:', err));
  };

  // Fetch data on mount
  useEffect(() => {
    fetch('./data.json')
      .then(response => response.json())
      .then(result => {
        setContentList(result);
      });

    // Default fetch for Berlin (matching original default)
    fetchWeatherData(52.52, 13.41);
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
      <div style={{ display: 'flex', justifyContent: 'center', padding: '20px', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
        <TextField
          label="City"
          variant="outlined"
          size="small"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <TextField
          label="State/Province"
          variant="outlined"
          size="small"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
        />
        <TextField
          label="Country"
          variant="outlined"
          size="small"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleLocationSubmit}>
          Update Location
        </Button>
      </div>

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