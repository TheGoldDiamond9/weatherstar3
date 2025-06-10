/**
 * Month-to-Date Precipitation Helper
 * Uses USGS Daily Values service to calculate cumulative precipitation
 */

class PrecipHelper {
    constructor() {
        // Default USGS site for precipitation gauge near Kingsland, GA
        // This would be configured based on nearest available gauge
        this.defaultSiteId = '02231000'; // Example site ID for the area
    }

    /**
     * Get month-to-date precipitation from USGS
     * @param {string} siteId - USGS site identifier
     * @param {Date} date - Date to calculate MTD for (defaults to today)
     * @returns {Promise<number>} Precipitation in millimeters
     */
    async getMonthToDatePrecip(siteId = this.defaultSiteId, date = new Date()) {
        try {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            
            const startDate = `${year}-${month}-01`;
            const endDate = `${year}-${month}-${day}`;
            
            const url = `https://waterservices.usgs.gov/nwis/dv/` +
                       `?sites=${siteId}` +
                       `&parameterCd=00045` + // Precipitation parameter code
                       `&startDT=${startDate}` +
                       `&endDT=${endDate}` +
                       `&format=json`;

            console.log('Fetching MTD precipitation from USGS:', url);
            
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`USGS API error: ${response.status}`);
            }
            
            const data = await response.json();
            
            if (!data.value || !data.value.timeSeries || data.value.timeSeries.length === 0) {
                console.warn('No precipitation data available from USGS');
                return null;
            }
            
            const timeSeries = data.value.timeSeries[0];
            if (!timeSeries.values || timeSeries.values.length === 0) {
                console.warn('No precipitation values in USGS response');
                return null;
            }
            
            // Sum all daily precipitation values
            let totalPrecip = 0;
            const values = timeSeries.values[0].value;
            
            for (const entry of values) {
                const value = parseFloat(entry.value);
                if (!isNaN(value) && value >= 0) {
                    totalPrecip += value;
                }
            }
            
            // Convert inches to millimeters (USGS typically returns inches)
            const totalMM = totalPrecip * 25.4;
            
            console.log(`MTD Precipitation: ${totalPrecip.toFixed(2)} inches (${totalMM.toFixed(1)} mm)`);
            return totalMM;
            
        } catch (error) {
            console.error('Error fetching MTD precipitation:', error);
            return null;
        }
    }

    /**
     * Find nearest precipitation gauge for given coordinates
     * @param {number} lat - Latitude
     * @param {number} lon - Longitude
     * @returns {Promise<string|null>} Site ID of nearest gauge
     */
    async findNearestGauge(lat, lon) {
        try {
            // Search for precipitation gauges within 50 miles
            const url = `https://waterservices.usgs.gov/nwis/site/` +
                       `?format=json` +
                       `&parameterCd=00045` +
                       `&siteType=ST` +
                       `&bBox=${lon-0.5},${lat-0.5},${lon+0.5},${lat+0.5}` +
                       `&siteStatus=active`;

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`USGS site search error: ${response.status}`);
            }
            
            const data = await response.json();
            
            if (!data.value || !data.value.timeSeries || data.value.timeSeries.length === 0) {
                console.warn('No precipitation gauges found in area');
                return this.defaultSiteId;
            }
            
            // Return the first active site found
            return data.value.timeSeries[0].sourceInfo.siteCode[0].value;
            
        } catch (error) {
            console.error('Error finding nearest gauge:', error);
            return this.defaultSiteId;
        }
    }

    /**
     * Get precipitation for location coordinates
     * @param {number} lat - Latitude
     * @param {number} lon - Longitude
     * @param {Date} date - Date to calculate MTD for
     * @returns {Promise<number|null>} Precipitation in millimeters
     */
    async getMTDPrecipForLocation(lat, lon, date = new Date()) {
        const siteId = await this.findNearestGauge(lat, lon);
        return this.getMonthToDatePrecip(siteId, date);
    }

    /**
     * Format precipitation for display
     * @param {number} precipMM - Precipitation in millimeters
     * @returns {string} Formatted precipitation string
     */
    formatPrecipitation(precipMM) {
        if (precipMM === null || precipMM === undefined) {
            return 'N/A';
        }
        
        // Convert to inches for US display
        const inches = precipMM / 25.4;
        
        if (inches < 0.01) {
            return 'TRACE';
        } else if (inches < 10) {
            return inches.toFixed(2) + '"';
        } else {
            return inches.toFixed(1) + '"';
        }
    }
}

// Create global instance
const precipHelper = new PrecipHelper();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PrecipHelper;
}
