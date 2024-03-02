var loopssevereweathermode = false;
var displayingAtmospheric = false;
var miniMap;
function Loops() {

	// init the display loops

	displayForecast(0);
	refreshObservationDisplay()
	setInterval(refreshObservationDisplay,300000);

}
	function refreshObservationDisplay() {
		var cond = weatherInfo.currentCond.sidebar.cond;
		$('#city').text(maincitycoords.displayname);
		$('#forecast-city').text(maincitycoords.displayname + ':');
		if (weatherInfo.radarTempUnavialable == false) {
			if (loopssevereweathermode == false){
				$('#minimap').fadeIn(0)
				$('#minimap-title').fadeIn(0)
				minimap.on('load', function() {
					fadeMap('minimap', false)
			    loadRadarImages('minimap')
						minimap.once('idle', function() {
							fadeMap('minimap', true)
							animateMiniRadar()
						});
			  });
				//animateRadar('minimap')
			}
		} else {
			$('#minimap').fadeOut(0)
			$('#minimap-title').fadeOut(0)
		}
		if (weatherInfo.currentCond.sidebar.noReport == true) {
			$('#now').fadeOut(0)
			$('#nowwide').fadeOut(0)
			$('#current-temp').fadeOut(0)
			$('#current-info').fadeOut(0)
			$('#conditions-icon').fadeOut(0)
			$('#current-info-severe').fadeOut(0)
			$('#current-info-details').fadeOut(0)
			$('#current-noreport').fadeIn(0)
		} else {
			if (displayingAtmospheric == false) {
				if (loopssevereweathermode == false) { displayAtmospheric(0)	} else { displaySevereAtmospheric(0) }
			}
			$('#now').fadeIn(0)
				$('#nowwide').fadeIn(0)
			$('#current-temp').fadeIn(0)
			if (loopssevereweathermode == false) { $('#current-info').fadeIn(0) } else {
				$('#current-info-severe').fadeIn(0);
				$('#current-info-details').fadeIn(0);
			}
			$('#current-noreport').fadeOut(0)
			$('#conditions-icon').fadeIn(0)
			$('#current-temp').text( weatherInfo.currentCond.sidebar.temp ) ;
			//$('#conditions-icon').css('background-image', 'url("' + getCCicon(+weatherInfo.currentCond.sidebar.icon, weatherInfo.currentCond.sidebar.windspeed) + '")');
			getCCicon('#conditions-icon', weatherInfo.currentCond.sidebar.icon, weatherInfo.currentCond.sidebar.windspeed)
		}
	}


	function displayAtmospheric(idx) {
		if (weatherInfo.currentCond.sidebar.noReport == false){
		displayingAtmospheric = true;
		var displays = {
			conditions() {
				return (weatherInfo.currentCond.sidebar.cond).toLowerCase();
			},

				wind(){ return 'wind ' + weatherInfo.currentCond.sidebar.wind; },

				gusts(){
					if ( weatherInfo.currentCond.sidebar.gust!=undefined ) {
						return (weatherInfo.currentCond.sidebar.gust!="none") ? 'gusts ' +  weatherInfo.currentCond.sidebar.gust : '';
					}
				},

				humidity(){ return 'humidity ' + weatherInfo.currentCond.sidebar.humid + '%'; },

				dewpoint(){ return 'dew point ' + weatherInfo.currentCond.sidebar.dewpt + '&deg;'; },

				heatindex_windchill(){
					if (weatherInfo.currentCond.sidebar.feelslike.type != "dontdisplay") {
						return weatherInfo.currentCond.sidebar.feelslike.type + " " + weatherInfo.currentCond.sidebar.feelslike.val +  '&deg;'
					}
				},

				pressure(){ return 'pressure ' + weatherInfo.currentCond.sidebar.pressure + ' ' + weatherInfo.currentCond.sidebar.pressureTrend},

				visibility() { return 'visibility ' + weatherInfo.currentCond.sidebar.visibility + ' mile' + (weatherInfo.currentCond.sidebar.visibility != 1 ? 's' : ''); },

				uvindex() { return 'UV index ' + weatherInfo.currentCond.sidebar.uvidx; },

		},
		keys = Object.keys(displays),
		text = displays[ keys[idx] ]();

		// increment the pointer
		if (weatherInfo.reboot == true) {
			$('#forecast-shadow').hide()
			return;
		}
		if (loopssevereweathermode == false) {
			idx = (++idx===keys.length ? 0 : idx);

			if (text) {
				$('#current-info').html(text);
				setTimeout(function(){ displayAtmospheric(idx) }, 6000); // 6 second increment loop
			} else {
				// nothing to display - skip to the next one
				setTimeout(function(){ displayAtmospheric(idx) }, 0);
			}
		}
	} else {displayingAtmospheric = false}
	}  // end function

	function displaySevereAtmospheric(idx) {
		if (weatherInfo.currentCond.sidebar.noReport == false) {
		displayingAtmospheric = true
		$('#current-info-severe').text((weatherInfo.currentCond.sidebar.cond).toLowerCase());
		var displays = {
			display1() {
				return 'wind ' + weatherInfo.currentCond.sidebar.wind + '<br>' + ((weatherInfo.currentCond.sidebar.gust!="none") ? 'gusts ' +  weatherInfo.currentCond.sidebar.gust + '<br>' : '' ) + 'humidity ' + weatherInfo.currentCond.sidebar.humid + '%' + '<br>' + 'dew point ' + weatherInfo.currentCond.sidebar.dewpt + '&deg;'
			},
			display2() {
				return (((weatherInfo.currentCond.sidebar.feelslike.type != "dontdisplay") ?  weatherInfo.currentCond.sidebar.feelslike.type + " " + weatherInfo.currentCond.sidebar.feelslike.val +  '&deg;' + '<br>' : '' ) + 'pressure ' + weatherInfo.currentCond.sidebar.pressure + weatherInfo.currentCond.sidebar.pressureTrend + '<br>' + 'visibility ' + weatherInfo.currentCond.sidebar.visibility + ((weatherInfo.currentCond.sidebar.visibility != 1 ) ? ' miles' : ' mile') + '<br>' + 'ceiling ' + ((weatherInfo.currentCond.sidebar.ceiling != null) ? ((weatherInfo.currentCond.sidebar.ceiling).toString() + ' ft') : ''))
			}
		},
		keys = Object.keys(displays),
		text = displays[ keys[idx] ]();

		idx = (++idx===keys.length ? 0 : idx);
		if (weatherInfo.reboot == true) {
			$('#forecast-shadow').hide()
			return;
		}
		if (loopssevereweathermode == true) {
			if (text) {
				$('#current-info-details').html(text);
				setTimeout(function(){ displaySevereAtmospheric(idx) }, 6000); // 6 second increment loop
			} else {
				// nothing to display - skip to the next one
				setTimeout(function(){ displaySevereAtmospheric(idx) }, 0);
			}
		}
		} else {displayingAtmospheric = false}
	} //end function

	function displayForecast(idx) {

		var displays = {

				text1() {
					$('.forecast-header').prop('id', 'normalheader');
					if (weatherInfo.dayDesc.lowerbar.noReport == true) {
						$('#forecast-title').fadeOut(0)
						$('#forecast-text').fadeOut(0)
						$('#forecast-shadow').css('box-shadow','0 3px 10px 0 rgba(0, 0, 0, 0)')
						$('#forecast-shadow').css('background','rgba(0,0,0,0)')
						$('.forecast-tiles').fadeOut(0)
						$('#forecast-noreport').fadeIn(0)
					} else {
						$('#forecast-noreport').fadeOut(0)
						$('#forecast-shadow').css('background','#8cadd1')
						$('#forecast-shadow').css('box-shadow','0 3px 10px 0 rgba(0, 0, 0, .35)')
						$('#forecast-text').fadeIn(0)
						$('#forecast-title').fadeIn(0)
						resizeText(weatherInfo.dayDesc.lowerbar.day[0].desc);
						$('#forecast-title').text(weatherInfo.dayDesc.lowerbar.day[0].name + "'S" + " FORECAST");
					}
				},
				text2() {
					$('.forecast-header').prop('id', 'normalheader');
					if (weatherInfo.dayDesc.lowerbar.noReport == true) {
						$('#forecast-shadow').css('background','rgba(0,0,0,0)')
						$('#forecast-shadow').css('box-shadow','0 3px 10px 0 rgba(0, 0, 0, 0)')
						$('#forecast-title').fadeOut(0)
						$('#forecast-text').fadeOut(0)
						$('.forecast-tiles').fadeOut(0)
						$('#forecast-noreport').fadeIn(0)
					} else {
						$('#forecast-noreport').fadeOut(0)
						$('#forecast-shadow').css('background','#8cadd1')
						$('#forecast-shadow').css('box-shadow','0 3px 10px 0 rgba(0, 0, 0, .35)')
						$('#forecast-text').fadeIn(0)
						$('#forecast-title').fadeIn(0)
						resizeText(weatherInfo.dayDesc.lowerbar.day[1].desc);
						$('#forecast-title').text(weatherInfo.dayDesc.lowerbar.day[1].name + "'S" + " FORECAST");
					}
				},

			    fiveday() {
						$('.forecast-header').prop('id', 'normaltiles');
						$('.forecast-tiles').prop('id', 'normalheader');
						if (weatherInfo.fiveDay.lowerbar.noReport == true) {
							$('#forecast-shadow').css('box-shadow','0 3px 10px 0 rgba(0, 0, 0, 0)')
							$('#forecast-shadow').css('background','rgba(0,0,0,0)')
							$('#forecast-title').fadeOut(0)
							$('#forecast-text').fadeOut(0)
							$('.forecast-tiles').fadeOut(0)
							$('#forecast-noreport').fadeIn(0)
						} else {
							$('#forecast-shadow').css('box-shadow','0 3px 10px 0 rgba(0, 0, 0, .35)')
							$('#forecast-title').fadeIn(0)
							$('#forecast-noreport').fadeOut(0)
					var newtile, weekend, icons;

					$('#forecast-title').text("5 DAY FORECAST");
					$('.forecast-tiles').empty();

					for (var i=0; i<5; i++ ) {
						newtile = $("<div class='forecast-tile daily" + weatherInfo.fiveDay.lowerbar.day[i].weekend + "'></div>");

						$("<div class='header'></div>") .appendTo(newtile) .text(weatherInfo.fiveDay.lowerbar.day[i].name);

						//icons = getCCicon(+weatherInfo.fiveDay.lowerbar.day[i].icon, weatherInfo.fiveDay.lowerbar.day[i].windspeed);

							var icon = $("<div class='icon'></div>")
							getCCicon(icon, weatherInfo.fiveDay.lowerbar.day[i].icon, weatherInfo.fiveDay.lowerbar.day[i].windspeed)
							icon.appendTo(newtile)

						$("<div class='high'></div>") .appendTo(newtile) .text(weatherInfo.fiveDay.lowerbar.day[i].high);
						$("<div class='low'></div>")  .appendTo(newtile) .text(weatherInfo.fiveDay.lowerbar.day[i].low);

						$('.forecast-tiles').append(newtile);
					}

					$('.forecast-tiles').css('display','flex');
					}
				},

			    hourly() {
						$('.forecast-header').prop('id', 'hourlyheader');
						$('.forecast-tiles').prop('id', 'hourlytiles');
						if (weatherInfo.dayPart.lowerbar.noReport == true) {
							$('#forecast-shadow').css('box-shadow','0 3px 10px 0 rgba(0, 0, 0, 0)')
							$('#forecast-shadow').css('background','rgba(0,0,0,0)')
							$('#forecast-title').fadeOut(0)
							$('#forecast-text').fadeOut(0)
							$('.forecast-tiles').fadeOut(0)
							$('#forecast-noreport').fadeIn(0)
						} else {
							$('.forecast-header').prop('id', 'hourlyheader');
							$('#forecast-title').fadeIn(0)
							$('#forecast-noreport').fadeOut(0)
					var newtile, icons, sizer, highbar, data, label, temps=[];
					$('#forecast-shadow').css('box-shadow','0 3px 10px 0 rgba(0, 0, 0, .35)')
					$('#forecast-title').text( weatherInfo.dayPart.lowerbar.daytitle );
					$('.forecast-tiles').empty();

					for (var i = 0; i < 4; i++) {
						newtile = $("<div class='forecast-tile hourly'></div>");
						sizer   = $("<div class='width-sizer'></div>").appendTo(newtile);

						//icons = getCCicon(weatherInfo.dayPart.lowerbar.hour[i].icon, weatherInfo.dayPart.lowerbar.hour[i].windspeed);
							var icon = $("<div class='icon'></div>")
							getCCicon(icon, weatherInfo.dayPart.lowerbar.hour[i].icon, weatherInfo.dayPart.lowerbar.hour[i].windspeed)
							icon.appendTo(sizer)
						$("<div class='footer'></div>") .append("<span>" + weatherInfo.dayPart.lowerbar.hour[i].time + "</span>") .appendTo(newtile)
						highbar = $("<div class='hourly-high'></div>") .appendTo(sizer);

						$("<div class='high'></div>") .appendTo(highbar) .text(weatherInfo.dayPart.lowerbar.hour[i].temp);
						temps.push(weatherInfo.dayPart.lowerbar.hour[i].temp);

						$("<div class='temp-bar'></div>") .appendTo(highbar);

						$('.forecast-tiles').append(newtile);
					}

					$('.forecast-tiles').css('display','flex');

					// animate grow and show temp
					var min = Math.min(...temps),  // 54
						max = Math.max(...temps),  // 73
						range = ((max-min) != 0) ? (max-min) : .001,
						prange = (94-75), // percent range for bar height
						temp, value;
					$('.forecast-tile').each(function(){
						temp = $(this).find('.high').first().text();
						value = ((temp-min)/range) * prange + 78;  // find percentage of range and translate to percent and add that to the starting css % height number
						$(this).find('.hourly-high').animate({height:value+"%"}, 1500,function(){
							$(this).find('.high').fadeTo('slow', 1);
						});
					})
				}
				},

				dummy(){}
			},
			keys = Object.keys(displays);

		displays[ keys[idx] ]();

		// increment the pointer
		idx = (++idx===keys.length ? 0 : idx);

		setTimeout(function(){ displayForecast(idx) }, 15000); // 15 second increment loop

	}

	function resizeText(text){
		var s = 41,
		$test = $('<div style="position:absolute;padding:0 .75% 0 11.5%;top:100%;font-family:Interstate"></div>') .appendTo('#forecast-text') .css('font-size', s + 'px') .html(text);
		$test.css('width',$('#forecast-text').width());
		//setTimeout(function() {
		i = 0
			while ($test.height() >= ($('#forecast-text').height()) && i < 10 ) {
				s -= 1;
				$test.css('font-size', s + 'px');
				i += 1
			}
			$('#forecast-text div') .text(text) .css('font-size', s + 'px');
			$test.remove();
			$('.forecast-tiles').hide();
		//},100);  // delay is a workaround for Interstate font not updating display
	}




 // end Loops class


/*function buildHourlyHeaderTitle(time) {
	var today = new Date(),
		tomorrow = dateFns.addDays(today, 1),
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


function buildHourlyTimeTitle(time){
	var hour=dateFns.getHours(time);

	if (hour===0) {
		return 'midnight';
	} else if (hour===12){
		return 'noon';
	}

	return dateFns.format(time,'h a');
}


// finds the intervals to report on the hourly forecast
function calcHourlyReport(data) {
	var ret = [],
		targets = [0, 6, 12, 15, 17, 20],   // hours that we report
		current = dateFns.getHours(new Date()),
		now = new Date(),
		//firsthour = targets[ getNextHighestIndex(targets, current) ],
		start,
		hour, i=0;

	switch (true) {
		case (current < 3):
			start = 6;
		case (current < 9):
			start = 12; break;
		case (current < 12):
			start = 15; break;
		case (current < 15):
			start = 17; break;
		case (current < 17):
			start = 20; break;
		case (current < 20):
			start = 0; break;
		default:
			start = 6;
	}

	while(ret.length<4){

		// hour must be equal or greater than current
		hour = dateFns.getHours( data.validTimeLocal[i] );
		if ( dateFns.isAfter(data.validTimeLocal[i], now) && (hour==start || ret.length>0) )  {

			if ( targets.indexOf(hour)>=0 ) { // it is in our target list so record its index
				ret.push(i);
			}

		}
		i++;
	}
	return ret;
}
*/

/*

wind E 14
gusts 17 mph
humidity 58%
dew point 72(degree symbol)
heat index 95(degree symbol) / wind chill
pressure 30.02 S
visibility 10 miles
uv index High
partly cloudy

*/
