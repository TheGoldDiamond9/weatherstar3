// Copy and paste this into the browser console to test the NWS API
// Open the browser dev tools (F12) and paste this into the Console tab

console.clear();
console.log('=== NWS API Debug Test ===');

async function debugNWSAPI() {
    try {
        console.log('1. Testing basic connectivity...');
        const basicTest = await fetch('https://api.weather.gov/');
        console.log(`Basic connectivity: ${basicTest.ok ? 'SUCCESS' : 'FAILED'} (${basicTest.status})`);
        
        console.log('\n2. Testing points endpoint for Kingsland, GA...');
        const pointsUrl = 'https://api.weather.gov/points/30.7991,-81.6956';
        console.log(`URL: ${pointsUrl}`);
        
        const pointsResponse = await fetch(pointsUrl, {
            headers: {
                'User-Agent': '(Weather Star 3000 Debug, debug@example.com)',
                'Accept': 'application/json'
            }
        });
        
        console.log(`Points response: ${pointsResponse.status} ${pointsResponse.statusText}`);
        
        if (!pointsResponse.ok) {
            const errorText = await pointsResponse.text();
            console.error('Points API error:', errorText);
            return;
        }
        
        const pointsData = await pointsResponse.json();
        console.log('Points data:', pointsData);
        
        const gridId = pointsData.properties.gridId;
        const gridX = pointsData.properties.gridX;
        const gridY = pointsData.properties.gridY;
        console.log(`Grid: ${gridId}/${gridX},${gridY}`);
        
        console.log('\n3. Testing stations endpoint...');
        const stationsUrl = `https://api.weather.gov/gridpoints/${gridId}/${gridX},${gridY}/stations`;
        const stationsResponse = await fetch(stationsUrl, {
            headers: {
                'User-Agent': '(Weather Star 3000 Debug, debug@example.com)',
                'Accept': 'application/json'
            }
        });
        
        console.log(`Stations response: ${stationsResponse.status}`);
        
        if (!stationsResponse.ok) {
            const errorText = await stationsResponse.text();
            console.error('Stations API error:', errorText);
            return;
        }
        
        const stationsData = await stationsResponse.json();
        console.log('Stations data:', stationsData);
        
        if (!stationsData.features || stationsData.features.length === 0) {
            console.error('No stations found!');
            return;
        }
        
        const stationId = stationsData.features[0].properties.stationIdentifier;
        console.log(`Using station: ${stationId}`);
        
        console.log('\n4. Testing observations endpoint...');
        const obsUrl = `https://api.weather.gov/stations/${stationId}/observations/latest`;
        const obsResponse = await fetch(obsUrl, {
            headers: {
                'User-Agent': '(Weather Star 3000 Debug, debug@example.com)',
                'Accept': 'application/json'
            }
        });
        
        console.log(`Observations response: ${obsResponse.status}`);
        
        if (!obsResponse.ok) {
            const errorText = await obsResponse.text();
            console.error('Observations API error:', errorText);
            return;
        }
        
        const obsData = await obsResponse.json();
        console.log('Observations data:', obsData);
        
        const props = obsData.properties;
        console.log('\n5. Raw weather data:');
        console.log(`Temperature: ${props.temperature?.value} ${props.temperature?.unitCode}`);
        console.log(`Humidity: ${props.relativeHumidity?.value}%`);
        console.log(`Pressure: ${props.barometricPressure?.value} ${props.barometricPressure?.unitCode}`);
        console.log(`Wind: ${props.windSpeed?.value} ${props.windSpeed?.unitCode} from ${props.windDirection?.value}°`);
        console.log(`Visibility: ${props.visibility?.value} ${props.visibility?.unitCode}`);
        console.log(`Description: ${props.textDescription}`);
        
        console.log('\n6. Testing our NWS client...');
        if (typeof nwsClient !== 'undefined') {
            const clientData = await nwsClient.getCurrentConditions(30.7991, -81.6956);
            console.log('NWS Client returned:', clientData);
        } else {
            console.error('NWS Client not loaded');
        }
        
        console.log('\n=== Test Complete ===');
        
    } catch (error) {
        console.error('Test failed:', error);
    }
}

// Run the test
debugNWSAPI();
