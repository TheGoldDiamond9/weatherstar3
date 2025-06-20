/**
 * Thermodynamic Helper
 * Computes heat index and dewpoint using standard meteorological formulas
 */

class ThermoHelper {
    /**
     * Compute heat index using NOAA formula
     * @param {number} T - Temperature in Fahrenheit
     * @param {number} RH - Relative humidity as percentage (0-100)
     * @returns {number|null} Heat index in Fahrenheit, or null if not applicable
     */
    static computeHeatIndex(T, RH) {
        // Heat index is only meaningful for temperatures >= 80°F and humidity >= 40%
        if (T < 80 || RH < 40) {
            return null;
        }

        // NOAA Heat Index Formula (Rothfusz 1990)
        const c1 = -42.379;
        const c2 = 2.04901523;
        const c3 = 10.14333127;
        const c4 = -0.22475541;
        const c5 = -0.00683783;
        const c6 = -0.05481717;
        const c7 = 0.00122874;
        const c8 = 0.00085282;
        const c9 = -0.00000199;

        let HI = c1 + (c2 * T) + (c3 * RH) + (c4 * T * RH) + 
                 (c5 * T * T) + (c6 * RH * RH) + (c7 * T * T * RH) + 
                 (c8 * T * RH * RH) + (c9 * T * T * RH * RH);

        // Apply adjustments for specific conditions
        if (RH < 13 && T >= 80 && T <= 112) {
            // Adjustment for low humidity
            const adjustment = ((13 - RH) / 4) * Math.sqrt((17 - Math.abs(T - 95)) / 17);
            HI -= adjustment;
        } else if (RH > 85 && T >= 80 && T <= 87) {
            // Adjustment for high humidity
            const adjustment = ((RH - 85) / 10) * ((87 - T) / 5);
            HI += adjustment;
        }

        return Math.round(HI);
    }

    /**
     * Compute dewpoint using Magnus formula
     * @param {number} T - Temperature in Fahrenheit
     * @param {number} RH - Relative humidity as percentage (0-100)
     * @returns {number} Dewpoint in Fahrenheit
     */
    static computeDewpoint(T, RH) {
        // Convert Fahrenheit to Celsius for calculation
        const T_C = (T - 32) * 5 / 9;
        
        // Magnus formula constants
        const a = 17.27;
        const b = 237.7;
        
        // Calculate alpha
        const alpha = ((a * T_C) / (b + T_C)) + Math.log(RH / 100);
        
        // Calculate dewpoint in Celsius
        const DP_C = (b * alpha) / (a - alpha);
        
        // Convert back to Fahrenheit
        const DP_F = (DP_C * 9 / 5) + 32;
        
        return Math.round(DP_F);
    }

    /**
     * Compute apparent temperature (feels like)
     * @param {number} T - Temperature in Fahrenheit
     * @param {number} RH - Relative humidity as percentage
     * @param {number} windSpeed - Wind speed in mph (optional)
     * @returns {Object} Object with apparent temperature and type
     */
    static computeApparentTemperature(T, RH, windSpeed = 0) {
        let apparent = T;
        let type = '';

        if (T >= 80) {
            // Use heat index for hot weather
            const heatIndex = this.computeHeatIndex(T, RH);
            if (heatIndex !== null && heatIndex > T) {
                apparent = heatIndex;
                type = 'HEAT INDEX';
            }
        } else if (T <= 50 && windSpeed > 3) {
            // Use wind chill for cold weather
            const windChill = this.computeWindChill(T, windSpeed);
            if (windChill < T) {
                apparent = windChill;
                type = 'WIND CHILL';
            }
        }

        return {
            temperature: apparent,
            type: type,
            isApparent: apparent !== T
        };
    }

    /**
     * Compute wind chill temperature
     * @param {number} T - Temperature in Fahrenheit
     * @param {number} V - Wind speed in mph
     * @returns {number} Wind chill temperature in Fahrenheit
     */
    static computeWindChill(T, V) {
        // Only applicable for temperatures <= 50°F and wind speeds > 3 mph
        if (T > 50 || V <= 3) {
            return T;
        }

        // NWS Wind Chill Formula
        const WC = 35.74 + (0.6215 * T) - (35.75 * Math.pow(V, 0.16)) + 
                   (0.4275 * T * Math.pow(V, 0.16));

        return Math.round(WC);
    }

    /**
     * Compute relative humidity from temperature and dewpoint
     * @param {number} T - Temperature in Fahrenheit
     * @param {number} DP - Dewpoint in Fahrenheit
     * @returns {number} Relative humidity as percentage (0-100)
     */
    static computeRelativeHumidity(T, DP) {
        // Convert to Celsius
        const T_C = (T - 32) * 5 / 9;
        const DP_C = (DP - 32) * 5 / 9;
        
        // Magnus formula constants
        const a = 17.27;
        const b = 237.7;
        
        // Calculate relative humidity
        const RH = 100 * Math.exp((a * DP_C) / (b + DP_C) - (a * T_C) / (b + T_C));
        
        return Math.round(Math.min(100, Math.max(0, RH)));
    }

    /**
     * Determine comfort level based on temperature and humidity
     * @param {number} T - Temperature in Fahrenheit
     * @param {number} RH - Relative humidity as percentage
     * @returns {string} Comfort level description
     */
    static getComfortLevel(T, RH) {
        const dewpoint = this.computeDewpoint(T, RH);
        
        if (dewpoint < 55) {
            return 'COMFORTABLE';
        } else if (dewpoint < 65) {
            return 'SLIGHTLY HUMID';
        } else if (dewpoint < 70) {
            return 'MODERATELY HUMID';
        } else if (dewpoint < 75) {
            return 'VERY HUMID';
        } else {
            return 'OPPRESSIVE';
        }
    }

    /**
     * Format temperature with appropriate precision
     * @param {number} temp - Temperature value
     * @param {boolean} showUnit - Whether to include unit symbol
     * @returns {string} Formatted temperature string
     */
    static formatTemperature(temp, showUnit = true) {
        if (temp === null || temp === undefined || isNaN(temp)) {
            return 'N/A';
        }
        
        const rounded = Math.round(temp);
        return showUnit ? `${rounded}°` : rounded.toString();
    }

    /**
     * Format humidity with appropriate precision
     * @param {number} humidity - Humidity percentage
     * @returns {string} Formatted humidity string
     */
    static formatHumidity(humidity) {
        if (humidity === null || humidity === undefined || isNaN(humidity)) {
            return 'N/A';
        }
        
        const rounded = Math.round(humidity);
        return `${rounded}%`;
    }
}

// Create global instance for backward compatibility
const thermoHelper = ThermoHelper;

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ThermoHelper;
}
