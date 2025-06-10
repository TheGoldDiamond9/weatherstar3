# External API Recommendations for Enhanced Features

## Overview
While the NWS API migration is complete, certain features require external APIs for full functionality. This document outlines recommended solutions for missing features.

## 1. Sunrise/Sunset Data

### Recommended API: Sunrise-Sunset.org
- **Endpoint**: `https://api.sunrise-sunset.org/json`
- **Cost**: Free
- **Usage**: `?lat=40.7128&lng=-74.0060&formatted=0`
- **Implementation**: Replace `grabAlmanac()` function in `data.js`

```javascript
function grabAlmanac() {
  const lat = locationConfig.mainCity.lat;
  const lon = locationConfig.mainCity.lon;
  
  fetch(`https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lon}&formatted=0`)
    .then(response => response.json())
    .then(data => {
      const sunrise = new Date(data.results.sunrise);
      const sunset = new Date(data.results.sunset);
      
      weatherData.almanac.sunrisetoday = sunrise.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
      
      weatherData.almanac.sunsettoday = sunset.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit', 
        hour12: true
      });
      
      weatherData.almanac.noReport = false;
    })
    .catch(error => {
      weatherData.almanac.noReport = true;
    });
}
```

## 2. Historical Weather Data (Almanac)

### Recommended API: Open-Meteo Historical
- **Endpoint**: `https://archive-api.open-meteo.com/v1/archive`
- **Cost**: Free for non-commercial use
- **Features**: Historical temperature data, precipitation
- **Implementation**: For average highs/lows and normal precipitation

```javascript
function getHistoricalData() {
  const today = new Date();
  const lastYear = today.getFullYear() - 1;
  const dateStr = `${lastYear}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  
  const params = new URLSearchParams({
    latitude: locationConfig.mainCity.lat,
    longitude: locationConfig.mainCity.lon,
    start_date: dateStr,
    end_date: dateStr,
    daily: 'temperature_2m_max,temperature_2m_min,precipitation_sum',
    temperature_unit: 'fahrenheit',
    precipitation_unit: 'inch'
  });
  
  fetch(`https://archive-api.open-meteo.com/v1/archive?${params}`)
    .then(response => response.json())
    .then(data => {
      if (data.daily) {
        weatherData.almanac.avghightoday = Math.round(data.daily.temperature_2m_max[0]) + "°F";
        weatherData.almanac.avglowtoday = Math.round(data.daily.temperature_2m_min[0]) + "°F";
        weatherData.almanac.normalprecip = data.daily.precipitation_sum[0].toFixed(2) + " IN";
      }
    })
    .catch(error => {
      weatherData.almanac.avghightoday = "NO DATA";
      weatherData.almanac.avglowtoday = "NO DATA"; 
      weatherData.almanac.normalprecip = "NO DATA";
    });
}
```

## 3. Enhanced Location Services

### Recommended API: Nominatim (OpenStreetMap)
- **Endpoint**: `https://nominatim.openstreetmap.org/search`
- **Cost**: Free
- **Usage**: Reverse geocoding and city search
- **Rate Limit**: 1 request per second

### Alternative: Geocoding API
- **MapBox Geocoding**: 100,000 requests/month free
- **Google Geocoding**: $5 per 1,000 requests after free tier

## 4. Moon Phase Data (Currently Working)

The current implementation uses `icalendar37.net` which appears to be working correctly. No changes needed.

## 5. Pressure Trend Data

### Current Status: Limited
The NWS API doesn't provide pressure trend indicators like "Rising" or "Falling". 

### Recommended Solution: Calculate Trends
Store previous pressure readings and calculate trends:

```javascript
function calculatePressureTrend(currentPressure) {
  const stored = localStorage.getItem('pressureHistory');
  let history = stored ? JSON.parse(stored) : [];
  
  const now = Date.now();
  history.push({ pressure: currentPressure, time: now });
  
  // Keep only last 3 hours of data
  history = history.filter(entry => now - entry.time < 3 * 60 * 60 * 1000);
  
  if (history.length < 2) return "STEADY";
  
  const latest = history[history.length - 1];
  const earlier = history[0];
  const change = latest.pressure - earlier.pressure;
  
  localStorage.setItem('pressureHistory', JSON.stringify(history));
  
  if (change > 0.03) return "RISING";
  if (change < -0.03) return "FALLING";
  return "STEADY";
}
```

## Implementation Priority

### High Priority (Week 1)
1. **Sunrise/Sunset API** - Most visible missing feature
2. **Pressure Trend Calculation** - Enhances current conditions

### Medium Priority (Month 1)
3. **Historical Data API** - Completes almanac functionality
4. **Enhanced Location Services** - Improves user experience

### Low Priority (Future)
5. **International Weather Support** - Expand beyond US
6. **Radar/Satellite Data** - Advanced visualizations

## CORS Considerations

All external APIs will need to either:
1. Support CORS headers
2. Be proxied through your backend
3. Use JSONP if supported

For development, you can use a CORS proxy like `https://cors-anywhere.herokuapp.com/` but this should not be used in production.

## Cost Analysis

| Feature | API | Cost | Monthly Limit |
|---------|-----|------|---------------|
| Sunrise/Sunset | Sunrise-Sunset.org | Free | Unlimited |
| Historical Data | Open-Meteo | Free | 10,000 requests |
| Location Services | Nominatim | Free | Rate limited |
| Enhanced Location | MapBox | Free tier | 100,000 requests |

## Implementation Notes

1. All external API calls should include error handling and fallbacks
2. Implement caching to minimize API usage
3. Consider rate limiting for external APIs
4. Test thoroughly in production environment
5. Monitor API usage and costs

---

*This document provides a roadmap for implementing missing features that require external APIs beyond the NWS. Prioritize based on user needs and available development resources.*
