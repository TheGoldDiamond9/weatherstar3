/**
 * Simple test file for NWS API migration
 * Run this in the browser console to test the NWS client
 */

// Test configuration
const testLat = 40.7128;  // New York City
const testLon = -74.0060;

console.log('=== NWS API Migration Test ===');

// Test 1: Check if NWS client is loaded
if (typeof nwsClient !== 'undefined') {
    console.log('✓ NWS Client loaded successfully');
} else {
    console.error('✗ NWS Client not found');
}

// Test 2: Current Conditions
console.log('\n--- Testing Current Conditions ---');
nwsClient.getCurrentConditions(testLat, testLon)
    .then(data => {
        console.log('✓ Current conditions retrieved:', data);
        if (data.temperature) {
            console.log(`Temperature: ${data.temperature}°F`);
        }
        if (data.windSpeed) {
            console.log(`Wind: ${data.windDirectionCardinal} ${data.windSpeed} mph`);
        }
    })
    .catch(error => {
        console.error('✗ Current conditions failed:', error);
    });

// Test 3: Forecast
console.log('\n--- Testing Forecast ---');
nwsClient.getForecast(testLat, testLon)
    .then(data => {
        console.log('✓ Forecast retrieved:', data);
        if (data.daily && data.daily.length > 0) {
            console.log(`First period: ${data.daily[0].name} - ${data.daily[0].shortForecast}`);
        }
    })
    .catch(error => {
        console.error('✗ Forecast failed:', error);
    });

// Test 4: Alerts
console.log('\n--- Testing Alerts ---');
nwsClient.getAlerts(testLat, testLon)
    .then(data => {
        console.log('✓ Alerts retrieved:', data);
        console.log(`Number of alerts: ${data.alertsAmount}`);
    })
    .catch(error => {
        console.error('✗ Alerts failed:', error);
    });

// Test 5: Data Structure Validation
setTimeout(() => {
    console.log('\n--- Validating Weather Data Structure ---');
    
    // Check if weatherData object exists and has required structure
    if (typeof weatherData !== 'undefined') {
        console.log('✓ WeatherData object exists');
        
        const requiredSections = [
            'currentConditions',
            'nearbyCities',
            'extendedForecast',
            'alerts'
        ];
        
        requiredSections.forEach(section => {
            if (weatherData[section]) {
                console.log(`✓ ${section} section exists`);
            } else {
                console.error(`✗ ${section} section missing`);
            }
        });
    } else {
        console.error('✗ WeatherData object not found');
    }
}, 2000);

console.log('\n=== Test Complete ===');
console.log('Check the output above for any errors.');
console.log('You can also inspect the weatherData object in the console.');
