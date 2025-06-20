var locationSettings = {//This is what you can edit, anything under the lcationSettings object
  mainCity: {
    autoFind: false, //set to false if you want to manually set the location
    displayname:"KINGSLAND",//set this to whatever you want the main location's name to be
    type:"geocode",//choose the following types from below:
    //geocode -- (coordinates)
    //postalKey -- (zip code)
    //iataCode -- (IATA airport code)
    //icaoCode -- (ICAO airport code)
    //placeid -- (PLace ID)
    //canonicalCityId -- (Canonical City ID)
    //locud -- (Location ID)
    val:"30.7991,-81.6956",//the value that goes with the type. Like if you select iataCode, the val would be JFK if you want JFK Airport. 
    //===NOTES===
    //if you use geocode (coordinates), you must use the format "latitude,longitude" for the val
    //if you use postalKey (zipcode), you must put ":US" after the zip code. I may be wrong about this but to be safe put it after the code.
  },
  surroundCities: {
    autoFind: false,
    //same guidelines as mainCity location settings as the seven nearby locations.
    cities:[//if you use less than 7 locations, please delete the unused cities objects.
      {
        displayname:"ST. MARYS",
        type:"geocode",
        val:"30.7297,-81.5465",
      },
      {
        displayname:"FERNANDINA BEACH",
        type:"geocode", 
        val:"30.6691,-81.4612",
      },
      {
        displayname:"BRUNSWICK",
        type:"geocode",
        val:"31.1499,-81.4915",
      },
      {
        displayname:"JEKYLL ISLAND",
        type:"geocode",
        val:"31.0740,-81.4207",
      },
      {
        displayname:"ST. SIMONS ISLAND",
        type:"geocode",
        val:"31.1547,-81.3904",
      },
      {
        displayname:"JACKSONVILLE",
        type:"geocode",
        val:"30.3322,-81.6557",
      },
      {
        displayname:"YULEE",
        type:"geocode",
        val:"30.6296,-81.5609",
      },
    ]
  },
  regionalCities: {
    autoFind: false,
    //same guidelines as mainCity location settings as the seven nearby locations.
    cities:[//if you use less than 7 locations, please delete the unused cities objects.
      {
        displayname:"SAVANNAH",
        type:"geocode",
        val:"32.0835,-81.0998",
      },
      {
        displayname:"GAINESVILLE",
        type:"geocode",
        val:"29.6516,-82.3248",
      },
      {
        displayname:"TALLAHASSEE",
        type:"geocode",
        val:"30.4518,-84.2807",
      },
      {
        displayname:"VALDOSTA",
        type:"geocode",
        val:"30.8327,-83.2785",
      },
      {
        displayname:"WAYCROSS",
        type:"geocode",
        val:"31.2135,-82.3540",
      },
      {
        displayname:"LAKE CITY",
        type:"geocode",
        val:"30.1896,-82.6390",
      },      {
        displayname:"TIFTON",
        type:"geocode",
        val:"31.4504,-83.5085",
      },
      {
        displayname:"CLEARWATER",
        type:"geocode",
        val:"27.9659,-82.8001",
      },
    ]
  }
}
//dont change this stuff. This gets filled in regardless if you want to manually fill out locations or not.
var locationConfig = {
  mainCity: {
    displayname:"",
    lat:"",
    lon:"",
    state:"",
    stateFull:"",
    region:"",
  },
  surroundCities: {
    cities: [],
  },
  regionalCities: {
    cities: [],
  }
}
var surrCityList = {}
var queryname = ""
if (window.location.search) {
  queryname = window.location.search.split("?")[1]
}
var regionList = {
  "":"none",
  "ME":"northeast",
  "NH":"northeast",
  "VT":"northeast",
  "NY":"northeast",
  "MA":"northeast",
  "RI":"northeast",
  "CT":"northeast",
  "NJ":"northeast",
  "PA":"northeast",
  "PA":"northeast",
  "DE":"northeast",
  "MD":"northeast",
  "DC":"northeast",
  "WV":"southeast",
  "VA":"southeast",
  "NC":"southeast",
  "SC":"southeast",
  "KY":"southeast",
  "TN":"southeast",
  "FL":"southeast",
  "GA":"southeast",
  "AL":"southeast",
  "MS":"southeast",
  "AR":"southeast",
  "LA":"southeast",
  "OH":"greatlakes",
  "IN":"greatlakes",
  "MI":"greatlakes",
  "IL":"greatlakes",
  "WI":"greatlakes",
  "MO":"midwest",
  "KS":"midwest",
  "IA":"midwest",
  "NE":"midwest",
  "MN":"midwest",
  "SD":"midwest",
  "ND":"midwest",
  "TX":"southwest",
  "OK":"southwest",
  "NM":"southwest",
  "CO":"southwest",
  "UT":"southwest",
  "AZ":"west",
  "CA":"west",
  "NV":"west",
  "OR":"northwest",
  "WA":"northwest",
  "ID":"northwest",
  "MT":"northwest",
  "WY":"northwest",
}
var regionalCityList = {
  "northeast": [
    {lat:"42.3555", lon:"-71.0565", cityname:"BOSTON"},
    {lat:"42.8864", lon:"-78.8784", cityname:"BUFFALO"},
    {lat:"41.7658", lon:"-72.6734", cityname:"HARTFORD"},
    {lat:"44.2601", lon:"-72.5754", cityname:"MONTPELIER"},
    {lat:"39.9526", lon:"-75.1652", cityname:"PHILADELPHIA"},
    {lat:"40.4406", lon:"-79.9959", cityname:"PITTSBURGH"},
    {lat:"38.9072", lon:"-77.0369", cityname:"WASHINGTON"},
  ],
  "southeast": [
    {lat:"33.7501", lon:"-84.3885", cityname:"ATLANTA"},
    {lat:"35.2271", lon:"-80.8431", cityname:"CHARLOTTE"},
    {lat:"38.2009", lon:"-84.8733", cityname:"FRANKFORT"},
    {lat:"35.1495", lon:"-90.0490", cityname:"MEMPHIS"},
    {lat:"29.9509", lon:"-90.0758", cityname:"NEW ORLEANS"},
    {lat:"36.8508", lon:"-76.2859", cityname:"NORFOLK"},
    {lat:"27.9517", lon:"-82.4588", cityname:"TAMPA"},
  ],
  "greatlakes": [
    {lat:"41.8781", lon:"-87.6298", cityname:"CHICAGO"},
    {lat:"39.1031", lon:"-84.5120", cityname:"CINCINNATI"},
    {lat:"39.9612", lon:"-82.9988", cityname:"COLUMBUS"},
    {lat:"42.3314", lon:"-83.0458", cityname:"DETROIT"},
    {lat:"39.7691", lon:"-86.1580", cityname:"INDIANAPOLIS"},
    {lat:"43.0389", lon:"-87.9065", cityname:"MILWAUKEE"},
    {lat:"39.7817", lon:"-89.6501", cityname:"SPRINGFIELD"},
  ],
  "midwest": [
    {lat:"41.5868", lon:"-93.6250", cityname:"DES MOINES"},
    {lat:"46.8772", lon:"-96.7898", cityname:"FARGO"},
    {lat:"40.8137", lon:"-96.7026", cityname:"LINCOLN"},
    {lat:"44.9778", lon:"-93.2650", cityname:"MINNEAPOLIS"},
    {lat:"44.0805", lon:"-103.2310", cityname:"RAPID CITY"},
    {lat:"38.6270", lon:"-90.1994", cityname:"ST. LOUIS"},
    {lat:"39.0473", lon:"-95.6752", cityname:"TOPEKA"},
  ],
  "southwest": [
    {lat:"35.2220", lon:"-101.8313", cityname:"AMARILLO"},
    {lat:"39.7392", lon:"-104.9903", cityname:"DENVER"},
    {lat:"29.7601", lon:"-95.3701", cityname:"HOUSTON"},
    {lat:"35.4676", lon:"-97.5164", cityname:"OKLAHOMA CITY"},
    {lat:"40.7608", lon:"-111.8910", cityname:"SALT LAKE CITY"},
    {lat:"31.4638", lon:"-100.4370", cityname:"SAN ANGELO"},
    {lat:"35.6870", lon:"-105.9378", cityname:"SANTA FE"},
  ],
  "west": [
    {lat:"35.3733", lon:"-119.0187", cityname:"BAKERSFIELD"},
    {lat:"36.1716", lon:"-115.1391", cityname:"LAS VEGAS"},
    {lat:"34.0549", lon:"-118.2426", cityname:"LOS ANGELES"},
    {lat:"39.5299", lon:"-119.8143", cityname:"RENO"},
    {lat:"38.5781", lon:"-121.4944", cityname:"SACRAMENTO"},
    {lat:"32.7157", lon:"-117.1611", cityname:"SAN DIEGO"},
    {lat:"37.7749", lon:"-122.4194", cityname:"SAN FRANCISCO"},
  ],
  "northwest": [
    {lat:"45.7833", lon:"-108.5007", cityname:"BILLINGS"},
    {lat:"43.6150", lon:"-116.2023", cityname:"BOISE"},
    {lat:"41.1400", lon:"-104.8202", cityname:"CHEYENNE"},
    {lat:"46.5891", lon:"-112.0391", cityname:"HELENA"},
    {lat:"45.5152", lon:"-122.6784", cityname:"PORTLAND"},
    {lat:"47.6061", lon:"-122.3328", cityname:"SEATTLE"},
    {lat:"47.6580", lon:"-117.4235", cityname:"SPOKANE"},
  ]
}
var selectedRagionalLocs = {}
function locationGrab() {
  if (locationSettings.mainCity.autoFind == false) {
    // Manual location lookup using fallback coordinates
    let cityData = null;
    
    if (locationSettings.mainCity.type === "geocode") {
      // For geocode format "lat,lon", split and use directly
      const coords = locationSettings.mainCity.val.split(',');
      cityData = {
        displayname: locationSettings.mainCity.displayname || "CUSTOM LOCATION",
        lat: parseFloat(coords[0]),
        lon: parseFloat(coords[1]),
        state: "US",
        stateFull: "United States"
      };
    } else if (locationSettings.mainCity.type === "postalKey") {
      // Try to find by zip code (limited support)
      const zipCode = locationSettings.mainCity.val.replace(':US', '');
      cityData = locationSearchFallback.getCityByZip ? locationSearchFallback.getCityByZip(zipCode) : null;
    } else {
      // Try to find by city name or other identifiers
      const searchTerm = locationSettings.mainCity.val.toUpperCase();
      cityData = locationSearchFallback.getCityCoordinates(searchTerm);
    }
    
    if (cityData) {
      locationConfig.mainCity.displayname = locationSettings.mainCity.displayname || cityData.displayname
      locationConfig.mainCity.lat = cityData.lat
      locationConfig.mainCity.lon = cityData.lon
      locationConfig.mainCity.state = cityData.state || "US"
      locationConfig.mainCity.stateFull = cityData.stateFull || "United States"
      locationConfig.mainCity.region = ((regionList[cityData.state] == undefined) ? "none" : regionList[cityData.state])
    } else {
      // Fallback to default location
      locationConfig.mainCity.displayname = "NEW YORK CITY"
      locationConfig.mainCity.lat = 40.7128
      locationConfig.mainCity.lon = -74.0060
      locationConfig.mainCity.state = "NY"
      locationConfig.mainCity.stateFull = "New York"
      locationConfig.mainCity.region = "northeast"
    }
    
    selectedRagionalLocs = regionalCityList[locationConfig.mainCity.region]
    if (locationSettings.surroundCities.autoFind == true) {
      autoSurroundingLocs()
    } else {
      manualSurroundingLocs()
    }
    if (locationSettings.regionalCities.autoFind == true) {
      for (var ii = 0; ii < selectedRagionalLocs.length; ii++) {
        regCitiesAuto(ii)
      }
    } else {
      for (var ii = 0; ii < locationSettings.regionalCities.cities.length; ii++) {
        regCitiesManual(ii)
      }
    }
  } else {
    if (window.location.search) {
      // Extract query from URL search parameters
      const urlParams = new URLSearchParams(window.location.search);
      const queryname = urlParams.get('query') || urlParams.get('city') || "NEW YORK";
      
      // Use fallback coordinates for search
      const cityData = locationSearchFallback.getCityCoordinates(queryname.toUpperCase());
      
      if (cityData) {
        locationConfig.mainCity.displayname = cityData.displayname
        locationConfig.mainCity.lat = cityData.lat
        locationConfig.mainCity.lon = cityData.lon
        locationConfig.mainCity.state = cityData.state || "US"
        locationConfig.mainCity.stateFull = cityData.stateFull || "United States"
        locationConfig.mainCity.region = ((regionList[cityData.state] == undefined) ? "none" : regionList[cityData.state])
      } else {
        // Fallback to default
        locationConfig.mainCity.displayname = "NEW YORK CITY"
        locationConfig.mainCity.lat = 40.7128
        locationConfig.mainCity.lon = -74.0060
        locationConfig.mainCity.state = "NY"
        locationConfig.mainCity.stateFull = "New York"
        locationConfig.mainCity.region = "northeast"
      }
      
      selectedRagionalLocs = regionalCityList[locationConfig.mainCity.region]
      if (locationSettings.surroundCities.autoFind == true) {
        autoSurroundingLocs()
      } else {
        manualSurroundingLocs()
      }
      if (locationSettings.regionalCities.autoFind == true) {
        for (var ii = 0; ii < selectedRagionalLocs.length; ii++) {
          regCitiesAuto(ii)
        }
      } else {
        for (var ii = 0; ii < locationSettings.regionalCities.cities.length; ii++) {
          regCitiesManual(ii)
        }
      }
    } else {
      // Try IP-based geolocation, fall back to hardcoded coordinates
      $.getJSON("https://pro.ip-api.com/json/?key=AmUN9xAaQALVYu6&exposeDate=false", function(data) {
        // Try to match the detected city with our fallback coordinates
        const cityData = locationSearchFallback.getCityCoordinates(data.city.toUpperCase());
        
        if (cityData) {
          locationConfig.mainCity.displayname = cityData.displayname
          locationConfig.mainCity.lat = cityData.lat
          locationConfig.mainCity.lon = cityData.lon
          locationConfig.mainCity.state = cityData.state || data.region
          locationConfig.mainCity.stateFull = cityData.stateFull || data.regionName
        } else {
          locationConfig.mainCity.displayname = data.city
          locationConfig.mainCity.lat = data.lat
          locationConfig.mainCity.lon = data.lon
          locationConfig.mainCity.state = data.region
          locationConfig.mainCity.stateFull = data.regionName
        }
        
        locationConfig.mainCity.region = ((regionList[locationConfig.mainCity.state] == undefined) ? "none" : regionList[locationConfig.mainCity.state])
        selectedRagionalLocs = regionalCityList[locationConfig.mainCity.region]
        
        if (locationSettings.surroundCities.autoFind == true) {
          autoSurroundingLocs()
        } else {
          manualSurroundingLocs()
        }
        if (locationSettings.regionalCities.autoFind == true) {
          for (var ii = 0; ii < selectedRagionalLocs.length; ii++) {
            regCitiesAuto(ii)
          }
        } else {
          for (var ii = 0; ii < locationSettings.regionalCities.cities.length; ii++) {
            regCitiesManual(ii)
          }
        }
      }).fail(function() {        // Complete fallback to New York City
        locationConfig.mainCity.displayname = "NEW YORK CITY"
        locationConfig.mainCity.lat = 40.7128
        locationConfig.mainCity.lon = -74.0060
        locationConfig.mainCity.state = "NY"
        locationConfig.mainCity.stateFull = "New York"
        locationConfig.mainCity.region = "northeast"
        selectedRagionalLocs = regionalCityList["northeast"];
        
        if (locationSettings.surroundCities.autoFind == true) {
          autoSurroundingLocs()
        } else {
          manualSurroundingLocs()
        }
        if (locationSettings.regionalCities.autoFind == true) {
          for (var ii = 0; ii < selectedRagionalLocs.length; ii++) {
            regCitiesAuto(ii)
          }
        } else {
          for (var ii = 0; ii < locationSettings.regionalCities.cities.length; ii++) {
            regCitiesManual(ii)
          }
        }
      })
    }
  }
}

function autoSurroundingLocs() {
  // Generate surrounding cities based on regional city list
  // Since we can't use TWC nearby API, use the regional cities for the same region
  const regionCities = regionalCityList[locationConfig.mainCity.region] || [];
  
  locationConfig.surroundCities.cities = [];
  locationConfig.surroundCities.citiesAmount = 0;
  
  // Take first 7 cities from the regional list, excluding the main city
  let addedCount = 0;
  for (let i = 0; i < regionCities.length && addedCount < 7; i++) {
    const city = regionCities[i];
    // Skip if it's too close to the main city (same coordinates)
    if (Math.abs(parseFloat(city.lat) - parseFloat(locationConfig.mainCity.lat)) > 0.1 || 
        Math.abs(parseFloat(city.lon) - parseFloat(locationConfig.mainCity.lon)) > 0.1) {
      
      const cityData = {
        displayname: city.cityname,
        lat: city.lat,
        lon: city.lon,
        state: locationConfig.mainCity.state,
        stateFull: locationConfig.mainCity.stateFull
      };
      
      locationConfig.surroundCities.cities.push(cityData);
      addedCount++;
    }  }
  
  locationConfig.surroundCities.citiesAmount = addedCount;
}

function manualSurroundingLocs() {
  for (var i = 0; i < locationSettings.surroundCities.cities.length; i++) {
    manualIndivCities(i)
  }
  locationConfig.surroundCities.citiesAmount = locationSettings.surroundCities.cities.length
  if (locationConfig.surroundCities.citiesAmount > 7) {
    locationConfig.surroundCities.citiesAmount = 7
  }
}

function manualIndivCities(i) {
  var cityData = {displayname:"",lat:"",lon:"",state:"",stateFull:""}
  
  // Use fallback coordinates instead of TWC API
  let searchData = null;
  
  if (locationSettings.surroundCities.cities[i].type === "geocode") {
    const coords = locationSettings.surroundCities.cities[i].val.split(',');
    searchData = {
      displayname: locationSettings.surroundCities.cities[i].displayname || "CUSTOM LOCATION",
      lat: parseFloat(coords[0]),
      lon: parseFloat(coords[1]),
      state: "US",
      stateFull: "United States"
    };
  } else {
    // Try to find by name or other identifiers
    const searchTerm = locationSettings.surroundCities.cities[i].val.toUpperCase();
    searchData = locationSearchFallback.getCityCoordinates(searchTerm);
  }
  
  if (searchData) {
    cityData.displayname = locationSettings.surroundCities.cities[i].displayname || searchData.displayname
    cityData.lat = searchData.lat
    cityData.lon = searchData.lon
    cityData.state = searchData.state || "US"
    cityData.stateFull = searchData.stateFull || "United States"
  } else {
    // Fallback values
    cityData.displayname = locationSettings.surroundCities.cities[i].displayname || "UNKNOWN CITY"
    cityData.lat = "40.7128"
    cityData.lon = "-74.0060"
    cityData.state = "US"
    cityData.stateFull = "United States"
  }
  
  locationConfig.surroundCities.cities.push(cityData)
}

function indivSurrCity(i) {
  // This function is no longer used since we replaced autoSurroundingLocs with regional cities
  // Keeping for compatibility but making it a no-op
  return;
}

function regCitiesAuto(i) {
  var cityData = {displayname:"",lat:"",lon:"",state:"",stateFull:""}
  
  // Use the regional city data directly instead of making API calls
  if (selectedRagionalLocs[i]) {
    cityData.displayname = selectedRagionalLocs[i].cityname
    cityData.lat = selectedRagionalLocs[i].lat
    cityData.lon = selectedRagionalLocs[i].lon
    cityData.state = locationConfig.mainCity.state
    cityData.stateFull = locationConfig.mainCity.stateFull
  }
  
  locationConfig.regionalCities.cities.push(cityData)
  locationConfig.regionalCities.citiesAmount = i+1
}

function regCitiesManual(i) {
  var cityData = {displayname:"",lat:"",lon:"",state:"",stateFull:""}
  
  // Use fallback coordinates instead of TWC API
  let searchData = null;
  
  if (locationSettings.regionalCities.cities[i].type === "geocode") {
    const coords = locationSettings.regionalCities.cities[i].val.split(',');
    searchData = {
      displayname: locationSettings.regionalCities.cities[i].displayname || "CUSTOM LOCATION",
      lat: parseFloat(coords[0]),
      lon: parseFloat(coords[1]),
      state: "US",
      stateFull: "United States"
    };
  } else {
    // Try to find by name or other identifiers
    const searchTerm = locationSettings.regionalCities.cities[i].val.toUpperCase();
    searchData = locationSearchFallback.getCityCoordinates(searchTerm);
  }
  
  if (searchData) {
    cityData.displayname = locationSettings.regionalCities.cities[i].displayname || searchData.displayname
    cityData.lat = searchData.lat
    cityData.lon = searchData.lon
    cityData.state = searchData.state || "US"
    cityData.stateFull = searchData.stateFull || "United States"
  } else {
    // Fallback values
    cityData.displayname = locationSettings.regionalCities.cities[i].displayname || "UNKNOWN CITY"
    cityData.lat = "40.7128"
    cityData.lon = "-74.0060"
    cityData.state = "US"
    cityData.stateFull = "United States"
  }
  
  locationConfig.regionalCities.cities.push(cityData)
  locationConfig.regionalCities.citiesAmount = locationSettings.regionalCities.cities.length
}
locationGrab()