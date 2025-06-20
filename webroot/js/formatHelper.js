/**
 * Format Helper
 * Utilities for formatting various weather data for display
 */

class FormatHelper {
    /**
     * Format ceiling values in user-friendly format
     * @param {number} feet - Ceiling in feet
     * @returns {string} Formatted ceiling string
     */
    static formatCeiling(feet) {
        if (feet === null || feet === undefined || isNaN(feet)) {
            return 'N/A';
        }

        const numFeet = parseInt(feet);
        
        if (numFeet >= 10000) {
            // For very high ceilings, use thousands format
            const thousands = Math.round(numFeet / 1000);
            return `${thousands}k ft`;
        } else if (numFeet >= 5000) {
            // For moderately high ceilings, use comma format
            return `${numFeet.toLocaleString()} ft`;
        } else if (numFeet >= 1000) {
            // Round to nearest 100 for readability
            const rounded = Math.round(numFeet / 100) * 100;
            return `${rounded.toLocaleString()} ft`;
        } else {
            // Keep as-is for low ceilings
            return `${numFeet} ft`;
        }
    }

    /**
     * Shorten weather condition descriptions for regional displays
     * @param {string} condition - Full weather condition
     * @returns {string} Shortened condition
     */
    static shortenCondition(condition) {
        if (!condition) {
            return '';
        }

        const mappings = {
            // Basic conditions
            'Mostly Cloudy': 'Cloudy',
            'Partly Cloudy': 'P Cloudy',
            'Partly Sunny': 'P Sunny',
            'Mostly Sunny': 'M Sunny',
            'Fair': 'Fair',
            'Clear': 'Clear',
            
            // Precipitation
            'Light Rain': 'Lt Rain',
            'Light Snow': 'Lt Snow',
            'Heavy Rain': 'Hvy Rain',
            'Heavy Snow': 'Hvy Snow',
            'Slight Rain': 'Rain',
            'Slight Snow': 'Snow',
            'Rain Showers': 'Showers',
            'Snow Showers': 'Sn Shwrs',
            'Scattered Showers': 'Sct Shwrs',
            'Isolated Showers': 'Iso Shwrs',
            
            // Thunderstorms
            'Thunderstorms': 'T-Storms',
            'Severe Thunderstorms': 'Sev T-Strms',
            'Isolated Thunderstorms': 'Iso T-Strms',
            'Scattered Thunderstorms': 'Sct T-Strms',
            
            // Fog and visibility
            'Fog': 'Fog',
            'Dense Fog': 'Dense Fog',
            'Haze': 'Haze',
            'Smoke': 'Smoke',
            
            // Wind
            'Breezy': 'Breezy',
            'Windy': 'Windy',
            'Very Windy': 'V Windy',
            
            // Mixed conditions
            'Rain and Snow': 'Rain/Snow',
            'Snow and Rain': 'Snow/Rain',
            'Freezing Rain': 'Frz Rain',
            'Sleet': 'Sleet',
            'Drizzle': 'Drizzle'
        };

        // Check for exact matches first
        if (mappings[condition]) {
            return mappings[condition];
        }

        // Apply pattern-based replacements
        let shortened = condition;
        
        // Remove redundant words
        shortened = shortened.replace(/\bChance of\s+/gi, '');
        shortened = shortened.replace(/\bSlight\s+/gi, '');
        shortened = shortened.replace(/\bOccasional\s+/gi, 'Occ ');
        shortened = shortened.replace(/\bInterMittent\s+/gi, 'Int ');
        
        // Abbreviate common terms
        shortened = shortened.replace(/\bScattered\b/gi, 'Sct');
        shortened = shortened.replace(/\bIsolated\b/gi, 'Iso');
        shortened = shortened.replace(/\bThunderstorms?\b/gi, 'T-Strms');
        shortened = shortened.replace(/\bShowers?\b/gi, 'Shwrs');
        shortened = shortened.replace(/\bLight\b/gi, 'Lt');
        shortened = shortened.replace(/\bHeavy\b/gi, 'Hvy');
        shortened = shortened.replace(/\bPartly\b/gi, 'P');
        shortened = shortened.replace(/\bMostly\b/gi, 'M');
        
        // Limit length for display
        if (shortened.length > 12) {
            shortened = shortened.substring(0, 12).trim();
        }
        
        return shortened;
    }

    /**
     * Remove "US" suffix from city names
     * @param {string} cityName - Full city name
     * @returns {string} City name without "US" suffix
     */
    static removeUSFromCityName(cityName) {
        if (!cityName) {
            return '';
        }
        
        return cityName.replace(/,\s*US$/i, '').trim();
    }

    /**
     * Format wind speed and direction
     * @param {number} speed - Wind speed in mph
     * @param {string} direction - Wind direction (e.g., 'NW', 'CALM')
     * @returns {string} Formatted wind string
     */
    static formatWind(speed, direction) {
        if (!speed || speed === 0 || direction === 'CALM') {
            return 'CALM';
        }
        
        const roundedSpeed = Math.round(speed);
        return `${direction} ${roundedSpeed}`;
    }

    /**
     * Format visibility
     * @param {number} visibility - Visibility in miles
     * @returns {string} Formatted visibility string
     */
    static formatVisibility(visibility) {
        if (visibility === null || visibility === undefined || isNaN(visibility)) {
            return 'N/A';
        }
        
        const vis = parseFloat(visibility);
        
        if (vis >= 10) {
            return '10+ MI';
        } else if (vis >= 1) {
            return `${vis.toFixed(1)} MI`;
        } else if (vis >= 0.25) {
            return `${vis.toFixed(2)} MI`;
        } else {
            return `${Math.round(vis * 4) / 4} MI`;
        }
    }

    /**
     * Format pressure with trend
     * @param {number} pressure - Pressure in inches of mercury
     * @param {string} trend - Pressure trend ('RISING', 'FALLING', 'STEADY')
     * @returns {string} Formatted pressure string
     */
    static formatPressure(pressure, trend = '') {
        if (pressure === null || pressure === undefined || isNaN(pressure)) {
            return 'N/A';
        }
        
        const rounded = (Math.round(pressure * 100) / 100).toFixed(2);
        
        let trendSymbol = '';
        switch (trend.toUpperCase()) {
            case 'RISING':
                trendSymbol = ' ↗';
                break;
            case 'FALLING':
                trendSymbol = ' ↘';
                break;
            case 'STEADY':
                trendSymbol = ' →';
                break;
        }
        
        return `${rounded}${trendSymbol}`;
    }

    /**
     * Format temperature range
     * @param {number} high - High temperature
     * @param {number} low - Low temperature
     * @returns {string} Formatted temperature range
     */
    static formatTemperatureRange(high, low) {
        const highStr = high !== null && high !== undefined ? `${Math.round(high)}°` : '--';
        const lowStr = low !== null && low !== undefined ? `${Math.round(low)}°` : '--';
        
        return `${highStr}/${lowStr}`;
    }

    /**
     * Format UV Index
     * @param {number} uvIndex - UV Index value
     * @returns {string} Formatted UV Index with category
     */
    static formatUVIndex(uvIndex) {
        if (uvIndex === null || uvIndex === undefined || isNaN(uvIndex)) {
            return 'N/A';
        }
        
        const uv = Math.round(uvIndex);
        let category = '';
        
        if (uv <= 2) {
            category = 'LOW';
        } else if (uv <= 5) {
            category = 'MODERATE';
        } else if (uv <= 7) {
            category = 'HIGH';
        } else if (uv <= 10) {
            category = 'VERY HIGH';
        } else {
            category = 'EXTREME';
        }
        
        return `${uv} (${category})`;
    }

    /**
     * Format air quality index
     * @param {number} aqi - Air Quality Index value
     * @returns {string} Formatted AQI with category
     */
    static formatAQI(aqi) {
        if (aqi === null || aqi === undefined || isNaN(aqi)) {
            return 'N/A';
        }
        
        const aqiValue = Math.round(aqi);
        let category = '';
        let color = '';
        
        if (aqiValue <= 50) {
            category = 'GOOD';
            color = 'green';
        } else if (aqiValue <= 100) {
            category = 'MODERATE';
            color = 'yellow';
        } else if (aqiValue <= 150) {
            category = 'UNHEALTHY FOR SENSITIVE';
            color = 'orange';
        } else if (aqiValue <= 200) {
            category = 'UNHEALTHY';
            color = 'red';
        } else if (aqiValue <= 300) {
            category = 'VERY UNHEALTHY';
            color = 'purple';
        } else {
            category = 'HAZARDOUS';
            color = 'maroon';
        }
        
        return {
            value: aqiValue,
            category: category,
            color: color,
            formatted: `${aqiValue} (${category})`
        };
    }

    /**
     * Truncate text to fit display constraints
     * @param {string} text - Text to truncate
     * @param {number} maxLength - Maximum length
     * @param {string} suffix - Suffix for truncated text (default: '...')
     * @returns {string} Truncated text
     */
    static truncateText(text, maxLength, suffix = '...') {
        if (!text || text.length <= maxLength) {
            return text || '';
        }
        
        return text.substring(0, maxLength - suffix.length) + suffix;
    }

    /**
     * Format percentage values
     * @param {number} value - Percentage value (0-100)
     * @param {number} precision - Decimal places (default: 0)
     * @returns {string} Formatted percentage
     */
    static formatPercentage(value, precision = 0) {
        if (value === null || value === undefined || isNaN(value)) {
            return 'N/A';
        }
        
        return `${value.toFixed(precision)}%`;
    }
}

// Create global instance for backward compatibility
const formatHelper = FormatHelper;

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FormatHelper;
}
