// Quick validation test for Weather Star 3000
console.log('=== Weather Star 3000 Validation Test ===');

// Test 1: Check if all required scripts are loaded
const requiredGlobals = [
    'weatherData',
    'locationConfig', 
    'nwsClient',
    'weatherTextFormatter'
];

requiredGlobals.forEach(globalVar => {
    if (typeof window[globalVar] !== 'undefined') {
        console.log(`✅ ${globalVar} is loaded`);
    } else {
        console.error(`❌ ${globalVar} is NOT loaded`);
    }
});

// Test 2: Check if textFormatter is working
if (typeof weatherTextFormatter !== 'undefined') {
    const testText = "Light Rain Showers and Thunderstorms";
    const formatted = weatherTextFormatter.formatCondition(testText);
    console.log(`✅ Text formatting test:`);
    console.log(`   Original: "${testText}"`);
    console.log(`   Formatted: "${formatted}"`);
}

// Test 3: Check location configuration
if (typeof locationConfig !== 'undefined') {
    console.log(`✅ Location: ${locationConfig.mainCity.displayname}`);
    console.log(`   Coordinates: ${locationConfig.mainCity.lat}, ${locationConfig.mainCity.lon}`);
}

// Test 4: Monitor for weather data updates
let dataUpdateCount = 0;
const checkDataUpdates = () => {
    if (typeof weatherData !== 'undefined' && weatherData.currentConditions.cityname) {
        dataUpdateCount++;
        console.log(`✅ Weather data update #${dataUpdateCount}: ${weatherData.currentConditions.cityname}`);
        
        if (weatherData.currentConditions.temp) {
            console.log(`   Temperature: ${weatherData.currentConditions.temp}`);
        }
        if (weatherData.currentConditions.cond) {
            console.log(`   Condition: ${weatherData.currentConditions.cond}`);
        }
        if (weatherData.currentConditions.humidity) {
            console.log(`   Humidity: ${weatherData.currentConditions.humidity}`);
        }
        if (weatherData.currentConditions.ceiling) {
            console.log(`   Ceiling: ${weatherData.currentConditions.ceiling}`);
        }
    }
};

// Check immediately and then every 5 seconds
checkDataUpdates();
setInterval(checkDataUpdates, 5000);

console.log('=== Validation test setup complete ===');
