/**
 * National Weather Service (NWS) API Client
 * Provides weather data from the U.S. National Weather Service
 */

// NWS API configuration - fallback to hardcoded values for browser environment
const NWS_BASE_URL = 'https://api.weather.gov';
const USER_AGENT = '(Weather Star 3000 Simulator, contact@example.com)';

/**
 * NWS API Client class
 */
class NWSClient {
  constructor() {
    this.baseUrl = NWS_BASE_URL;
    this.userAgent = USER_AGENT;
    this.cache = new Map();
    this.requestDelay = 100; // milliseconds between requests
  }

  /**
   * Make a request to the NWS API with proper headers
   * @param {string} endpoint - API endpoint
   * @returns {Promise} - Promise resolving to the response data
   */  async makeRequest(endpoint) {
    const url = `${this.baseUrl}${endpoint}`;
    console.log('Making request to:', url);
    
    // Check cache first
    if (this.cache.has(url)) {
      const cached = this.cache.get(url);
      if (Date.now() - cached.timestamp < 300000) { // 5 minutes cache
        console.log('Returning cached data for:', url);
        return cached.data;
      }
    }

    try {
      // Use fetch with proper headers
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'User-Agent': this.userAgent,
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('API response received for:', url, data);

      // Cache the response
      this.cache.set(url, {
        data: data,
        timestamp: Date.now()
      });

      return data;
    } catch (error) {
      console.error('NWS API request failed for:', url, error);
      throw error;
    }
  }
  /**
   * Get current weather observations for a location
   * @param {number} lat - Latitude
   * @param {number} lon - Longitude
   * @returns {Promise} - Current conditions data
   */  async getCurrentConditions(lat, lon) {
    try {
      console.log(`Getting current conditions for ${lat}, ${lon}`);
      
      // First get the grid point info
      const pointData = await this.makeRequest(`/points/${lat},${lon}`);
      console.log('Point data received:', pointData);
      
      const gridId = pointData.properties.gridId;
      const gridX = pointData.properties.gridX;
      const gridY = pointData.properties.gridY;
      console.log(`Grid info: ${gridId}, ${gridX}, ${gridY}`);

      // Get the nearest weather stations
      const stationsData = await this.makeRequest(`/gridpoints/${gridId}/${gridX},${gridY}/stations`);
      console.log('Stations data received:', stationsData);
      
      if (stationsData.features && stationsData.features.length > 0) {
        // Try multiple stations to find one with complete data
        for (let i = 0; i < Math.min(3, stationsData.features.length); i++) {
          const station = stationsData.features[i];
          const stationId = station.properties.stationIdentifier;
          console.log(`Trying station ${i + 1}:`, stationId);
          
          try {
            // Get current observations from the station
            const obsData = await this.makeRequest(`/stations/${stationId}/observations/latest`);
            console.log(`Observation data for ${stationId}:`, obsData);
            
            const formattedData = this.formatCurrentConditions(obsData, stationId);
            
            // Check if this station has humidity data, if not try next station
            if (formattedData.relativeHumidity !== null || i === 2) {
              console.log(`Using station ${stationId} with data:`, formattedData);
              return formattedData;
            } else {
              console.log(`Station ${stationId} has null humidity, trying next station...`);
            }
          } catch (stationError) {
            console.error(`Error getting data from station ${stationId}:`, stationError);
            // Continue to next station
          }
        }
      }
      
      throw new Error('No weather stations found for location');
    } catch (error) {
      console.error('Error getting current conditions:', error);
      return this.getDefaultCurrentConditions();
    }
  }

  /**
   * Get forecast data for a location
   * @param {number} lat - Latitude
   * @param {number} lon - Longitude
   * @returns {Promise} - Forecast data
   */
  async getForecast(lat, lon) {
    try {
      const pointData = await this.makeRequest(`/points/${lat},${lon}`);
      const forecastUrl = pointData.properties.forecast;
      const forecastHourlyUrl = pointData.properties.forecastHourly;
      
      const [forecast, hourlyForecast] = await Promise.all([
        this.makeRequest(forecastUrl.replace(this.baseUrl, '')),
        this.makeRequest(forecastHourlyUrl.replace(this.baseUrl, ''))
      ]);

      return {
        daily: this.formatDailyForecast(forecast),
        hourly: this.formatHourlyForecast(hourlyForecast)
      };
    } catch (error) {
      console.error('Error getting forecast:', error);
      return this.getDefaultForecast();
    }
  }

  /**
   * Get active weather alerts for a location
   * @param {number} lat - Latitude
   * @param {number} lon - Longitude
   * @returns {Promise} - Active alerts
   */
  async getAlerts(lat, lon) {
    try {
      const pointData = await this.makeRequest(`/points/${lat},${lon}`);
      const zone = pointData.properties.forecastZone.split('/').pop();
      
      const alertsData = await this.makeRequest(`/alerts/active?zone=${zone}`);
      return this.formatAlerts(alertsData);
    } catch (error) {
      console.error('Error getting alerts:', error);
      return { alerts: [], alertsAmount: 0 };
    }
  }  /**
   * Format current conditions data to match expected structure
   */
  formatCurrentConditions(obsData, stationId = 'unknown') {
    const props = obsData.properties;
    
    // Debug logging to see what we're getting
    console.log(`NWS Observation data from ${stationId}:`, props);
    
    // Calculate fallback humidity if null (estimate from temperature and dewpoint)
    let humidity = null;
    if (props.relativeHumidity?.value !== null && props.relativeHumidity?.value !== undefined) {
      humidity = Math.round(props.relativeHumidity.value * 10) / 10;
    } else if (props.temperature?.value && props.dewpoint?.value) {
      // Calculate humidity from temperature and dewpoint using Magnus formula
      const tempC = props.temperature.value;
      const dewpointC = props.dewpoint.value;
      const humidityCalc = Math.exp((17.625 * dewpointC) / (243.04 + dewpointC)) / 
                          Math.exp((17.625 * tempC) / (243.04 + tempC)) * 100;
      humidity = Math.round(humidityCalc * 10) / 10;
      console.log(`Calculated humidity from temp/dewpoint: ${humidity}%`);
    }
    
    // Fix character encoding for text descriptions
    let wxPhraseLong = props.textDescription || '';
    let wxPhraseShort = this.shortenCondition(wxPhraseLong);
    
    // Fix common encoding issues
    wxPhraseLong = this.fixCharacterEncoding(wxPhraseLong);
    wxPhraseShort = this.fixCharacterEncoding(wxPhraseShort);
    
    return {
      temperature: this.celsiusToFahrenheit(props.temperature?.value),
      temperatureFeelsLike: this.celsiusToFahrenheit(props.heatIndex?.value || props.windChill?.value),
      relativeHumidity: humidity,
      windSpeed: this.mpsToMph(props.windSpeed?.value),
      windDirection: props.windDirection?.value,
      windDirectionCardinal: this.degreeToCardinal(props.windDirection?.value),
      windGust: this.mpsToMph(props.windGust?.value),
      pressure: this.pascalToInches(props.barometricPressure?.value),
      pressureTendency: this.mapPressureTrend(props.pressureTendency),      visibility: this.metersToMiles(props.visibility?.value),
      dewpoint: this.celsiusToFahrenheit(props.dewpoint?.value),
      cloudCeiling: this.formatCeiling(props.cloudLayers?.[0]?.base?.value),
      wxPhraseLong: wxPhraseLong,
      wxPhraseShort: wxPhraseShort
    };
  }

  /**
   * Get enhanced current conditions with computed values
   * @param {number} lat - Latitude
   * @param {number} lon - Longitude
   * @returns {Promise<Object>} Enhanced current conditions data
   */
  async getEnhancedCurrentConditions(lat, lon) {
    try {
      const basicConditions = await this.getCurrentConditions(lat, lon);
      
      if (!basicConditions) {
        return null;
      }

      // Add computed thermodynamic values
      const temp = basicConditions.temperature;
      const humidity = basicConditions.relativeHumidity;
      const windSpeed = basicConditions.windSpeed || 0;

      if (temp !== null && humidity !== null) {
        // Compute heat index if applicable
        if (typeof ThermoHelper !== 'undefined') {
          const heatIndex = ThermoHelper.computeHeatIndex(temp, humidity);
          if (heatIndex !== null) {
            basicConditions.heatIndex = heatIndex;
          }

          // Compute dewpoint
          basicConditions.dewpoint = ThermoHelper.computeDewpoint(temp, humidity);

          // Compute apparent temperature
          const apparent = ThermoHelper.computeApparentTemperature(temp, humidity, windSpeed);
          basicConditions.temperatureFeelsLike = apparent.temperature;
          basicConditions.feelsLikeType = apparent.type;
        }
      }

      // Enhanced ceiling formatting
      if (basicConditions.cloudCeiling && typeof FormatHelper !== 'undefined') {
        basicConditions.ceilingFormatted = FormatHelper.formatCeiling(basicConditions.cloudCeiling);
      }

      // Get pressure trend if available
      if (typeof pressureHelper !== 'undefined') {
        try {
          const pressureTrend = await pressureHelper.getPressureTrend(lat, lon, 3);
          if (pressureTrend) {
            basicConditions.pressureTrend = pressureTrend.trend;
            basicConditions.pressureFormatted = FormatHelper.formatPressure(
              basicConditions.pressure / 3386.39, // Convert Pa to inHg
              pressureTrend.trend
            );
          }
        } catch (error) {
          console.warn('Could not get pressure trend:', error);
        }
      }

      // Get month-to-date precipitation if available
      if (typeof precipHelper !== 'undefined') {
        try {
          const mtdPrecip = await precipHelper.getMTDPrecipForLocation(lat, lon);
          if (mtdPrecip !== null) {
            basicConditions.monthPrecip = precipHelper.formatPrecipitation(mtdPrecip);
          }
        } catch (error) {
          console.warn('Could not get MTD precipitation:', error);
        }
      }

      return basicConditions;

    } catch (error) {
      console.error('Error getting enhanced current conditions:', error);
      return null;
    }
  }

  /**
   * Format daily forecast data
   */
  formatDailyForecast(forecastData) {
    return forecastData.properties.periods.map(period => ({
      name: period.name,
      temperature: period.temperature,
      temperatureUnit: period.temperatureUnit,
      temperatureTrend: period.temperatureTrend,
      windSpeed: period.windSpeed,
      windDirection: period.windDirection,
      icon: this.mapNWSIconToLegacy(period.icon),
      shortForecast: period.shortForecast,
      detailedForecast: period.detailedForecast,
      isDaytime: period.isDaytime
    }));
  }

  /**
   * Format hourly forecast data
   */
  formatHourlyForecast(hourlyData) {
    return hourlyData.properties.periods.slice(0, 24).map(period => ({
      startTime: period.startTime,
      temperature: period.temperature,
      windSpeed: period.windSpeed,
      windDirection: period.windDirection,
      shortForecast: period.shortForecast,
      probabilityOfPrecipitation: period.probabilityOfPrecipitation?.value
    }));
  }

  /**
   * Format alerts data
   */
  formatAlerts(alertsData) {
    const alerts = alertsData.features.map((alert, index) => ({
      alertNum: index + 1,
      key: alert.id,
      warningtitle: alert.properties.headline,
      warningdesc: alert.properties.description,
      severity: alert.properties.severity,
      alertType: alert.properties.messageType,
      significance: alert.properties.significance,
      headlinetext: alert.properties.headline
    }));

    return {
      alerts: alerts,
      alertsAmount: alerts.length
    };
  }
  /**
   * Format weather condition text for display
   */
  formatWeatherText(text) {
    if (!text) return "";
    
    return text
      .replace(/ Shower/g, ' SHWR')
      .replace(/ Near /g, ' ')
      .replace(/^Near /g, '')
      .replace(/ Light /g, ' LGT ')
      .replace(/^Light /g, 'LGT ')
      .replace(/ Heavy /g, ' HVY ')
      .replace(/^Heavy /g, 'HVY ')
      .replace(/ Early /g, ' ERLY ')
      .replace(/^Early /g, 'ERLY ')
      .replace(/ Partial /g, ' PART ')
      .replace(/^Partial /g, 'PART ')
      .replace(/ Cldy/g, ' CLOUDY')
      .replace(/^Cldy/g, 'CLOUDY')
      .replace(/ T-Storm/g, ' T-STM')
      .replace(/^T-Storm/g, 'T-STM')
      .replace(/Thunderstorm/g, 'T-STORM')
      .replace(/  +/g, ' ') // Remove multiple spaces
      .trim();
  }

  /**
   * Fix character encoding issues in text
   */
  fixCharacterEncoding(text) {
    if (!text) return "";
    
    return text
      .replace(/Â°/g, '°')  // Fix degree symbol encoding
      .replace(/â€™/g, "'")  // Fix apostrophe encoding
      .replace(/â€œ/g, '"')  // Fix opening quote encoding
      .replace(/â€/g, '"')   // Fix closing quote encoding
      .replace(/â€"/g, '-')  // Fix em dash encoding
      .replace(/â€"/g, '-')  // Fix en dash encoding
      .trim();
  }

  // Utility conversion functions
  celsiusToFahrenheit(celsius) {
    return celsius ? Math.round((celsius * 9/5) + 32) : null;
  }

  mpsToMph(mps) {
    return mps ? Math.round(mps * 2.237) : null;
  }

  pascalToInches(pascal) {
    return pascal ? (pascal * 0.0002953).toFixed(2) : null;
  }

  metersToMiles(meters) {
    return meters ? (meters * 0.000621371).toFixed(1) : null;
  }
  metersToFeet(meters) {
    return meters ? Math.round(meters * 3.28084) : null;
  }

  /**
   * Convert ceiling height to appropriate display format
   * For high ceilings (>3000 ft), show in miles rounded to nearest 0.5
   * For lower ceilings, show in feet
   */  formatCeiling(meters) {
    if (!meters) return "UNKNOWN";
    
    const feet = Math.round(meters * 3.28084);
    
    // If ceiling is high (over 3000 feet), convert to miles
    if (feet >= 3000) {
      const miles = feet / 5280;
      // Round to nearest 0.5 miles
      const roundedMiles = Math.round(miles * 2) / 2;
      return `${roundedMiles} MI`;
    } else {
      return feet; // Just return the number, unit will be added later
    }
  }

  degreeToCardinal(degrees) {
    if (!degrees) return 'CALM';
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    return directions[Math.round(degrees / 22.5) % 16];
  }

  mapPressureTrend(trend) {
    // Map NWS pressure trend to legacy format
    if (!trend) return '';
    switch (trend.toLowerCase()) {
      case 'rising': return 'R';
      case 'falling': return 'F';
      case 'steady': return 'S';
      default: return '';
    }
  }

  shortenCondition(condition) {
    if (!condition) return '';
    return condition
      .replace(/Light /g, 'LGT ')
      .replace(/Heavy /g, 'HVY ')
      .replace(/ Showers/g, ' SHWR')
      .replace(/Thunderstorms?/g, 'T-STM')
      .replace(/Partly Cloudy/g, 'PART CLOUDY')
      .replace(/Mostly Cloudy/g, 'MOSTLY CLOUDY')
      .substring(0, 20);
  }

  mapNWSIconToLegacy(iconUrl) {
    // Extract weather condition from NWS icon URL and map to legacy icon codes
    if (!iconUrl) return 44; // Unknown/No Report
    
    const iconName = iconUrl.split('/').pop().replace(/\.png.*/, '');
    const iconMap = {
      'skc': 32, // Clear
      'few': 30, // Partly Cloudy
      'sct': 28, // Scattered Clouds
      'bkn': 26, // Broken Clouds
      'ovc': 26, // Overcast
      'rain': 12, // Rain
      'snow': 16, // Snow
      'tsra': 4,  // Thunderstorms
      'fog': 20,  // Fog
      'wind': 24  // Windy
    };

    for (const [key, value] of Object.entries(iconMap)) {
      if (iconName.includes(key)) return value;
    }
    
    return 44; // Default unknown
  }

  mapPressureTendencyCode(trend) {
    // Map to legacy pressure tendency codes
    if (!trend) return '';
    switch (trend.toLowerCase()) {
      case 'rising': return 1;
      case 'falling': return 3;
      case 'steady': return 0;
      default: return '';
    }
  }

  // Default fallback data
  getDefaultCurrentConditions() {
    return {
      noReport: true,
      temperature: '',
      temperatureFeelsLike: '',
      relativeHumidity: '',
      windSpeed: '',
      windDirection: '',
      windDirectionCardinal: 'CALM',
      windGust: 'NONE',
      pressure: '',
      pressureTendency: '',
      visibility: '',
      dewpoint: '',
      cloudCeiling: '',
      wxPhraseLong: '',
      wxPhraseShort: ''
    };
  }

  getDefaultForecast() {
    return {
      daily: [],
      hourly: []
    };
  }
}

// Create a global instance
window.nwsClient = new NWSClient();
