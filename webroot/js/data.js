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
    noReport:false, cityname:"", humidity:"", pressure:"",pressureTrend:"",wind:"", windspeed:"", windDirNum:"", gusts:"", cond:"", temp:"",feelslike:"",feelsliketype:"",dewpoint:"",visibility:"",ceiling:"",monthPrecip:""
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
    zone:""  }, travel:{noReport:false,cities:[
    {displayname:"ATLANTA",lat:"33.7488",lon:"-84.3877",days:[{dayName:"",condition:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""}]},
    {displayname:"SAVANNAH",lat:"32.0835",lon:"-81.0998",days:[{dayName:"",condition:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""}]},
    {displayname:"JACKSONVILLE",lat:"30.3322",lon:"-81.6557",days:[{dayName:"",condition:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""}]},
    {displayname:"TALLAHASSEE",lat:"30.4518",lon:"-84.2807",days:[{dayName:"",condition:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""}]},
    {displayname:"GAINESVILLE",lat:"29.6516",lon:"-82.3248",days:[{dayName:"",condition:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""}]},
    {displayname:"MACON",lat:"32.8407",lon:"-83.6324",days:[{dayName:"",condition:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""}]},
    {displayname:"VALDOSTA",lat:"30.8327",lon:"-83.2785",days:[{dayName:"",condition:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""}]},
    {displayname:"COLUMBUS",lat:"32.4609",lon:"-84.9877",days:[{dayName:"",condition:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""}]},
    {displayname:"WAYCROSS",lat:"31.2135",lon:"-82.3540",days:[{dayName:"",condition:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""}]},
    {displayname:"BRUNSWICK",lat:"31.1499",lon:"-81.4915",days:[{dayName:"",condition:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""}]},
    {displayname:"ST. AUGUSTINE",lat:"29.9012",lon:"-81.3124",days:[{dayName:"",condition:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""}]},
    {displayname:"DAYTONA BEACH",lat:"29.2108",lon:"-81.0228",days:[{dayName:"",condition:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""}]},
    {displayname:"ORLANDO",lat:"28.5383",lon:"-81.3792",days:[{dayName:"",condition:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""}]},
    {displayname:"TAMPA",lat:"27.9517",lon:"-82.4588",days:[{dayName:"",condition:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""}]},
    {displayname:"PENSACOLA",lat:"30.4213",lon:"-87.2169",days:[{dayName:"",condition:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""}]},
    {displayname:"PANAMA CITY",lat:"30.1588",lon:"-85.6602",days:[{dayName:"",condition:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""}]},
    {displayname:"CHARLESTON",lat:"32.7765",lon:"-79.9311",days:[{dayName:"",condition:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""}]},
    {displayname:"HILTON HEAD",lat:"32.2163",lon:"-80.7526",days:[{dayName:"",condition:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""}]},
    {displayname:"MYRTLE BEACH",lat:"33.6891",lon:"-78.8867",days:[{dayName:"",condition:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""}]},
    {displayname:"CHARLOTTE",lat:"35.2271",lon:"-80.8431",days:[{dayName:"",condition:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""}]},
    {displayname:"RALEIGH",lat:"35.7796",lon:"-78.6382",days:[{dayName:"",condition:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""}]},
    {displayname:"ASHEVILLE",lat:"35.5951",lon:"-82.5515",days:[{dayName:"",condition:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""}]},
    {displayname:"AUGUSTA",lat:"33.4735",lon:"-82.0105",days:[{dayName:"",condition:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""}]},
    {displayname:"ATHENS",lat:"33.9519",lon:"-83.3576",days:[{dayName:"",condition:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""}]},
  ]},
}

function grabData() {  function grabCurrentConditions() {
    // Use enhanced NWS API for current conditions
    nwsClient.getEnhancedCurrentConditions(locationConfig.mainCity.lat, locationConfig.mainCity.lon)
      .then(function(data) {        try {
          console.log('Enhanced current conditions data received:', data);
          weatherData.currentConditions.cityname = locationConfig.mainCity.displayname;
          weatherData.currentConditions.cond = data.wxPhraseLong ? weatherTextFormatter.formatCondition(data.wxPhraseLong) : "";
          weatherData.currentConditions.gusts = (data.windGust ? data.windGust + " MPH" : "NONE");
          
          // Use computed humidity if available, with fallback formatting
          if (data.relativeHumidity !== null && data.relativeHumidity !== undefined) {
            weatherData.currentConditions.humidity = ThermoHelper.formatHumidity(data.relativeHumidity);
          } else {
            weatherData.currentConditions.humidity = "";
          }
          
          // Use enhanced pressure formatting with trends
          if (data.pressureFormatted) {
            weatherData.currentConditions.pressure = data.pressureFormatted;
          } else if (data.pressure !== null && data.pressure !== undefined) {
            weatherData.currentConditions.pressure = data.pressure + " IN";
          } else {
            weatherData.currentConditions.pressure = "";
          }
          
          weatherData.currentConditions.pressureTrend = data.pressureTrend || data.pressureTendency || "";
          weatherData.currentConditions.temp = (data.temperature !== null && data.temperature !== undefined) ? ThermoHelper.formatTemperature(data.temperature) : "";
          weatherData.currentConditions.wind = data.windDirectionCardinal || "CALM";
          weatherData.currentConditions.windDirNum = data.windDirection || "";
          weatherData.currentConditions.windspeed = (data.windSpeed !== null && data.windSpeed !== undefined) ? data.windSpeed + " MPH" : "";
          
          // Use computed apparent temperature
          if (data.temperatureFeelsLike !== null && data.temperatureFeelsLike !== undefined) {
            weatherData.currentConditions.feelslike = ThermoHelper.formatTemperature(data.temperatureFeelsLike);
            weatherData.currentConditions.feelsliketype = data.feelsLikeType ? data.feelsLikeType + ": " : "";
          } else {
            weatherData.currentConditions.feelslike = "";
            weatherData.currentConditions.feelsliketype = "";
          }
          
          // Use computed dewpoint
          if (data.dewpoint !== null && data.dewpoint !== undefined) {
            weatherData.currentConditions.dewpoint = ThermoHelper.formatTemperature(data.dewpoint);
          } else {
            weatherData.currentConditions.dewpoint = "";
          }
          
          weatherData.currentConditions.visibility = (data.visibility !== null && data.visibility !== undefined) ? FormatHelper.formatVisibility(data.visibility) : "";
          
          // Use enhanced ceiling formatting
          if (data.ceilingFormatted) {
            weatherData.currentConditions.ceiling = data.ceilingFormatted;
          } else if (data.cloudCeiling !== null && data.cloudCeiling !== undefined) {
            weatherData.currentConditions.ceiling = FormatHelper.formatCeiling(data.cloudCeiling);
          } else {
            weatherData.currentConditions.ceiling = "";
          }
          
          // Use MTD precipitation if available
          weatherData.currentConditions.monthPrecip = data.monthPrecip || "";
          
          weatherData.currentConditions.noReport = false;
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
          weatherData.currentConditions.windDirNum = ""
          weatherData.currentConditions.noReport = true
        }
      }).catch(function(error) {
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
        weatherData.currentConditions.windDirNum = ""
        weatherData.currentConditions.noReport = true
      })
  }
  grabCurrentConditions();  function grabNearbyConditions() {
    weatherData.nearbyCities.conditions.cities = []
    
    // Process each nearby city
    const promises = [];    for (var i = 0; i < locationConfig.surroundCities.citiesAmount; i++) {
      const cityData = locationConfig.surroundCities.cities[i];
      const promise = nwsClient.getCurrentConditions(cityData.lat, cityData.lon)
        .then(function(data) {
          const nearbyCitiesObj = {
            noReport: false,
            cityname: cityData.displayname,
            statename: cityData.state,
            temp: data.temperature || "",
            condition: data.wxPhraseShort ? weatherTextFormatter.formatCondition(data.wxPhraseShort) : "",
            wind: data.windDirectionCardinal || "CALM",
            windspeed: data.windSpeed || "",
            windDirNum: data.windDirection || ""
          };
          return nearbyCitiesObj;
        })
        .catch(function(error) {
          return {
            noReport: true,
            cityname: cityData.displayname,
            statename: cityData.state,
            condition: "",
            temp: "",
            wind: "",
            windspeed: "",
            windDirNum: ""
          };
        });
      promises.push(promise);
    }
    
    Promise.all(promises).then(function(results) {
      weatherData.nearbyCities.conditions.cities = results;
    }).catch(function(error) {
      // Fallback to empty data
      for (var i = 0; i < locationConfig.surroundCities.citiesAmount; i++) {
        var nearbyCitiesObj = {
          noReport: true,
          cityname: locationConfig.surroundCities.cities[i].displayname,
          statename: locationConfig.surroundCities.cities[i].state,
          condition: "",
          temp: "",
          wind: "",
          windspeed: "",
          windDirNum: ""
        };
        weatherData.nearbyCities.conditions.cities.push(nearbyCitiesObj);
      }
    });
  }
  grabNearbyConditions();  function grabNearbyForecast() {
    weatherData.nearbyCities.forecast.cities = []
    
    // Process each nearby city forecast
    const promises = [];
    for (var i = 0; i < locationConfig.surroundCities.citiesAmount; i++) {
      const cityData = locationConfig.surroundCities.cities[i];
      const promise = nwsClient.getForecast(cityData.lat, cityData.lon)
        .then(function(forecastData) {
          const periods = forecastData.daily;
          if (periods && periods.length > 0) {
            // Find today's forecast (first period that's daytime or has temperature info)
            let todayPeriod = periods[0];
            if (!todayPeriod.isDaytime && periods.length > 1) {
              todayPeriod = periods[1]; // Use tomorrow if today is nighttime
            }
              const nearbyCitiesObjF = {
              noReport: false,
              cityname: cityData.displayname,
              low: todayPeriod.temperature || "",
              high: todayPeriod.temperature || "",
              condition: todayPeriod.shortForecast ? weatherTextFormatter.formatCondition(todayPeriod.shortForecast) : ""
            };
            
            // Try to get both high and low from daily periods
            if (periods.length >= 2) {
              const dayPeriod = periods.find(p => p.isDaytime);
              const nightPeriod = periods.find(p => !p.isDaytime);
              if (dayPeriod) nearbyCitiesObjF.high = dayPeriod.temperature;
              if (nightPeriod) nearbyCitiesObjF.low = nightPeriod.temperature;
            }
            
            return nearbyCitiesObjF;
          } else {
            return {
              noReport: true,
              cityname: cityData.displayname,
              low: "",
              high: "",
              condition: ""
            };
          }
        })
        .catch(function(error) {
          return {
            noReport: true,
            cityname: cityData.displayname,
            low: "",
            high: "",
            condition: ""
          };
        });
      promises.push(promise);
    }
    
    Promise.all(promises).then(function(results) {
      weatherData.nearbyCities.forecast.cities = results;
    }).catch(function(error) {
      // Fallback to empty data
      for (var i = 0; i < locationConfig.surroundCities.citiesAmount; i++) {
        var nearbyCitiesObjF = {
          noReport: true,
          cityname: locationConfig.surroundCities.cities[i].displayname,
          low: "",
          high: "",
          condition: ""
        };
        weatherData.nearbyCities.forecast.cities.push(nearbyCitiesObjF);
      }    });  }
  grabNearbyForecast();
  function grabRegionalConditions() {
    weatherData.regionalConditions.cities = []
    
    // Process each regional city
    const promises = [];    for (var i = 0; i < locationConfig.regionalCities.citiesAmount; i++) {
      const cityData = locationConfig.regionalCities.cities[i];
      const promise = nwsClient.getCurrentConditions(cityData.lat, cityData.lon)
        .then(function(data) {
          const nearbyCitiesObj = {
            noReport: false,
            cityname: FormatHelper.removeUSFromCityName(cityData.displayname),
            statename: cityData.state,
            temp: data.temperature || "",
            condition: data.wxPhraseShort ? FormatHelper.shortenCondition(weatherTextFormatter.formatCondition(data.wxPhraseShort)) : "",
            wind: data.windDirectionCardinal || "CALM",
            windspeed: data.windSpeed || "",
            windDirNum: data.windDirection || ""
          };
          return nearbyCitiesObj;
        })
        .catch(function(error) {
          return {
            noReport: true,
            cityname: cityData.displayname,
            statename: cityData.state,
            condition: "",
            temp: "",
            wind: "",
            windspeed: "",
            windDirNum: ""
          };
        });
      promises.push(promise);
    }
    
    Promise.all(promises).then(function(results) {
      weatherData.regionalConditions.cities = results;
    }).catch(function(error) {
      // Fallback to empty data
      for (var i = 0; i < locationConfig.regionalCities.citiesAmount; i++) {
        var nearbyCitiesObj = {
          noReport: true,
          cityname: locationConfig.regionalCities.cities[i].displayname,
          statename: locationConfig.regionalCities.cities[i].state,
          condition: "",
          temp: "",
          wind: "",
          windspeed: "",
          windDirNum: ""
        };
        weatherData.regionalConditions.cities.push(nearbyCitiesObj);
      }
    });
  }
  grabRegionalConditions();  function grabTravel() {
    // Process travel cities forecast using NWS
    const promises = [];
    
    weatherData.travel.cities.forEach((city, i) => {
      const promise = nwsClient.getForecast(city.lat, city.lon)
        .then(function(forecastData) {
          const periods = forecastData.daily;
          if (periods && periods.length > 0) {
            const todayPeriod = periods[0];
              weatherData.travel.cities[i].days[0].high = todayPeriod.temperature || ""
            weatherData.travel.cities[i].days[0].low = ""
            weatherData.travel.cities[i].days[0].condition = todayPeriod.shortForecast ? weatherTextFormatter.formatCondition(todayPeriod.shortForecast) : ""
            weatherData.travel.cities[i].days[0].dayNight = todayPeriod.isDaytime ? "D" : "N"
            
            // Try to get low from night period
            if (periods.length > 1) {
              const nightPeriod = periods.find(p => !p.isDaytime);
              if (nightPeriod) {
                weatherData.travel.cities[i].days[0].low = nightPeriod.temperature || ""
              }
            }
          }
        })
        .catch(function(error) {
          weatherData.travel.cities[i].days[0].high = ""
          weatherData.travel.cities[i].days[0].low = ""
          weatherData.travel.cities[i].days[0].condition = ""
          weatherData.travel.cities[i].days[0].dayNight = ""
        });
      promises.push(promise);
    });
    
    Promise.all(promises).catch(function(error) {
      for (var i = 0; i < weatherData.travel.cities.length; i++) {
        weatherData.travel.cities[i].days[0].high = ""
        weatherData.travel.cities[i].days[0].low = ""
        weatherData.travel.cities[i].days[0].condition = ""
        weatherData.travel.cities[i].days[0].dayNight = ""
      }
    });  }
  grabTravel()
  function grabDayDesc() {
    nwsClient.getForecast(locationConfig.mainCity.lat, locationConfig.mainCity.lon)
      .then(function(forecastData) {
        const periods = forecastData.daily;
        try {
          weatherData.dayDesc.cityname = locationConfig.mainCity.displayname
          weatherData.dayDesc.noReport = false
          
          // Fill in up to 3 day periods with detailed forecasts
          for (var i = 0; i < Math.min(weatherData.dayDesc.times.length, periods.length); i++) {
            const period = periods[i];
            weatherData.dayDesc.times[i].timetitle = period.name || ""
            weatherData.dayDesc.times[i].forecast = period.detailedForecast || ""
          }
        } catch (error) {
          weatherData.dayDesc.cityname = locationConfig.mainCity.displayname
          weatherData.dayDesc.noReport = true
          for (var i = 0; i < weatherData.dayDesc.times.length; i++) {
            weatherData.dayDesc.times[i].timetitle = ""
            weatherData.dayDesc.times[i].forecast = ""
          }
        }
      })
      .catch(function(error) {
        weatherData.dayDesc.cityname = locationConfig.mainCity.displayname
        weatherData.dayDesc.noReport = true
        for (var i = 0; i < weatherData.dayDesc.times.length; i++) {
          weatherData.dayDesc.times[i].timetitle = ""
          weatherData.dayDesc.times[i].forecast = ""
        }
      })
  }grabDayDesc()
  function grabExtended() {
    nwsClient.getForecast(locationConfig.mainCity.lat, locationConfig.mainCity.lon)
      .then(function(forecastData) {
        const periods = forecastData.daily;
        try {
          weatherData.extendedForecast.cityname = locationConfig.mainCity.displayname
          weatherData.extendedForecast.noReport = false
          
          // Process up to 5 days of forecast
          for (var i = 0; i < Math.min(weatherData.extendedForecast.days.length, periods.length); i++) {
            const period = periods[i];
            weatherData.extendedForecast.days[i].cond = period.detailedForecast ? weatherTextFormatter.formatCondition(period.detailedForecast) : ""
            weatherData.extendedForecast.days[i].dayname = period.name ? period.name.toUpperCase() : ""
            weatherData.extendedForecast.days[i].high = period.temperature || ""
            weatherData.extendedForecast.days[i].icon = period.icon || 44
            weatherData.extendedForecast.days[i].low = ""
            weatherData.extendedForecast.days[i].windspeed = period.windSpeed ? period.windSpeed.replace(/[^\d]/g, '') : ""
            
            // Try to get low temperature from next period if this is a day period
            if (period.isDaytime && i + 1 < periods.length) {
              weatherData.extendedForecast.days[i].low = periods[i + 1].temperature || ""
            }
          }
        } catch (error) {
          weatherData.extendedForecast.cityname = locationConfig.mainCity.displayname
          weatherData.extendedForecast.noReport = true
          for (var i = 0; i < weatherData.extendedForecast.days.length; i++) {
            weatherData.extendedForecast.days[i].cond = ""
            weatherData.extendedForecast.days[i].dayname = ""
            weatherData.extendedForecast.days[i].high = ""
            weatherData.extendedForecast.days[i].icon = 44
            weatherData.extendedForecast.days[i].low = ""
            weatherData.extendedForecast.days[i].windspeed = ""
          }
        }
      })
      .catch(function(error) {
        weatherData.extendedForecast.cityname = locationConfig.mainCity.displayname
        weatherData.extendedForecast.noReport = true
        for (var i = 0; i < weatherData.extendedForecast.days.length; i++) {
          weatherData.extendedForecast.days[i].cond = ""
          weatherData.extendedForecast.days[i].dayname = ""
          weatherData.extendedForecast.days[i].high = ""
          weatherData.extendedForecast.days[i].icon = 44
          weatherData.extendedForecast.days[i].low = ""
          weatherData.extendedForecast.days[i].windspeed = ""
        }      })  }
  grabExtended();
  function grabAlmanac() {
    // Use almanac helper for astronomical data
    if (typeof almanacHelper !== 'undefined') {
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      // Get today's almanac data
      almanacHelper.getAlmanac(locationConfig.mainCity.lat, locationConfig.mainCity.lon, today)
        .then(function(todayData) {
          if (todayData) {
            weatherData.almanac.sunrisetoday = todayData.sunrise || "";
            weatherData.almanac.sunsettoday = todayData.sunset || "";
            weatherData.almanac.noReport = false;
          }
          
          // Get tomorrow's almanac data
          return almanacHelper.getAlmanac(locationConfig.mainCity.lat, locationConfig.mainCity.lon, tomorrow);
        })
        .then(function(tomorrowData) {
          if (tomorrowData) {
            weatherData.almanac.sunrisetomorow = tomorrowData.sunrise || "";
            weatherData.almanac.sunsettomorrow = tomorrowData.sunset || "";
          }
          
          // Set date labels
          const todayStr = dateFns.format(today, "MMM D");
          const tomorrowStr = dateFns.format(tomorrow, "MMM D");
          weatherData.almanac.today = todayStr;
          weatherData.almanac.tomorrow = tomorrowStr;
          
          console.log('Almanac data updated:', weatherData.almanac);
        })
        .catch(function(error) {
          console.warn('Could not get almanac data:', error);
          weatherData.almanac.noReport = true;
          weatherData.almanac.sunrisetoday = "";
          weatherData.almanac.sunrisetomorow = "";
          weatherData.almanac.sunsettoday = "";
          weatherData.almanac.sunsettomorrow = "";
        });
    } else {
      // Fallback when almanac helper is not available
      weatherData.almanac.noReport = true;
      weatherData.almanac.sunrisetoday = "";
      weatherData.almanac.sunrisetomorow = "";
      weatherData.almanac.sunsettoday = "";
      weatherData.almanac.sunsettomorrow = "";
    }
    
    // Set other almanac fields to default/unavailable values
    weatherData.almanac.today = weatherData.almanac.today || dateFns.format(new Date(), "MMM D");
    weatherData.almanac.tomorrow = weatherData.almanac.tomorrow || dateFns.format(dateFns.addDays(new Date(), 1), "MMM D");
    weatherData.almanac.avglowtoday = "";
    weatherData.almanac.avghightoday = "";
    weatherData.almanac.avglowtomorrow = "";
    weatherData.almanac.avghightomorow = "";
    weatherData.almanac.normalprecip = "NO REPORT";
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
    }  }
  grabMoons()
  function getWarnings() {
    nwsClient.getAlerts(locationConfig.mainCity.lat, locationConfig.mainCity.lon)
      .then(function(alertsData) {
        try {
          if (alertsData && alertsData.alerts && alertsData.alerts.length > 0) {
            weatherData.alerts.alertsAmount = alertsData.alertsAmount;
            weatherData.alerts.warnings = alertsData.alerts;
          } else {
            weatherData.alerts = {}
            weatherData.alerts.alertsAmount = 0
          }
        } catch (error) {
          weatherData.alerts = {}
          weatherData.alerts.alertsAmount = 0
        }
      })
      .catch(function(error) {
        weatherData.alerts = {}
        weatherData.alerts.alertsAmount = 0
      })
  }  getWarnings()
  
  // Get NWS zone information
  nwsClient.makeRequest(`/points/${locationConfig.mainCity.lat},${locationConfig.mainCity.lon}`)
    .then(function(data) {
      weatherData.NWS.zone = data.properties.forecastZone.substr(-6)
    })
    .catch(function(error) {
      weatherData.NWS.zone = ""
    })
  
  function getMonthPrecip() {
    // Note: NWS doesn't provide month-to-date precipitation in the same way as TWC
    // This would need to be calculated from daily observations or omitted
    weatherData.currentConditions.monthPrecip = ""
  }
  getMonthPrecip()
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
  }, 1000);
}, apperanceSettings.startupTime-1000)//28000 or 4000 befor
