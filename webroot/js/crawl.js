var lowerDetailLength = 4000
var lowerDetailOrder = []
function crawlKickOff() {
    cidx = 0
    cnidx = 1
    if (apperanceSettings.marqueeType == "none") {
        $('#lowerline').fadeOut(0)
        $('#lowerbar').fadeOut(0)
    } else if (apperanceSettings.marqueeType == "observations") {
        $('#lowerbar').fadeIn(0)
        $('#lowerline').fadeIn(0)
        lowerDetailOrder = [
            {function:"city"},
            {function:"condition"},
            {function:"temperature"},
            {function:"humidity"},
            {function:"pressure"},
            {function:"wind"},
            {function:"ceiling"},
            {function:"precip"},
        ]
    } else if (apperanceSettings.marqueeType == "ad") {
        $('#lowerbar').fadeIn(0)
        $('#lowerline').fadeIn(0)
        lowerDetailOrder = [
            {function:"crawl"},
            {function:"crawl"},
        ]
    } else {
        $('#lowerbar').fadeIn(0)
        $('#lowerline').fadeIn(0)
        lowerDetailOrder = [
            {function:"city"},
            {function:"condition"},
            {function:"temperature"},
            {function:"humidity"},
            {function:"pressure"},
            {function:"wind"},
            {function:"ceiling"},
            {function:"precip"},
            {function:"city"},
            {function:"condition"},
            {function:"temperature"},
            {function:"humidity"},
            {function:"pressure"},
            {function:"wind"},
            {function:"ceiling"},
            {function:"precip"},
            {function:"crawl"},
        ]
    }
    showCrawls()
    function showCrawls() {
        var crawlDisplays = {
            city() {
                $('#lowerinfotext').fadeIn(0)
                $('#date-time').fadeIn(0)
                $('#marqueeholder').fadeOut(0)
                $('#lowerinfotext').text('CONDITIONS AT ' + locationConfig.mainCity.displayname)
                setTimeout(function() {
                    crawlCallBack()
                }, lowerDetailLength);
            },
            condition() {
                $('#lowerinfotext').fadeIn(0)
                $('#date-time').fadeIn(0)
                $('#marqueeholder').fadeOut(0)
                $('#lowerinfotext').text(weatherData.currentConditions.cond)
                setTimeout(function() {
                    crawlCallBack()
                }, lowerDetailLength);
            },
            temperature() {
                $('#lowerinfotext').fadeIn(0)
                $('#date-time').fadeIn(0)
                $('#marqueeholder').fadeOut(0)
                if (weatherData.currentConditions.feelslike == weatherData.currentConditions.temp) {
                    $('#lowerinfotext').text('TEMP:  ' + weatherData.currentConditions.temp + '°F   ')
                } else {
                    $('#lowerinfotext').text('TEMP:  ' + weatherData.currentConditions.temp + '°F   ' + weatherData.currentConditions.feelsliketype + weatherData.currentConditions.feelslike + '°F')
                }
                setTimeout(function() {
                    crawlCallBack()
                }, lowerDetailLength);
            },
            humidity() {
                $('#lowerinfotext').fadeIn(0)
                $('#date-time').fadeIn(0)
                $('#marqueeholder').fadeOut(0)
                $('#lowerinfotext').text('HUMIDITY: ' + weatherData.currentConditions.humidity + '%   ' + 'DEWPOINT: ' + weatherData.currentConditions.dewpoint + '°F')
                setTimeout(function() {
                    crawlCallBack()
                }, lowerDetailLength);
            },
            pressure() {
                $('#lowerinfotext').fadeIn(0)
                $('#date-time').fadeIn(0)
                $('#marqueeholder').fadeOut(0)
                $('#lowerinfotext').text('BAROMETRIC PRESSURE: ' + weatherData.currentConditions.pressure + " " + weatherData.currentConditions.pressureTrend)
                setTimeout(function() {
                    crawlCallBack()
                }, lowerDetailLength);
            },
            wind() {
                $('#lowerinfotext').fadeIn(0)
                $('#date-time').fadeIn(0)
                $('#marqueeholder').fadeOut(0)
                $('#lowerinfotext').text('WIND: ' + windWordSpacing(weatherData.currentConditions.wind) + " " + weatherData.currentConditions.windspeed + ' MPH')
                setTimeout(function() {
                    crawlCallBack()
                }, lowerDetailLength);
            },
            ceiling() {
                $('#lowerinfotext').fadeIn(0)
                $('#date-time').fadeIn(0)
                $('#marqueeholder').fadeOut(0)
                if (weatherData.currentConditions.ceiling != null) {
                    $('#lowerinfotext').text('VISIB: ' + weatherData.currentConditions.visibility + ' MI. ' + 'CEILING: ' + weatherData.currentConditions.ceiling +' FT.')
                } else {
                    $('#lowerinfotext').text('VISIB: ' + weatherData.currentConditions.visibility + ' MI. ' + 'CEILING:UNLIMITED')
                }
                setTimeout(function() {
                    crawlCallBack()
                }, lowerDetailLength);
            },
            precip() {
                $('#lowerinfotext').fadeIn(0)
                $('#date-time').fadeIn(0)
                $('#marqueeholder').fadeOut(0)
                const cmonth = ["JANUARY PRECIPITATION: ","FEBRUARY PRECIPITATION: ","MARCH PRECIPITATION: ","APRIL PRECIPITATION: ","MAY PRECIPITATION: ","JUNE PRECIPITATION: ","JULY PRECIPITATION: ","AUGUST PRECIPITATION: ","SEPTEMBER PRECIPITATION: ","OCTOBER PRECIPITATION: ","NOVEMBER PRECIPITATION: ","DECEMBER PRECIPITATION: "];
                const cd = new Date();
                let cmonthname = cmonth[cd.getMonth()];

                $('#lowerinfotext').text(cmonthname + weatherData.currentConditions.monthPrecip)
                setTimeout(function() {
                    crawlCallBack()
                }, lowerDetailLength);
            },
            crawl() {
                $('#lowerinfotext').fadeOut(0)
                $('#date-time').fadeOut(0)
                $('#marqueeholder').fadeIn(0)
                $('#marqueetext').text(apperanceSettings.marqueeAd[0]);
	            $('#marqueetext').marquee({speed: 150, pauseOnHover: false, delayBeforeStart: 2000, pauseOnCycle: true})
	            $('#marqueetext').on('finished', function() {crawlCallBack()});
            }
        }
        if (cidx>=lowerDetailOrder.length) {
			cidx = 0
		}
		if (cnidx>=lowerDetailOrder.length) {
			cnidx = 0
		}
		currentCrawl = crawlDisplays[lowerDetailOrder[cidx].function]
		nextCrawl = crawlDisplays[lowerDetailOrder[cnidx].function]
		currentCrawl();

		function crawlCallBack(){
			cidx++;
			cnidx++;
			showCrawls();
		};
    }
}