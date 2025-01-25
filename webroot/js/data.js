//time manager
setInterval(function () {
  var today = new Date();
  const weekday = ["SUN","MON","TUE","WED","THU","FRI","SAT"];
  const d = new Date();
  let day = weekday[d.getDay()];
  let tomorrowday = weekday[d.getDay() + 1];
  $('#date').text( day + ' ' + today.toString().slice(4,10).replace('01', ' 1').replace('02', ' 2').replace('03', ' 3').replace('04', ' 4').replace('05', ' 5').replace('06', ' 6').replace('07', ' 7').replace('08', ' 8').replace('09', ' 9').trimRight() );
  $('#time').text( today.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true, minute: 'numeric', second: 'numeric' }));
}, 1000);

var weatherData = {
  currentConditions: {
    noReport:false, cityname:"", humidity:"", pressure:"",pressureTrend:"",wind:"", gusts:"", cond:"", temp:"",feelslike:"",feelsliketype:"",dewpoint:"",visibility:"",ceiling:""
  }, nearbyCities: {
    forecast:{cities: []},conditions:{cities: []}
  }, regionalConditions: {
    cities: []
  },
  dayDesc: {
    noReport:false,
    cityname:"",
    times: [
      {timetitle:"",forecast:""},
      {timetitle:"",forecast:""},
      {timetitle:"",forecast:""},
    ],
  }, extendedForecast: {
    noReport:false,
    cityname:"",
    days: [
      {dayname:"",icon:"",cond:"",high:"",low:"",windspeed:""},
      {dayname:"",icon:"",cond:"",high:"",low:"",windspeed:""},
      {dayname:"",icon:"",cond:"",high:"",low:"",windspeed:""},
      {dayname:"",icon:"",cond:"",high:"",low:"",windspeed:""},
      {dayname:"",icon:"",cond:"",high:"",low:"",windspeed:""},
    ],
  }, almanac: {
    noReport:false,today:"",tomorrow:"",sunrisetoday:"",sunrisetomorow:"",sunsettoday:"",sunsettomorrow:"",avglowtoday:"",avghightoday:"",avglowtomorrow:"",avghightomorow:"",normalprecip:"",moonphases:[
      {moon:"blank",date:""},
      {moon:"blank",date:""},
      {moon:"blank",date:""},
      {moon:"blank",date:""},
      {moon:"blank",date:""},
      {moon:"blank",date:""},
      {moon:"blank",date:""},
      {moon:"blank",date:""},
    ],
  }, alerts: {
    warnings:[]
  }, NWS: {
    zone:""
  }, travel:{noReport:false,cities:[
    {displayname:"ATLANTA\n",lat:"33.7488",lon:"-84.3877",days:[{dayName:"",condition:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""}]},
    {displayname:"BISMARCK\n",lat:"46.8042",lon:"-100.7878",days:[{dayName:"",condition:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""}]},
    {displayname:"BOISE\n",lat:"43.6150",lon:"-116.2023",days:[{dayName:"",condition:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""}]},
    {displayname:"BOSTON\n",lat:"42.3601",lon:"-71.0589",days:[{dayName:"",condition:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""}]},
    {displayname:"BUFFALO\n",lat:"42.8864",lon:"-78.8784",days:[{dayName:"",condition:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""}]},
    {displayname:"CHICAGO\n",lat:"41.8781",lon:"-87.6298",days:[{dayName:"",condition:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""}]},
    {displayname:"CINCINNATI\n",lat:"39.1031",lon:"-84.5120",days:[{dayName:"",condition:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""}]},
    {displayname:"DALLAS\n",lat:"32.7767",lon:"-96.7970",days:[{dayName:"",condition:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""}]},
    {displayname:"DENVER\n",lat:"39.7392",lon:"-104.9903",days:[{dayName:"",condition:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""}]},
    {displayname:"DETROIT\n",lat:"42.3314",lon:"-83.0458",days:[{dayName:"",condition:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""}]},
    {displayname:"KANSAS CITY\n",lat:"39.0997",lon:"-94.5786",days:[{dayName:"",condition:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""}]},
    {displayname:"LOS ANGELES\n",lat:"34.0549",lon:"-118.2426",days:[{dayName:"",condition:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""}]},
    {displayname:"MINNEAPOLIS\n",lat:"44.9778",lon:"-93.2650",days:[{dayName:"",condition:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""}]},
    {displayname:"NASHVILLE\n",lat:"36.1627",lon:"-86.7816",days:[{dayName:"",condition:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""}]},
    {displayname:"NEW ORLEANS\n",lat:"29.9511",lon:"-90.0715",days:[{dayName:"",condition:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""}]},
    {displayname:"NEW YORK CITY\n",lat:"40.7128",lon:"-74.0060",days:[{dayName:"",condition:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""}]},
    {displayname:"PHOENIX\n",lat:"33.4484",lon:"-112.0740",days:[{dayName:"",condition:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""}]},
    {displayname:"PORTLAND\n",lat:"45.5152",lon:"-122.6784",days:[{dayName:"",condition:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""}]},
    {displayname:"RALEIGH\n",lat:"35.7796",lon:"-78.6382",days:[{dayName:"",condition:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""}]},
    {displayname:"RAPID CITY\n",lat:"44.0805",lon:"-103.2310",days:[{dayName:"",condition:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""}]},
    {displayname:"SACRAMENTO\n",lat:"38.5816",lon:"-121.4944",days:[{dayName:"",condition:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""}]},
    {displayname:"SALT LAKE CITY\n",lat:"40.7608",lon:"-111.8910",days:[{dayName:"",condition:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""}]},
    {displayname:"TAMPA\n",lat:"27.9517",lon:"-82.4588",days:[{dayName:"",condition:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""}]},
    {displayname:"WASHINGTON DC\n",lat:"38.9072",lon:"-77.0369",days:[{dayName:"",condition:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""}]},
  ]},
}

function grabData() {
  function grabCurrentConditions() {
    var url = "https://api.weather.com/v3/wx/observations/current?geocode=" + locationConfig.mainCity.lat + "," + locationConfig.mainCity.lon + "&units=e&language=en-US&format=json&apiKey=" + api_key
    $.getJSON(url, function(data) {
      try {
        weatherData.currentConditions.cityname = locationConfig.mainCity.displayname
        weatherData.currentConditions.cond = data.wxPhraseLong
        weatherData.currentConditions.gusts = ((data.windGust != null || data.windGust != undefined) ? data.windGust + " Mph" : "None")
        weatherData.currentConditions.humidity = data.relativeHumidity
        weatherData.currentConditions.pressure = data.pressureAltimeter
        weatherData.currentConditions.pressureTrend = ((data.pressureTendencyCode == 0) ? "IN." : (data.pressureTendencyCode == 1) ? "R" : (data.pressureTendencyCode == 2) ? "F" : (data.pressureTendencyCode == 3) ? "R" : (data.pressureTendencyCode == 4) ? "F" : "")
        weatherData.currentConditions.temp = data.temperature
        weatherData.currentConditions.wind = ((data.windDirectionCardinal == "CALM" || data.windSpeed == 0) ? "CALM" : data.windDirectionCardinal + " " + data.windSpeed)
        weatherData.currentConditions.feelslike = data.temperatureFeelsLike
        weatherData.currentConditions.feelsliketype = ((data.temperatureFeelsLike < 65) ? "WIND CHILL: " : "HEAT INDEX: ")
        weatherData.currentConditions.dewpoint = data.temperatureDewPoint
        weatherData.currentConditions.visibility = data.visibility
        weatherData.currentConditions.ceiling = data.cloudCeiling
        weatherData.currentConditions.noReport = false
      } catch (error) {
        weatherData.currentConditions.cityname = locationConfig.mainCity.displayname
        weatherData.currentConditions.cond = ""
        weatherData.currentConditions.gusts = ""
        weatherData.currentConditions.humidity = ""
        weatherData.currentConditions.pressure = ""
        weatherData.currentConditions.pressureTrend = ""
        weatherData.currentConditions.temp = ""
        weatherData.currentConditions.wind = ""
        weatherData.currentConditions.feelslike = ""
        weatherData.currentConditions.feelsliketype = ""
        weatherData.currentConditions.dewpoint = ""
        weatherData.currentConditions.visibility = ""
        weatherData.currentConditions.ceiling = ""
        weatherData.currentConditions.windspeed = ""
        weatherData.currentConditions.noReport = true
      }
    }).fail(function() {
      weatherData.currentConditions.cityname = locationConfig.mainCity.displayname
      weatherData.currentConditions.cond = ""
      weatherData.currentConditions.gusts = ""
      weatherData.currentConditions.humidity = ""
      weatherData.currentConditions.pressure = ""
      weatherData.currentConditions.pressureTrend = ""
      weatherData.currentConditions.temp = ""
      weatherData.currentConditions.wind = ""
      weatherData.currentConditions.feelslike = ""
      weatherData.currentConditions.feelsliketype = ""
      weatherData.currentConditions.dewpoint = ""
      weatherData.currentConditions.visibility = ""
      weatherData.currentConditions.ceiling = ""
      weatherData.currentConditions.windspeed = ""
      weatherData.currentConditions.noReport = true
    })
  }
  grabCurrentConditions();
  function grabNearbyConditions() {
    weatherData.nearbyCities.conditions.cities = []
    var url = "https://api.weather.com/v3/aggcommon/v3-wx-observations-current?geocodes="
    for (var li = 0; li < locationConfig.surroundCities.citiesAmount; li++) {
      url += locationConfig.surroundCities.cities[li].lat + "," + locationConfig.surroundCities.cities[li].lon + ";"
    }
    url += "&language=en-US&units=e&format=json&apiKey=" + api_key
    $.getJSON(url, function(data) {
      data.forEach((ajaxedLoc, i) => {
        var nearbyCitiesObj = {noReport:false,cityname:"", temp:"", wind:"", windspeed:"",condition:'',windDirNum:""};
        try {
        if (ajaxedLoc != undefined || ajaxedLoc != null || ajaxedLoc != "" || ajaxedLoc != " ") {
          nearbyCitiesObj.noReport = false
          nearbyCitiesObj.cityname = locationConfig.surroundCities.cities[i].displayname
          nearbyCitiesObj.statename = locationConfig.surroundCities.cities[i].state
          nearbyCitiesObj.condition = ajaxedLoc["v3-wx-observations-current"].wxPhraseShort.replaceAll(' Shower', ' SHWR',).replaceAll('Near', 'NR',).replaceAll('Light', 'LGT',).replaceAll('Heavy', 'HVY').replaceAll('Early', 'ERLY').replaceAll('Partial', 'PART').replaceAll('Cldy', 'CLOUDY').replaceAll(' T-Storm', ' T-STM')
          nearbyCitiesObj.temp = ajaxedLoc["v3-wx-observations-current"].temperature
          nearbyCitiesObj.wind = ((ajaxedLoc["v3-wx-observations-current"].windDirectionCardinal == "CALM" || ajaxedLoc["v3-wx-observations-current"].windSpeed == 0) ? 'CALM' :  ajaxedLoc["v3-wx-observations-current"].windDirectionCardinal)
          nearbyCitiesObj.windspeed = ajaxedLoc["v3-wx-observations-current"].windSpeed
          nearbyCitiesObj.windDirNum = ajaxedLoc["v3-wx-observations-current"].windDirection
          weatherData.nearbyCities.conditions.cities.push(nearbyCitiesObj)
        } else {
          nearbyCitiesObj.noReport = true
          nearbyCitiesObj.cityname = locationConfig.surroundCities.cities[i].displayname
          nearbyCitiesObj.statename = locationConfig.surroundCities.cities[i].state
          nearbyCitiesObj.condition = ""
          nearbyCitiesObj.temp = ""
          nearbyCitiesObj.wind = ""
          nearbyCitiesObj.windspeed = ""
          nearbyCitiesObj.windDirNum = ""
          weatherData.nearbyCities.conditions.cities.push(nearbyCitiesObj)
        }
        } catch (error) {
          nearbyCitiesObj.noReport = true
          nearbyCitiesObj.cityname = locationConfig.surroundCities.cities[i].displayname
          nearbyCitiesObj.statename = locationConfig.surroundCities.cities[i].state
          nearbyCitiesObj.condition = ""
          nearbyCitiesObj.temp = ""
          nearbyCitiesObj.wind = ""
          nearbyCitiesObj.windspeed = ""
          nearbyCitiesObj.windDirNum = ""
          weatherData.nearbyCities.conditions.cities.push(nearbyCitiesObj)
        }
      })
    }).fail(function(error) {
      for (var i; i < locationConfig.surroundCities.citiesAmount; i++) {
        var nearbyCitiesObj = {noReport:false,cityname:"", temp:"", condition:"", wind:"", windspeed:"",statename:"",windDirNum:""};
        nearbyCitiesObj.noReport = true
        nearbyCitiesObj.cityname = locationConfig.surroundCities.cities[i].displayname
        nearbyCitiesObj.statename = locationConfig.surroundCities.cities[i].state
        nearbyCitiesObj.condition = ""
        nearbyCitiesObj.temp = ""
        nearbyCitiesObj.wind = ""
        nearbyCitiesObj.windspeed = ""
        nearbyCitiesObj.windDirNum = ""
        weatherData.nearbyCities.conditions.cities.push(nearbyCitiesObj)
      }
    })
  }
  grabNearbyConditions();
  function grabNearbyForecast() {
    weatherData.nearbyCities.forecast.cities = []
    var url = "https://api.weather.com/v3/aggcommon/v3-wx-forecast-daily-3day?geocodes="
    for (var li = 0; li < locationConfig.surroundCities.citiesAmount; li++) {
      url += locationConfig.surroundCities.cities[li].lat + "," + locationConfig.surroundCities.cities[li].lon + ";"
    }
    url += "&language=en-US&units=e&format=json&apiKey=" + api_key
    $.getJSON(url, function(data) {
      data.forEach((ajaxedLoc, i) => {
        var nearbyCitiesObjF = {noReport:false,cityname:"", low:"", high:"",condition:""};
        var ii = 0
        var fi = 0
        try {
        if (ajaxedLoc["v3-wx-forecast-daily-3day"].daypart[0].daypartName[0] == null) {
          ii = 2
        }
        if (ajaxedLoc["v3-wx-forecast-daily-3day"].temperatureMax[0] == null) {
          fi = 1
        }
        if (ajaxedLoc != undefined || ajaxedLoc != null || ajaxedLoc != "" || ajaxedLoc != " ") {
          nearbyCitiesObjF.noReport = false
          nearbyCitiesObjF.cityname = locationConfig.surroundCities.cities[i].displayname
          nearbyCitiesObjF.low = ajaxedLoc["v3-wx-forecast-daily-3day"].temperatureMin[fi]
          nearbyCitiesObjF.high = ajaxedLoc["v3-wx-forecast-daily-3day"].temperatureMax[fi]
          nearbyCitiesObjF.condition = ajaxedLoc["v3-wx-forecast-daily-3day"].daypart[0].wxPhraseShort[ii].replaceAll(' Shower', ' SHWR',).replaceAll('Near', 'NR',).replaceAll('Light', 'LGT',).replaceAll('Heavy', 'HVY').replaceAll('Early', 'ERLY').replaceAll('Partial', 'PART').replaceAll('Cldy', 'CLOUDY').replaceAll(' T-Storm', ' T-STM')
          weatherData.nearbyCities.forecast.cities.push(nearbyCitiesObjF)
        } else {
          nearbyCitiesObjF.noReport = true
          nearbyCitiesObjF.cityname = locationConfig.surroundCities.cities[i].displayname
          nearbyCitiesObjF.low = ""
          nearbyCitiesObjF.high = ""
          nearbyCitiesObjF.condition = ""
          weatherData.nearbyCities.forecast.cities.push(nearbyCitiesObjF)
        }
        } catch (error) {
          nearbyCitiesObjF.noReport = true
          nearbyCitiesObjF.cityname = locationConfig.surroundCities.cities[i].displayname
          nearbyCitiesObjF.low = ""
          nearbyCitiesObjF.high = ""
          nearbyCitiesObjF.condition = ""
          weatherData.nearbyCities.forecast.cities.push(nearbyCitiesObjF)
        }
      })
    }).fail(function(error) {
      for (var i; i < locationConfig.surroundCities.citiesAmount; i++) {
        var nearbyCitiesObjF = {noReport:false,cityname:"", low:"", high:"", wind:"", condition:""};
        nearbyCitiesObjF.noReport = true
        nearbyCitiesObjF.cityname = locationConfig.surroundCities.cities[i].displayname
        nearbyCitiesObjF.low = ""
        nearbyCitiesObjF.high = ""
        nearbyCitiesObjF.condition = ""
        weatherData.nearbyCities.forecast.cities.push(nearbyCitiesObjF)
      }
    })
  }
  grabNearbyForecast()
  function grabRegionalConditions() {
    weatherData.regionalConditions.cities = []
    var url = "https://api.weather.com/v3/aggcommon/v3-wx-observations-current?geocodes="
    for (var li = 0; li < locationConfig.regionalCities.citiesAmount; li++) {
      url += locationConfig.regionalCities.cities[li].lat + "," + locationConfig.regionalCities.cities[li].lon + ";"
    }
    url += "&language=en-US&units=e&format=json&apiKey=" + api_key
    $.getJSON(url, function(data) {
      data.forEach((ajaxedLoc, i) => {
        var nearbyCitiesObj = {noReport:false,cityname:"", temp:"", wind:"", windspeed:"",condition:'',windDirNum:""};
        try {
        if (ajaxedLoc != undefined || ajaxedLoc != null || ajaxedLoc != "" || ajaxedLoc != " ") {
          nearbyCitiesObj.noReport = false
          nearbyCitiesObj.cityname = locationConfig.regionalCities.cities[i].displayname
          nearbyCitiesObj.statename = locationConfig.regionalCities.cities[i].state
          nearbyCitiesObj.condition = ajaxedLoc["v3-wx-observations-current"].wxPhraseShort.replaceAll(' Shower', ' SHWR',).replaceAll('Near', 'NR',).replaceAll('Light', 'LGT',).replaceAll('Heavy', 'HVY').replaceAll('Early', 'ERLY').replaceAll('Partial', 'PART').replaceAll('Cldy', 'CLOUDY').replaceAll(' T-Storm', ' T-STM')
          nearbyCitiesObj.temp = ajaxedLoc["v3-wx-observations-current"].temperature
          nearbyCitiesObj.wind = ((ajaxedLoc["v3-wx-observations-current"].windDirectionCardinal == "CALM" || ajaxedLoc["v3-wx-observations-current"].windSpeed == 0) ? 'CALM' :  ajaxedLoc["v3-wx-observations-current"].windDirectionCardinal)
          nearbyCitiesObj.windspeed = ajaxedLoc["v3-wx-observations-current"].windSpeed
          nearbyCitiesObj.windDirNum = ajaxedLoc["v3-wx-observations-current"].windDirection
          weatherData.regionalConditions.cities.push(nearbyCitiesObj)
        } else {
          nearbyCitiesObj.noReport = true
          nearbyCitiesObj.cityname = locationConfig.regionalCities.cities[i].displayname
          nearbyCitiesObj.statename = locationConfig.regionalCities.cities[i].state
          nearbyCitiesObj.condition = ""
          nearbyCitiesObj.temp = ""
          nearbyCitiesObj.wind = ""
          nearbyCitiesObj.windspeed = ""
          nearbyCitiesObj.windDirNum = ""
          weatherData.regionalConditions.cities.push(nearbyCitiesObj)
        }
        } catch (error) {
          nearbyCitiesObj.noReport = true
          nearbyCitiesObj.cityname = locationConfig.regionalCities.cities[i].displayname
          nearbyCitiesObj.statename = locationConfig.regionalCities.cities[i].state
          nearbyCitiesObj.condition = ""
          nearbyCitiesObj.temp = ""
          nearbyCitiesObj.wind = ""
          nearbyCitiesObj.windspeed = ""
          nearbyCitiesObj.windDirNum = ""
          weatherData.regionalConditions.cities.push(nearbyCitiesObj)
        }
      })
    }).fail(function(error) {
      for (var i; i < locationConfig.regionalCities.citiesAmount; i++) {
        var nearbyCitiesObj = {noReport:false,cityname:"", temp:"", condition:"", wind:"", windspeed:"",statename:"",windDirNum:""};
        nearbyCitiesObj.noReport = true
        nearbyCitiesObj.cityname = locationConfig.regionalCities.cities[i].displayname
        nearbyCitiesObj.statename = locationConfig.regionalCities.cities[i].state
        nearbyCitiesObj.condition = ""
        nearbyCitiesObj.temp = ""
        nearbyCitiesObj.wind = ""
        nearbyCitiesObj.windspeed = ""
        nearbyCitiesObj.windDirNum = ""
        weatherData.regionalConditions.cities.push(nearbyCitiesObj)
      }
    })
  }
  grabRegionalConditions();
  function grabTravel() {
    var url = "https://api.weather.com/v3/aggcommon/v3-wx-forecast-daily-5day?geocodes="
    weatherData.travel.cities.forEach((loc, i) => {
      url += `${loc.lat},${loc.lon};`
    });
    url += "&language=en-US&units=e&format=json&apiKey=" + api_key
    $.getJSON(url, function(data) {
      data.forEach((ajaxedLoc, i) => {
        for (var hi = (ajaxedLoc["v3-wx-forecast-daily-5day"].daypart[0].daypartName[0] == null) ? 1 : 0, hidp = (ajaxedLoc["v3-wx-forecast-daily-5day"].daypart[0].daypartName[0] == null) ? 2 : 0; hi < 3; hi++, hidp = hidp + 2) {
          weatherData.travel.cities[i].days[0].high = ajaxedLoc["v3-wx-forecast-daily-5day"].temperatureMax[hi]
          weatherData.travel.cities[i].days[0].low = ajaxedLoc["v3-wx-forecast-daily-5day"].temperatureMin[hi]
          weatherData.travel.cities[i].days[0].condition = ajaxedLoc["v3-wx-forecast-daily-5day"].daypart[0].wxPhraseShort[hidp].replaceAll(' Shower', ' SHWR',).replaceAll('Near', 'NR',).replaceAll('Light', 'LGT',).replaceAll('Heavy', 'HVY').replaceAll('Early', 'ERLY').replaceAll('Partial', 'PART').replaceAll('Cldy', 'CLOUDY').replaceAll(' T-Storm', ' T-STM')
          weatherData.travel.cities[i].days[0].dayNight = ajaxedLoc["v3-wx-forecast-daily-5day"].daypart[0].dayOrNight[hidp]
        }
      })
    }).fail(function() {
      for (var i = 0; i < weatherData.travel.cities.length; i++) {
        weatherData.travel.cities[i].days[0].high = ""
        weatherData.travel.cities[i].days[0].low = ""
        weatherData.travel.cities[i].days[0].condition = ""
        weatherData.travel.cities[i].days[0].dayNight = ""
      }
    })
  }
  grabTravel()
  function grabDayDesc() {
    var url = "https://api.weather.com/v3/wx/forecast/daily/5day?geocode=" + locationConfig.mainCity.lat + "," + locationConfig.mainCity.lon + "&format=json&units=e&language=en-US&apiKey=" + api_key
    $.getJSON(url, function(data) {
      var ii = 0
      try {
        if (data.daypart[0].daypartName[0] == null) {
          ii = 1
        }
        weatherData.dayDesc.cityname = locationConfig.mainCity.displayname
        weatherData.dayDesc.noReport = false
        for (var i = 0; i < weatherData.dayDesc.times.length; i++, ii++) {
          weatherData.dayDesc.times[i].timetitle = data.daypart[0].daypartName[ii]
          weatherData.dayDesc.times[i].forecast = data.daypart[0].narrative[ii]
        }
      } catch (error) {
        weatherData.dayDesc.cityname = locationConfig.mainCity.displayname
        weatherData.dayDesc.noReport = true
        for (var i = 0; i < weatherData.dayDesc.times.length; i++, ii++) {
          weatherData.dayDesc.times[i].timetitle = ""
          weatherData.dayDesc.times[i].forecast = ""
        }
      }
    }).fail(function() {
      weatherData.dayDesc.cityname = locationConfig.mainCity.displayname
      weatherData.dayDesc.noReport = true
      for (var i = 0; i < weatherData.dayDesc.times.length; i++) {
        weatherData.dayDesc.times[i].timetitle = ""
        weatherData.dayDesc.times[i].forecast = ""
      }
    })
  }
  grabDayDesc()
  function grabExtended() {
    var url = "https://api.weather.com/v3/wx/forecast/daily/5day?geocode=" + locationConfig.mainCity.lat + "," + locationConfig.mainCity.lon + "&format=json&units=e&language=en-US&apiKey=" + api_key
    $.getJSON(url, function(data) {
      var daysDivs = ['one', "two", "three", "four", "five"]
      try {
        weatherData.extendedForecast.cityname = locationConfig.mainCity.displayname
        weatherData.extendedForecast.noReport = false
        var ii = 0
        var dpi = 0
        if (data.daypart[0].daypartName[0] == null) {
          ii = 1
          dpi = 2
        }
        for (var i = 0; i < weatherData.extendedForecast.days.length; i++, ii++, dpi = dpi + 2) {
          weatherData.extendedForecast.days[i].cond = data.daypart[0].wxPhraseLong[dpi].replace('Scattered ', "Sct'd ").replace('Thunderstorms',"T'Storms").replace('Thundershowers',"T'Showers")
          weatherData.extendedForecast.days[i].dayname = data.dayOfWeek[ii].toUpperCase()
          weatherData.extendedForecast.days[i].high = data.temperatureMax[ii]
          weatherData.extendedForecast.days[i].icon = data.daypart[0].iconCode[dpi]
          weatherData.extendedForecast.days[i].low = data.temperatureMin[ii]
          weatherData.extendedForecast.days[i].windspeed = data.daypart[0].windSpeed[dpi]
        }
      } catch (error) {
        weatherData.extendedForecast.cityname = locationConfig.mainCity.displayname
        weatherData.extendedForecast.noReport = true
        var ii = 0
        var dpi = 0
        if (data.daypart[0].daypartName[0] == null) {
          ii = 1
          dpi = 2
        }
        for (var i = 0; i < weatherData.extendedForecast.days.length; i++, ii++, dpi = dpi + 2) {
          weatherData.extendedForecast.days[i].cond = ""
          weatherData.extendedForecast.days[i].dayname = ""
          weatherData.extendedForecast.days[i].high = ""
          weatherData.extendedForecast.days[i].icon = 44
          weatherData.extendedForecast.days[i].low = ""
          weatherData.extendedForecast.days[i].windspeed = ""
        }
      }
    }).fail(function() {
      weatherData.extendedForecast.cityname = locationConfig.mainCity.displayname
      weatherData.extendedForecast.noReport = true
      for (var i = 0; i < weatherData.extendedForecast.days.length; i++) {
        weatherData.extendedForecast.days[i].cond = ""
        weatherData.extendedForecast.days[i].dayname = ""
        weatherData.extendedForecast.days[i].high = ""
        weatherData.extendedForecast.days[i].icon = ""
        weatherData.extendedForecast.days[i].low = ""
        weatherData.extendedForecast.days[i].windspeed = ""
      }
    })
  }
  grabExtended()
  function grabAlmanac() {
    var url = "https://api.weather.com/v3/wx/forecast/daily/5day?geocode=" + locationConfig.mainCity.lat + "," + locationConfig.mainCity.lon + "&format=json&units=e&language=en-US&apiKey=" + api_key
    $.getJSON(url, function(data) {
      var ii = 0
      if (data.daypart[0].daypartName[0] == null) {
        ii = 1
      }
      weatherData.almanac.noReport = false
      weatherData.almanac.sunrisetoday = new Date(data.sunriseTimeLocal[ii])
      weatherData.almanac.sunrisetoday = weatherData.almanac.sunrisetoday.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true, minute: 'numeric'}).replace(/ /g,' ').toLowerCase()
      weatherData.almanac.sunrisetomorow = new Date(data.sunriseTimeLocal[ii+1])
      weatherData.almanac.sunrisetomorow = weatherData.almanac.sunrisetomorow.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true, minute: 'numeric'}).replace(/ /g,' ').toLowerCase()
      weatherData.almanac.sunsettoday = new Date(data.sunsetTimeLocal[ii])
      weatherData.almanac.sunsettoday = weatherData.almanac.sunsettoday.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true, minute: 'numeric'}).replace(/ /g,' ').toLowerCase()
      weatherData.almanac.sunsettomorrow = new Date(data.sunsetTimeLocal[ii+1])
      weatherData.almanac.sunsettomorrow = weatherData.almanac.sunsettomorrow.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true, minute: 'numeric'}).replace(/ /g,' ').toLowerCase()
      weatherData.almanac.today = data.dayOfWeek[ii].toUpperCase()
      weatherData.almanac.tomorrow = data.dayOfWeek[ii+1].toUpperCase()
    }).fail(function() {
      weatherData.almanac.noReport = true
      weatherData.almanac.sunrisetoday = ""
      weatherData.almanac.sunrisetomorow = ""
      weatherData.almanac.sunsettoday = ""
      weatherData.almanac.sunsettomorrow = ""
      weatherData.almanac.today = ""
      weatherData.almanac.tomorrow = ""
    })
    $.getJSON("https://api.weather.com/v3/wx/almanac/daily/5day?geocode=" + locationConfig.mainCity.lat + "," + locationConfig.mainCity.lon + "&format=json&units=e&startDay=" + dateFns.format(new Date(), "D") + "&startMonth=" + dateFns.format(new Date(),"M") + "&apiKey=" + api_key, function(data) {
      weatherData.almanac.avglowtoday = data.temperatureAverageMin[0]
      weatherData.almanac.avghightoday = data.temperatureAverageMax[0]
      weatherData.almanac.avglowtomorrow = data.temperatureAverageMin[1]
      weatherData.almanac.avghightomorow = data.temperatureAverageMax[1]
      weatherData.almanac.normalprecip = data.precipitationAverage[0]
    }).fail(function() {
      weatherData.almanac.avglowtoday = ""
      weatherData.almanac.avghightoday = ""
      weatherData.almanac.avglowtomorrow = ""
      weatherData.almanac.avghightomorow = ""
      weatherData.almanac.normalprecip = "NO REPORT"
    })
  }
  grabAlmanac()
  function grabMoons() {
    var ii = 0
    try {
      $.getJSON(`https://www.icalendar37.net/lunar/api/?lang=en&month=${dateFns.format(new Date(),"M")}&year=${dateFns.format(new Date(),"YYYY")}`, function(data) {
        for (phase in data.phase) {
          if (data.phase[phase].isPhaseLimit != false) {
            weatherData.almanac.moonphases[ii].moon = {"New Moon": "New", "First quarter": "First", "Full moon": "Full", "Last quarter": "Last"}[data.phase[phase].phaseName]
            weatherData.almanac.moonphases[ii].date = String(data.monthName).slice(0,3) + " " + phase
            weatherData.almanac.moonphases[ii].date =  ((phase.toString().length == 1) ? weatherData.almanac.moonphases[ii].date.replace(' 1', ' 01').replace(' 2', ' 02').replace(' 3', ' 03').replace(' 4', ' 04').replace(' 5', ' 05').replace(' 6', ' 06').replace(' 7', ' 07').replace(' 8', ' 08').replace(' 9', ' 09') : weatherData.almanac.moonphases[ii].date)
            ii += 1;
          }
        }
      }).fail(function() {
        for (var i = 0; i < 4; i++) {
          weatherData.almanac.moonphases[i].date = ""
          weatherData.almanac.moonphases[i].moon = "blank"
        }
      })
      setTimeout(() => {
        $.getJSON(`https://www.icalendar37.net/lunar/api/?lang=en&month=${dateFns.format((dateFns.addMonths(new Date(),1)),"M")}&year=${dateFns.format(dateFns.addMonths(new Date(),1),"YYYY")}`, function(data) {
          for (phase in data.phase) {
            if (data.phase[phase].isPhaseLimit != false) {
              weatherData.almanac.moonphases[ii].moon = {"New Moon": "New", "First quarter": "First", "Full moon": "Full", "Last quarter": "Last"}[data.phase[phase].phaseName]
              weatherData.almanac.moonphases[ii].date = String(data.monthName).slice(0,3) + " " + phase
              weatherData.almanac.moonphases[ii].date =  ((phase.toString().length == 1) ? weatherData.almanac.moonphases[ii].date.replace(' 1', ' 01').replace(' 2', ' 02').replace(' 3', ' 03').replace(' 4', ' 04').replace(' 5', ' 05').replace(' 6', ' 06').replace(' 7', ' 07').replace(' 8', ' 08').replace(' 9', ' 09') : weatherData.almanac.moonphases[ii].date)
              ii += 1;
            }
          }
        }).fail(function() {
          for (var i = 0; i < 4; i++) {
            if (weatherData.almanac.moonphases[i].date != "")
            weatherData.almanac.moonphases[i].date = ""
            weatherData.almanac.moonphases[i].moon = "blank"
          }
        })
      }, 500);
    } catch (error) {
      for (var i = 0; i < 8; i++) {
        weatherData.almanac.moonphases[i].date = ""
        weatherData.almanac.moonphases[i].moon = "blank"
      }
    }
  }
  grabMoons()
  function getWarnings() {
    var url = "https://api.weather.com/v3/alerts/headlines?geocode=" + locationConfig.mainCity.lat + "," + locationConfig.mainCity.lon + "&format=json&language=en-US&apiKey=" + api_key
    $.getJSON(url, function(data) {
      try {
        if (data != undefined) {
          var warnings = []
          weatherData.alerts.alertsAmount = data.alerts.length
          for (var i = 0; i < data.alerts.length; i++) {
            warnings.push({alertNum: i+1, key: data.alerts[i].detailKey, warningtitle:"", warningdesc:"", severity:"", alertType:"", significance:"",headlinetext: data.alerts[i].headlineText})
            eachAlert(i)
          }
          function eachAlert(i) {
            $.getJSON("https://api.weather.com/v3/alerts/detail?alertId=" + warnings[i].key + "&format=json&language=en-US&apiKey=" + api_key, function(data) {
              warnings[i].warningtitle = data.alertDetail.eventDescription
              warnings[i].warningdesc = data.alertDetail.texts[0].description
              warnings[i].severity = data.alertDetail.severityCode
              warnings[i].significance = data.alertDetail.significance
              warnings[i].alertType = data.alertDetail.messageType.replace("Cancel","Cancellation").replace("New","")
            })
            weatherData.alerts.warnings.push(warnings[i])
          }
        } else {
          weatherData.alerts = {}
          weatherData.alerts.alertsAmount = 0
        }
      } catch (error) {
        weatherData.alerts = {}
        weatherData.alerts.alertsAmount = 0
      }
    }).fail(function() {
      weatherData.alerts = {}
      weatherData.alerts.alertsAmount = 0
    })
  }
  getWarnings()
  var NWSurl1 = "https://api.weather.gov/points/" + locationConfig.mainCity.lat + "," + locationConfig.mainCity.lon;
  $.getJSON(NWSurl1, function(data) {
    weatherData.NWS.zone = data.properties.forecastZone.substr(-6)
  })
}

setTimeout(function() {
  grabData();
  $('#startup-screen').fadeOut(0)
  setTimeout(() => {
    slideKickOff();
    crawlKickOff()
    //startMusic();
    $('#main').fadeIn(0);
    //$('#startup').fadeOut(0);
    //crawlCheck();
  }, 250);
}, apperanceSettings.startupTime)//28000 or 4000 befor