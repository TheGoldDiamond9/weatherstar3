//time manager
    setInterval(
      function () {
        var today = new Date();
        const weekday = ["SUN","MON","TUE","WED","THU","FRI","SAT"];

        const d = new Date();
        let day = weekday[d.getDay()];
        let tomorrowday = weekday[d.getDay() + 1];
        //var ld = new Date(dateString);
        //var dayName = ld.toString().split(' ')[0];
    
        $('#date').text( day + ' ' + today.toString().slice(4,10).replace('01', ' 1').replace('02', ' 2').replace('03', ' 3').replace('04', ' 4').replace('05', ' 5').replace('06', ' 6').replace('07', ' 7').replace('08', ' 8').replace('09', ' 9').trimRight() );
        $('#time').text( today.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true, minute: 'numeric', second: 'numeric' }));
      }
    , 1000);
    //location pull
    var maincitycoords = {name:"",lat:"",lon:""}, marinelocation,
    locList = [], regionalList = [], citySlideList = [], state, ccTickerCitiesList = [];
    
    
      //If there is a location inputted, use that.
    //$.getJSON("http://"+document.location.hostname+":8081/https://services.surfline.com/forecasts/wave?spotId=500927576a2e4300134fbed8", function() {});
       queryString = window.location.search;
    
    function getMainLoc(configFailed) {
      if (queryString) {
        $.getJSON("https://api.weather.com/v3/location/search?query="+queryString.split("?")[1]+"&language=en-US&format=json&apiKey=" + api_key, function(data) {
          getExtraLocs(data.location.latitude[0],data.location.longitude[0],true);
          getRegionalLocs(data.location.latitude[0],data.location.longitude[0],true);
          maincitycoords.lat = data.location.latitude[0]
          maincitycoords.lon = data.location.longitude[0]
          maincitycoords.name = data.location.displayName[0].replaceAll('Township', 'TWP').replaceAll('Fort', 'FT').replaceAll('Airport', 'ARPT').replaceAll('County', 'CNTY').replaceAll('Airforce Base', 'A.F.B.').substring(0,17);
          $("#locationname").text("location name: "+data.location.displayName[0])
          maincitycoords.displayname = data.location.displayName[0].replaceAll('Township', 'TWP').replaceAll('Fort', 'FT').replaceAll('Airport', 'ARPT').replaceAll('County', 'CNTY').replaceAll('Airforce Base', 'A.F.B.').substring(0,17);
          state = data.location.adminDistrict[0];
          //init data
          //getStatePopularCities(state, true)
          grabalmanacSlidesData()
          grabHealthData()
          grabSideandLowerBarData()
          GetMonthPrecipitation()
        });
      } else if (locationSettings.mainLocation.searchQuery && configFailed != true) {
        if (locationSettings.mainLocation.searchQuery.type == "geocode") {
          $.getJSON("https://api.weather.com/v3/location/point?geocode="+ locationSettings.mainLocation.searchQuery.val + "&language=en-US&format=json&apiKey=" + api_key, function(data) {
            getExtraLocs(data.location.latitude,data.location.longitude,true);
            getRegionalLocs(data.location.latitude,data.location.longitude,true);
            maincitycoords.lat = data.location.latitude
            maincitycoords.lon = data.location.longitude
            maincitycoords.name = data.location.displayName
            maincitycoords.displayname = ((locationSettings.mainLocation.displayName) ? locationSettings.mainLocation.displayName : data.location.displayName)
            $("#locationname").text("location name: "+maincitycoords.displayname)
            state = data.location.adminDistrict[cidx];
            //getStatePopularCities(state, true)
            grabalmanacSlidesData()
            grabHealthData()
            grabSideandLowerBarData()
            GetMonthPrecipitation()
          });
        } else {
          $.getJSON("https://api.weather.com/v3/location/search?query="+locationSettings.mainLocation.searchQuery.val+"&locationType="+locationSettings.mainLocation.searchQuery.type+"&fuzzyMatch="+locationSettings.mainLocation.searchQuery.fuzzy+((locationSettings.mainLocation.searchQuery.country) ? "&countryCode="+locationSettings.mainLocation.searchQuery.country : "")+((locationSettings.mainLocation.searchQuery.state) ? "&adminDistrictCode="+locationSettings.mainLocation.searchQuery.state : "")+"&language=en-US&format=json&apiKey=" + api_key, function(data) {
              cidx = ((locationSettings.mainLocation.searchQuery.searchResultNum && locationSettings.mainLocation.searchQuery.searchResultNum < data.location.placeId.length) ? locationSettings.mainLocation.searchQuery.searchResultNum : 0)
              getExtraLocs(data.location.latitude[cidx],data.location.longitude[cidx],true);
              getRegionalLocs(data.location.latitude[cidx],data.location.longitude[cidx],true);
              maincitycoords.lat = data.location.latitude[cidx]
              maincitycoords.lon = data.location.longitude[cidx]
              maincitycoords.name = data.location.displayName[cidx]
              maincitycoords.displayname = ((locationSettings.mainLocation.displayName) ? locationSettings.mainLocation.displayName : data.location.displayName[cidx])
              $("#locationname").text("location name: "+maincitycoords.displayname)
              state = data.location.adminDistrict[cidx];
    
              //getStatePopularCities(state, true)
              grabalmanacSlidesData()
              grabHealthData()
              grabSideandLowerBarData()
              GetMonthPrecipitation()
          });
        }
      } else {
        // get lat lon from user's ip
        $.getJSON("http://ip-api.com/json/?callback=?", function(data) {
          getExtraLocs(data.lat,data.lon,true);
          getRegionalLocs(data.lat,data.lon,true);
          maincitycoords.name = data.city
          $("#locationname").text("location name: "+data.city)
          maincitycoords.displayname = data.city
          maincitycoords.lat = data.lat
          maincitycoords.lon = data.lon
          state = data.regionName
          //init data
          //getStatePopularCities(state, true)
          grabalmanacSlidesData()
          grabHealthData()
          grabSideandLowerBarData()
          GetMonthPrecipitation()
        });
    
      }
    }
    getMainLoc(false);
    
    function getExtraLocs(lat,lon, onInit, whichReset) {
        $.getJSON('https://api.weather.com/v3/location/near?geocode=' + lat + ',' + lon + '&product=observation&format=json&apiKey=' + api_key, function(data) {
                var feature = data.location, geo, station, dist, ti=0;
          var minRadiusMiles = 0, maxRadiusMiles = 45;
          getLocLoop(0);
                function getLocLoop(i) {
            $.getJSON("https://api.weather.com/v3/location/point?geocode="+ feature.latitude[i] + "," + feature.longitude[i] + "&language=en-US&format=json&apiKey=" + api_key, function(dataii){
                      latgeo = feature.latitude[i];
                      longeo = feature.longitude[i];
                      dist = feature.distanceMi[i];
            displayname = dataii.location.displayName
             if (displayname == maincitycoords.displayname || displayname == state) {
              if ((dataii.location.locale.locale3 != maincitycoords.displayname && dataii.location.locale.locale3) || (dataii.location.locale.locale4 != maincitycoords.displayname && dataii.location.locale.locale4)) {
                displayname = (dataii.location.locale.locale3 != maincitycoords.displayname && dataii.location.locale.locale3) ? dataii.location.locale.locale3 : dataii.location.locale.locale4
              } else {
                if (feature.latitude.length == (i + 1)) {onExtraAjaxFinish()} else {getLocLoop(i + 1)}
                return
              }
            }
            for (var li = 0; li < citySlideList.length; li++) {
              if (displayname == citySlideList[li].displayname) {
                if ((dataii.location.locale.locale3 != citySlideList[li].displayname && dataii.location.locale.locale3) || (dataii.location.locale.locale4 != citySlideList[li].displayname && dataii.location.locale.locale4)) {
                  displayname = (dataii.location.locale.locale3 != citySlideList[li].displayname && dataii.location.locale.locale3) ? dataii.location.locale.locale3 : dataii.location.locale.locale4
                } else {
                  if (feature.latitude.length == (i + 1)) {onExtraAjaxFinish()} else {getLocLoop(i + 1)}
                  return
                }
              }
            }
            if (i!=0) {
              citySlideList.push({lat: latgeo, lon:longeo, distance:dist, stationUrl:feature.stationId[i], name:displayname, displayname:displayname});
            };
            displayname = dataii.location.displayName
            if (displayname == maincitycoords.displayname || displayname == state) {
                if (feature.latitude.length == (i + 1)) {onExtraAjaxFinish()} else {getLocLoop(i + 1)}
                return
            }
            for (var li = 0; li < locList.length; li++) {
              if (displayname == locList[li].displayname) {
                if (feature.latitude.length == (i + 1)) {onExtraAjaxFinish()} else {getLocLoop(i + 1)}
                return
              }
            }
                    if (dist >= minRadiusMiles && dist <= maxRadiusMiles) {
              if (ti < 3) {
                  locList.push({lat: latgeo, lon:longeo, distance:dist, stationUrl:feature.stationId[i], name:displayname, displayname:displayname});
              } else {
                ti = ti - 1
              }
            }
            //for the 8 city slide
            if (i < data.location.stationName.length && (citySlideList.length < 8 || locList.length < locationSettings.extraLocations.maxLocations)) {
              ti = ti + 1
              i = i + 1
              getLocLoop(i)
            } else {
              onExtraAjaxFinish()
            };
          }).fail(function(){
            if (feature.latitude.length >= (i + 1) || i >= 9) {onExtraAjaxFinish()} else {getLocLoop(i + 1)}
          })
                }
    
                // sort list by distance
        function onExtraAjaxFinish() {
                  locList.sort(function(a, b) {
                      return parseInt(a.distance) - parseInt(b.distance);
                  });
            locList.forEach((loc, i) => {
              loc.orderNum = ((locationSettings.extraLocations.locationOrderNum[i]) ? locationSettings.extraLocations.locationOrderNum[i] : locationSettings.extraLocations.maxLocations + i)
            });
            citySlideList.forEach((loc, i) => {
              loc.orderNum = ((locationSettings.aroundCityInfoLocs.locationOrderNum[i])? locationSettings.aroundCityInfoLocs.locationOrderNum[i] : locationSettings.aroundCityInfoLocs.maxLocations + i)
            });
            if (locationSettings.extraLocations.useAutoLocations == false){locList = []}
            if (locationSettings.aroundCityInfoLocs.useAutoLocations == false){citySlideList = []}
            function addConfigLocsLoop(i) {
              eloc = locationSettings.extraLocations.locs[i]
              if (eloc.searchQuery.type) {
                if (eloc.searchQuery.type == "geocode") {
                  $.getJSON("https://api.weather.com/v3/location/point?geocode="+ eloc.searchQuery.val + "&language=en-US&format=json&apiKey=" + api_key, function(data) {
                    locList.push({lat: data.location.latitude, lon:data.location.longitude, orderNum: ((eloc.orderNum) ? eloc.orderNum : i), distance:null, stationUrl:null, name:data.location.displayName, displayname:((eloc.displayName) ? eloc.displayName : data.location.displayName)});
                    if (i < locationSettings.extraLocations.locs.length-1) {addConfigLocsLoop(i + 1)} else {sortFinishedLocList()}
                  }).fail(function(){if (i < locationSettings.extraLocations.locs.length-1) {addConfigLocsLoop(i + 1)} else {sortFinishedLocList()}});
                } else {
                  $.getJSON("https://api.weather.com/v3/location/search?query="+eloc.searchQuery.val+"&locationType="+eloc.searchQuery.type+"&fuzzyMatch="+eloc.searchQuery.fuzzy+((eloc.searchQuery.country) ? "&countryCode="+eloc.searchQuery.country : "")+((eloc.searchQuery.state) ? "&adminDistrictCode="+eloc.searchQuery.state : "")+"&language=en-US&format=json&apiKey=" + api_key, function(data) {
                      cidx = ((eloc.searchQuery.searchResultNum && eloc.searchQuery.searchResultNum < data.location.placeId.length) ? eloc.searchQuery.searchResultNum : 0)
                      locList.push({lat: data.location.latitude[cidx], lon:data.location.longitude[cidx], orderNum: ((eloc.orderNum) ? eloc.orderNum : i), distance:null, stationUrl:null, name:data.location.displayName[cidx], displayname:((eloc.displayName) ? eloc.displayName : data.location.displayName[cidx])});
                      if (i < locationSettings.extraLocations.locs.length-1) {addConfigLocsLoop(i + 1)} else {sortFinishedLocList()}
                  }).fail(function(){if (i < locationSettings.extraLocations.locs.length-1) {addConfigLocsLoop(i + 1)} else {sortFinishedLocList()}});
                }
              } else {if (i < locationSettings.extraLocations.locs.length-1) {addConfigLocsLoop(i + 1)} else {sortFinishedLocList()}}
            }
            addConfigLocsLoop(0)
            function addConfigAroundLocsLoop(i) {
              eloc = locationSettings.aroundCityInfoLocs.locs[i]
              if (eloc.searchQuery.type) {
                if (eloc.searchQuery.type == "geocode") {
                  $.getJSON("https://api.weather.com/v3/location/point?geocode="+ eloc.searchQuery.val + "&language=en-US&format=json&apiKey=" + api_key, function(data) {
                    citySlideList.push({lat: data.location.latitude, lon:data.location.longitude, orderNum: ((eloc.orderNum) ? eloc.orderNum : i), distance:null, stationUrl:null, name:data.location.displayName, displayname:((eloc.displayName) ? eloc.displayName : data.location.displayName)});
                    if (i < locationSettings.aroundCityInfoLocs.locs.length-1) {addConfigAroundLocsLoop(i + 1)} else {sortFinishedAroundLocList()}
                  }).fail(function(){if (i < locationSettings.aroundCityInfoLocs.locs.length-1) {addConfigAroundLocsLoop(i + 1)} else {sortFinishedAroundLocList()}});
                } else {
                  $.getJSON("https://api.weather.com/v3/location/search?query="+eloc.searchQuery.val+"&locationType="+eloc.searchQuery.type+"&fuzzyMatch="+eloc.searchQuery.fuzzy+((eloc.searchQuery.country) ? "&countryCode="+eloc.searchQuery.country : "")+((eloc.searchQuery.state) ? "&adminDistrictCode="+eloc.searchQuery.state : "")+"&language=en-US&format=json&apiKey=" + api_key, function(data) {
                      cidx = ((eloc.searchQuery.searchResultNum && eloc.searchQuery.searchResultNum < data.location.placeId.length) ? eloc.searchQuery.searchResultNum : 0)
                      citySlideList.push({lat: data.location.latitude[cidx], lon:data.location.longitude[cidx], orderNum: ((eloc.orderNum) ? eloc.orderNum : i), distance:null, stationUrl:null, name:data.location.displayName[cidx], displayname:((eloc.displayName) ? eloc.displayName : data.location.displayName[cidx])});
                      if (i < locationSettings.aroundCityInfoLocs.locs.length-1) {addConfigAroundLocsLoop(i + 1)} else {sortFinishedAroundLocList()}
                  }).fail(function(){if (i < locationSettings.aroundCityInfoLocs.locs.length-1) {addConfigAroundLocsLoop(i + 1)} else {sortFinishedAroundLocList()}});
                }
              } else {if (i < locationSettings.aroundCityInfoLocs.locs.length-1) {addConfigAroundLocsLoop(i + 1)} else {sortFinishedAroundLocList()}}
            }
            addConfigAroundLocsLoop(0)
            function sortFinishedLocList() {
              locList.sort(function(a, b) {
                        return parseInt(a.orderNum) - parseInt(b.orderNum);
                    });
              locList.splice(locationSettings.extraLocations.maxLocations)
              grabCitySlidesData()
            }
            function sortFinishedAroundLocList() {
              citySlideList.sort(function(a, b) {
                        return parseInt(a.orderNum) - parseInt(b.orderNum);
                    });
              citySlideList.splice((locationSettings.aroundCityInfoLocs.maxLocations < 8)?locationSettings.aroundCityInfoLocs.maxLocations:8)
              grabCity8SlidesData()
            }
                // set the station for location 0
                //_locations[0].stationUrl = locList[0].stationUrl
          //start datapull
        }
            });
      }

      function getRegionalLocs(lat,lon, onInit, whichReset) {
        $.getJSON('https://api.weather.com/v3/location/near?geocode=' + lat + ',' + lon + '&product=observation&format=json&apiKey=' + api_key, function(data) {
          //console.log('https://api.weather.com/v3/location/near?geocode=' + lat + ',' + lon + '&product=observation&format=json&apiKey=' + api_key);
                var feature = data.location, geo, station, dist, ti=0;
          var rminRadiusMiles = 100, rmaxRadiusMiles = 200;
          rgetLocLoop(0);
                function rgetLocLoop(i) {
            $.getJSON("https://api.weather.com/v3/location/point?geocode="+ feature.latitude[i] + "," + feature.longitude[i] + "&language=en-US&format=json&apiKey=" + api_key, function(dataii){
                      //console.log("https://api.weather.com/v3/location/point?geocode="+ feature.latitude[i] + "," + feature.longitude[i] + "&language=en-US&format=json&apiKey=" + api_key);
            latgeo = feature.latitude[i];
                      longeo = feature.longitude[i];
                      dist = feature.distanceMi[i];
            displayname = dataii.location.displayName
            displaystate = dataii.location.adminDistrictCode
             if (displayname == maincitycoords.displayname || displayname == state) {
              if ((dataii.location.locale.locale3 != maincitycoords.displayname && dataii.location.locale.locale3) || (dataii.location.locale.locale4 != maincitycoords.displayname && dataii.location.locale.locale4)) {
                displayname = (dataii.location.locale.locale3 != maincitycoords.displayname && dataii.location.locale.locale3) ? dataii.location.locale.locale3 : dataii.location.locale.locale4
                displaystate = dataii.location.adminDistrictCode
              } else {
                if (feature.latitude.length == (i + 1)) {ronExtraAjaxFinish()} else {rgetLocLoop(i + 1)}
                return
              }
            }
            for (var li = 0; li < regionalList.length; li++) {
              if (displayname == regionalList[li].displayname) {
                if ((dataii.location.locale.locale3 != regionalList[li].displayname && dataii.location.locale.locale3) || (dataii.location.locale.locale4 != regionalList[li].displayname && dataii.location.locale.locale4)) {
                  displayname = (dataii.location.locale.locale3 != regionalList[li].displayname && dataii.location.locale.locale3) ? dataii.location.locale.locale3 : dataii.location.locale.locale4
                  displaystate = dataii.location.adminDistrictCode
                } else {
                  if (feature.latitude.length == (i + 1)) {ronExtraAjaxFinish()} else {rgetLocLoop(i + 1)}
                  return
                }
              }
            }
            if (i!=0) {
              regionalList.push({lat: latgeo, lon:longeo, distance:dist, stationUrl:feature.stationId[i], name:displayname, displayname:displayname, statecode:displaystate});
            };
            displayname = dataii.location.displayName
            displaystate = dataii.location.adminDistrictCode
            if (displayname == maincitycoords.displayname || displayname == state) {
                if (feature.latitude.length == (i + 1)) {ronExtraAjaxFinish()} else {rgetLocLoop(i + 1)}
                return
            }
            for (var li = 0; li < locList.length; li++) {
              if (displayname == locList[li].displayname) {
                if (feature.latitude.length == (i + 1)) {ronExtraAjaxFinish()} else {rgetLocLoop(i + 1)}
                return
              }
            }
                    if (dist >= rminRadiusMiles && dist <= rmaxRadiusMiles) {
              if (ti < 3) {
                  locList.push({lat: latgeo, lon:longeo, distance:dist, stationUrl:feature.stationId[i], name:displayname, displayname:displayname, state:displaystate});
              } else {
                ti = ti - 1
              }
            }
            //for the 8 city slide
            if (i < data.location.stationName.length && (regionalList.length < 8 || locList.length < locationSettings.extraLocations.maxLocations)) {
              ti = ti + 1
              i = i + 1
              rgetLocLoop(i)
            } else {
              ronExtraAjaxFinish()
            };
          }).fail(function(){
            if (feature.latitude.length >= (i + 1) || i >= 9) {ronExtraAjaxFinish()} else {rgetLocLoop(i + 1)}
          })
                }
    
                // sort list by distance
        function ronExtraAjaxFinish() {
                  locList.sort(function(a, b) {
                      return parseInt(a.distance) - parseInt(b.distance);
                  });
            locList.forEach((loc, i) => {
              loc.orderNum = ((locationSettings.extraLocations.locationOrderNum[i]) ? locationSettings.extraLocations.locationOrderNum[i] : locationSettings.extraLocations.maxLocations + i)
            });
            regionalList.forEach((loc, i) => {
              loc.orderNum = ((locationSettings.regionalInfoLocs.locationOrderNum[i])? locationSettings.regionalInfoLocs.locationOrderNum[i] : locationSettings.regionalInfoLocs.maxLocations + i)
            });
            if (locationSettings.extraLocations.useAutoLocations == false){locList = []}
            if (locationSettings.regionalInfoLocs.useAutoLocations == false){regionalList = []}
            function raddConfigLocsLoop(i) {
              eloc = locationSettings.extraLocations.locs[i]
              if (eloc.searchQuery.type) {
                if (eloc.searchQuery.type == "geocode") {
                  $.getJSON("https://api.weather.com/v3/location/point?geocode="+ eloc.searchQuery.val + "&language=en-US&format=json&apiKey=" + api_key, function(data) {
                    //console.log("https://api.weather.com/v3/location/point?geocode="+ eloc.searchQuery.val + "&language=en-US&format=json&apiKey=" + api_key);
                    locList.push({lat: data.location.latitude, lon:data.location.longitude, orderNum: ((eloc.orderNum) ? eloc.orderNum : i), distance:null, stationUrl:null, name:data.location.displayName, statecode: data.location.adminDistrictCode, displayname:((eloc.displayName) ? eloc.displayName : data.location.displayName)});
                    if (i < locationSettings.extraLocations.locs.length-1) {raddConfigLocsLoop(i + 1)} else {rsortFinishedLocList()}
                  }).fail(function(){if (i < locationSettings.extraLocations.locs.length-1) {raddConfigLocsLoop(i + 1)} else {rsortFinishedLocList()}});
                } else {
                  $.getJSON("https://api.weather.com/v3/location/search?query="+eloc.searchQuery.val+"&locationType="+eloc.searchQuery.type+"&fuzzyMatch="+eloc.searchQuery.fuzzy+((eloc.searchQuery.country) ? "&countryCode="+eloc.searchQuery.country : "")+((eloc.searchQuery.state) ? "&adminDistrictCode="+eloc.searchQuery.state : "")+"&language=en-US&format=json&apiKey=" + api_key, function(data) {
                    //console.log("https://api.weather.com/v3/location/search?query="+eloc.searchQuery.val+"&locationType="+eloc.searchQuery.type+"&fuzzyMatch="+eloc.searchQuery.fuzzy+((eloc.searchQuery.country) ? "&countryCode="+eloc.searchQuery.country : "")+((eloc.searchQuery.state) ? "&adminDistrictCode="+eloc.searchQuery.state : "")+"&language=en-US&format=json&apiKey=" + api_key);
                      cidx = ((eloc.searchQuery.searchResultNum && eloc.searchQuery.searchResultNum < data.location.placeId.length) ? eloc.searchQuery.searchResultNum : 0)
                      locList.push({lat: data.location.latitude[cidx], lon:data.location.longitude[cidx], orderNum: ((eloc.orderNum) ? eloc.orderNum : i), distance:null, stationUrl:null, name:data.location.displayName[cidx], statecode: data.location.adminDistrictCode[cidx], displayname:((eloc.displayName) ? eloc.displayName : data.location.displayName[cidx])});
                      if (i < locationSettings.extraLocations.locs.length-1) {raddConfigLocsLoop(i + 1)} else {rsortFinishedLocList()}
                  }).fail(function(){if (i < locationSettings.extraLocations.locs.length-1) {raddConfigLocsLoop(i + 1)} else {rsortFinishedLocList()}});
                }
              } else {if (i < locationSettings.extraLocations.locs.length-1) {raddConfigLocsLoop(i + 1)} else {rsortFinishedLocList()}}
            }
            raddConfigLocsLoop(0)
            function raddConfigAroundLocsLoop(i) {
              eloc = locationSettings.regionalInfoLocs.locs[i]
              if (eloc.searchQuery.type) {
                if (eloc.searchQuery.type == "geocode") {
                  $.getJSON("https://api.weather.com/v3/location/point?geocode="+ eloc.searchQuery.val + "&language=en-US&format=json&apiKey=" + api_key, function(data) {
                    //console.log("https://api.weather.com/v3/location/point?geocode="+ eloc.searchQuery.val + "&language=en-US&format=json&apiKey=" + api_key);
                    regionalList.push({lat: data.location.latitude, lon:data.location.longitude, orderNum: ((eloc.orderNum) ? eloc.orderNum : i), distance:null, stationUrl:null, name:data.location.displayName, statecode: data.location.adminDistrictCode, displayname:((eloc.displayName) ? eloc.displayName : data.location.displayName)});
                    if (i < locationSettings.regionalInfoLocs.locs.length-1) {raddConfigAroundLocsLoop(i + 1)} else {sortFinishedAroundLocList()}
                  }).fail(function(){if (i < locationSettings.regionalInfoLocs.locs.length-1) {raddConfigAroundLocsLoop(i + 1)} else {sortFinishedAroundLocList()}});
                } else {
                  $.getJSON("https://api.weather.com/v3/location/search?query="+eloc.searchQuery.val+"&locationType="+eloc.searchQuery.type+"&fuzzyMatch="+eloc.searchQuery.fuzzy+((eloc.searchQuery.country) ? "&countryCode="+eloc.searchQuery.country : "")+((eloc.searchQuery.state) ? "&adminDistrictCode="+eloc.searchQuery.state : "")+"&language=en-US&format=json&apiKey=" + api_key, function(data) {
                    //console.log("https://api.weather.com/v3/location/search?query="+eloc.searchQuery.val+"&locationType="+eloc.searchQuery.type+"&fuzzyMatch="+eloc.searchQuery.fuzzy+((eloc.searchQuery.country) ? "&countryCode="+eloc.searchQuery.country : "")+((eloc.searchQuery.state) ? "&adminDistrictCode="+eloc.searchQuery.state : "")+"&language=en-US&format=json&apiKey=" + api_key);
                      cidx = ((eloc.searchQuery.searchResultNum && eloc.searchQuery.searchResultNum < data.location.placeId.length) ? eloc.searchQuery.searchResultNum : 0)
                      regionalList.push({lat: data.location.latitude[cidx], lon:data.location.longitude[cidx], orderNum: ((eloc.orderNum) ? eloc.orderNum : i), distance:null, stationUrl:null, name:data.location.displayName[cidx], statecode: data.location.adminDistrictCode[cidx], displayname:((eloc.displayName) ? eloc.displayName : data.location.displayName[cidx])});
                      if (i < locationSettings.regionalInfoLocs.locs.length-1) {raddConfigAroundLocsLoop(i + 1)} else {sortFinishedAroundLocList()}
                  }).fail(function(){if (i < locationSettings.regionalInfoLocs.locs.length-1) {raddConfigAroundLocsLoop(i + 1)} else {sortFinishedAroundLocList()}});
                }
              } else {if (i < locationSettings.regionalInfoLocs.locs.length-1) {raddConfigAroundLocsLoop(i + 1)} else {sortFinishedAroundLocList()}}
            }
            raddConfigAroundLocsLoop(0)
            function rsortFinishedLocList() {
              locList.sort(function(a, b) {
                        return parseInt(a.orderNum) - parseInt(b.orderNum);
                    });
              locList.splice(locationSettings.extraLocations.maxLocations)
              grabCitySlidesData()
            }
            function sortFinishedAroundLocList() {
              regionalList.sort(function(a, b) {
                        return parseInt(a.orderNum) - parseInt(b.orderNum);
                    });
              regionalList.splice((locationSettings.regionalInfoLocs.maxLocations < 8)?locationSettings.regionalInfoLocs.maxLocations:8)
              grabRegionalData()
            }
                // set the station for location 0
                //_locations[0].stationUrl = locList[0].stationUrl
          //start datapull
        }
            });
      }

      function getStatePopularCities(state, onInit) {
        $.getJSON("https://examples.opendatasoft.com/api/records/1.0/search/?dataset=largest-us-cities&q=&sort=population&facet=city&facet=state&refine.state=" + state, function(data) {
          if (data !== undefined && data.records.length != 0) {
          data.records.forEach((city, i) => {
            if (onInit==true) {
              ccTickerCitiesList.push({name:city.fields.city,displayname:city.fields.city,lat:(city.fields.coordinates).split(';')[0],lon:(city.fields.coordinates).split(';')[1]})
            } else {
              cctickerdata.push({name:city.fields.city,displayname:city.fields.city,lat:(city.fields.coordinates).split(';')[0],lon:(city.fields.coordinates).split(';')[1]})
              updateLocs("cctickerloc")
            };
            if (i == (data.records.length - 1)) {pullCCTickerData()};
          });
         } else {
           //if nothing just run the function and use placeholder locs
           pullCCTickerData();
         }
        });
      }
    
  
    var weatherInfo = { currentCond: {
      sidebar: {noReport:false,displayname:"",airport:"",temp:"",cond:"",condshort:"",icon:"",humid:"",dewpt:"",pressure:"",wind:"",windspeed:"",gust:"",feelslike:{type:"",val:""},visibility:"",uvidx:"",ceiling:"",windChill:""},
      //loc:{noReport:"",displayname:"",temp:"",cond:"",icon:"",humid:"",dewpt:"",pressure:"",pressureTrend:"",wind:"",windspeed:"",gust:"",feelslike:{type:"",val:""},},
      weatherLocs:[],
      //cityLoc:{noReport:false,displayname:"",temp:"",icon:"",wind:"",windspeed:""}
      city8slides:{noReport:false, cities:[]},
      regionallocs: {noReport:false, cities:[]},
    }, NWS: {
      secURL:"",
      zone:"",
    }, dayPart: {
      lowerbar:{noReport:false,displayname:"",daytitle:"",hour:[{time:"",cond:"",icon:"",temp:"",wind:"",windspeed:""},{time:"",cond:"",icon:"",temp:"",wind:"",windspeed:""},{time:"",cond:"",icon:"",temp:"",wind:"",windspeed:""},{time:"",cond:"",icon:"",temp:"",wind:"",windspeed:""},]},
      /*loc:{noReport:"",displayname:"",daytitle:"",hour:[
        {time:"",cond:"",icon:"",temp:"",wind:"",windspeed:""},
        {time:"",cond:"",icon:"",temp:"",wind:"",windspeed:""},
        {time:"",cond:"",icon:"",temp:"",wind:"",windspeed:""},
        {time:"",cond:"",icon:"",temp:"",wind:"",windspeed:""},
      ]},*/
      weatherLocs:[],
    }, dayDesc: {
      lowerbar: {noReport:false,displayname:"",day:[{name:"",desc:""},{name:"",desc:""},{name:"",desc:""},{name:"",desc:""}]},
      /*loc:{noReport:"",displayname:"",day:[
        {name:"",desc:""},
        {name:"",desc:""},
        {name:"",desc:""},
        {name:"",desc:""}
      ]},*/
      weatherLocs:[]
    }, fiveDay: {
        lowerbar: {noReport:false,displayname:"",day:[{name:"",desc:"",cond:"",icon:"",high:"",low:"",windspeed:"",weekend:""},{name:"",desc:"",cond:"",icon:"",high:"",low:"",windspeed:"",weekend:""},{name:"",desc:"",cond:"",icon:"",high:"",low:"",windspeed:"",weekend:""},{name:"",desc:"",cond:"",icon:"",high:"",low:"",windspeed:"",weekend:""},{name:"",desc:"",cond:"",icon:"",high:"",low:"",windspeed:"",weekend:""}]},
        /*loc:{noReport:"",displayname:"",day:[
          {name:"",cond:"",icon:"",high:"",low:"",windspeed:""},
          {name:"",cond:"",icon:"",high:"",low:"",windspeed:""},
          {name:"",cond:"",icon:"",high:"",low:"",windspeed:""},
          {name:"",cond:"",icon:"",high:"",low:"",windspeed:""},
          {name:"",cond:"",icon:"",high:"",low:"",windspeed:""}
        ]},*/
        weatherLocs:[]
      }, almanactod: {noReport:false,displayname:"",date:"",avghigh:"",avglow:"",rechigh:"",reclow:"",rechighyear:"",reclowyear:"",sunrise:"",sunset:"",avgprecip:"",moonphases:[
        {name:"NEW",date:"Feb 10"},
        {name:"FIRST",date:"Feb 16"},
        {name:"FULL",date:"Feb 21"},
        {name:"LAST",date:"Feb 27"},
      ]}, 
      almanactom: {noReport:false,displayname:"",date:"",avghigh:"",avglow:"",rechigh:"",reclow:"",rechighyear:"",reclowyear:"",sunrise:"",sunset:"",moonphases:[
        {name:"NEW",date:"Feb 10"},
        {name:"FIRST",date:"Feb 16"},
        {name:"FULL",date:"Feb 21"},
        {name:"LAST",date:"Feb 27"},
      ]},bulletin: {
        //loc:{displayname:"",pages:[]},
        includesevereonbulletin: false,
        weatherLocs:[],
        severewarnings:[],
        //{name:"", desc:"", status:""}
        marqueewarnings:[],
        severeweathermode: false
        //{name:"", desc:"", status:"", significance:""}
      }, healthforecast: {noReport:false, displayname:"",dayidx:0, day:"", high:"", low:"", precipChance:"", humid:"", wind:"",windspeed:"", icon:""
      }, healthPollen: {noReport:false, displayname:"", total:"", totalcat:"", date:"", types:[
        {type:"tree", treetype:"", pollenidx:""},
        {type:"grass", pollenidx:""},
        {type:"weed", pollenidx:""},
        {type:"mold", pollenidx:""},
      ]}, healthAcheBreath: {noReport:false, date:"",achesindex:"",achescat:"",breathindex:"",breathcat:""
      },  airquality: {noReport:false, date:"",ozoneactin: false, primarypolute:"", airqualityindex:""
      },  uvindex: {noReport:false, currentuv:{index:"",desc:""},forecast:[
        {day:"",time:"",index:"",desc:""},
        {day:"",time:"",index:"",desc:""},
        {day:"",time:"",index:"",desc:""}
      ]}, airport: {noReport: false, mainairports:[
        {displayname:"",iata:"EWR",arrivals:{delay:"No Delay",reason:""},departures:{delay:"No Delay",reason:""},temp:"",cond:"",icon:"",windspeed:""},
        {displayname:"",iata:"JFK",arrivals:{delay:"No Delay",reason:""},departures:{delay:"No Delay",reason:""},temp:"",cond:"",icon:"",windspeed:""}
      ], delays: [],
        //{iato:"",type:"",amount:"",amountmin:"",reason:""}
       otherairports:[
        {displayname:"New York / LaGuardia",iata:"LGA",delay:"No Delay",temp:"",icon:"",windspeed:""},
        {displayname:"Chicago O'hare Int'l",iata:"ORD",delay:"No Delay",temp:"",icon:"",windspeed:""},
        {displayname:"Los Angeles Int'l",iata:"LAX",delay:"No Delay",temp:"",icon:"",windspeed:""},
        {displayname:"Atlanta International",iata:"LAX",delay:"No Delay",temp:"",icon:"",windspeed:""},
        {displayname:"Dallas / Ft. Worth Int'l",iata:"DFW",delay:"No Delay",temp:"",icon:"",windspeed:""},
        {displayname:"Denver International",iata:"DEN",delay:"No Delay",temp:"",icon:"",windspeed:""},
        {displayname:"Boston / Logan Int'l",iata:"BOS",delay:"No Delay",temp:"",icon:"",windspeed:""},
        {displayname:"Salt Lake City Int'l",iata:"SLC",delay:"No Delay",temp:"",icon:"",windspeed:""},
        {displayname:"Miami International",iata:"MIA",delay:"No Delay",temp:"",icon:"",windspeed:""},
        {displayname:"Phoenix / Sky Harbor",iata:"PHX",delay:"No Delay",temp:"",icon:"",windspeed:""},
        {displayname:"Minneapolis - St. Paul",iata:"MSP",delay:"No Delay",temp:"",icon:"",windspeed:""},
        {displayname:"Washington Dulles Int'l",iata:"IAD",delay:"No Delay",temp:"",icon:"",windspeed:""},
        {displayname:"San Francisco Int'l",iata:"SFO",delay:"No Delay",temp:"",icon:"",windspeed:""},
        {displayname:"Philadelphia Int'l",iata:"PHL",delay:"No Delay",temp:"",icon:"",windspeed:""},
        {displayname:"Seattle - Tacoma Int'l",iata:"SEA",delay:"No Delay",temp:"",icon:"",windspeed:""},
        {displayname:"Lambert - St. Louis Int'l",iata:"STL",delay:"No Delay",temp:"",icon:"",windspeed:""},
      ]},
      travel:{noReport:false,cities:[
       {displayname:"ATLANTA\n",lat:"33.7488",lon:"-84.3877",days:[{dayName:"",condition:"",conditione:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""}]},
       {displayname:"BISMARCK\n",lat:"46.8042",lon:"-100.7878",days:[{dayName:"",condition:"",conditione:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""}]},
       {displayname:"BOISE\n",lat:"43.6150",lon:"-116.2023",days:[{dayName:"",condition:"",conditione:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""}]},
       {displayname:"BOSTON\n",lat:"42.3601",lon:"-71.0589",days:[{dayName:"",condition:"",conditione:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""}]},
       {displayname:"BUFFALO\n",lat:"42.8864",lon:"-78.8784",days:[{dayName:"",condition:"",conditione:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""}]},
       {displayname:"CHICAGO\n",lat:"41.8781",lon:"-87.6298",days:[{dayName:"",condition:"",conditione:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""}]},
       {displayname:"CINCINNATI\n",lat:"39.1031",lon:"-84.5120",days:[{dayName:"",condition:"",conditione:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""}]},
       {displayname:"DALLAS\n",lat:"32.7767",lon:"-96.7970",days:[{dayName:"",condition:"",conditione:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""}]},
       {displayname:"DENVER\n",lat:"39.7392",lon:"-104.9903",days:[{dayName:"",condition:"",conditione:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""}]},
       {displayname:"DETROIT\n",lat:"42.3314",lon:"-83.0458",days:[{dayName:"",condition:"",conditione:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""}]},
       {displayname:"KANSAS CITY\n",lat:"39.0997",lon:"-94.5786",days:[{dayName:"",condition:"",conditione:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""}]},
       {displayname:"LOS ANGELES\n",lat:"34.0549",lon:"-118.2426",days:[{dayName:"",condition:"",conditione:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""}]},
       {displayname:"MINNEAPOLIS\n",lat:"44.9778",lon:"-93.2650",days:[{dayName:"",condition:"",conditione:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""}]},
       {displayname:"NASHVILLE\n",lat:"36.1627",lon:"-86.7816",days:[{dayName:"",condition:"",conditione:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""}]},
       {displayname:"NEW ORLEANS\n",lat:"29.9511",lon:"-90.0715",days:[{dayName:"",condition:"",conditione:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""}]},
       {displayname:"NEW YORK CITY\n",lat:"40.7128",lon:"-74.0060",days:[{dayName:"",condition:"",conditione:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""}]},
       {displayname:"PHOENIX\n",lat:"33.4484",lon:"-112.0740",days:[{dayName:"",condition:"",conditione:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""}]},
       {displayname:"PORTLAND\n",lat:"45.5152",lon:"-122.6784",days:[{dayName:"",condition:"",conditione:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""}]},
       {displayname:"RALEIGH\n",lat:"35.7796",lon:"-78.6382",days:[{dayName:"",condition:"",conditione:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""}]},
       {displayname:"RAPID CITY\n",lat:"44.0805",lon:"-103.2310",days:[{dayName:"",condition:"",conditione:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""}]},
       {displayname:"SACRAMENTO\n",lat:"38.5816",lon:"-121.4944",days:[{dayName:"",condition:"",conditione:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""}]},
       {displayname:"SALT LAKE CITY\n",lat:"40.7608",lon:"-111.8910",days:[{dayName:"",condition:"",conditione:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""}]},
       {displayname:"TAMPA\n",lat:"27.9517",lon:"-82.4588",days:[{dayName:"",condition:"",conditione:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""}]},
       {displayname:"WASHINGTON DC\n",lat:"38.9072",lon:"-77.0369",days:[{dayName:"",condition:"",conditione:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""},{dayName:"",icon:"",high:"",low:"",windspeed:""}]},
     ]},
      ccticker: {noReportCC:false,noReportFC:false,noReportAC:false,arrow:"",ccLocs:[],ccairportdelays:[]},
      radarTempUnavialable: false,
      radarWinterLegend: false,
      reboot: false,
    }
    
    //start data functions. these are run after their respective location functions finish
    function grabCity8SlidesData() {
      weatherInfo.currentCond.city8slide = [];
      var url = "https://api.weather.com/v3/aggcommon/v3-wx-observations-current;v3-wx-forecast-daily-5day?geocodes="
      citySlideList.forEach((loc, i) => {
        url += `${loc.lat},${loc.lon};`
      });
      url += "&language=en-US&units=e&format=json&apiKey=" + api_key
      console.log(url)
      $.getJSON(url, function(data) {
        data.forEach((ajaxedLoc, i) => {
          var city8sldieslocs = {displayname:"",temp:"",conditione:"",condition:"",wind:"",windDirNum:"",windspeed:"",wxforecast:"",hi:"",low:""}
          //var city8sldieslocs =  {1:{displayname:"",temp:"",condition:"",wind:"",windspeed:""},2:{displayname:"",temp:"",condition:"",wind:"",windspeed:""},3:{displayname:"",temp:"",condition:"",wind:"",windspeed:""},4:{displayname:"",temp:"",condition:"",wind:"",windspeed:""},5:{displayname:"",temp:"",condition:"",wind:"",windspeed:""},6:{displayname:"",temp:"",condition:"",wind:"",windspeed:""},7:{displayname:"",temp:"",condition:"",wind:"",windspeed:""}}
          city8sldieslocs.temp = ajaxedLoc["v3-wx-observations-current"].temperature
          city8sldieslocs.condition = ajaxedLoc["v3-wx-observations-current"].wxPhraseShort.replaceAll('Shower', 'SHWR',).replaceAll('Near', 'NR',).replaceAll('Light', 'LGT',).replaceAll('Heavy', 'HVY').replaceAll('Early', 'ERLY').replaceAll('Partial', 'PART').replaceAll('Cldy', 'CLOUDY').replaceAll(' T-Storm', ' T-STM')
          city8sldieslocs.wind = ((ajaxedLoc["v3-wx-observations-current"].windDirectionCardinal == "CALM" || ajaxedLoc["v3-wx-observations-current"].windSpeed == 0) ? 'Calm' :  ajaxedLoc["v3-wx-observations-current"].windDirectionCardinal)
          city8sldieslocs.windDirNum = ajaxedLoc["v3-wx-observations-current"].windDirection //number
          city8sldieslocs.windspeed =ajaxedLoc["v3-wx-observations-current"].windSpeed //number
          city8sldieslocs.displayname = (citySlideList[i].displayname)
          city8sldieslocs.wxforecast = ((ajaxedLoc["v3-wx-forecast-daily-5day"].daypart[0].daypartName[0] == null) ? ajaxedLoc["v3-wx-forecast-daily-5day"].daypart[0].wxPhraseShort[2] : ajaxedLoc["v3-wx-forecast-daily-5day"].daypart[0].wxPhraseShort[0]).replaceAll('Shower', 'SHWR',).replaceAll('Near', 'NR',).replaceAll('Light', 'LGT',).replaceAll('Heavy', 'HVY').replaceAll('Early', 'ERLY').replaceAll('Partial', 'PART').replaceAll('Cldy', 'CLOUDY').replaceAll(' T-Storm', ' T-STM')
          city8sldieslocs.low = ((ajaxedLoc["v3-wx-forecast-daily-5day"].daypart[0].daypartName[0] == null) ? ajaxedLoc["v3-wx-forecast-daily-5day"].temperatureMin[1] : ajaxedLoc["v3-wx-forecast-daily-5day"].temperatureMin[0])
          city8sldieslocs.hi = ((ajaxedLoc["v3-wx-forecast-daily-5day"].daypart[0].daypartName[0] == null) ? ajaxedLoc["v3-wx-forecast-daily-5day"].temperatureMax[1] : ajaxedLoc["v3-wx-forecast-daily-5day"].temperatureMax[0])
          
          weatherInfo.currentCond.city8slides.cities.push(city8sldieslocs)
        });
      });
    }

    function grabRegionalData() {
      weatherInfo.currentCond.regionalloc = [];
      var url = "https://api.weather.com/v3/aggcommon/v3-wx-observations-current;v3-wx-forecast-daily-5day?geocodes="
      regionalList.forEach((loc, i) => {
        url += `${loc.lat},${loc.lon};`
      });
      url += "&language=en-US&units=e&format=json&apiKey=" + api_key
      $.getJSON(url, function(data) {
        data.forEach((ajaxedLoc, i) => {
          var regional8sldieslocs = {displayname:"",temp:"",condition:"",wind:"",windspeed:"",wxforecast:"",hi:"",low:""}
          //var city8sldieslocs =  {1:{displayname:"",temp:"",condition:"",wind:"",windspeed:""},2:{displayname:"",temp:"",condition:"",wind:"",windspeed:""},3:{displayname:"",temp:"",condition:"",wind:"",windspeed:""},4:{displayname:"",temp:"",condition:"",wind:"",windspeed:""},5:{displayname:"",temp:"",condition:"",wind:"",windspeed:""},6:{displayname:"",temp:"",condition:"",wind:"",windspeed:""},7:{displayname:"",temp:"",condition:"",wind:"",windspeed:""}}
          regional8sldieslocs.temp = ajaxedLoc["v3-wx-observations-current"].temperature
          regional8sldieslocs.condition = ajaxedLoc["v3-wx-observations-current"].wxPhraseShort.replaceAll('Shower', 'SHWR',).replaceAll('Near', 'NR',).replaceAll('Light', 'LGT',).replaceAll('Heavy', 'HVY').replaceAll('Early', 'ERLY').replaceAll('Partial', 'PART').replaceAll('Cldy', 'CLOUDY').replaceAll(' T-Storm', ' T-STM')
          regional8sldieslocs.wind = ((ajaxedLoc["v3-wx-observations-current"].windDirectionCardinal == "CALM" || ajaxedLoc["v3-wx-observations-current"].windSpeed == 0) ? 'Calm' :  ajaxedLoc["v3-wx-observations-current"].windDirectionCardinal) + ((ajaxedLoc["v3-wx-observations-current"].windSpeed === 0) ? '' : ajaxedLoc["v3-wx-observations-current"].windSpeed)
          regional8sldieslocs.windspeed = ajaxedLoc["v3-wx-observations-current"].windSpeed
          regional8sldieslocs.displayname = (regionalList[i].displayname)
          regional8sldieslocs.statecode = ((regionalList[i].statecode != null ? ", " + (regionalList[i].statecode) : ""))
          regional8sldieslocs.wxforecast = ajaxedLoc["v3-wx-forecast-daily-5day"].daypart[0].wxPhraseShort[1].replaceAll('Shower', 'SHWR',).replaceAll('Near', 'NR',).replaceAll('Light', 'LGT',).replaceAll('Heavy', 'HVY').replaceAll('Early', 'ERLY').replaceAll('Partial', 'PART').replaceAll('Cldy', 'CLOUDY').replaceAll(' T-Storm', ' T-STM')
          regional8sldieslocs.low = ajaxedLoc["v3-wx-forecast-daily-5day"].temperatureMin[1]
          regional8sldieslocs.hi = ajaxedLoc["v3-wx-forecast-daily-5day"].temperatureMax[1]
          
          weatherInfo.currentCond.regionallocs.cities.push(regional8sldieslocs)
        });
      });
    }
    function grabTravelData() {
      var url = "https://api.weather.com/v3/aggcommon/v3-wx-forecast-daily-5day?geocodes="
      weatherInfo.travel.cities.forEach((loc, i) => {
        url += `${loc.lat},${loc.lon};`
      });
      url += "&language=en-US&units=e&format=json&apiKey=" + api_key
      $.getJSON(url, function(data) {
        data.forEach((ajaxedLoc, i) => {
          var daycorrection = 0;
          if (ajaxedLoc["v3-wx-forecast-daily-5day"].daypart[0].daypartName[0] == null) {
            daycorrection = 1;
          }
          for (var hi = (ajaxedLoc["v3-wx-forecast-daily-5day"].daypart[0].daypartName[0] == null) ? 1 : 0, hidp = (ajaxedLoc["v3-wx-forecast-daily-5day"].daypart[0].daypartName[0] == null) ? 2 : 0; hi < 3 + daycorrection; hi++, hidp = hidp + 2) {
            weatherInfo.travel.cities[i].days[hi - daycorrection].dayName = ajaxedLoc["v3-wx-forecast-daily-5day"].dayOfWeek[hi].substring(0,3)
            weatherInfo.travel.cities[i].days[hi - daycorrection].icon = ajaxedLoc["v3-wx-forecast-daily-5day"].daypart[0].iconCode[hidp]
            weatherInfo.travel.cities[i].days[hi - daycorrection].high = ajaxedLoc["v3-wx-forecast-daily-5day"].temperatureMax[hi]
            weatherInfo.travel.cities[i].days[hi - daycorrection].low = ajaxedLoc["v3-wx-forecast-daily-5day"].temperatureMin[hi]
            weatherInfo.travel.cities[i].days[hi - daycorrection].condition = ajaxedLoc["v3-wx-forecast-daily-5day"].daypart[0].wxPhraseShort[hidp].replaceAll('Shower', 'SHWR',).replaceAll('Near', 'NR',).replaceAll('Light', 'LGT',).replaceAll('Heavy', 'HVY').replaceAll('Early', 'ERLY').replaceAll('Partial', 'PART').replaceAll('Cldy', 'CLOUDY').replaceAll(' T-Storm', ' T-STM')
            weatherInfo.travel.cities[i].days[hi - daycorrection].windspeed = ajaxedLoc["v3-wx-forecast-daily-5day"].daypart[0].windSpeed[hidp]
            weatherInfo.travel.cities[i].days[hi - daycorrection].dayNight = ajaxedLoc["v3-wx-forecast-daily-5day"].daypart[0].dayOrNight[hidp]
          }
        })
      });
    }
    grabTravelData()
    function grabCitySlidesData() {
      /*weatherInfo.currentCond.weatherLocs = [];
      weatherInfo.dayPart.weatherLocs = [];
      weatherInfo.dayDesc.weatherLocs = [];
      weatherInfo.fiveDay.weatherLocs = [];
      weatherInfo.bulletin.weatherLocs = [];*/
      var NWSurl1 = "https://api.weather.gov/points/" + maincitycoords.lat + "," + maincitycoords.lon;

      $.getJSON(NWSurl1, function(data) {
        weatherInfo.NWS.zone = data.properties.forecastZone.substr(-6)
      })

      var url = "https://api.weather.com/v3/aggcommon/v3alertsHeadlines;v3-wx-forecast-daily-5day;v3-wx-observations-current;v3-wx-forecast-hourly-2day?geocodes="
      url += `${maincitycoords.lat},${maincitycoords.lon};`
      locList.forEach((loc, i) => {
        url += `${loc.lat},${loc.lon};`
      });
      url += "&language=en-US&units=e&format=json&apiKey=" + api_key
      $.getJSON(url, function(data) {
        data.forEach((ajaxedLoc, i) => {
            //Extra locations
            if (ajaxedLoc == null) {
              weatherInfo.currentCond.weatherLocs[i] = {noReport:true,displayname:((i ==0 ) ? maincitycoords.displayname : locList[i-1].displayname),temp:"",cond:"",icon:"",humid:"",dewpt:"",pressure:"",pressureTrend:"",wind:"",windspeed:"",gust:"",feelslike:{type:"",val:""}}
              weatherInfo.dayPart.weatherLocs[i] = {noReport:true,displayname:((i ==0 ) ? maincitycoords.displayname : locList[i-1].displayname),daytitle:"",hour:[{time:"",cond:"",icon:"",temp:"",wind:"",windspeed:""},{time:"",cond:"",icon:"",temp:"",wind:"",windspeed:""},{time:"",cond:"",icon:"",temp:"",wind:"",windspeed:""},{time:"",cond:"",icon:"",temp:"",wind:"",windspeed:""},]}
              weatherInfo.dayDesc.weatherLocs[i] = {noReport:true,displayname:((i ==0 ) ? maincitycoords.displayname : locList[i-1].displayname),day:[{name:"",desc:""},{name:"",desc:""},{name:"",desc:""},{name:"",desc:""}]}
              weatherInfo.fiveDay.weatherLocs[i] = {noReport:true,displayname:((i ==0 ) ? maincitycoords.displayname : locList[i-1].displayname),day:[{name:"",cond:"",icon:"",high:"",low:"",windspeed:""},{name:"",cond:"",icon:"",high:"",low:"",windspeed:""},{name:"",cond:"",icon:"",high:"",low:"",windspeed:""},{name:"",cond:"",icon:"",high:"",low:"",windspeed:""},{name:"",cond:"",icon:"",high:"",low:"",windspeed:""}]}
              weatherInfo.bulletin.weatherLocs[i] = {displayname:((i ==0 ) ? maincitycoords.displayname : locList[i-1].displayname),pages:[],enabled: false}
            } else {
              var weatherLocscc = {noReport:false,displayname:"",temp:"",cond:"",icon:"",humid:"",dewpt:"",pressure:"",pressureTrend:"",wind:"",windspeed:"",gust:"",feelslike:{type:"",val:""},ceiling:"",monthToDatePrecip:"",visibility:""}
              if (ajaxedLoc["v3-wx-observations-current"] == null) {
                weatherInfo.currentCond.weatherLocs[i] = {noReport:true,displayname:((i ==0 ) ? maincitycoords.displayname : locList[i-1].displayname),temp:"",cond:"",icon:"",humid:"",dewpt:"",pressure:"",pressureTrend:"",wind:"",windspeed:"",gust:"",feelslike:{type:"",val:""}}
              } else {
                weatherLocscc.temp = ajaxedLoc["v3-wx-observations-current"].temperature
                weatherLocscc.cond = ajaxedLoc["v3-wx-observations-current"].wxPhraseLong
                weatherLocscc.icon = ajaxedLoc["v3-wx-observations-current"].iconCode
                weatherLocscc.humid = ajaxedLoc["v3-wx-observations-current"].relativeHumidity
                weatherLocscc.dewpt = ajaxedLoc["v3-wx-observations-current"].temperatureDewPoint
                weatherLocscc.pressure = (ajaxedLoc["v3-wx-observations-current"].pressureAltimeter).toFixed(2)
                weatherLocscc.pressureTrend = ((ajaxedLoc["v3-wx-observations-current"].pressureTendencyCode === 1 || ajaxedLoc["v3-wx-observations-current"].pressureTendencyCode === 3) ? 'R' : (ajaxedLoc["v3-wx-observations-current"].pressureTendencyCode === 2 || ajaxedLoc["v3-wx-observations-current"].pressureTendencyCode === 4) ? 'F' : 'IN.')
                weatherLocscc.wind = ((ajaxedLoc["v3-wx-observations-current"].windDirectionCardinal == "CALM" || ajaxedLoc["v3-wx-observations-current"].windSpeed == 0) ? 'calm' :  ajaxedLoc["v3-wx-observations-current"].windDirectionCardinal) + ' ' + ((ajaxedLoc["v3-wx-observations-current"].windSpeed === 0) ? '' : ajaxedLoc["v3-wx-observations-current"].windSpeed)
                weatherLocscc.windspeed = ajaxedLoc["v3-wx-observations-current"].windSpeed
                weatherLocscc.visibility = ajaxedLoc["v3-wx-observations-current"].visibility
                weatherLocscc.ceiling = ajaxedLoc["v3-wx-observations-current"].cloudCeiling
                weatherLocscc.gust = ((ajaxedLoc["v3-wx-observations-current"].windGust!=undefined) ? ajaxedLoc["v3-wx-observations-current"].windGust + " mph": "none")
                weatherLocscc.feelslike.type = ((ajaxedLoc["v3-wx-observations-current"].temperature != ajaxedLoc["v3-wx-observations-current"].temperatureHeatIndex) ? "HEAT INDEX" : ((ajaxedLoc["v3-wx-observations-current"].temperatureWindChill != ajaxedLoc["v3-wx-observations-current"].temperature) ? "WIND CHILL" : "dontdisplay"))
                weatherLocscc.feelslike.val = ajaxedLoc["v3-wx-observations-current"].temperatureFeelsLike
                weatherLocscc.displayname = ((i ==0 ) ? maincitycoords.displayname : locList[i-1].displayname)
                weatherLocscc.monthToDatePrecip = ""
                weatherInfo.currentCond.weatherLocs[i] = weatherLocscc
              }
              //day part
              if (ajaxedLoc["v3-wx-forecast-hourly-2day"] == null) {
                weatherInfo.dayPart.weatherLocs[i] = {noReport:true,displayname:((i ==0 ) ? maincitycoords.displayname : locList[i-1].displayname),daytitle:"",hour:[{time:"",cond:"",icon:"",temp:"",wind:"",windspeed:""},{time:"",cond:"",icon:"",temp:"",wind:"",windspeed:""},{time:"",cond:"",icon:"",temp:"",wind:"",windspeed:""},{time:"",cond:"",icon:"",temp:"",wind:"",windspeed:""},]}
                weatherInfo.fiveDay.weatherLocs[i] = {noReport:true,displayname:((i ==0 ) ? maincitycoords.displayname : locList[i-1].displayname),day:[{name:"",cond:"",icon:"",high:"",low:"",windspeed:""},{name:"",cond:"",icon:"",high:"",low:"",windspeed:""},{name:"",cond:"",icon:"",high:"",low:"",windspeed:""},{name:"",cond:"",icon:"",high:"",low:"",windspeed:""},{name:"",cond:"",icon:"",high:"",low:"",windspeed:""}]}
              } else {
                //functions converting hourly data into daypart
                var indexes = calcHourlyReport(ajaxedLoc["v3-wx-forecast-hourly-2day"]);
                function buildHourlyTimeTitle(time){
                  var hour=dateFns.getHours(time);
                  if (hour===0) {
                    return 'Midnight';
                  } else if (hour===12){
                    return 'Noon';
                  }
                  return (dateFns.format(time,'h a')).replace(" ", "");
                }
                //get reporting hours: 12am, 6am, 12pm, 3pm, 5pm, 8pm...
                function calcHourlyReport(data) {
                  var ret = [],
                    targets = [0, 6, 12, 15, 17, 20],   // hours that we report
                    current = dateFns.getHours(new Date()),
                    now = new Date(),
                    //firsthour = targets[ getNextHighestIndex(targets, current) ],
                    start,
                    hour, hi=0;
    
                    switch (true) {
                      case (current < 3):
                        start = 6; //before 3:00
                      case (current < 9):
                        start = 12; break; //before 9:00 after 3:00
                      case (current < 12):
                        start = 15; break; //before 12:00 after 9:00
                      case (current < 14):
                        start = 17; break; //before 2:00 after 12:00
                      case (current < 17):
                        start = 6; break; //before 5:00 after 2:00
                      case (current < 20):
                          start = 6; break; //before 8:00 after 5:00
                      default:
                        start = 6;
                    }
                  while(ret.length<4){
                    // hour must be equal or greater than current
                    hour = dateFns.getHours(data.validTimeLocal[hi] );
                    if ( dateFns.isAfter(data.validTimeLocal[hi], now) && (hour==start || ret.length>0) )  {
                      if ( targets.indexOf(hour)>=0 ) { // it is in our target list so record its index
                        ret.push(hi);
                      }
                    }
                    hi++;
                  }
                  return ret;
                }
                function buildHourlyHeaderTitle(time) {
                  var today = new Date(),
                    tomorrow = dateFns.addDays(today, 1);
    
                  // title based on the first hour reported
                  switch (dateFns.getHours(time)) {
    
                  case 6: // 6 - Nextday's Forecast / Today's Forecast
                    // if 6am today
                    if (dateFns.isToday(time)) {
                      return "Today's Forecast";
                    }
                    case 0: // 0 - Nextday's Forecast
                      return "Tomorrow's Forecast";
    
                    case 12:
                      return "Today's Forecast";
    
                    case 15:
                      return "Today's Forecast";
    
                    case 17:
                      return "Tonight's Forecast";
    
                    case 20:
                      return "Tonight's Forecast"
                  }
                }
    
                var weatherLocsDP = {noReport:false,displayname:"",daytitle:"",hour:[{time:"",cond:"",icon:"",temp:"",wind:"",windspeed:""},{time:"",cond:"",icon:"",temp:"",wind:"",windspeed:""},{time:"",cond:"",icon:"",temp:"",wind:"",windspeed:""},{time:"",cond:"",icon:"",temp:"",wind:"",windspeed:""},]};
                weatherLocsDP.daytitle = buildHourlyHeaderTitle(ajaxedLoc["v3-wx-forecast-hourly-2day"].validTimeLocal[indexes[0]])
                for (var hi = 0; hi < 4; hi++) {
                  weatherLocsDP.hour[hi].time = buildHourlyTimeTitle(ajaxedLoc["v3-wx-forecast-hourly-2day"].validTimeLocal[indexes[hi]])
                  weatherLocsDP.hour[hi].cond = ajaxedLoc["v3-wx-forecast-hourly-2day"].wxPhraseLong[indexes[hi]].replace('Scattered ', "Sct'd ").replace('Thunderstorms',"T'Storms").replace('Thundershowers',"T'Showers").replace('/',', ');
                  weatherLocsDP.hour[hi].icon = ajaxedLoc["v3-wx-forecast-hourly-2day"].iconCode[indexes[hi]]
                  weatherLocsDP.hour[hi].temp = ajaxedLoc["v3-wx-forecast-hourly-2day"].temperature[indexes[hi]]
                  weatherLocsDP.hour[hi].wind = ajaxedLoc["v3-wx-forecast-hourly-2day"].windDirectionCardinal[indexes[hi]] + ' ' + ajaxedLoc["v3-wx-forecast-hourly-2day"].windSpeed[indexes[hi]]
                  weatherLocsDP.hour[hi].windspeed= ajaxedLoc["v3-wx-forecast-hourly-2day"].windSpeed[indexes[hi]]
                }
                weatherLocsDP.displayname = ((i ==0 ) ? maincitycoords.displayname : locList[i-1].displayname)
                weatherInfo.dayPart.weatherLocs[i] = weatherLocsDP
              }
              //daydesc
              if (ajaxedLoc["v3-wx-forecast-daily-5day"] == null) {
                weatherInfo.dayPart.weatherLocs[i] = {noReport:true,displayname:((i ==0 ) ? maincitycoords.displayname : locList[i-1].displayname),daytitle:"",hour:[{time:"",cond:"",icon:"",temp:"",wind:"",windspeed:""},{time:"",cond:"",icon:"",temp:"",wind:"",windspeed:""},{time:"",cond:"",icon:"",temp:"",wind:"",windspeed:""},{time:"",cond:"",icon:"",temp:"",wind:"",windspeed:""},]}
              } else {
                var weatherLocsDD = {noReport:false,displayname:"",day:[{name:"",desc:""},{name:"",desc:""},{name:"",desc:""},{name:"",desc:""}]}
                var daycorrection = 0;
                if (ajaxedLoc["v3-wx-forecast-daily-5day"].daypart[0].daypartName[0] == null) {
                  daycorrection = 1;
                }
                for (var hi = (ajaxedLoc["v3-wx-forecast-daily-5day"].daypart[0].daypartName[0] == null) ? 1 : 0; hi < 4 + daycorrection; hi++) {
                  weatherLocsDD.day[hi - daycorrection].name = (ajaxedLoc["v3-wx-forecast-daily-5day"].daypart[0].daypartName[hi].replace('Tomorrow', ajaxedLoc["v3-wx-forecast-daily-5day"].dayOfWeek[1]))
                  weatherLocsDD.day[hi - daycorrection].desc = ajaxedLoc["v3-wx-forecast-daily-5day"].daypart[0].narrative[hi] + ((ajaxedLoc["v3-wx-forecast-daily-5day"].daypart[0].qualifierPhrase[hi] != null && ajaxedLoc["v3-wx-forecast-daily-5day"].daypart[0].narrative[hi].includes(ajaxedLoc["v3-wx-forecast-daily-5day"].daypart[0].qualifierPhrase[hi]) === false) ? ajaxedLoc["v3-wx-forecast-daily-5day"].daypart[0].qualifierPhrase[hi] : '') + ((ajaxedLoc["v3-wx-forecast-daily-5day"].daypart[0].windPhrase[hi - daycorrection] != null && ajaxedLoc["v3-wx-forecast-daily-5day"].daypart[0].narrative[hi].includes(ajaxedLoc["v3-wx-forecast-daily-5day"].daypart[0].windPhrase[hi]) === false) ? ajaxedLoc["v3-wx-forecast-daily-5day"].daypart[0].windPhrase[hi] : '')
                }
                weatherLocsDD.displayname = ((i ==0 ) ? maincitycoords.displayname : locList[i-1].displayname)
                weatherInfo.dayDesc.weatherLocs[i] = weatherLocsDD
                //fiveday
                var weatherLocsFD = {noReport:false,displayname:"",day:[{name:"",cond:"",icon:"",high:"",low:"",windspeed:""},{name:"",cond:"",icon:"",high:"",low:"",windspeed:""},{name:"",cond:"",icon:"",high:"",low:"",windspeed:""},{name:"",cond:"",icon:"",high:"",low:"",windspeed:""},{name:"",cond:"",icon:"",high:"",low:"",windspeed:""}]};
                for (var hi = (ajaxedLoc["v3-wx-forecast-daily-5day"].daypart[0].daypartName[0] == null) ? 1 : 0, hidp = (ajaxedLoc["v3-wx-forecast-daily-5day"].daypart[0].daypartName[0] == null) ? 2 : 0; hi < 5 + daycorrection; hi++, hidp = hidp + 2) {
                  weatherLocsFD.day[hi - daycorrection].name = ajaxedLoc["v3-wx-forecast-daily-5day"].dayOfWeek[hi].substring(0,3)
                  weatherLocsFD.day[hi - daycorrection].icon = ajaxedLoc["v3-wx-forecast-daily-5day"].daypart[0].iconCode[hidp]
                  weatherLocsFD.day[hi - daycorrection].cond = ajaxedLoc["v3-wx-forecast-daily-5day"].daypart[0].wxPhraseLong[hidp].replace('Scattered ', "Sct'd ").replace('Thunderstorms',"T'Storms").replace('Thundershowers',"T'Showers")
                  weatherLocsFD.day[hi - daycorrection].high = ajaxedLoc["v3-wx-forecast-daily-5day"].temperatureMax[hi]
                  weatherLocsFD.day[hi - daycorrection].windspeed = ajaxedLoc["v3-wx-forecast-daily-5day"].daypart[0].windSpeed[hidp]
                  weatherLocsFD.day[hi - daycorrection].low = ajaxedLoc["v3-wx-forecast-daily-5day"].temperatureMin[hi]
                }
                weatherLocsFD.displayname = ((i ==0 ) ? maincitycoords.displayname : locList[i-1].displayname)
                weatherInfo.fiveDay.weatherLocs[i] = weatherLocsFD
              }
              //bulletin
              var weatherLocsWA = {displayname:"",pages:[],enabled: false};
              weatherLocsWA.displayname = ((i ==0 ) ? maincitycoords.displayname : locList[i-1].displayname)
              if (ajaxedLoc["v3alertsHeadlines"] != undefined){
                var displayday;
                var bulletintext = "";
                var ret = [];
                      var ai=0;
                      //info
                      //get only weather alers
                      for (ai=0; ai<=ajaxedLoc["v3alertsHeadlines"].alerts.length - 1; ai++) {
                          warning = ajaxedLoc["v3alertsHeadlines"].alerts[ai].categories[0].category;
                          if ((warning == "Met" && weatherInfo.bulletin.includesevereonbulletin == true) || (warning == "Met" && i != 0) || (warning == "Met" && ajaxedLoc["v3alertsHeadlines"].alerts[ai].eventDescription != "Severe Thunderstorm Warning" && ajaxedLoc["v3alertsHeadlines"].alerts[ai].eventDescription == "Flash Flood Warning" != ajaxedLoc["v3alertsHeadlines"].alerts[ai].eventDescription != "Tornado Warning"))  {
                              ret.push({idx:ai, priority: getWarningPosition(ajaxedLoc["v3alertsHeadlines"].alerts[ai].eventDescription)})
                          }
                      };
                      if (ret.length != 0) {
                          ret.sort(function(a,b) {return a.priority - b.priority;});
    
                for (ai of ret) {
                  var icount = 0;
                  getexpiredate = function(expiretime) {
                    dateFns.format(new Date(expiretime), "h:mm");
                    if (dateFns.isToday(expiretime) != true) {
                      var numday = dateFns.getDay(expiretime);
                      displayday = {"0":"SUN","1":"MON","2":"TUE","3":"WED","4":"THU","5":"FRI","6":"SAT"}[numday] + ".";
                    } else {
                      displayday = "Today."
                    }
                    return dateFns.format(new Date(expiretime), "h:mm A ") + displayday
                  }
                  if (icount != ret.length - 1) {
                    bulletintext += ajaxedLoc["v3alertsHeadlines"].alerts[ai.idx].eventDescription + " in effect until " + (getexpiredate(ajaxedLoc["v3alertsHeadlines"].alerts[ai.idx].expireTimeLocal) + "\n \n")
                  } else {
                    bulletintext += ajaxedLoc["v3alertsHeadlines"].alerts[ai.idx].eventDescription + " in effect until " + (getexpiredate(ajaxedLoc["v3alertsHeadlines"].alerts[ai.idx].expireTimeLocal) + "\n \n")
                  }
                  var icount = icount + 1;
                }
                
                function splitLines() {
    
                   var warningsplitstr = bulletintext.split(/(?![^\n]{1,40000}$)([^\n]{1,40000})\s/g)
                   warningsplitstr.pop()
                   warningsplitstr.pop()
                   var warningpageidx = 0;
                   var warninglineidx = 0;
                   warningsplitstr.forEach(warningline => {
                    if (warningline != "") {
                      if (warninglineidx == 0) {
                        weatherLocsWA.pages[warningpageidx] = ""
                      }
                    weatherLocsWA.pages[warningpageidx] += (warningline)
                    warninglineidx += 1;
                    if (warninglineidx == 7) {
                      warningpageidx += 1
                      warninglineidx = 0
                    }
                  }
                });
                }
                splitLines()
                weatherLocsWA.enabled = true
                weatherInfo.bulletin.weatherLocs[i] = weatherLocsWA
              }
            } else {weatherInfo.bulletin.weatherLocs[i] = weatherLocsWA}
          }
        });
      }).fail(function() {
        for (var i = 0; i < (locList.length+1); i++) {
          weatherInfo.currentCond.weatherLocs[i] = {noReport:true,displayname:((i ==0 ) ? maincitycoords.displayname : locList[i-1].displayname),temp:"",cond:"",icon:"",humid:"",dewpt:"",pressure:"",pressureTrend:"",wind:"",windspeed:"",gust:"",feelslike:{type:"",val:""}}
          weatherInfo.dayPart.weatherLocs[i] = {noReport:true,displayname:((i ==0 ) ? maincitycoords.displayname : locList[i-1].displayname),daytitle:"",hour:[{time:"",cond:"",icon:"",temp:"",wind:"",windspeed:""},{time:"",cond:"",icon:"",temp:"",wind:"",windspeed:""},{time:"",cond:"",icon:"",temp:"",wind:"",windspeed:""},{time:"",cond:"",icon:"",temp:"",wind:"",windspeed:""},]};
          weatherInfo.dayDesc.weatherLocs[i] = {noReport:true,displayname:((i ==0 ) ? maincitycoords.displayname : locList[i-1].displayname),day:[{name:"",desc:""},{name:"",desc:""},{name:"",desc:""},{name:"",desc:""}]}
          weatherInfo.fiveDay.weatherLocs[i] = {noReport:true,displayname:((i ==0 ) ? maincitycoords.displayname : locList[i-1].displayname),day:[{name:"",cond:"",icon:"",high:"",low:"",windspeed:""},{name:"",cond:"",icon:"",high:"",low:"",windspeed:""},{name:"",cond:"",icon:"",high:"",low:"",windspeed:""},{name:"",cond:"",icon:"",high:"",low:"",windspeed:""},{name:"",cond:"",icon:"",high:"",low:"",windspeed:""}]};
          weatherInfo.bulletin.weatherLocs[i] = {displayname:((i ==0 ) ? maincitycoords.displayname : locList[i-1].displayname),pages:[],enabled: false};
        }
      })
    }
    function grabSideandLowerBarData() {
      weatherInfo.bulletin.marqueewarnings = [];
      weatherInfo.bulletin.severewarnings = [];
      var url = "https://api.weather.com/v3/aggcommon/v3alertsHeadlines;v3-wx-forecast-daily-5day;v3-wx-observations-current;v3-wx-forecast-hourly-2day?geocodes="
      url += `${maincitycoords.lat},${maincitycoords.lon};`
      url += "&language=en-US&units=e&format=json&apiKey=" + api_key
      $.getJSON(url, function(data) {
        //console.log(url);
            var ajaxedLoc = data[0]
            if (ajaxedLoc == null) {
              weatherInfo.currentCond.sidebar.displayname = maincitycoords.displayname
              weatherInfo.currentCond.sidebar.noReport = true
              weatherInfo.dayPart.lowerbar.displayname = maincitycoords.displayname
              weatherInfo.dayPart.lowerbar.noReport = true
              weatherInfo.dayDesc.lowerbar.displayname = maincitycoords.displayname
              weatherInfo.dayDesc.lowerbar.noReport = true
              weatherInfo.fiveDay.lowerbar.displayname = maincitycoords.displayname
              weatherInfo.fiveDay.lowerbar.noReport = true
            } else {
              if (ajaxedLoc["v3-wx-observations-current"] == null) {
                weatherInfo.currentCond.sidebar.displayname = maincitycoords.displayname
                weatherInfo.currentCond.sidebar.noReport = true
              } else {
                weatherInfo.currentCond.sidebar.temp = ajaxedLoc["v3-wx-observations-current"].temperature
                weatherInfo.currentCond.sidebar.cond = ajaxedLoc["v3-wx-observations-current"].wxPhraseLong
                weatherInfo.currentCond.sidebar.icon = ajaxedLoc["v3-wx-observations-current"].iconCode
                weatherInfo.currentCond.sidebar.humid = ajaxedLoc["v3-wx-observations-current"].relativeHumidity
                weatherInfo.currentCond.sidebar.dewpt = ajaxedLoc["v3-wx-observations-current"].temperatureDewPoint
                weatherInfo.currentCond.sidebar.pressure = (ajaxedLoc["v3-wx-observations-current"].pressureAltimeter).toFixed(2)
                weatherInfo.currentCond.sidebar.pressureTrend = ((ajaxedLoc["v3-wx-observations-current"].pressureTendencyCode === 1 || ajaxedLoc["v3-wx-observations-current"].pressureTendencyCode === 3) ? ' IN.' : (ajaxedLoc["v3-wx-observations-current"].pressureTendencyCode === 2 || ajaxedLoc["v3-wx-observations-current"].pressureTendencyCode === 4) ? ' F' : ' R')
                weatherInfo.currentCond.sidebar.wind = ((ajaxedLoc["v3-wx-observations-current"].windDirectionCardinal == "CALM" || ajaxedLoc["v3-wx-observations-current"].windSpeed == 0) ? 'calm' :  ajaxedLoc["v3-wx-observations-current"].windDirectionCardinal) + '  ' + ((ajaxedLoc["v3-wx-observations-current"].windSpeed === 0) ? ' ' : ajaxedLoc["v3-wx-observations-current"].windSpeed + ' MPH')
                weatherInfo.currentCond.sidebar.windspeed = ajaxedLoc["v3-wx-observations-current"].windSpeed
                weatherInfo.currentCond.sidebar.gust = ((ajaxedLoc["v3-wx-observations-current"].windGust!=undefined) ? ajaxedLoc["v3-wx-observations-current"].windGust + " mph" : "none")
                weatherInfo.currentCond.sidebar.visibility = ajaxedLoc["v3-wx-observations-current"].visibility
                weatherInfo.currentCond.sidebar.uvidx = ajaxedLoc["v3-wx-observations-current"].uvDescription
                weatherInfo.currentCond.sidebar.ceiling = ajaxedLoc["v3-wx-observations-current"].cloudCeiling
                weatherInfo.currentCond.sidebar.feelslike.type = ((ajaxedLoc["v3-wx-observations-current"].temperature >= 65 ? "HEAT INDEX" : "WIND CHILL"))
                weatherInfo.currentCond.sidebar.feelslike.val = ajaxedLoc["v3-wx-observations-current"].temperatureFeelsLike
                weatherInfo.currentCond.sidebar.windChill = ajaxedLoc["v3-wx-observations-current"].temperatureWindChill
                weatherInfo.currentCond.sidebar.displayname = maincitycoords.displayname
              }
              //day part
              if (ajaxedLoc["v3-wx-forecast-hourly-2day"] == null) {
                weatherInfo.dayPart.lowerbar.displayname = maincitycoords.displayname
                weatherInfo.dayPart.lowerbar.noReport = true
              } else {
                //functions converting hourly data into daypart
                var indexes = calcHourlyReport(ajaxedLoc["v3-wx-forecast-hourly-2day"]);
                function buildHourlyTimeTitle(time){
                  var hour=dateFns.getHours(time);
                  if (hour===0) {
                    return 'Midnight';
                  } else if (hour===12){
                    return 'Noon';
                  }
                  return (dateFns.format(time,'h a'))//.replace(" ", "");
                }
                //get reporting hours: 12am, 6am, 12pm, 3pm, 5pm, 8pm...
                function calcHourlyReport(data) {
                  var ret = [],
                    targets = [0, 6, 12, 15, 17, 20],   // hours that we report
                    current = dateFns.getHours(new Date()),
                    now = new Date(),
                    //firsthour = targets[ getNextHighestIndex(targets, current) ],
                    start,
                    hour, hi=0;
    
                  switch (true) {
                    case (current < 3):
                      start = 6; //before 3:00
                    case (current < 9):
                      start = 12; break; //before 9:00 after 3:00
                    case (current < 12):
                      start = 15; break; //before 12:00 after 9:00
                    case (current < 14):
                      start = 17; break; //before 2:00 after 12:00
                    case (current < 17):
                      start = 20; break; //before 5:00 after 2:00
                    case (current < 20):
                        start = 0; break; //before 8:00 after 5:00
                    default:
                      start = 6;
                  }
                  while(ret.length<4){
                    // hour must be equal or greater than current
                    hour = dateFns.getHours(data.validTimeLocal[hi] );
                    if ( dateFns.isAfter(data.validTimeLocal[hi], now) && (hour==start || ret.length>0) )  {
                      if ( targets.indexOf(hour)>=0 ) { // it is in our target list so record its index
                        ret.push(hi);
                      }
                    }
                    hi++;
                  }
                  return ret;
                }
                function buildHourlyHeaderTitle(time) {
                  var today = new Date(),
                    tomorrow = dateFns.addDays(today, 1);
                    sforecast = "'s Forecast";
    
                  // title based on the first hour reported
                  switch (dateFns.getHours(time)) {
    
                    case 6: // 6 - Nextday's Forecast / Today's Forecast
                          // if 6am today
                          if (dateFns.isToday(time)) {
                              return dateFns.format(today, 'dddd') + sforecast;
                          }
                      case 0: // 0 - Nextday's Forecast
                          return dateFns.format(tomorrow, 'dddd') + sforecast;
    
                      case 12:
                          return 'This Afternoon';
    
                      case 15:
                          return "Today's Forecast";
    
                      case 17:
                          return "Tonight's Forecast";
    
                      case 20:
                          return dateFns.format(today, 'ddd') + ' Night/' + dateFns.format(tomorrow, 'ddd');
    
                  }
                }
    
                weatherInfo.dayPart.lowerbar.daytitle = buildHourlyHeaderTitle(ajaxedLoc["v3-wx-forecast-hourly-2day"].validTimeLocal[indexes[0]])
                for (var hi = 0; hi < 4; hi++) {
                  weatherInfo.dayPart.lowerbar.hour[hi].time = buildHourlyTimeTitle(ajaxedLoc["v3-wx-forecast-hourly-2day"].validTimeLocal[indexes[hi]])
                  weatherInfo.dayPart.lowerbar.hour[hi].cond = ajaxedLoc["v3-wx-forecast-hourly-2day"].wxPhraseLong[indexes[hi]].replace('Scattered ', "Sct'd ").replace('Thunderstorms',"T'Storms").replace('Thundershowers',"T'Showers").replace('/',', ')
                  weatherInfo.dayPart.lowerbar.hour[hi].icon = ajaxedLoc["v3-wx-forecast-hourly-2day"].iconCode[indexes[hi]]
                  weatherInfo.dayPart.lowerbar.hour[hi].temp = ajaxedLoc["v3-wx-forecast-hourly-2day"].temperature[indexes[hi]]
                  weatherInfo.dayPart.lowerbar.hour[hi].wind = ajaxedLoc["v3-wx-forecast-hourly-2day"].windDirectionCardinal[indexes[hi]] + ' ' + ajaxedLoc["v3-wx-forecast-hourly-2day"].windSpeed[indexes[hi]]
                  weatherInfo.dayPart.lowerbar.hour[hi].windspeed= ajaxedLoc["v3-wx-forecast-hourly-2day"].windSpeed[indexes[hi]]
                }
                weatherInfo.dayPart.lowerbar.displayname = maincitycoords.displayname
              }
              //daydescANDfiveday
              if (ajaxedLoc["v3-wx-forecast-daily-5day"] == null) {
                weatherInfo.dayDesc.lowerbar.displayname = maincitycoords.displayname
                weatherInfo.dayDesc.lowerbar.noReport = true
                weatherInfo.fiveDay.lowerbar.displayname = maincitycoords.displayname
                weatherInfo.fiveDay.lowerbar.noReport = true
              } else {
                var daycorrection = 0;
                if (ajaxedLoc["v3-wx-forecast-daily-5day"].daypart[0].daypartName[0] == null) {
                  daycorrection = 1;
                }
                //daydesc
                for (var hi = (ajaxedLoc["v3-wx-forecast-daily-5day"].daypart[0].daypartName[0] == null) ? 1 : 0; hi < 4 + daycorrection; hi++) {
                  weatherInfo.dayDesc.lowerbar.day[hi - daycorrection].name = (ajaxedLoc["v3-wx-forecast-daily-5day"].daypart[0].daypartName[hi].replace('Tomorrow', ajaxedLoc["v3-wx-forecast-daily-5day"].dayOfWeek[1]))
                  weatherInfo.dayDesc.lowerbar.day[hi - daycorrection].desc = ajaxedLoc["v3-wx-forecast-daily-5day"].daypart[0].narrative[hi] + ((ajaxedLoc["v3-wx-forecast-daily-5day"].daypart[0].qualifierPhrase[hi] != null && ajaxedLoc["v3-wx-forecast-daily-5day"].daypart[0].narrative[hi].includes(ajaxedLoc["v3-wx-forecast-daily-5day"].daypart[0].qualifierPhrase[hi]) === false) ? ajaxedLoc["v3-wx-forecast-daily-5day"].daypart[0].qualifierPhrase[hi] : '') + ((ajaxedLoc["v3-wx-forecast-daily-5day"].daypart[0].windPhrase[hi - daycorrection] != null && ajaxedLoc["v3-wx-forecast-daily-5day"].daypart[0].narrative[hi].includes(ajaxedLoc["v3-wx-forecast-daily-5day"].daypart[0].windPhrase[hi]) === false) ? ajaxedLoc["v3-wx-forecast-daily-5day"].daypart[0].windPhrase[hi] : '')
                }
                weatherInfo.dayDesc.lowerbar.displayname =  maincitycoords.displayname
                //fiveday
                var weatherLocsFD = {displayname:"",day:[{name:"",cond:"",desc:"",icon:"",high:"",low:""},{name:"",desc:"",cond:"",icon:"",high:"",low:""},{name:"",desc:"",cond:"",icon:"",high:"",low:""},{name:"",desc:"",cond:"",icon:"",high:"",low:""},{name:"",desc:"",cond:"",icon:"",high:"",low:""}]};
                for (var hi = (ajaxedLoc["v3-wx-forecast-daily-5day"].daypart[0].daypartName[0] == null) ? 1 : 0, hidp = (ajaxedLoc["v3-wx-forecast-daily-5day"].daypart[0].daypartName[0] == null) ? 2 : 0; hi < 5 + daycorrection; hi++, hidp = hidp + 2) {
                  weatherInfo.fiveDay.lowerbar.day[hi - daycorrection].name = ajaxedLoc["v3-wx-forecast-daily-5day"].dayOfWeek[hi]
                  weatherInfo.fiveDay.lowerbar.day[hi - daycorrection].windspeed = ajaxedLoc["v3-wx-forecast-daily-5day"].daypart[0].windSpeed[hidp]
                  weatherInfo.fiveDay.lowerbar.day[hi - daycorrection].icon = ajaxedLoc["v3-wx-forecast-daily-5day"].daypart[0].iconCode[hidp]
                  weatherInfo.fiveDay.lowerbar.day[hi - daycorrection].cond = ajaxedLoc["v3-wx-forecast-daily-5day"].daypart[0].wxPhraseLong[hidp].replace('Thunderstorms',"T'Storms").replace('Thundershowers',"T'Showers").replace('/',', ');
                  weatherInfo.fiveDay.lowerbar.day[hi - daycorrection].high = ajaxedLoc["v3-wx-forecast-daily-5day"].temperatureMax[hi]
                  weatherInfo.fiveDay.lowerbar.day[hi - daycorrection].low = ajaxedLoc["v3-wx-forecast-daily-5day"].temperatureMin[hi]
                  weatherInfo.fiveDay.lowerbar.day[hi - daycorrection].desc = ajaxedLoc["v3-wx-forecast-daily-5day"].narrative[hi]
                  weatherInfo.fiveDay.lowerbar.day[hi - daycorrection].weekend = ((dateFns.isWeekend(ajaxedLoc["v3-wx-forecast-daily-5day"].validTimeLocal[hi])) ? ' weekend' : '')
                }
                weatherInfo.fiveDay.lowerbar.displayname =  maincitycoords.displayname
              }
              //bulletin
              if (ajaxedLoc["v3alertsHeadlines"] != undefined){
                var displayday;
                var bulletintext = "";
                var ret = [], sret = [];
                      var ai=0;
                      //info
                      //get only weather alers
                for (ai=0; ai<=ajaxedLoc["v3alertsHeadlines"].alerts.length - 1; ai++) {
                          warning = ajaxedLoc["v3alertsHeadlines"].alerts[ai].categories[0].category;
                          if (warning == "Met")  {
                              ret.push({idx:ai, priority: getWarningPosition(ajaxedLoc["v3alertsHeadlines"].alerts[ai].eventDescription)})
                              if (ajaxedLoc["v3alertsHeadlines"].alerts[ai].eventDescription == "Severe Thunderstorm Warning" || ajaxedLoc["v3alertsHeadlines"].alerts[ai].eventDescription == "Flash Flood Warning" || ajaxedLoc["v3alertsHeadlines"].alerts[ai].eventDescription == "Tornado Warning") {
                                  sret.push({idx:ai, priority:ajaxedLoc["v3alertsHeadlines"].alerts[ai].eventDescription})
                              }
                          }
                      };
                      if (ret.length != 0) {
                          ret.sort(function(a,b) {return a.priority - b.priority;});
                    function pushAlert(aai) {
                      $.getJSON('https://api.weather.com/v3/alerts/detail?alertId='+ ajaxedLoc["v3alertsHeadlines"].alerts[ret[aai].idx].detailKey +'&format=json&language=en-US&apiKey=' + api_key, function(adata) {
                        var alertt = {name:"", desc:"", status:"", significance:""}
                        alertt.name = ajaxedLoc["v3alertsHeadlines"].alerts[ret[aai].idx].eventDescription
                        alertt.significance = ajaxedLoc["v3alertsHeadlines"].alerts[ret[aai].idx].significance
                        alertt.status = ((ajaxedLoc["v3alertsHeadlines"].alerts[ret[aai].idx].messageType == " Update") ? 'UPDATE' : (ajaxedLoc["v3alertsHeadlines"].alerts[ret[aai].idx].messageType == "Cancel") ? "CANCELLATION" : "")
                        alertt.desc = adata.alertDetail.texts[0].description
                        weatherInfo.bulletin.marqueewarnings.push(alertt)
                        if (aai < (ret.length - 1)) {pushAlert(aai + 1)};
                      });
                    };
                    pushAlert(0)
                  }
    
                  if (sret.length != 0) {
                    weatherInfo.bulletin.severeweathermode = true;
                            sret.sort(function(a,b) {return a.priority - b.priority;});
                    function pushSevereAlert(aai) {
                      $.getJSON('https://api.weather.com/v3/alerts/detail?alertId='+ ajaxedLoc["v3alertsHeadlines"].alerts[sret[aai].idx].detailKey +'&format=json&language=en-US&apiKey=' + api_key, function(sdata) {
                        var severewarn = {warningname:"", warningdesc:"", warningstatus:""}
                        severewarn.warningname = ajaxedLoc["v3alertsHeadlines"].alerts[sret[aai].idx].eventDescription
                        severewarn.warningstatus = ((ajaxedLoc["v3alertsHeadlines"].alerts[sret[aai].idx].messageType == "Update") ? 'UPDATE' : (ajaxedLoc["v3alertsHeadlines"].alerts[sret[aai].idx].messageType == "Cancel") ? "CANCELLATION" : "")
                        severewarn.warningdesc = sdata.alertDetail.texts[0].description
                        weatherInfo.bulletin.severewarnings.push(severewarn)
                        if (aai < (sret.length - 1)) {pushSevereAlert(aai + 1)};
                      });
                    };
                    pushSevereAlert(0)
                  } else {
                    weatherInfo.bulletin.severeweathermode = false;
                  }
        };
      }
      }).fail(function() {
        weatherInfo.currentCond.sidebar.displayname = maincitycoords.displayname
        weatherInfo.currentCond.sidebar.noReport = true
        weatherInfo.dayPart.lowerbar.displayname = maincitycoords.displayname
        weatherInfo.dayPart.lowerbar.noReport = true
        weatherInfo.dayDesc.lowerbar.displayname = maincitycoords.displayname
        weatherInfo.dayDesc.lowerbar.noReport = true
        weatherInfo.fiveDay.lowerbar.displayname = maincitycoords.displayname
        weatherInfo.fiveDay.lowerbar.noReport = true
      });
    }
    function grabalmanacSlidesData() {
      urltod = 'https://api.weather.com/v3/aggcommon/v3-wx-almanac-daily-1day;v3-wx-observations-current?geocode=' + maincitycoords.lat + ',' + maincitycoords.lon + "&format=json&language=en-US&units=e" + "&day=" + dateFns.format(new Date(), "D") + "&month=" + dateFns.format(new Date(),"M") + "&apiKey=" + api_key
        $.getJSON(urltod, function(data) {
          //console.log(urltod)
          if (data == null) {
            weatherInfo.almanactod.displayname = maincitycoords.displayname
            weatherInfo.almanactod.noReport = true
          } else {
            weatherInfo.almanactod.displayname = maincitycoords.displayname
            weatherInfo.almanactod.date = dateFns.format(new Date(),"MMMM D")
            weatherInfo.almanactod.avghigh = data["v3-wx-almanac-daily-1day"].temperatureAverageMax[0]
            weatherInfo.almanactod.avglow = data["v3-wx-almanac-daily-1day"].temperatureAverageMin[0]
            weatherInfo.almanactod.rechigh = data["v3-wx-almanac-daily-1day"].temperatureRecordMax[0]
            weatherInfo.almanactod.reclow = data["v3-wx-almanac-daily-1day"].temperatureRecordMin[0]
            weatherInfo.almanactod.rechighyear = data["v3-wx-almanac-daily-1day"].almanacRecordYearMax[0]
            weatherInfo.almanactod.reclowyear = data["v3-wx-almanac-daily-1day"].almanacRecordYearMin[0]
            weatherInfo.almanactod.sunset = dateFns.format(new Date(data["v3-wx-observations-current"].sunsetTimeLocal),"h:mm a")
            weatherInfo.almanactod.sunrise = dateFns.format(new Date(data["v3-wx-observations-current"].sunriseTimeLocal),"h:mm a")
            weatherInfo.almanactod.avgprecip = data["v3-wx-almanac-daily-1day"].precipitationAverage[0]
          }
        }).fail(function() {
          weatherInfo.almanactod.displayname = maincitycoords.displayname
          weatherInfo.almanactod.noReport = true
        });
        let almanactomorrow = new Date();
        almanactomorrow.setDate(almanactomorrow.getDate() + 1);
        urltom = 'https://api.weather.com/v3/aggcommon/v3-wx-almanac-daily-1day;v3-wx-forecast-daily-3day;v3-wx-observations-current?geocode=' + maincitycoords.lat + ',' + maincitycoords.lon + "&format=json&language=en-US&units=e" + "&day=" + dateFns.format(almanactomorrow, "D") + "&month=" + dateFns.format(almanactomorrow,"M") + "&apiKey=" + api_key
        $.getJSON(urltom, function(data) {
          if (data == null) {
            weatherInfo.almanactom.displayname = maincitycoords.displayname
            weatherInfo.almanactom.noReport = true
          } else {
            weatherInfo.almanactom.displayname = maincitycoords.displayname
            weatherInfo.almanactom.date = dateFns.format(new Date(),"MMMM D")
            weatherInfo.almanactom.avghigh = data["v3-wx-almanac-daily-1day"].temperatureAverageMax[0]
            weatherInfo.almanactom.avglow = data["v3-wx-almanac-daily-1day"].temperatureAverageMin[0]
            weatherInfo.almanactom.rechigh = data["v3-wx-almanac-daily-1day"].temperatureRecordMax[0]
            weatherInfo.almanactom.reclow = data["v3-wx-almanac-daily-1day"].temperatureRecordMin[0]
            weatherInfo.almanactom.rechighyear = data["v3-wx-almanac-daily-1day"].almanacRecordYearMax[0]
            weatherInfo.almanactom.reclowyear = data["v3-wx-almanac-daily-1day"].almanacRecordYearMin[0]
            weatherInfo.almanactom.sunset = dateFns.format(new Date(data["v3-wx-forecast-daily-3day"].sunsetTimeLocal[1]),"h:mm a")
            weatherInfo.almanactom.sunrise = dateFns.format(new Date(data["v3-wx-forecast-daily-3day"].sunriseTimeLocal[1]),"h:mm a")
          }
        }).fail(function() {
          weatherInfo.almanactom.displayname = maincitycoords.displayname
          weatherInfo.almanactom.noReport = true
        });
        var phasesfound = 0;
        $.getJSON(`https://www.icalendar37.net/lunar/api/?lang=en&month=${dateFns.format(new Date(),"M")}&year=${dateFns.format(new Date(),"YYYY")}`, function(data) {
         
          for (phase in data.phase) {
            
            if (data.phase[phase].isPhaseLimit && phasesfound < 4 && phase > parseInt(dateFns.format(new Date(),"D"))) {
              weatherInfo.almanactod.moonphases[phasesfound].name = {"new moon": "NEW", "first quarter": "FIRST", "full moon": "FULL", "last quarter": "LAST"}[(data.phase[phase].phaseName).toLowerCase()]
              weatherInfo.almanactod.moonphases[phasesfound].date = String(data.monthName).slice(0,3) + " " + phase
              phasesfound += 1;
            }
          }
          if (phasesfound < 4) {
            nextMonth()
          }
        })
        function nextMonth() {
          $.getJSON(`https://www.icalendar37.net/lunar/api/?lang=en&month=${dateFns.format((dateFns.addMonths(new Date(),1)),"M")}&year=${dateFns.format(dateFns.addMonths(new Date(),1),"YYYY")}`, function(data) {
            for (phase in data.phase) {
              if (data.phase[phase].isPhaseLimit && phasesfound < 4) {
                weatherInfo.almanactod.moonphases[phasesfound].name = {"new moon": "NEW", "first quarter": "FIRST", "full moon": "FULL", "last quarter": "LAST"}[(data.phase[phase].phaseName).toLowerCase()]
                weatherInfo.almanactod.moonphases[phasesfound].date = String(data.monthName).slice(0,3) + " " + phase
                phasesfound += 1;
              }
            }
          })
        }
    }
    function grabHealthData() {
      $.getJSON('https://api.weather.com/v3/wx/forecast/daily/5day?geocode='+ maincitycoords.lat + ',' + maincitycoords.lon +"&format=json&language=en-US&units=e&apiKey=" + api_key, function(data) {
        var healthforecastdata = data
        var starthidx = 0;
        var starthidxdayonly = 0;
        if (healthforecastdata.daypart[0].daypartName[0] == undefined) {
          starthidx = 2;
          starthidxdayonly = 1;
          weatherInfo.healthforecast.dayidx = 2;
        }
        weatherInfo.healthforecast.displayname = maincitycoords.displayname
        weatherInfo.healthforecast.day = healthforecastdata.dayOfWeek[starthidxdayonly];
        weatherInfo.healthforecast.icon = healthforecastdata.daypart[0].iconCode[starthidx]
        weatherInfo.healthforecast.high = healthforecastdata.temperatureMax[starthidxdayonly]
        weatherInfo.healthforecast.low = healthforecastdata.temperatureMin[starthidxdayonly]
        weatherInfo.healthforecast.precipChance = healthforecastdata.daypart[0].precipChance[starthidx] + '%'
        weatherInfo.healthforecast.humid = healthforecastdata.daypart[0].relativeHumidity[starthidx] + '%'
        weatherInfo.healthforecast.wind = (((healthforecastdata.daypart[0].windDirectionCardinal[starthidx] == "CALM") ? 'calm' :  healthforecastdata.daypart[0].windDirectionCardinal[starthidx]) + ' ' + ((healthforecastdata.daypart[0].windSpeed[starthidx] === 0) ? '' : healthforecastdata.daypart[0].windSpeed[starthidx]))
        weatherInfo.healthforecast.windspeed = healthforecastdata.daypart[0].windSpeed[starthidx]
      });
      $.getJSON('https://api.weather.com/v1/geocode/'+ maincitycoords.lat + '/' + maincitycoords.lon + '/observations/pollen.json?language=en-US&apiKey=' + api_key, function(pollendata) {
        if (pollendata.pollenobservations !== undefined) {
        if (pollendata.pollenobservations[0].stn_cmnt != "No Report" && pollendata.pollenobservations[0].stn_cmnt != "Equipment Failure" && pollendata.pollenobservations[0].stn_cmnt != "Reports only during weed pollen season" && pollendata.pollenobservations[0].stn_cmnt != "Does not report year round" && pollendata.pollenobservations[0].stn_cmnt != "Reports Suspended") {
          if (pollendata.pollenobservations[0].total_pollen_cnt <= 9) {
            weatherInfo.healthPollen.totalcat = 'Low'
          } else if (pollendata.pollenobservations[0].total_pollen_cnt >= 10 && pollendata.pollenobservations[0].total_pollen_cnt <= 49) {
            weatherInfo.healthPollen.totalcat = 'Moderate'
          } else if (pollendata.pollenobservations[0].total_pollen_cnt >= 50 && pollendata.pollenobservations[0].total_pollen_cnt <= 499) {
            weatherInfo.healthPollen.totalcat = 'High'
          } else if (pollendata.pollenobservations[0].total_pollen_cnt >= 500) {
            weatherInfo.healthPollen.totalcat = 'Very High'
          };
            weatherInfo.healthPollen.total = pollendata.pollenobservations[0].total_pollen_cnt
            weatherInfo.healthPollen.types[0].treetype = ((pollendata.pollenobservations[0].treenames[0].tree_nm != "No Report") ? pollendata.pollenobservations[0].treenames[0].tree_nm : "")
            weatherInfo.healthPollen.date = dateFns.format(new Date(pollendata.pollenobservations[0].rpt_dt), "MMMM D")
            var pollentypes = ['tree', 'grass', 'weed', 'mold'];
            pollentypes.forEach((pollentype, i) => {
              weatherInfo.healthPollen.types[i].pollenidx = pollendata.pollenobservations[0].pollenobservation[i].pollen_idx
            });
        }
        }
      });
      $.getJSON('https://api.weather.com/v2/indices/achePain/daypart/3day?geocode=' + maincitycoords.lat + ',' + maincitycoords.lon + "&language=en-US&format=json&apiKey=" + api_key, function(data) {
        var achesindexdata = data
        var startidx = 0;
        if (achesindexdata.achesPainsIndex12hour.dayInd[0] == 'N') {
          startidx = 1;
        }
        weatherInfo.healthAcheBreath.achesindex = achesindexdata.achesPainsIndex12hour.achesPainsIndex[startidx]
        weatherInfo.healthAcheBreath.achescat = achesindexdata.achesPainsIndex12hour.achesPainsCategory[startidx]
        weatherInfo.healthAcheBreath.date = dateFns.format(new Date(achesindexdata.achesPainsIndex12hour.fcstValidLocal[0]), "dddd")
      });
      $.getJSON('https://api.weather.com/v2/indices/breathing/daypart/3day?geocode=' + maincitycoords.lat + ',' + maincitycoords.lon + "&language=en-US&format=json&apiKey=" + api_key, function(data) {
        var breathindexdata = data
        var startidx = 0;
        if (breathindexdata.breathingIndex12hour.dayInd[0] == 'N') {
          startidx = 1;
        }
        weatherInfo.healthAcheBreath.breathindex = breathindexdata.breathingIndex12hour.breathingIndex[startidx]
        weatherInfo.healthAcheBreath.breathcat = breathindexdata.breathingIndex12hour.breathingCategory[startidx]
      });
      $.getJSON('https://api.weather.com/v3/wx/globalAirQuality?geocode=' + maincitycoords.lat + ',' + maincitycoords.lon + "&language=en-US&scale=EPA&format=json&apiKey=" + api_key, function(data) {
        var airqualitydata = data
        weatherInfo.airquality.airqualityindex = airqualitydata.globalairquality.airQualityCategoryIndex
        weatherInfo.airquality.primarypolute = (airqualitydata.globalairquality.primaryPollutant).replace('PM10','Fine Particulate').replace('PM2.5','Fine Particulate').replace('O3','Ozone')
        weatherInfo.airquality.date = dateFns.format(new Date(airqualitydata.globalairquality.expireTimeGmt * 1000), "dddd")
      });
      $.getJSON('https://api.weather.com/v2/indices/uv/current?geocode=' + maincitycoords.lat + ',' + maincitycoords.lon + "&language=en-US&format=json&apiKey=" + api_key, function(data) {
        var uvData = data
        weatherInfo.uvindex.currentuv.index = uvData.uvIndexCurrent.uvIndex
        weatherInfo.uvindex.currentuv.desc = uvData.uvIndexCurrent.uvDesc
      });
      $.getJSON('https://api.weather.com/v2/indices/uv/hourly/48hour?geocode=' + maincitycoords.lat + ',' + maincitycoords.lon + "&language=en-US&format=json&apiKey=" + api_key, function(data) {
        var uvData = data
        var indexes = calcHourlyReport(uvData.uvIndex1hour);
        var i;
        for (var i = 0; i < 3; i++) {
          weatherInfo.uvindex.forecast[i].day = dateFns.format(new Date(uvData.uvIndex1hour.fcstValidLocal[indexes[i]]), 'ddd')
          weatherInfo.uvindex.forecast[i].time = buildHourlyTimeTitle(uvData.uvIndex1hour.fcstValidLocal[indexes[i]])
          weatherInfo.uvindex.forecast[i].index = uvData.uvIndex1hour.uvIndex[indexes[i]]
          weatherInfo.uvindex.forecast[i].desc = uvData.uvIndex1hour.uvDesc[indexes[i]]
        }
    
        //get reporting hours: 6am, 12pm, 3pm
        function buildHourlyTimeTitle(time){
          var hour=dateFns.getHours(time);
          return (dateFns.format(time,'h a')).replace(" ", "");
        }
        function calcHourlyReport(data) {
          var hret = [],
            targets = [9, 12, 15],   // hours that we report
            current = dateFns.getHours(new Date()),
            now = new Date(),
            //firsthour = targets[ getNextHighestIndex(targets, current) ],
            start,
            hour, i=0;
          switch (true) {
            case (current < 6):
              start = 9;
            case (current < 9):
              start = 12; break;
            case (current < 12):
              start = 15; break;
            case (current < 13):
              start = 9; break;
            default:
              start = 9;
          }
          while(hret.length<3){
    
            // hour must be equal or greater than current
            hour = dateFns.getHours(data.fcstValidLocal[i] );
            if ( dateFns.isAfter(data.fcstValidLocal[i], now) && (hour==start || hret.length>0) )  {
    
              if ( targets.indexOf(hour)>=0 ) { // it is in our target list so record its index
                hret.push(i);
              }
    
            }
            i++;
          }
          return hret;
        }
      })
    }
    /*function grabAirportDelayData() {
        $.getJSON('http://'+document.location.hostname+':8081/https://nasstatus.faa.gov/api/airport-events', function(eventdata) {
          for (const airportevent of eventdata) {
            var airportdelay = {iata:"",type:"",amount:"",reason:""}
            if (airportevent.airportClosure) {
              airportdelay.iata = airportevent.airportId
              airportdelay.type = 'Closure'
              airportdelay.amount = 'Closed'
              airportdelay.amountmin = 99999999999999999999999999999999999999999999999999
              airportdelay.reason = ''
              weatherInfo.airport.delays.push(airportdelay)
            }
            if (airportevent.arrivalDelay) {
              airportdelay.iata = airportevent.airportId
              airportdelay.type = 'Arrival'
              airportdelay.amount = formatMinutes(airportevent.arrivalDelay.averageDelay)
              airportdelay.amountmin = airportevent.arrivalDelay.averageDelay
              airportdelay.reason = airportevent.arrivalDelay.reason
              weatherInfo.airport.delays.push(airportdelay)
            }
            if (airportevent.departureDelay) {
              airportdelay.iata = airportevent.airportId
              airportdelay.type = 'Departure'
              airportdelay.amount = formatMinutes(airportevent.departureDelay.averageDelay)
              airportdelay.amountmin = airportevent.departureDelay.averageDelay
              airportdelay.reason = airportevent.departureDelay.reason
              weatherInfo.airport.delays.push(airportdelay)
            }
            if (airportevent.groundDelay) {
              airportdelay.iata = airportevent.airportId
              airportdelay.type = 'Arrival'
              airportdelay.amount = formatMinutes(airportevent.groundDelay.avgDelay)
              airportdelay.amountmin = airportevent.groundDelay.avgDelay
              airportdelay.reason = airportevent.groundDelay.impactingCondition
              weatherInfo.airport.delays.push(airportdelay)
            }
            if (airportevent.groundStop) {
              airportdelay.iata = airportevent.airportId
              airportdelay.type = 'Arrival'
              airportdelay.amount = 'until...'
              airportdelay.reason = airportevent.groundStop.impactingCondition
              weatherInfo.airport.delays.push(airportdelay)
            }
          };
          grabAirportData()
        })
    }
    grabAirportDelayData()
    function grabAirportData() {
      var mairporturl = 'https://api.weather.com/v3/aggcommon/v3-location-point;v3-wx-observations-current?iataCodes='
      for (var i = 0; i < weatherInfo.airport.mainairports.length; i++) {
        mairporturl += weatherInfo.airport.mainairports[i].iata + ';'
      }
      mairporturl += '&language=en-US&units=e&format=json&apiKey='+ api_key
      //{displayname:"New York / LaGaurdia",iata:"LGA",delay:"No Delay",temp:""}
      $.getJSON(mairporturl, function(data) {
        weatherInfo.ccticker.ccairportdelays = []
        data.forEach((airport, i) => {
          var marqueedelay = {iato:"",type:"",amount:"",amountmin:0,reason:""};
          var airportdepartdelay = {iato:"",type:"",amount:"",amountmin:0,reason:""};
          var airportarrivaldelay = {iato:"",type:"",amount:"",amountmin:0,reason:""};
          var marqueeairport = {displayname:"",iata:"LGA",delay:"No Delay",temp:"",cond:""}
          weatherInfo.airport.mainairports[i].displayname = airport['v3-location-point'].location.airportName
          weatherInfo.airport.mainairports[i].temp = airport['v3-wx-observations-current'].temperature
          weatherInfo.airport.mainairports[i].cond = airport['v3-wx-observations-current'].wxPhraseLong
          weatherInfo.airport.mainairports[i].icon = airport['v3-wx-observations-current'].iconCode
          weatherInfo.airport.mainairports[i].windspeed = airport['v3-wx-observations-current'].windSpeed
          marqueeairport.displayname = airport['v3-location-point'].location.airportName
          marqueeairport.temp = airport['v3-wx-observations-current'].temperature
          marqueeairport.cond = airport['v3-wx-observations-current'].wxPhraseLong.toLowerCase();
          marqueeairport.iata = weatherInfo.airport.mainairports[i].iata
          for (const delay of weatherInfo.airport.delays) {
            if (delay.iata == weatherInfo.airport.mainairports[i].iata) {
              if (delay.amountmin > marqueedelay.amountmin) {
                marqueedelay = delay
                marqueeairport.delay = (delay.amount).replace('<em>','').replace('</em>','')
              }
              if (delay.type == 'Arrival') {
                if (delay.amountmin > airportarrivaldelay.amountmin) {
                  airportarrivaldelay = delay
                  weatherInfo.airport.mainairports[i].arrivals.delay = delay.amount
                  weatherInfo.airport.mainairports[i].arrivals.reason = delay.reason
                }
              } else if (delay.type == 'Departure') {
                if (delay.amountmin > airportdepartdelay.amountmin) {
                  airportdepartdelay = delay
                  weatherInfo.airport.mainairports[i].departures.delay = delay.amount
                  weatherInfo.airport.mainairports[i].departures.reason = delay.reason
                }
              } else if (delay.type == 'Closure'){
                airportdepartdelay = delay
                airportarrivaldelay = delay
                weatherInfo.airport.mainairports[i].arrivals.delay = 'Closed'
                weatherInfo.airport.mainairports[i].departures.delay = 'Closed'
              }
            }
          };
          weatherInfo.ccticker.ccairportdelays.push(marqueeairport)
        });
      });
    
      //otherairport
      var oairporturl = 'https://api.weather.com/v3/aggcommon/v3-wx-observations-current?iataCodes='
      for (var i = 0; i < weatherInfo.airport.otherairports.length; i++) {
        oairporturl += weatherInfo.airport.otherairports[i].iata + ';'
      }
      oairporturl += '&language=en-US&units=e&format=json&apiKey='+ api_key
      $.getJSON(oairporturl, function(data) {
        data.forEach((airport, i) => {
          var airportdelays = {iato:"",type:"",amount:"",amountmin:0,reason:""};
          weatherInfo.airport.otherairports[i].temp = airport['v3-wx-observations-current'].temperature
          weatherInfo.airport.otherairports[i].icon = airport['v3-wx-observations-current'].iconCode
          weatherInfo.airport.otherairports[i].windspeed = airport['v3-wx-observations-current'].windSpeed
          weatherInfo.airport.delays.forEach((delay, delayi) => {
            if (delay.iata == weatherInfo.airport.otherairports[i].iata) {
              if (delay.amountmin > airportdelays.amountmin) {
                airportdelays = delay
                weatherInfo.airport.otherairports[i].delay = delay.amount
              }
            }
          });
        });
      });
    }
    */
    
    /*function pullCCTickerData() {
      var ccurl = 'https://api.weather.com/v3/aggcommon/v3-wx-forecast-daily-5day;v3-wx-observations-current;v3-location-point?geocodes=';
      // ajax the latest observation
      if (ccTickerCitiesList.length != 0) {
        ccTickerCitiesList.forEach((loc, i) => {
          ccurl += `${loc.lat},${loc.lon};`
        });
        ccurl += '&language=en-US&units=e&format=json&apiKey='+ api_key
      } else {
        ccurl = 'https://api.weather.com/v3/aggcommon/v3-wx-forecast-daily-5day;v3-wx-observations-current;v3-location-point?geocodes=41.881832,-87.623177;44.986656,-93.258133;33.427204,-111.939896;46.877186,-96.789803;34.187042,-118.381256;33.660057,-117.998970;36.114647,-115.172813;21.315603,-157.858093;28.538336,-81.379234;43.0,-75.0;&language=en-US&units=e&format=json&apiKey='+ api_key
      }
      weatherInfo.ccticker.ccLocs = [];
      $.getJSON(ccurl, function(data) {
            data.forEach((locationdata, i) => {
              var ccLoc = {displayname:"",currentCond:{cond:"",temp:""},forecast:{cond:"",temp:""}}
              var marqueeidx = 1;
              if (locationdata['v3-wx-forecast-daily-5day'].daypart[0].daypartName[0] == undefined) {marqueeidx = 2;};
              if (locationdata['v3-wx-forecast-daily-5day'].daypart[0].daypartName[marqueeidx] == "Tonight") {weatherInfo.ccticker.arrow = 'tonight';} else {weatherInfo.ccticker.arrow = (locationdata['v3-wx-forecast-daily-5day'].dayOfWeek[1].substring(0,3)).toLowerCase()};
              ccLoc.displayname = locationdata['v3-location-point'].location.displayName + ': '
              ccLoc.currentCond.temp = locationdata['v3-wx-observations-current'].temperature
              ccLoc.currentCond.cond = (locationdata['v3-wx-observations-current'].wxPhraseLong)
              ccLoc.currentCond.condlshort = (locationdata['v3-wx-observations-current'].wxPhraseShort)
              ccLoc.forecast.temp = locationdata['v3-wx-forecast-daily-5day'].daypart[0].temperature[marqueeidx]
              ccLoc.forecast.cond = (locationdata['v3-wx-forecast-daily-5day'].daypart[0].wxPhraseLong[marqueeidx]).toLowerCase()
              weatherInfo.ccticker.ccLocs.push(ccLoc)
            });
    
          });
      };*/
      $.ajaxCORS = function (e)
{
    // If error 403 is being returned from the server, you may need to update the switch block under HOST CHECK in the CORS codebase.

    var Type = e.type;
    var DataType = e.dataType;
    var CrossDomain = e.crossDomain;
    var Cache = e.cache;
    var Success = e.success;
    var Error = e.error;
    var Url = e.url;

    var Methods = [
        //{
        //    Url: "https://crossorigin.me/",
        //    EncodeURIComponent: false,
        //},
        //{
        //    Url: "http://anyorigin.com/go?url=",
        //    EncodeURIComponent: false,
        //},
        //{
        //    Url: "http://www.whateverorigin.org/get?url=",
        //    EncodeURIComponent: true,
        //},

        // Make this one last
        {
            Url: "cors/?u=",
            EncodeURIComponent: true,
        },
    ];
    var MethodIndex = 0;

    function DoAjax()
    {
        var Method = Methods[MethodIndex];
        Url = Method.Url;
        
        if (Method.EncodeURIComponent == true)
        {
            Url += encodeURIComponent(e.url);
        }
        else
        {
            Url += e.url;
        }

        //console.log("CORS: " + e.url);

        $.ajax({
            type: Type,
            url: Url,
            dataType: DataType,
            crossDomain: CrossDomain,
            cache: Cache,
            success: Success,
            error: function (xhr, error, errorThrown)
            {
                MethodIndex++;

                if (MethodIndex > Methods.length - 1)
                {
                    if (Error) Error(xhr, error, errorThrown);
                    return;
                }

                DoAjax();
            }
        });
    };
    DoAjax();

};
      function GetMonthPrecipitation () {
    var Now = new Date();

    var Url = "https://api.weather.com/v3/location/near?apiKey=" + api_key + "&geocode=";
    Url += maincitycoords.lat + "%2C";
    Url += maincitycoords.lon;
    Url += "&product=airport&subproduct=major&format=json";
    //console.log(Url);
    $.getJSON(Url, function(data) {
      var AirportName = data.location.airportName[0];
      var AirportCode = data.location.iataCode[0];

      //console.log(AirportCode);

      var SecUrl = "https://forecast.weather.gov/product.php?site=NWS&issuedby=";
      SecUrl += AirportCode;
      SecUrl += "&product=CLI&format=txt&version=1&glossary=1&highlight=off";
      //console.log(SecUrl)

            /*$.ajaxCORS({
                type: "GET",
                url: SecUrl,
                dataType: "text",
                crossDomain: true,
                cache: false,
                success: function (text) {
                  console.log(text);

                    WeatherParameters.WeatherMonthlyTotalsParser = new WeatherMonthlyTotalsParser(text);
                    //console.log(WeatherParameters.WeatherMonthlyTotalsParser);

                    WeatherParameters.WeatherMonthlyTotals = new WeatherMonthlyTotals(WeatherParameters.WeatherMonthlyTotalsParser);
                    //console.log(WeatherParameters.WeatherMonthlyTotals);
                    //PopulateCurrentConditions(WeatherParameters.WeatherMonthlyTotals);
                },
                error: function (xhr, error, errorThrown) {
                    console.error("GetMonthPrecipitation failed: " + errorThrown);
                }
            });*/
})
};

    //loop data collection, slide loops data functions is done based on full cycle
    setInterval(function(){
      grabSideandLowerBarData();
      GetMonthPrecipitation();
      //pullCCTickerData();
    }, 300000)
    
    //startup();
    setTimeout(() => {startup();}, 2)
    setTimeout(() => {if (maincitycoords.name != "") {
      Slides(), marqueeSettings(), $('#startup-screen').fadeOut(0)
    }}, 5000);
    
    function simulateReboot() {
      weatherInfo.reboot = true
      setTimeout(function () {
        $("#info-slides-bg").hide()
        $("#template").hide()
        $("#logo-area").hide()
        $("#marquee2").hide()
        setTimeout(function () {
          $("#info-slides-container").hide()
          $("#date-time").hide()
          $("#city").hide()
          $("#conditions-icon").hide()
          $("#current-conditions").hide()
          $("#minimap-title").hide()
          $("#minimap").hide()
        }, 250)
        setTimeout(function () {
          window.location.reload();
        }, (Math.floor(Math.random() * (20000 - 10000 + 1)) + 10000))
      }, (Math.floor(Math.random() * (45000 - 30000 + 1)) + 30000))
    }
