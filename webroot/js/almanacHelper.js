/**
 * Almanac Helper
 * Uses USNO Astronomical API for sunrise/sunset and astronomical data
 */

class AlmanacHelper {
    constructor() {
        this.baseUrl = 'https://aa.usno.navy.mil/api';
    }

    /**
     * Get almanac data for given location and date
     * @param {number} lat - Latitude
     * @param {number} lon - Longitude  
     * @param {Date} date - Date for almanac data (defaults to today)
     * @returns {Promise<Object>} Almanac data
     */
    async getAlmanac(lat, lon, date = new Date()) {
        try {
            // Format date for USNO API (M/D/YYYY)
            const month = date.getMonth() + 1;
            const day = date.getDate();
            const year = date.getFullYear();
            const dateStr = `${month}/${day}/${year}`;

            // Determine timezone offset
            const tzOffset = -date.getTimezoneOffset() / 60;

            const url = `${this.baseUrl}/rstt/oneday` +
                       `?date=${dateStr}` +
                       `&coords=${lat},${lon}` +
                       `&tz=${tzOffset}`;

            console.log('Fetching almanac data from USNO:', url);

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`USNO API error: ${response.status}`);
            }

            const data = await response.json();

            if (!data.properties || !data.properties.data) {
                console.warn('No almanac data in USNO response');
                return null;
            }

            const almanacData = this.parseAlmanacData(data.properties.data);
            console.log('Almanac data parsed:', almanacData);
            
            return almanacData;

        } catch (error) {
            console.error('Error fetching almanac data:', error);
            return this.getFallbackAlmanacData(lat, lon, date);
        }
    }

    /**
     * Parse USNO almanac response
     * @param {Object} data - Raw USNO data
     * @returns {Object} Parsed almanac data
     */
    parseAlmanacData(data) {
        const result = {
            sunrise: null,
            sunset: null,
            moonrise: null,
            moonset: null,
            moonPhase: null,
            twilightBegin: null,
            twilightEnd: null
        };

        // Parse sun data
        if (data.sundata) {
            for (const event of data.sundata) {
                switch (event.phen) {
                    case 'R': // Rise
                        result.sunrise = this.formatTime(event.time);
                        break;
                    case 'S': // Set
                        result.sunset = this.formatTime(event.time);
                        break;
                    case 'BC': // Begin Civil Twilight
                        result.twilightBegin = this.formatTime(event.time);
                        break;
                    case 'EC': // End Civil Twilight
                        result.twilightEnd = this.formatTime(event.time);
                        break;
                }
            }
        }

        // Parse moon data
        if (data.moondata) {
            for (const event of data.moondata) {
                switch (event.phen) {
                    case 'R': // Rise
                        result.moonrise = this.formatTime(event.time);
                        break;
                    case 'S': // Set
                        result.moonset = this.formatTime(event.time);
                        break;
                }
            }
        }

        // Get moon phase
        if (data.curphase) {
            result.moonPhase = data.curphase;
        }

        return result;
    }

    /**
     * Format time from USNO format to readable format
     * @param {string} timeStr - Time string from USNO (e.g., "0630")
     * @returns {string} Formatted time (e.g., "6:30 AM")
     */
    formatTime(timeStr) {
        if (!timeStr || timeStr.length !== 4) {
            return null;
        }

        const hours = parseInt(timeStr.substring(0, 2));
        const minutes = parseInt(timeStr.substring(2, 4));
        
        const period = hours >= 12 ? 'PM' : 'AM';
        const displayHours = hours === 0 ? 12 : (hours > 12 ? hours - 12 : hours);
        
        return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
    }

    /**
     * Calculate approximate sunrise/sunset using solar position algorithm
     * (Fallback when USNO API is unavailable)
     * @param {number} lat - Latitude
     * @param {number} lon - Longitude
     * @param {Date} date - Date
     * @returns {Object} Approximate almanac data
     */
    getFallbackAlmanacData(lat, lon, date) {
        console.log('Using fallback almanac calculation');

        const dayOfYear = this.getDayOfYear(date);
        const P = Math.asin(0.39795 * Math.cos(0.98563 * (dayOfYear - 173) * Math.PI / 180));
        
        // Hour angle calculation
        const argument = -Math.tan(lat * Math.PI / 180) * Math.tan(P);
        
        if (Math.abs(argument) > 1) {
            // Polar day or night
            return {
                sunrise: argument > 1 ? null : '12:00 AM',
                sunset: argument > 1 ? null : '11:59 PM',
                moonrise: null,
                moonset: null,
                moonPhase: 'Unknown',
                twilightBegin: null,
                twilightEnd: null
            };
        }

        const hourAngle = 12 * Math.acos(argument) / Math.PI;
        
        // Time equation correction (simplified)
        const B = 2 * Math.PI * (dayOfYear - 81) / 365;
        const E = 9.87 * Math.sin(2 * B) - 7.53 * Math.cos(B) - 1.5 * Math.sin(B);
        
        // Solar noon
        const solarNoon = 12 - lon / 15 + E / 60;
        
        const sunrise = solarNoon - hourAngle;
        const sunset = solarNoon + hourAngle;

        return {
            sunrise: this.decimalToTime(sunrise),
            sunset: this.decimalToTime(sunset),
            moonrise: null,
            moonset: null,
            moonPhase: 'Unknown',
            twilightBegin: this.decimalToTime(sunrise - 0.5),
            twilightEnd: this.decimalToTime(sunset + 0.5)
        };
    }

    /**
     * Get day of year (1-365/366)
     * @param {Date} date - Date object
     * @returns {number} Day of year
     */
    getDayOfYear(date) {
        const start = new Date(date.getFullYear(), 0, 0);
        const diff = date - start;
        return Math.floor(diff / (1000 * 60 * 60 * 24));
    }

    /**
     * Convert decimal hours to time string
     * @param {number} decimal - Decimal hours (e.g., 6.5 = 6:30)
     * @returns {string} Formatted time
     */
    decimalToTime(decimal) {
        if (decimal < 0) decimal += 24;
        if (decimal >= 24) decimal -= 24;
        
        const hours = Math.floor(decimal);
        const minutes = Math.round((decimal - hours) * 60);
        
        const period = hours >= 12 ? 'PM' : 'AM';
        const displayHours = hours === 0 ? 12 : (hours > 12 ? hours - 12 : hours);
        
        return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
    }

    /**
     * Get tomorrow's almanac data
     * @param {number} lat - Latitude
     * @param {number} lon - Longitude
     * @returns {Promise<Object>} Tomorrow's almanac data
     */
    async getTomorrowAlmanac(lat, lon) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return this.getAlmanac(lat, lon, tomorrow);
    }

    /**
     * Format almanac data for display
     * @param {Object} almanac - Almanac data
     * @returns {Object} Formatted display strings
     */
    formatAlmanacForDisplay(almanac) {
        if (!almanac) {
            return {
                sunrise: 'N/A',
                sunset: 'N/A',
                moonrise: 'N/A',
                moonset: 'N/A',
                moonPhase: 'N/A'
            };
        }

        return {
            sunrise: almanac.sunrise || 'N/A',
            sunset: almanac.sunset || 'N/A',
            moonrise: almanac.moonrise || 'N/A',
            moonset: almanac.moonset || 'N/A',
            moonPhase: almanac.moonPhase || 'N/A'
        };
    }
}

// Create global instance
const almanacHelper = new AlmanacHelper();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AlmanacHelper;
}
