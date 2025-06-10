/**
 * NWS Migration Validation Script
 * Run this to verify the migration was successful
 */

console.log('🌤️  Weather Star 3000 - NWS Migration Validation');
console.log('=================================================');

// Test 1: Check if all required files are loaded
const requiredGlobals = ['nwsClient', 'weatherData', 'locationSearchFallback'];
requiredGlobals.forEach(global => {
    if (window[global]) {
        console.log(`✅ ${global} loaded successfully`);
    } else {
        console.error(`❌ ${global} not found`);
    }
});

// Test 2: Check if no TWC API key is being used
if (typeof api_key === 'undefined') {
    console.log('✅ TWC API key removed successfully');
} else {
    console.warn('⚠️  TWC API key still present');
}

// Test 3: Verify NWS client functionality
if (typeof nwsClient !== 'undefined') {
    console.log('\n--- Testing NWS API Client ---');
    
    // Test with New York coordinates
    const testLat = 40.7128;
    const testLon = -74.0060;
    
    console.log(`Testing with coordinates: ${testLat}, ${testLon}`);
    
    // Test current conditions
    nwsClient.getCurrentConditions(testLat, testLon)
        .then(data => {
            console.log('✅ Current conditions API working');
            if (data.temperature) {
                console.log(`   Temperature: ${data.temperature}°F`);
            }
        })
        .catch(error => {
            console.log('⚠️  Current conditions API issue:', error.message);
        });
    
    // Test forecast
    nwsClient.getForecast(testLat, testLon)
        .then(data => {
            console.log('✅ Forecast API working');
            if (data.daily && data.daily.length > 0) {
                console.log(`   First period: ${data.daily[0].name}`);
            }
        })
        .catch(error => {
            console.log('⚠️  Forecast API issue:', error.message);
        });
    
    // Test alerts
    nwsClient.getAlerts(testLat, testLon)
        .then(data => {
            console.log('✅ Alerts API working');
            console.log(`   Active alerts: ${data.alertsAmount}`);
        })
        .catch(error => {
            console.log('⚠️  Alerts API issue:', error.message);
        });
}

// Test 4: Check weather data structure
setTimeout(() => {
    console.log('\n--- Weather Data Structure Validation ---');
    
    if (typeof weatherData !== 'undefined') {
        const requiredSections = [
            'currentConditions',
            'nearbyCities',
            'extendedForecast',
            'alerts',
            'travel'
        ];
        
        requiredSections.forEach(section => {
            if (weatherData[section]) {
                console.log(`✅ weatherData.${section} exists`);
            } else {
                console.error(`❌ weatherData.${section} missing`);
            }
        });
    }
}, 3000);

// Test 5: Location fallback
if (typeof locationSearchFallback !== 'undefined') {
    console.log('\n--- Location Fallback Test ---');
    const testCity = locationSearchFallback.getCityCoordinates('NEW YORK');
    if (testCity) {
        console.log('✅ Location fallback working');
        console.log(`   New York: ${testCity.lat}, ${testCity.lon}`);
    } else {
        console.error('❌ Location fallback failed');
    }
}

// Final summary
setTimeout(() => {
    console.log('\n=================================================');
    console.log('🎉 Migration validation complete!');
    console.log('Check the output above for any issues.');
    console.log('The weather simulator should now be running on NWS API.');
    console.log('=================================================');
}, 5000);

// Export for manual testing
window.nwsValidation = {
    testCurrentConditions: (lat, lon) => nwsClient.getCurrentConditions(lat, lon),
    testForecast: (lat, lon) => nwsClient.getForecast(lat, lon),
    testAlerts: (lat, lon) => nwsClient.getAlerts(lat, lon),
    testLocation: (cityName) => locationSearchFallback.getCityCoordinates(cityName)
};
