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
   */
  async makeRequest(endpoint) {
    const url = `${this.baseUrl}${endpoint}`;
    
    // Check cache first
    if (this.cache.has(url)) {
      const cached = this.cache.get(url);
      if (Date.now() - cached.timestamp < 300000) { // 5 minutes cache
        return cached.data;
      }
    }

    try {
      // Use jQuery for cross-origin requests
      const response = await new Promise((resolve, reject) => {
        $.ajax({
          url: url,
          method: 'GET',
          headers: {
            'User-Agent': this.userAgent,
            'Accept': 'application/json'
          },
          success: resolve,
          error: reject
        });
      });

      // Cache the response
      this.cache.set(url, {
        data: response,
        timestamp: Date.now()
      });

      return response;
    } catch (error) {
      console.error('NWS API request failed:', error);
      throw error;
    }
  }

  /**
   * Get current weather observations for a location
   * @param {number} lat - Latitude
   * @param {number} lon - Longitude
   * @returns {Promise} - Current conditions data
   */
  async getCurrentConditions(lat, lon) {
    try {
      // First get the grid point info
      const pointData = await this.makeRequest(`/points/${lat},${lon}`);
      const gridId = pointData.properties.gridId;
      const gridX = pointData.properties.gridX;
      const gridY = pointData.properties.gridY;

      // Get the nearest weather station
      const stationsData = await this.makeRequest(`/gridpoints/${gridId}/${gridX},${gridY}/stations`);
      
      if (stationsData.features && stationsData.features.length > 0) {
        const stationId = stationsData.features[0].properties.stationIdentifier;
        
        // Get current observations from the station
        const obsData = await this.makeRequest(`/stations/${stationId}/observations/latest`);
        return this.formatCurrentConditions(obsData);
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
  }

  /**
   * Format current conditions data to match expected structure
   */
  formatCurrentConditions(obsData) {
    const props = obsData.properties;
    
    return {
      temperature: this.celsiusToFahrenheit(props.temperature?.value),      temperatureFeelsLike: this.celsiusToFahrenheit(props.heatIndex?.value || props.windChill?.value),
      relativeHumidity: props.relativeHumidity?.value ? Math.round(props.relativeHumidity.value * 10) / 10 : null,
      windSpeed: this.mpsToMph(props.windSpeed?.value),
      windDirection: props.windDirection?.value,
      windDirectionCardinal: this.degreeToCardinal(props.windDirection?.value),
      windGust: this.mpsToMph(props.windGust?.value),
      pressure: this.pascalToInches(props.barometricPressure?.value),
      pressureTendency: this.mapPressureTrend(props.pressureTendency),
      visibility: this.metersToMiles(props.visibility?.value),
      dewpoint: this.celsiusToFahrenheit(props.dewpoint?.value),
      cloudCeiling: this.metersToFeet(props.cloudLayers?.[0]?.base?.value),
      wxPhraseLong: props.textDescription,
      wxPhraseShort: this.shortenCondition(props.textDescription)
    };
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
