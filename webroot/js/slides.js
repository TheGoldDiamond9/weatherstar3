var slideLength = 10000;
var travelForecastLength = 60000;
var currentProgram;
var currentDiv;
var goOn = true
function slideKickOff() {
	idx = 0;
	nidx = 1;
	if (apperanceSettings.onlyLDLMode == true) {
		$('#slides').fadeOut(0)
	} else if (apperanceSettings.onlyLDLMode == false) {
		showSlides();
	}
	function showSlides() {
		var slidePrograms = {
            inProgress() {
                $('#slide-title-text').css('font-family', 'mainfont');
                $('#slide-title-text').text('WORK IN PROGRESS');
            
                $('.in-progress').fadeIn(0);
                slideCallBack()
            },
            currentConditions() {
                $('#slide-title-text').css('line-height', '90px');
                $('#slide-title-text').css('font-family', 'mainfont');
                $('#slide-title-text').text('CONDITIONS AT ' + weatherData.currentConditions.cityname);
                const month = ["JANUARY PRECIPITATION: ","FEBRUARY PRECIPITATION: ","MARCH PRECIPITATION: ","APRIL PRECIPITATION: ","MAY PRECIPITATION: ","JUNE PRECIPITATION: ","JULY PRECIPITATION: ","AUGUST PRECIPITATION: ","SEPTEMBER PRECIPITATION: ","OCTOBER PRECIPITATION: ","NOVEMBER PRECIPITATION: ","DECEMBER PRECIPITATION: "];
                const d = new Date();
                let monthname = month[d.getMonth()];
                
                $('.info-cc .current-condition').text(weatherData.currentConditions.cond);
                $('.info-cc .current-temperature').text(weatherData.currentConditions.temp + '°F                     ');
                if (weatherData.currentConditions.feelslike != weatherData.currentConditions.temp) {
					$('.info-cc .text-windchill').text('               ' + weatherData.currentConditions.feelsliketype);
                    $('.info-cc .current-windchill').text(weatherData.currentConditions.feelslike + '°F ');
				} else {
					$('.info-cc .text-windchill').text('');
                    $('.info-cc .current-windchill').text('');
				};
                $('.info-cc .current-humidity').text(weatherData.currentConditions.humidity + '%                  ');
                $('.info-cc .current-dewpoint').text(weatherData.currentConditions.dewpoint + '°F ');
                $('.info-cc .current-pressure').text('                     ' + weatherData.currentConditions.pressure + ' ' + weatherData.currentConditions.pressureTrend);
                if (weatherData.currentConditions.wind == "CALM") {
                    $('.info-cc .current-wind').text('      ' + "CALM");
                } else {
                    $('.info-cc .current-wind').text('      ' + windWordSpacing(weatherData.currentConditions.wind) + " " + weatherData.currentConditions.windspeed + ' MPH');
                }
                $('.info-cc .current-visibility').text(weatherData.currentConditions.visibility + ' MI.                  ');
                if (weatherData.currentConditions.ceiling != null) {
					$('.info-cc .current-ceiling').text(weatherData.currentConditions.ceiling +' FT.')
				} else {
					$('.info-cc .current-ceiling').text('UNLIMITED')
				};
                if (weatherData.currentConditions.monthPrecip != "") {
					$('.current-month-precip').text(monthname + weatherData.currentConditions.monthPrecip);
				} else {
					$('.current-month-precip').text("");
				};
            
                //fade in and out
                $('.info-cc').fadeIn(0);
                setTimeout(function() {
                	$('.info-cc').fadeOut(0);
                    slideCallBack()
                }, slideLength);
               
            },
            hourlyObservation() {
                $('#slide-title-text').css('font-family', 'mainfont');
                $('#slide-title-text').text('   LATEST HOURLY OBSERVATIONS');
                $('#slide-title-text').css('line-height', '90px');
                for (let i = 0; i < locationConfig.surroundCities.citiesAmount; i++) {
                    let l = i+1
                    $('.hourly-observations .cities .city-'+l).text(locReplace(weatherData.nearbyCities.conditions.cities[i].cityname).substring(0,15));
					$('.hourly-observations .temps .temp-'+l).text(weatherData.nearbyCities.conditions.cities[i].temp + '               ')
                    $('.hourly-observations .weathers .weather-'+l).text('                  '+condReplace(weatherData.nearbyCities.conditions.cities[i].condition));
					simpWind($('.hourly-observations .winds .wind-'+l), weatherData.nearbyCities.conditions.cities[i].wind, weatherData.nearbyCities.conditions.cities[i].windDirNum, weatherData.nearbyCities.conditions.cities[i].windspeed)
                }
                $('.hourly-observations').fadeIn(0);
                setTimeout(function() {
                   $('.hourly-observations').fadeOut(0);
                   slideCallBack()
                }, slideLength);
            },
            dayPartForecast() {
                var alerttext = ""
				try {
					for (var i = 0; i < weatherData.alerts.alertsAmount; i++) {
						alerttext += weatherData.alerts.warnings[i].headlinetext
					}
				} catch (error) {
					alerttext = ""
				}
                function dtimeOneBulletin() {
                    $('.daypart-forecast .forecast-1-bulletin').fadeIn(0);
                    $('.daypart-forecast .forecast-1-bulletin .forecast1').fadeIn(0);
                    $('.daypart-forecast .forecast-1').fadeOut(0);
                    $('.daypart-forecast .forecast-1-bulletin .daypartalert').text(alerttext.replaceAll('. ', '.\n').replaceAll('until', 'TIL'));
                    let divHeight = $('.daypart-forecast .forecast-1-bulletin .daypartalert')[0].clientHeight;
                    let bulHeight =  90;
                    let lines = divHeight / bulHeight;
                    if (lines == 0) {$('.daypart-forecast .forecast-1-bulletin .border1').text(''),$('.daypart-forecast .forecast-1-bulletin .border2').text('')};  
                    if (lines == 1) {$('.daypart-forecast .forecast-1-bulletin .border1').text('*'),$('.daypart-forecast .forecast-1-bulletin .border2').text('*')};  
                    if (lines == 2) {$('.daypart-forecast .forecast-1-bulletin .border1').text('*\n*'),$('.daypart-forecast .forecast-1-bulletin .border2').text('*\n *')}; 
                    if (lines == 3) {$('.daypart-forecast .forecast-1-bulletin .border1').text('*\n*\n*'),$('.daypart-forecast .forecast-1-bulletin .border2').text('*\n *\n *')}; 
                    if (lines == 4) {$('.daypart-forecast .forecast-1-bulletin .border1').text('*\n*\n*\n*'),$('.daypart-forecast .forecast-1-bulletin .border2').text('*\n *\n *\n *')}; 
                    if (lines == 5) {$('.daypart-forecast .forecast-1-bulletin .border1').text('*\n*\n*\n*\n*'),$('.daypart-forecast .forecast-1-bulletin .border2').text('*\n *\n *\n *\n *')}; 
                    if (lines == 6) {$('.daypart-forecast .forecast-1-bulletin .border1').text('*\n*\n*\n*\n*\n*'),$('.daypart-forecast .forecast-1-bulletin .border2').text('*\n *\n *\n *\n *\n *')}; 
                    if (lines == 7) {$('.daypart-forecast .forecast-1-bulletin .border1').text('*\n*\n*\n*\n*\n*\n*'),$('.daypart-forecast .forecast-1-bulletin .border2').text('*\n *\n *\n *\n *\n *\n *')}; 
                    if (lines == 8) {$('.daypart-forecast .forecast-1-bulletin .border1').text('*\n*\n*\n*\n*\n*\n*\n*'),$('.daypart-forecast .forecast-1-bulletin .border2').text('*\n *\n *\n *\n *\n *\n *\n *')}; 
                    if (lines == 9) {$('.daypart-forecast .forecast-1-bulletin .border1').text('*\n*\n*\n*\n*\n*\n*\n*\n*'),$('.daypart-forecast .forecast-1-bulletin .border2').text('*\n *\n *\n *\n *\n *\n *\n *\n *')};
                    $('.daypart-forecast .forecast-1-bulletin .forecast1').text(weatherData.dayDesc.times[0].timetitle + '...' + weatherData.dayDesc.times[0].forecast);
                }
                function dtimeOne() {
                    $('.daypart-forecast .forecast-1-bulletin').fadeOut(0);
                    $('.daypart-forecast .forecast-1').fadeIn(0);
                    $('.daypart-forecast .forecast-1').text(weatherData.dayDesc.times[0].timetitle + '...' + weatherData.dayDesc.times[0].forecast);
                }
                function dtimeTwo() {
                    $('.daypart-forecast .forecast-1-bulletin').fadeOut(0);
                    $('.daypart-forecast .forecast-1').fadeIn(0);
                    $('.daypart-forecast .forecast-1').text(weatherData.dayDesc.times[1].timetitle + '...' + weatherData.dayDesc.times[1].forecast);
                }
                function dtimeThree() {
                    $('.daypart-forecast .forecast-1').text(weatherData.dayDesc.times[2].timetitle + '...' + weatherData.dayDesc.times[2].forecast);
                }
                $('#slide-title-text').css('font-family', 'smallfont');
                $('#slide-title-text').css('line-height', '45px');
                $('#slide-title-text').text('        YOUR TWC FORECAST');
                if (alerttext == "") {
					setTimeout(() => {dtimeOne()}, 1);
                    //dtimeOne()
				} else {
					setTimeout(() => {dtimeOneBulletin()}, 1);
                    //dtimeOneBulletin()
				}
                setTimeout(() => {dtimeTwo()}, slideLength);
                setTimeout(() => {dtimeThree()}, 2 * slideLength);
            
            
                $('.daypart-forecast').fadeIn(0);
                setTimeout(function() {
                   $('.daypart-forecast').fadeOut(0);
                   slideCallBack()
                }, 3 * slideLength);
            },
            extendedForecast() {
                $('#slide-title-text').css('line-height', '90px');
                $('#slide-title-text').css('font-family', 'mainfont');
                $('#slide-title-text').text('        EXTENDED FORECAST');
                var spaceIndic = [' ', '            ', '                       ']
                var spaceNumInd = ['                        ', '             ', '  ']
                for (let i = 0; i < 3; i++) {
                    let l = i+1
                    $('.extended-forecast .days .day-'+l).text(spaceIndic[i] + weatherData.extendedForecast.days[i].dayname);
                    $('.extended-forecast .extended-conditions .con-'+l).text(weatherData.extendedForecast.days[i].cond.replace("/", ", "))
                    $('.extended-forecast .extended-los .lo-text-'+l).text(weatherData.extendedForecast.days[i].low+spaceNumInd[i]);
                    $('.extended-forecast .extended-his .hi-text-'+l).text(weatherData.extendedForecast.days[i].high+spaceNumInd[i]);
                }
            
                $('.extended-forecast').fadeIn(0);
                setTimeout(function() {
                   $('.extended-forecast').fadeOut(0);
                   slideCallBack()
                }, slideLength);
            },
            bulletin() {
                var marqbool = false
                if (weatherData.alerts.alertsAmount > 0) {
                    $('#bulletin-container').fadeIn(0);
                    $('#bulletin-container #bulletin').fadeIn(0);
                    $('#bulletin-background').fadeIn(0);
                    $('#lowerline').fadeOut(0);
                    if (weatherData.alerts.warnings[0].significance == "A") {
                        $('#bulletin-background').css('background-color', '#bfaa2d'); //watch color
                    } else if (weatherData.alerts.warnings[0].significance == "W") {
                        $('#bulletin-background').css('background-color', '#330912'); //warning color
                    } else {
                        $('#bulletin-background').css('background-color', '#6A3C0A'); //advisory color and etc
                    }
                    $('#bulletin-container #bulletin').text(weatherData.alerts.warnings[0].warningdesc);
                    $('#bulletin-container #bulletin').marquee({speed: 110, direction: "up", pauseOnHover: false});
                    $('#bulletin-container #bulletin').on('finished', function bul() {
                        if (marqbool == false) {
                            slideCallBack()
                            $('#bulletin-container').fadeOut(0)
                            $('#bulletin-container #bulletin').fadeOut(0)
                            $('#bulletin-background').fadeOut(0)
                            $('#lowerline').fadeIn(0)
                        }
                        marqbool = true
                    });
                } else {
                    slideCallBack()
                }
            }
            ,travelForecast() {
                $('#travel-container').fadeIn(0);
                $('#travel-background').fadeIn(0);
                $('#travel-container #travel-title-container').fadeIn(0);
                $('#travel-content .cities').fadeIn(0)
                $('#travel-content .weathers').fadeIn(0)
                $('#travel-content .his').fadeIn(0)
                $('#travel-content .lows').fadeIn(0)
				
				$('#travel-container #travel-content .cities').text("\n\nCITY")
				$('#travel-container #travel-content .weathers').text("\n\nWEATHER")
				$('#travel-container #travel-content .his').text("\n\nHI")
				$('#travel-container #travel-content .lows').text("\n\nLOW")

				for (var i = 0; i < weatherData.travel.cities.length; i++) {
					let prevTextCity = $('#travel-container #travel-content .cities').text()
					$('#travel-container #travel-content .cities').text(prevTextCity += "\n" + weatherData.travel.cities[i].displayname)
					let prevTextWeathers = $('#travel-container #travel-content .weathers').text()
					$('#travel-container #travel-content .weathers').text(prevTextWeathers += "\n" + condReplace(weatherData.travel.cities[i].days[0].condition))
					let prevTextHigh = $('#travel-container #travel-content .his').text()
					$('#travel-container #travel-content .his').text(prevTextHigh += "\n" + weatherData.travel.cities[i].days[0].high)
					let prevTextLow = $('#travel-container #travel-content .lows').text()
					$('#travel-container #travel-content .lows').text(prevTextLow += "\n" + weatherData.travel.cities[i].days[0].low)
				}
            
                $('#travel-container #travel-title-container').marquee({speed: 110, direction: 'up', pauseOnHover: false});
                $('#travel-container #travel-title-container').on('finished', function() {$('#travel-container #travel-title-container').marquee('destroy'), $('#travel-container #travel-title-container').fadeOut(0)});
                $('#travel-content .cities').marquee({speed: 110, direction: 'up', pauseOnHover: false});
                $('#travel-content .cities').on('finished', function() {$('#travel-content .cities').fadeOut(0)});
                $('#travel-content .weathers').marquee({speed: 110, direction: 'up', pauseOnHover: false});
                $('#travel-content .weathers').on('finished', function() {$('#travel-content .weathers').fadeOut(0)});
                $('#travel-content .his').marquee({speed: 110, direction: 'up', pauseOnHover: false});
                $('#travel-content .his').on('finished', function() {$('#travel-content .his').fadeOut(0)});
                $('#travel-content .lows').marquee({speed: 110, direction: 'up', pauseOnHover: false});
                $('#travel-content .lows').on('finished', function() {$('#travel-content .lows').fadeOut(0)});
                
				setTimeout(function() {
                    $('#travel-container').fadeOut(0);
                    $('#travel-background').fadeOut(0);
                    slideCallBack()
                }, travelForecastLength);
            
            }
            ,almanac() {
                const almonth = ["January","February","March","April","May","June","July","August","September","October","November","December"];
                const d = new Date();
                let almonthname = almonth[d.getMonth()];
                $('#slide-title-text').css('font-family', 'mainfont');
                $('#slide-title-text').css('line-height', '90px');
                $('#slide-title-text').text('  THE WEATHER CHANNEL ALMANAC');
                
                $('.almanac .header .header-1').text('             '+formatDayName(weatherData.almanac.today));
                $('.almanac .header .header-2').text('                       '+formatDayName(weatherData.almanac.tomorrow));
                $('.almanac .day-1-info .sunrise').text(weatherData.almanac.sunrisetoday+'           ');
                $('.almanac .day-1-info .sunset').text(weatherData.almanac.sunsettoday+'           ');
                $('.almanac .day-1-info .low').text(weatherData.almanac.avglowtoday + ' °F           ');
                $('.almanac .day-1-info .high').text(weatherData.almanac.avghightoday + ' °F           ');
                $('.almanac .day-2-info .sunrise').text(weatherData.almanac.sunrisetomorow + ' ');
                $('.almanac .day-2-info .sunset').text(weatherData.almanac.sunsettomorrow + ' ');
                $('.almanac .day-2-info .low').text(weatherData.almanac.avglowtomorrow + ' °F ');
                $('.almanac .day-2-info .high').text(weatherData.almanac.avghightomorow + ' °F ');
                $('.almanac .normal-precip').text('NORMAL ' + almonthname + ' PRECIP');
                if (weatherData.almanac.normalprecip == null) {
                    $('.almanac .normal-precip-info').text('NO REPORT')
                } else {
                    $('.almanac .normal-precip-info').text(weatherData.almanac.normalprecip + ' IN ')
                }
            
                $('.almanac').fadeIn(0);
                setTimeout(function() {
                   $('.almanac').fadeOut(0);
                   slideCallBack()
                }, slideLength);
            
            }
            ,regionalForecast() {
                $('#slide-title-text').css('font-family', 'mainfont');
                $('#slide-title-text').css('line-height', '90px');
                $('#slide-title-text').text('   FORECAST ACROSS THE REGION');
				for (let i = 0; i < locationConfig.surroundCities.citiesAmount; i++) {
                    let l = i+1
                    $('.regional-forecast .cities .city-'+l).text(locReplace(weatherData.nearbyCities.forecast.cities[i].cityname).substring(0,15));
					$('.regional-forecast .lows .low-'+l).text(weatherData.nearbyCities.forecast.cities[i].low+'    ')
					$('.regional-forecast .highs .hi-'+l).text(weatherData.nearbyCities.forecast.cities[i].high)
                    $('.regional-forecast .weathers .weather-'+l).text('               '+condReplace(weatherData.nearbyCities.forecast.cities[i].condition));
                }
                $('.regional-forecast').fadeIn(0);
                setTimeout(function() {
                  $('.regional-forecast').fadeOut(0);
                  slideCallBack()
                }, slideLength);
            }
            ,regionalConditions() {
                $('#slide-title-text').css('font-family', 'mainfont');
                $('#slide-title-text').css('line-height', '90px');
                $('#slide-title-text').text('  CONDITIONS ACROSS THE REGION');
                for (let i = 0; i < locationConfig.regionalCities.citiesAmount; i++) {
                    let l = i+1
                    $('.regional-conditions .cities .city-'+l).text(locReplace(weatherData.regionalConditions.cities[i].cityname).substring(0,15) + ", " + weatherData.regionalConditions.cities[i].statename);
					$('.regional-conditions .temps .temp-'+l).text(weatherData.regionalConditions.cities[i].temp)
                    $('.regional-conditions .weathers .weather-'+l).text('                    '+condReplace(weatherData.regionalConditions.cities[i].condition));
                }
                $('.regional-conditions').fadeIn(0);
                setTimeout(function() {
                  $('.regional-conditions').fadeOut(0);
                  slideCallBack()
                }, slideLength);
            }
            ,outlook() {
                $('#slide-title-text').css('line-height', '90px');
                $('#slide-title-text').css('font-family', 'mainfont');
                $('#slide-title-text').text(' NAT\'L WEATHER SERVICE OUTLOOK');
                const omonth = ["JANUARY","FEBRUARY","MARCH","APRIL","MAY","JUNE","JULY","AUGUST","SEPTEMBER","OCTOBER","NOVEMBER","DECEMBER"];
                const od = new Date();
                let omonthname = omonth[od.getMonth()];
            
                $('.outlook .month').text('           '+omonthname);
            
                $('.outlook').fadeIn(0);
                setTimeout(function() {
                  $('.outlook').fadeOut(0);
                  slideCallBack()
                }, slideLength);
            }
            ,gFunc() {
                $('.gholder').fadeIn(0), $('#slide-title-text').fadeOut(0), $('.daypart-forecast').fadeOut(0);
                setTimeout(function() {
                  $('.gholder').fadeOut(0), $('#slide-title-text').fadeIn(0), $('.daypart-forecast').fadeIn(0);
                  slideCallBack()
                }, 100);
            }
		}
		if (idx>=slideSettings.order[0].slideLineup.length) {
			if (apperanceSettings.loop == true) {
				idx = 0
				grabData();
				$('#main').fadeIn(0)
				goOn = true
			} else {
				goOn = false
				$('#main').fadeOut(0)
			}
		}
		if (nidx>=slideSettings.order[0].slideLineup.length) {
			nidx = 0
		}
		
		if (goOn == true) {
			currentProgram = slidePrograms[slideSettings.order[0].slideLineup[idx].function]
			nextProgram = slidePrograms[slideSettings.order[0].slideLineup[nidx].function]
			currentProgram();
		}

		function slideCallBack(){
			idx++;
			nidx++;
			showSlides();
		};
	}//END OF showSlides() FUNCTION
}//end of slideKickOff() function