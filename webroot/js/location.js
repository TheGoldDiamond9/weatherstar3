var locationSettings = {//This is what you can edit, anything under the lcationSettings object
  mainCity: {
    autoFind: true, //set to false if you want to manually set the location
    displayname:"",//set this to whatever you want the main location's name to be
    type:"",//choose the following types from below:
    //geocode -- (coordinates)
    //postalKey -- (zip code)
    //iataCode -- (IATA airport code)
    //icaoCode -- (ICAO airport code)
    //placeid -- (PLace ID)
    //canonicalCityId -- (Canonical City ID)
    //locud -- (Location ID)
    val:"",//the value that goes with the type. Like if you select iataCode, the val would be JFK if you want JFK Airport. 
    //===NOTES===
    //if you use geocode (coordinates), you must use the format "latitude,longitude" for the val
    //if you use postalKey (zipcode), you must put ":US" after the zip code. I may be wrong about this but to be safe put it after the code.
  },
  surroundCities: {
    autoFind: true,
    //same guidelines as mainCity location settings as the seven nearby locations.
    cities:[//if you use less than 7 locations, please delete the unused cities objects.
      {
        displayname:"",
        type:"",
        val:"",
      },
      {
        displayname:"",
        type:"",
        val:"",
      },
      {
        displayname:"",
        type:"",
        val:"",
      },
      {
        displayname:"",
        type:"",
        val:"",
      },
      {
        displayname:"",
        type:"",
        val:"",
      },
      {
        displayname:"",
        type:"",
        val:"",
      },
      {
        displayname:"",
        type:"",
        val:"",
      },
    ]
  },
  regionalCities: {
    autoFind: true,
    //same guidelines as mainCity location settings as the seven nearby locations.
    cities:[//if you use less than 7 locations, please delete the unused cities objects.
      {
        displayname:"",
        type:"",
        val:"",
      },
      {
        displayname:"",
        type:"",
        val:"",
      },
      {
        displayname:"",
        type:"",
        val:"",
      },
      {
        displayname:"",
        type:"",
        val:"",
      },
      {
        displayname:"",
        type:"",
        val:"",
      },
      {
        displayname:"",
        type:"",
        val:"",
      },
      {
        displayname:"",
        type:"",
        val:"",
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
    $.getJSON("https://api.weather.com/v3/location/point?" + locationSettings.mainCity.type + "=" + locationSettings.mainCity.val + "&language=en-US&format=json&apiKey=" + api_key, function(data) {
      locationConfig.mainCity.displayname = ((locationSettings.mainCity.displayname != "") ? locationSettings.mainCity.displayname : data.location.displayName)
      locationConfig.mainCity.lat = data.location.latitude
      locationConfig.mainCity.lon = data.location.longitude
      locationConfig.mainCity.state = data.location.adminDistrictCode
      locationConfig.mainCity.stateFull = data.location.adminDistrict
      locationConfig.mainCity.region = ((regionList[data.location.adminDistrictCode] == undefined) ? "none" : regionList[data.location.adminDistrictCode])
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
    })
  } else {
    if (window.location.search) {
      $.getJSON("https://api.weather.com/v3/location/search?query=" + queryname +"&language=en-US&format=json&apiKey=" + api_key, function(data) {
        locationConfig.mainCity.displayname = data.location.displayName[0]
        locationConfig.mainCity.lat = data.location.latitude[0]
        locationConfig.mainCity.lon = data.location.longitude[0]
        locationConfig.mainCity.state = data.location.adminDistrictCode[0]
        locationConfig.mainCity.stateFull = data.location.adminDistrict[0]
        locationConfig.mainCity.region = ((regionList[data.location.adminDistrictCode[0]] == undefined) ? "none" : regionList[data.location.adminDistrictCode[0]])
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
      }).fail(function() {
        $.getJSON("https://pro.ip-api.com/json/?key=AmUN9xAaQALVYu6&exposeDate=false", function(data) {
          locationConfig.mainCity.displayname = data.city
          locationConfig.mainCity.lat = data.lat
          locationConfig.mainCity.lon = data.lon
          locationConfig.mainCity.state = data.region
          locationConfig.mainCity.stateFull = data.regionName
          locationConfig.mainCity.region = ((regionList[data.region] == undefined) ? "none" : regionList[data.region])
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
        }).fail(function() {
          locationConfig.mainCity.displayname = undefined
          locationConfig.mainCity.lat = undefined
          locationConfig.mainCity.lon = undefined
          locationConfig.mainCity.state = undefined
          locationConfig.mainCity.stateFull = undefined
          locationConfig.mainCity.region = "none"
          selectedRagionalLocs = regionalCityList["none"]
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
      })
    } else {
      $.getJSON("https://pro.ip-api.com/json/?key=AmUN9xAaQALVYu6&exposeDate=false", function(data) {
        locationConfig.mainCity.displayname = data.city
        locationConfig.mainCity.lat = data.lat
        locationConfig.mainCity.lon = data.lon
        locationConfig.mainCity.state = data.region
        locationConfig.mainCity.stateFull = data.regionName
        locationConfig.mainCity.region = ((regionList[data.region] == undefined) ? "none" : regionList[data.region])
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
      }).fail(function() {
        locationConfig.mainCity.displayname = undefined
        locationConfig.mainCity.lat = undefined
        locationConfig.mainCity.lon = undefined
        locationConfig.mainCity.state = undefined
        locationConfig.mainCity.stateFull = undefined
        locationConfig.mainCity.region = "none"
        selectedRagionalLocs = regionalCityList["none"]
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
  $.getJSON('https://api.weather.com/v3/location/near?geocode=' + locationConfig.mainCity.lat + ',' + locationConfig.mainCity.lon + '&product=observation&format=json&apiKey=' + api_key, function(data) {
    surrCityList.lons = data.location.longitude
    surrCityList.lats = data.location.latitude
    surrCityList.amount = data.location.stationName.length
    for (var i = 0; i < surrCityList.amount; i++) {
      indivSurrCity(i);
    }
    setTimeout(() => {
      locationConfig.surroundCities.citiesAmount = locationConfig.surroundCities.cities.length
      if (locationConfig.surroundCities.citiesAmount > 7) {
        locationConfig.surroundCities.citiesAmount = 7
      }
    }, 1000);
    
  })
}
function autoSurroundingLocs() {
  $.getJSON('https://api.weather.com/v3/location/near?geocode=' + locationConfig.mainCity.lat + ',' + locationConfig.mainCity.lon + '&product=observation&format=json&apiKey=' + api_key, function(data) {
    surrCityList.lons = data.location.longitude
    surrCityList.lats = data.location.latitude
    surrCityList.amount = data.location.stationName.length
    for (var i = 0; i < surrCityList.amount; i++) {
      indivSurrCity(i);
    }
    setTimeout(() => {
      locationConfig.surroundCities.citiesAmount = locationConfig.surroundCities.cities.length
      if (locationConfig.surroundCities.citiesAmount > 7) {
        locationConfig.surroundCities.citiesAmount = 7
      }
    }, 1000);
    
  })
}
function manualSurroundingLocs() {
  for (var i = 0; i < locationSettings.surroundCities.cities.length; i++) {
    manualIndivCities(i)
  }
  locationConfig.surroundCities.citiesAmount =  locationSettings.surroundCities.cities.length
  if (locationConfig.surroundCities.citiesAmount > 7) {
    locationConfig.surroundCities.citiesAmount = 7
  }
}

function manualIndivCities(i) {
  var cityData = {displayname:"",lat:"",lon:"",state:"",stateFull:""}
    $.getJSON("https://api.weather.com/v3/location/point?" + locationSettings.surroundCities.cities[i].type + "=" + locationSettings.surroundCities.cities[i].val + "&language=en-US&format=json&apiKey=" + api_key, function(data) {
      cityData.displayname = ((locationSettings.surroundCities.cities[i].displayname != "") ? locationSettings.surroundCities.cities[i].displayname : data.location.displayName)
      cityData.lat = data.location.latitude
      cityData.lon = data.location.longitude
      cityData.state = data.location.adminDistrictCode
      cityData.stateFull = data.location.adminDistrict
    })
    locationConfig.surroundCities.cities.push(cityData)
}

function indivSurrCity(i) {
  var duploc = false
  var cityData = {displayname:"",lat:"",lon:"",state:"",stateFull:""}
  $.getJSON("https://api.weather.com/v3/location/point?geocode=" + surrCityList.lats[i] + "," + surrCityList.lons[i] + "&language=en-US&format=json&apiKey=" + api_key, function(data) {
    cityData.displayname = data.location.displayName
    cityData.lat = data.location.latitude
    cityData.lon = data.location.longitude
    cityData.state = data.location.adminDistrictCode
    cityData.stateFull = data.location.adminDistrict
  }).fail(function() {
    cityData.displayname = ""
    cityData.lat = ""
    cityData.lon = ""
    cityData.state = ""
    cityData.stateFull = ""
  })
  setTimeout(() => {
    if (cityData.displayname != locationConfig.mainCity.displayname) {
      locationConfig.surroundCities.cities.push(cityData)
    }
    for (var ii = 0; ii < locationConfig.surroundCities.cities.length-1; ii++) {
      if (cityData.displayname == locationConfig.surroundCities.cities[ii].displayname) {
        locationConfig.surroundCities.cities.pop()
        continue
      }
    }
  }, 500);
}
function regCitiesAuto(i) {
  var cityData = {displayname:"",lat:"",lon:"",state:"",stateFull:""}
  $.getJSON("https://api.weather.com/v3/location/point?geocode=" + selectedRagionalLocs[i].lat + "," + selectedRagionalLocs[i].lon + "&language=en-US&format=json&apiKey=" + api_key, function(data) {
    cityData.displayname = selectedRagionalLocs[i].cityname
    cityData.lat = data.location.latitude
    cityData.lon = data.location.longitude
    cityData.state = data.location.adminDistrictCode
    cityData.stateFull = data.location.adminDistrict
  })
  locationConfig.regionalCities.cities.push(cityData)
  locationConfig.regionalCities.citiesAmount = i+1
}
function regCitiesManual(i) {
  var cityData = {displayname:"",lat:"",lon:"",state:"",stateFull:""}
  $.getJSON("https://api.weather.com/v3/location/point?" + locationSettings.regionalCities.cities[i].type + "=" + locationSettings.regionalCities.cities[i].val + "&language=en-US&format=json&apiKey=" + api_key, function(data) {
    cityData.displayname = ((locationSettings.regionalCities.cities[i].displayname != "") ? locationSettings.regionalCities.cities[i].displayname : data.location.displayName)
    cityData.lat = data.location.latitude
    cityData.lon = data.location.longitude
    cityData.state = data.location.adminDistrictCode
    cityData.stateFull = data.location.adminDistrict
  })
  locationConfig.regionalCities.cities.push(cityData)
  locationConfig.regionalCities.citiesAmount = locationSettings.regionalCities.cities.length
}
locationGrab()
