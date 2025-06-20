/**
 * Pressure Trends Helper
 * Uses NWS Observations API to calculate pressure trends
 */

class PressureHelper {
    constructor() {
        this.baseUrl = 'https://api.weather.gov';
    }

    /**
     * Get pressure trend for given location
     * @param {number} lat - Latitude
     * @param {number} lon - Longitude
     * @param {number} windowHours - Hours to look back for trend calculation
     * @returns {Promise<Object>} Pressure trend data
     */
    async getPressureTrend(lat, lon, windowHours = 24) {
        try {
            // Get nearby stations
            const stations = await this.getNearbyStations(lat, lon);
            if (!stations || stations.length === 0) {
                console.warn('No weather stations found for pressure trend');
                return null;
            }

            // Try each station until we get pressure data
            for (const station of stations.slice(0, 3)) {
                const stationId = station.properties.stationIdentifier;
                const trend = await this.calculatePressureTrendForStation(stationId, windowHours);
                
                if (trend) {
                    return trend;
                }
            }

            console.warn('No pressure trend data available from any station');
            return null;

        } catch (error) {
            console.error('Error getting pressure trend:', error);
            return null;
        }
    }

    /**
     * Get nearby weather stations
     * @param {number} lat - Latitude
     * @param {number} lon - Longitude
     * @returns {Promise<Array>} Array of station data
     */
    async getNearbyStations(lat, lon) {
        try {
            const url = `${this.baseUrl}/points/${lat},${lon}/stations`;
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`NWS stations API error: ${response.status}`);
            }
            
            const data = await response.json();
            return data.features || [];

        } catch (error) {
            console.error('Error fetching nearby stations:', error);
            return [];
        }
    }

    /**
     * Calculate pressure trend for specific station
     * @param {string} stationId - NWS station identifier
     * @param {number} windowHours - Hours to look back
     * @returns {Promise<Object|null>} Trend data or null
     */
    async calculatePressureTrendForStation(stationId, windowHours) {
        try {
            const endTime = new Date();
            const startTime = new Date(endTime.getTime() - (windowHours * 60 * 60 * 1000));
            
            const url = `${this.baseUrl}/stations/${stationId}/observations` +
                       `?start=${startTime.toISOString()}` +
                       `&end=${endTime.toISOString()}`;

            console.log(`Fetching pressure observations from station ${stationId}`);
            
            const response = await fetch(url);
            if (!response.ok) {
                console.warn(`Station ${stationId} observations error: ${response.status}`);
                return null;
            }
            
            const data = await response.json();
            
            if (!data.features || data.features.length < 2) {
                console.warn(`Insufficient pressure data from station ${stationId}`);
                return null;
            }

            // Extract pressure readings
            const pressureReadings = [];
            
            for (const observation of data.features) {
                const props = observation.properties;
                const timestamp = new Date(props.timestamp);
                const pressure = props.barometricPressure?.value;
                
                if (pressure && !isNaN(pressure)) {
                    pressureReadings.push({
                        timestamp,
                        pressure: pressure / 100 // Convert Pa to hPa/mb
                    });
                }
            }

            if (pressureReadings.length < 2) {
                console.warn(`Not enough valid pressure readings from station ${stationId}`);
                return null;
            }

            // Sort by timestamp
            pressureReadings.sort((a, b) => a.timestamp - b.timestamp);

            // Calculate trend
            const trend = this.calculateTrend(pressureReadings);
            
            console.log(`Pressure trend calculated for station ${stationId}:`, trend);
            return trend;

        } catch (error) {
            console.error(`Error calculating pressure trend for station ${stationId}:`, error);
            return null;
        }
    }

    /**
     * Calculate pressure trend from readings
     * @param {Array} readings - Array of {timestamp, pressure} objects
     * @returns {Object} Trend analysis
     */
    calculateTrend(readings) {
        if (readings.length < 2) {
            return null;
        }

        const latest = readings[readings.length - 1];
        const earliest = readings[0];
        
        // Calculate overall change
        const totalChange = latest.pressure - earliest.pressure;
        const timeSpanHours = (latest.timestamp - earliest.timestamp) / (1000 * 60 * 60);
        const hourlyRate = totalChange / timeSpanHours;

        // Calculate 3-hour change if we have enough data
        let threeHourChange = null;
        const threeHoursAgo = new Date(latest.timestamp.getTime() - (3 * 60 * 60 * 1000));
        
        const threeHourReading = readings.find(r => 
            Math.abs(r.timestamp - threeHoursAgo) < (30 * 60 * 1000) // Within 30 minutes
        );
        
        if (threeHourReading) {
            threeHourChange = latest.pressure - threeHourReading.pressure;
        }

        // Determine trend category
        let trendCategory = 'STEADY';
        const changeThreshold = 0.1; // hPa per hour

        if (Math.abs(hourlyRate) > changeThreshold) {
            trendCategory = hourlyRate > 0 ? 'RISING' : 'FALLING';
            
            // More specific categories
            if (Math.abs(hourlyRate) > 0.3) {
                trendCategory = hourlyRate > 0 ? 'RISING RAPIDLY' : 'FALLING RAPIDLY';
            }
        }

        return {
            current: Math.round(latest.pressure * 100) / 100,
            trend: trendCategory,
            hourlyRate: Math.round(hourlyRate * 100) / 100,
            totalChange: Math.round(totalChange * 100) / 100,
            threeHourChange: threeHourChange ? Math.round(threeHourChange * 100) / 100 : null,
            timeSpanHours: Math.round(timeSpanHours * 10) / 10,
            readingCount: readings.length
        };
    }

    /**
     * Format pressure trend for display
     * @param {Object} trend - Trend data from getPressureTrend
     * @returns {string} Formatted trend string
     */
    formatPressureTrend(trend) {
        if (!trend) {
            return 'N/A';
        }

        const { current, trendCategory, threeHourChange } = trend;
        
        let trendSymbol = '';
        switch (trendCategory) {
            case 'RISING':
                trendSymbol = '↗';
                break;
            case 'RISING RAPIDLY':
                trendSymbol = '⬆';
                break;
            case 'FALLING':
                trendSymbol = '↘';
                break;
            case 'FALLING RAPIDLY':
                trendSymbol = '⬇';
                break;
            default:
                trendSymbol = '→';
        }

        let result = `${current.toFixed(2)} ${trendSymbol}`;
        
        if (threeHourChange !== null) {
            const changeStr = threeHourChange >= 0 ? `+${threeHourChange.toFixed(2)}` : threeHourChange.toFixed(2);
            result += ` (${changeStr})`;
        }

        return result;
    }
}

// Create global instance
const pressureHelper = new PressureHelper();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PressureHelper;
}
