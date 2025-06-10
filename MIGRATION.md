# Weather API Migration: TWC to NWS

## Overview
This document outlines the complete migration from The Weather Channel (TWC) API to the U.S. National Weather Service (NWS) API for the Weather Star 3000 Simulator.

## Configuration Changes

### Old Configuration (.env)
```bash
TWC_API_KEY=e1f10a1e78da46f5b10a1e78da96f525
```

### New Configuration (.env)
```bash
# NWS API Configuration
NWS_API_BASE_URL=https://api.weather.gov
NWS_USER_AGENT=(Weather Star 3000 Simulator, contact@example.com)
NWS_REQUEST_DELAY=100
```

## API Endpoint Migration

### TWC → NWS Endpoint Mapping

| Function | Old TWC Endpoint | New NWS Endpoint | Notes |
|----------|------------------|------------------|-------|
| Current Conditions | `/v3/wx/observations/current` | `/stations/{stationId}/observations/latest` | Requires station lookup via `/points/{lat},{lon}` |
| Daily Forecast | `/v3/wx/forecast/daily/5day` | `/gridpoints/{office}/{x},{y}/forecast` | Via `/points/{lat},{lon}` |
| Hourly Forecast | N/A (embedded) | `/gridpoints/{office}/{x},{y}/forecast/hourly` | Separate endpoint |
| Alerts/Warnings | `/v3/alerts/headlines` | `/alerts/active?zone={zone}` | Zone obtained from points API |
| Location Search | `/v3/location/point` | Not available | Manual lat/lon required |
| Almanac Data | `/v3/wx/almanac/daily/5day` | Not available | Moon phases from external API |

## Field-by-Field Data Mapping

| Old TWC Field | TWC Path | New NWS Field | NWS Path | Notes / Alternative Data |
|---------------|----------|---------------|----------|--------------------------|
| `temperature` | `data.temperature` | `temperature` | `properties.temperature.value` | Convert from Celsius to Fahrenheit |
| `humidity` | `data.relativeHumidity` | `relativeHumidity` | `properties.relativeHumidity.value` | Direct mapping |
| `pressure` | `data.pressureAltimeter` | `barometricPressure` | `properties.barometricPressure.value` | Convert from Pascal to inches |
| `windSpeed` | `data.windSpeed` | `windSpeed` | `properties.windSpeed.value` | Convert from m/s to mph |
| `windDirection` | `data.windDirection` | `windDirection` | `properties.windDirection.value` | Direct mapping |
| `windDirectionCardinal` | `data.windDirectionCardinal` | Calculated | Calculated from degrees | Custom calculation function |
| `windGust` | `data.windGust` | `windGust` | `properties.windGust.value` | Convert from m/s to mph |
| `visibility` | `data.visibility` | `visibility` | `properties.visibility.value` | Convert from meters to miles |
| `dewpoint` | `data.temperatureDewPoint` | `dewpoint` | `properties.dewpoint.value` | Convert from Celsius to Fahrenheit |
| `ceiling` | `data.cloudCeiling` | `cloudLayers` | `properties.cloudLayers[0].base.value` | Convert from meters to feet |
| `wxPhraseLong` | `data.wxPhraseLong` | `textDescription` | `properties.textDescription` | Direct mapping |
| `pressureTrend` | `data.pressureTendencyCode` | Not available | N/A | Set to empty string |
| `feelsLike` | `data.temperatureFeelsLike` | `heatIndex`/`windChill` | `properties.heatIndex.value` or `properties.windChill.value` | Use appropriate field based on temperature |
| **Forecast Fields** |
| `dayOfWeek` | `data.dayOfWeek[i]` | `name` | `properties.periods[i].name` | Direct mapping |
| `temperatureMax` | `data.temperatureMax[i]` | `temperature` | `properties.periods[i].temperature` | For daytime periods |
| `temperatureMin` | `data.temperatureMin[i]` | `temperature` | `properties.periods[i].temperature` | For nighttime periods |
| `wxPhraseLong` | `data.daypart[0].wxPhraseLong[i]` | `detailedForecast` | `properties.periods[i].detailedForecast` | More detailed than TWC |
| `wxPhraseShort` | `data.daypart[0].wxPhraseShort[i]` | `shortForecast` | `properties.periods[i].shortForecast` | Direct mapping |
| `iconCode` | `data.daypart[0].iconCode[i]` | `icon` | `properties.periods[i].icon` | Requires icon mapping logic |
| `windSpeed` | `data.daypart[0].windSpeed[i]` | `windSpeed` | `properties.periods[i].windSpeed` | Text format, needs parsing |
| **Alert Fields** |
| `alertsAmount` | `data.alerts.length` | `features.length` | `features.length` | Direct mapping |
| `headlineText` | `data.alerts[i].headlineText` | `headline` | `features[i].properties.headline` | Direct mapping |
| `eventDescription` | `data.alertDetail.eventDescription` | `event` | `features[i].properties.event` | Direct mapping |
| `description` | `data.alertDetail.texts[0].description` | `description` | `features[i].properties.description` | Direct mapping |
| `severityCode` | `data.alertDetail.severityCode` | `severity` | `features[i].properties.severity` | Direct mapping |
| `significance` | `data.alertDetail.significance` | `significance` | `features[i].properties.significance` | Direct mapping |
| **Unavailable in NWS** |
| `monthPrecip` | `data.observation.imperial.precip_mtd` | N/A | N/A | Would require historical data aggregation |
| `almanacData` | Various almanac endpoints | N/A | N/A | Normal highs/lows not available |
| Sunrise/Sunset | `data.sunriseTimeLocal` | N/A | N/A | Would need external astronomy API |

## Key Changes and Improvements

### 1. **No API Key Required**
- NWS API is free and requires no authentication
- Must include proper User-Agent header for compliance

### 2. **Different Data Structure**
- NWS uses more standardized units (metric by default)
- Requires coordinate-to-grid conversion for some endpoints
- More detailed forecast narratives available

### 3. **Enhanced Error Handling**
- Implemented proper Promise-based error handling
- Graceful fallbacks for unavailable data
- Request caching to reduce API load

### 4. **Missing Features**
- **Month-to-date precipitation**: Not available in NWS, would require historical data aggregation
- **Almanac data**: Normal highs/lows not provided by NWS
- **Sunrise/Sunset**: Would need external astronomy API
- **Location search**: NWS doesn't provide location search, requires manual coordinates

## File Changes

### Modified Files
1. **`webroot/js/config.js`** - Removed TWC API key, added NWS configuration
2. **`webroot/js/data.js`** - Complete rewrite of all weather data functions
3. **`webroot/index.html`** - Added nwsClient.js script reference

### New Files
1. **`.env`** - Environment configuration for NWS API
2. **`webroot/js/nwsClient.js`** - New NWS API client with full functionality

## Testing Recommendations

### Unit Tests
```javascript
// Test NWS API client
describe('NWSClient', () => {
  it('should fetch current conditions', async () => {
    const data = await nwsClient.getCurrentConditions(40.7128, -74.0060);
    expect(data.temperature).toBeDefined();
  });
  
  it('should handle API errors gracefully', async () => {
    const data = await nwsClient.getCurrentConditions(999, 999);
    expect(data.noReport).toBe(true);
  });
});
```

### Integration Tests
1. Test complete weather data flow
2. Verify UI displays correctly with NWS data
3. Test error handling with invalid coordinates
4. Verify caching functionality

## Performance Considerations

### Rate Limiting
- NWS requests limited to reasonable frequency (100ms between requests)
- Implemented caching (5-minute cache for most data)
- Batch processing for multiple city data

### Data Accuracy
- NWS provides more accurate government weather data
- Forecasts may differ slightly from commercial services
- Some legacy TWC-specific data mappings may need fine-tuning

## Known Limitations

1. **Missing Historical Data**: Month precipitation, almanac normals
2. **Astronomical Data**: Sunrise/sunset times not provided
3. **Location Services**: No reverse geocoding or city search
4. **International Coverage**: NWS only covers US and territories
5. **Icon Mapping**: May need adjustment for visual consistency

## Rollback Plan

If migration issues occur:
1. Restore original `data.js` from version control
2. Restore original `config.js` with TWC API key
3. Remove `nwsClient.js` script reference
4. Delete `.env` file

## Next Steps

1. **Testing**: Comprehensive testing across different locations
2. **Monitoring**: Monitor API response times and error rates
3. **User Feedback**: Gather feedback on data accuracy and display
4. **Enhancement**: Consider external APIs for missing features (astronomy, almanac)
5. **Documentation**: Update user documentation for location configuration

## Compliance Notes

- NWS API requires proper User-Agent identification
- API is free but should be used responsibly
- No commercial restrictions on NWS data usage
- Attribution to National Weather Service recommended
