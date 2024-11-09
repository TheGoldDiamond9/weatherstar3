var travelForecastLength = 62999;
//first num difference is 4 for daypart
function Slides() {
    var idx = 0;
    var bul = 1;
    slideLength = 10000;
    travelLength = 10000;
    slideLengthFinal = 9999;
    slideDelay = 1;
    if (apperanceSettings.onlyLDLMode == true) {
        setTimeout(() => {$('#title-container').fadeOut(0),
        $('#slide-title-text').fadeOut(0),
        $('#info-slides-container').fadeOut(0),
        $('#lowerline').fadeOut(0)}, 2)
    } else {
         showSlides();
        setTimeout(() => {$('#title-container').fadeIn(0),
        $('#slide-title-text').fadeIn(0),
        $('#info-slides-container').fadeIn(0)}, 2)
        //loopBulletin();
}
    }
   
function inProgress() {
    $('#slide-title-text').css('text-align', 'cemter');
    $('#slide-title-text').css('font-family', 'mainfont');
    $('#slide-title-text').text('WORK IN PROGRESS');

    $('.in-progress').fadeIn(0);
}
function currentConditions() {
    const month = ["JANUARY PRECIPITATION: ","FEBRUARY PRECIPITATION: ","MARCH PRECIPITATION: ","APRIL PRECIPITATION: ","MAY PRECIPITATION: ","JUNE PRECIPITATION: ","JULY PRECIPITATION: ","AUGUST PRECIPITATION: ","SEPTEMBER PRECIPITATION: ","OCTOBER PRECIPITATION: ","NOVEMBER PRECIPITATION: ","DECEMBER PRECIPITATION: "];
    const d = new Date();
    let monthname = month[d.getMonth()];
    //title and info
       $('#slide-title-text').css('text-align', 'left');
       $('#slide-title-text').css('font-family', 'mainfont');
       $('#slide-title-text').text('CONDITIONS AT ' + maincitycoords.name);
       $('.current-condition').text(weatherInfo.currentCond.weatherLocs[0].cond);
       $('.current-temperature').text('TEMP:  ' + weatherInfo.currentCond.weatherLocs[0].temp + '°F');
       if (weatherInfo.currentCond.weatherLocs[0].feelslike.type == "dontdisplay") {$('.current-windchill').text('');} else {$('.current-windchill').text(weatherInfo.currentCond.weatherLocs[0].feelslike.type + ': ' + weatherInfo.currentCond.weatherLocs[0].feelslike.val + '°F');};
       $('.current-humidity').text('HUMIDITY:  ' + weatherInfo.currentCond.weatherLocs[0].humid + '%');
       $('.current-dewpoint').text('DEWPOINT: ' + weatherInfo.currentCond.weatherLocs[0].dewpt + '°F');
       $('.current-pressure').text('BAROMETRIC PRESSURE: ' + weatherInfo.currentCond.weatherLocs[0].pressure + ' ' + weatherInfo.currentCond.weatherLocs[0].pressureTrend);
       $('.current-wind').text('WIND: ' + weatherInfo.currentCond.weatherLocs[0].wind);
       $('.current-visibility2').text(weatherInfo.currentCond.weatherLocs[0].visibility + ' MI.');
       if (weatherInfo.currentCond.weatherLocs[0].ceiling != null) {$('.current-ceiling').text('CEILING: ' + weatherInfo.currentCond.weatherLocs[0].ceiling +' FT.')} else {$('.current-ceiling').text('CEILING:UNLIMITED')};
       $('.current-month-precip').text(monthname + weatherInfo.currentCond.weatherLocs[0].monthToDatePrecip);

       //fade in and out
       $('.info-cc').fadeIn(0);
      setTimeout(function() {
           $('.info-cc').fadeOut(0);
       }, slideLengthFinal);
   
}
function hourlyObservation() {
    $('#slide-title-text').css('text-align', 'center');
    $('#slide-title-text').css('font-family', 'mainfont');
    $('#slide-title-text').text('LATEST HOURLY OBSERVATIONS');
    var town = [];
    var cond = [];
    for (let i = 0; i < 7; i++) {
        let l = i+1
        town[i] = ((weatherInfo.currentCond.city8slides.cities[i] == undefined ? "" : locReplace(weatherInfo.currentCond.city8slides.cities[i].displayname).substring(0,15)));
        $('.hourly-observations .cities .city-'+l).text(town[i]);
        if (town[i] != "") {$('.hourly-observations .temps .temp-'+l).text(weatherInfo.currentCond.city8slides.cities[i].temp)} else {$('.hourly-observations .temps .temp-'+l).text(town[i])};
        cond[i] = ((town[i] == "" ? "" : condReplace(weatherInfo.currentCond.city8slides.cities[i].condition)));
        $('.hourly-observations .weathers .weather-'+l).text(cond[i]);
        if (town[i] != "") {simpWind($('.hourly-observations .winds .wind-'+l), weatherInfo.currentCond.city8slides.cities[i].wind, weatherInfo.currentCond.city8slides.cities[i].windDirNum, weatherInfo.currentCond.city8slides.cities[i].windspeed)} else {$('.hourly-observations .winds .wind-'+l).text(town[i])};
    }
    $('.hourly-observations').fadeIn(0);
    setTimeout(function() {
       $('.hourly-observations').fadeOut(0);
    }, slideLengthFinal);
}
function dayPartForecast() {
    var alerttext = weatherInfo.bulletin.weatherLocs[0].pages[0]
    function dtimeOneBulletin() {
        $('.daypart-forecast .forecast-1-bulletin').fadeIn(0);
        $('.daypart-forecast .forecast-1-bulletin .forecast1').fadeIn(0);
        $('.daypart-forecast .forecast-1').fadeOut(0);
        $('.daypart-forecast .forecast-1-bulletin .daypartalert').text(alerttext.replaceAll('. ', '.\n').replaceAll('until', 'TIL'));
        let divHeight = $('.daypart-forecast .forecast-1-bulletin .daypartalert')[0].clientHeight;
        let bulHeight =  89;
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
        $('.daypart-forecast .forecast-1-bulletin .forecast1').text(weatherInfo.dayDesc.lowerbar.day[0].name + '...' + weatherInfo.dayDesc.lowerbar.day[0].desc);
    }
    function dtimeOne() {
        $('.daypart-forecast .forecast-1-bulletin').fadeOut(0);
        $('.daypart-forecast .forecast-1').fadeIn(0);
        $('.daypart-forecast .forecast-1').text(weatherInfo.dayDesc.lowerbar.day[0].name + '...' + weatherInfo.dayDesc.lowerbar.day[0].desc);
    }
    function dtimeTwo() {
        $('.daypart-forecast .forecast-1-bulletin').fadeOut(0);
        $('.daypart-forecast .forecast-1').fadeIn(0);
        $('.daypart-forecast .forecast-1').text(weatherInfo.dayDesc.lowerbar.day[1].name + '...' + weatherInfo.dayDesc.lowerbar.day[1].desc);
    }
    function dtimeThree() {
        $('.daypart-forecast .forecast-1').text(weatherInfo.dayDesc.lowerbar.day[2].name + '...' + weatherInfo.dayDesc.lowerbar.day[2].desc);
    }
    $('#slide-title-text').css('text-align', 'center');
    $('#slide-title-text').css('font-family', 'smallfont');
    $('#slide-title-text').text('YOUR NWS FORECAST -- ZONE ' + weatherInfo.NWS.zone);
    if (alerttext == null) {setTimeout(() => {dtimeOne()}, 1);} else {setTimeout(() => {dtimeOneBulletin()}, 1);}
    setTimeout(() => {dtimeTwo(), $('#slide-title-text').text('NAT\'L WEATHER SERVICE FORECAST')}, slideLengthFinal);
    setTimeout(() => {dtimeThree()}, 2 * slideLengthFinal);


    $('.daypart-forecast').fadeIn(0);
    setTimeout(function() {
       $('.daypart-forecast').fadeOut(0);
    }, 3 * slideLengthFinal);
}
function extendedForecast() {
    $('#slide-title-text').css('text-align', 'center');
    $('#slide-title-text').css('font-family', 'mainfont');
    $('#slide-title-text').text('EXTENDED FORECAST');

    for (let i = 0; i < 3; i++) {
        let l = i+1
        $('.extended-forecast .days .day-'+l).text(weatherInfo.fiveDay.lowerbar.day[i].name);
        $('.extended-forecast .extended-conditions .con-'+l).text(weatherInfo.fiveDay.lowerbar.day[i].cond);
        $('.extended-forecast .extended-los .lo-'+l).text('LO:  ' + weatherInfo.fiveDay.lowerbar.day[i].low);
        $('.extended-forecast .extended-his .hi-'+l).text('HI:  ' + weatherInfo.fiveDay.lowerbar.day[i].high);
    }

    $('.extended-forecast').fadeIn(0);
    setTimeout(function() {
       $('.extended-forecast').fadeOut(0);
    }, slideLengthFinal);
}
function bulletin() {
    $('#bulletin-container').fadeIn(0);
    $('#bulletin-container #bulletin').fadeIn(0);
    $('#bulletin-background').fadeIn(0);
    $('#lowerline').fadeOut(0);
    if (weatherInfo.bulletin.marqueewarnings[0].significance == "A") {
        $('#bulletin-background').css('background-color', '#bfaa2d'); //watch color
    }	else if (weatherInfo.bulletin.marqueewarnings[0].significance == "W") {
        $('#bulletin-background').css('background-color', '#330912'); //warning color
    } else {
        $('#bulletin-background').css('background-color', '#6A3C0A'); //advisory color and etc
    }
    $('#bulletin-container #bulletin').text(weatherInfo.bulletin.marqueewarnings[0].desc);
    $('#bulletin-container #bulletin').marquee({speed: 110, direction: "up", pauseOnHover: false});
	$('#bulletin-container #bulletin').on('finished', function() {$('#bulletin-container').fadeOut(0), $('#bulletin-container #bulletin').fadeOut(0), $('#bulletin-background').fadeOut(0), $('#lowerline').fadeIn(0)});
}
function travelForecast() {
    $('#travel-container').fadeIn(0);
    $('#travel-background').fadeIn(0);
    $('#travel-container #travel-title-container').fadeIn(0);

    $('#travel-container #travel-content .cities').text('CITY\n' + weatherInfo.travel.cities[0].displayname
        + weatherInfo.travel.cities[1].displayname
        + weatherInfo.travel.cities[2].displayname
        + weatherInfo.travel.cities[3].displayname
        + weatherInfo.travel.cities[4].displayname
        + weatherInfo.travel.cities[5].displayname
        + weatherInfo.travel.cities[6].displayname
        + weatherInfo.travel.cities[7].displayname
        + weatherInfo.travel.cities[8].displayname
        + weatherInfo.travel.cities[9].displayname
        + weatherInfo.travel.cities[10].displayname
        + weatherInfo.travel.cities[11].displayname
        + weatherInfo.travel.cities[12].displayname
        + weatherInfo.travel.cities[13].displayname
        + weatherInfo.travel.cities[14].displayname
        + weatherInfo.travel.cities[15].displayname
        + weatherInfo.travel.cities[16].displayname
        + weatherInfo.travel.cities[17].displayname
        + weatherInfo.travel.cities[18].displayname
        + weatherInfo.travel.cities[19].displayname
        + weatherInfo.travel.cities[20].displayname
        + weatherInfo.travel.cities[21].displayname
        + weatherInfo.travel.cities[22].displayname
        + weatherInfo.travel.cities[23].displayname + '\n'  + '\n'  + '\n'  + '\n'
    )

    $('#travel-container #travel-content .weathers').text('WEATHER\n' + condReplace(weatherInfo.travel.cities[0].days[0].condition) + '\n'
        + condReplace(weatherInfo.travel.cities[1].days[0].condition) + '\n'
        + condReplace(weatherInfo.travel.cities[2].days[0].condition) + '\n'
        + condReplace(weatherInfo.travel.cities[3].days[0].condition) + '\n'
        + condReplace(weatherInfo.travel.cities[4].days[0].condition) + '\n'
        + condReplace(weatherInfo.travel.cities[5].days[0].condition) + '\n'
        + condReplace(weatherInfo.travel.cities[6].days[0].condition) + '\n'
        + condReplace(weatherInfo.travel.cities[7].days[0].condition) + '\n'
        + condReplace(weatherInfo.travel.cities[8].days[0].condition) + '\n'
        + condReplace(weatherInfo.travel.cities[9].days[0].condition) + '\n'
        + condReplace(weatherInfo.travel.cities[10].days[0].condition) + '\n'
        + condReplace(weatherInfo.travel.cities[11].days[0].condition) + '\n'
        + condReplace(weatherInfo.travel.cities[12].days[0].condition) + '\n'
        + condReplace(weatherInfo.travel.cities[13].days[0].condition) + '\n'
        + condReplace(weatherInfo.travel.cities[14].days[0].condition) + '\n'
        + condReplace(weatherInfo.travel.cities[15].days[0].condition) + '\n'
        + condReplace(weatherInfo.travel.cities[16].days[0].condition) + '\n'
        + condReplace(weatherInfo.travel.cities[17].days[0].condition) + '\n'
        + condReplace(weatherInfo.travel.cities[18].days[0].condition) + '\n'
        + condReplace(weatherInfo.travel.cities[19].days[0].condition) + '\n'
        + condReplace(weatherInfo.travel.cities[20].days[0].condition) + '\n'
        + condReplace(weatherInfo.travel.cities[21].days[0].condition) + '\n'
        + condReplace(weatherInfo.travel.cities[22].days[0].condition) + '\n'
        + condReplace(weatherInfo.travel.cities[23].days[0].condition) + '\n'  + '\n'  + '\n'  + '\n'
    )
    
    $('#travel-container #travel-content .his').text('HI\n' + weatherInfo.travel.cities[0].days[0].high + '\n'
        + weatherInfo.travel.cities[1].days[0].high + '\n'
        + weatherInfo.travel.cities[2].days[0].high + '\n'
        + weatherInfo.travel.cities[3].days[0].high + '\n'
        + weatherInfo.travel.cities[4].days[0].high + '\n'
        + weatherInfo.travel.cities[5].days[0].high + '\n'
        + weatherInfo.travel.cities[6].days[0].high + '\n'
        + weatherInfo.travel.cities[7].days[0].high + '\n'
        + weatherInfo.travel.cities[8].days[0].high + '\n'
        + weatherInfo.travel.cities[9].days[0].high + '\n'
        + weatherInfo.travel.cities[10].days[0].high + '\n'
        + weatherInfo.travel.cities[11].days[0].high + '\n'
        + weatherInfo.travel.cities[12].days[0].high + '\n'
        + weatherInfo.travel.cities[13].days[0].high + '\n'
        + weatherInfo.travel.cities[14].days[0].high + '\n'
        + weatherInfo.travel.cities[15].days[0].high + '\n'
        + weatherInfo.travel.cities[16].days[0].high + '\n'
        + weatherInfo.travel.cities[17].days[0].high + '\n'
        + weatherInfo.travel.cities[18].days[0].high + '\n'
        + weatherInfo.travel.cities[19].days[0].high + '\n'
        + weatherInfo.travel.cities[20].days[0].high + '\n'
        + weatherInfo.travel.cities[21].days[0].high + '\n'
        + weatherInfo.travel.cities[22].days[0].high + '\n'
        + weatherInfo.travel.cities[23].days[0].high + '\n'  + '\n'  + '\n'  + '\n'
    )

    $('#travel-container #travel-content .lows').text('LOW\n' + weatherInfo.travel.cities[0].days[0].low + '\n'
        + weatherInfo.travel.cities[1].days[0].low + '\n'
        + weatherInfo.travel.cities[2].days[0].low + '\n'
        + weatherInfo.travel.cities[3].days[0].low + '\n'
        + weatherInfo.travel.cities[4].days[0].low + '\n'
        + weatherInfo.travel.cities[5].days[0].low + '\n'
        + weatherInfo.travel.cities[6].days[0].low + '\n'
        + weatherInfo.travel.cities[7].days[0].low + '\n'
        + weatherInfo.travel.cities[8].days[0].low + '\n'
        + weatherInfo.travel.cities[9].days[0].low + '\n'
        + weatherInfo.travel.cities[10].days[0].low + '\n'
        + weatherInfo.travel.cities[11].days[0].low + '\n'
        + weatherInfo.travel.cities[12].days[0].low + '\n'
        + weatherInfo.travel.cities[13].days[0].low + '\n'
        + weatherInfo.travel.cities[14].days[0].low + '\n'
        + weatherInfo.travel.cities[15].days[0].low + '\n'
        + weatherInfo.travel.cities[16].days[0].low + '\n'
        + weatherInfo.travel.cities[17].days[0].low + '\n'
        + weatherInfo.travel.cities[18].days[0].low + '\n'
        + weatherInfo.travel.cities[19].days[0].low + '\n'
        + weatherInfo.travel.cities[20].days[0].low + '\n'
        + weatherInfo.travel.cities[21].days[0].low + '\n'
        + weatherInfo.travel.cities[22].days[0].low + '\n'
        + weatherInfo.travel.cities[23].days[0].low + '\n'  + '\n'  + '\n'  + '\n'
    )

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
    //$('#travel-content .lows').on('finished', function() {$('#travel-content .lows').fadeOut(0), $('#travel-container').fadeOut(0), $('#travel-background').fadeOut(0)});
    setTimeout(function() {
        $('#travel-container').fadeOut(0), $('#travel-background').fadeOut(0);
    }, travelForecastLength);

}
function almanac() {
    var altoday = new Date();
    const alweekday = ["SUNDAY","MONDAY","TUESDAY","WEDNESDAY","THURSDAY","FRIDAY","SATURDAY","SUNDAY","MONDAY"];

    const a = new Date();
    let alday = alweekday[a.getDay()];
    let atd = a.getDay() + 1;
    if (atd == 7) {atd = 0};
    let altomorrowday = alweekday[atd]

    const almonth = ["January","February","March","April","May","June","July","August","September","October","November","December"];

    const d = new Date();
    let almonthname = almonth[d.getMonth()];
    
    $('#slide-title-text').css('text-align', 'center');
    $('#slide-title-text').css('font-family', 'mainfont');
    $('#slide-title-text').text('THE WEATHER CHANNEL ALMANAC');

    $('.almanac .header .header-1').text(alday);
    $('.almanac .header .header-2').text(altomorrowday);
    $('.almanac .day-1-info .sunrise').text(weatherInfo.almanactod.sunrise);
    $('.almanac .day-1-info .sunset').text(weatherInfo.almanactod.sunset);
    $('.almanac .day-1-info .low').text(weatherInfo.almanactod.avglow + ' °F');
    $('.almanac .day-1-info .high').text(weatherInfo.almanactom.avghigh + ' °F');
    $('.almanac .day-2-info .sunrise').text(weatherInfo.almanactom.sunrise);
    $('.almanac .day-2-info .sunset').text(weatherInfo.almanactom.sunset);
    $('.almanac .day-2-info .low').text(weatherInfo.almanactom.avglow + ' °F');
    $('.almanac .day-2-info .high').text(weatherInfo.almanactom.avghigh + ' °F');
    $('.almanac .normal-precip').text('NORMAL ' + almonthname + ' PRECIP');
    if (weatherInfo.almanactod.avgprecip == null) {
        $('.almanac .normal-precip-info').text('NO REPORT')
    } else {
        $('.almanac .normal-precip-info').text(weatherInfo.almanactod.avgprecip + ' IN')
    }

    $('.almanac').fadeIn(0);
    setTimeout(function() {
       $('.almanac').fadeOut(0);
    }, slideLengthFinal);

}
function regionalForecast() {
    $('#slide-title-text').css('text-align', 'center');
    $('#slide-title-text').css('font-family', 'mainfont');
    $('#slide-title-text').text('FORECAST ACROSS THE REGION');
    var rtown = [];
    var rcond = [];
    for (let i = 0; i < 7; i++) {
        let l = i+1
        rtown[i] = ((weatherInfo.currentCond.city8slides.cities[i] == undefined ? "" : locReplace(weatherInfo.currentCond.city8slides.cities[i].displayname).substring(0,14)));
        $('.regional-forecast .cities .city-'+l).text(rtown[i]);
        rcond[i] = ((rtown[i] == "" ? "" : condReplace(weatherInfo.currentCond.city8slides.cities[i].wxforecast)));
        $('.regional-forecast .weathers .weather-'+l).text(rcond[i]);
        if (rtown[i] != "") {$('.regional-forecast .lows .low-'+l).text(weatherInfo.currentCond.city8slides.cities[i].low)} else {$('.regional-forecast .lows .low-'+l).text(rtown[i])};
        if (rtown[i] != "") {$('.regional-forecast .highs .hi-'+l).text(weatherInfo.currentCond.city8slides.cities[i].hi)} else {$('.regional-forecast .highs .hi-'+l).text(rtown[i])};
    }
    $('.regional-forecast').fadeIn(0);
    setTimeout(function() {
      $('.regional-forecast').fadeOut(0);
    }, slideLengthFinal);
}
function regionalConditions() {
    $('#slide-title-text').css('text-align', 'center');
    $('#slide-title-text').css('font-family', 'mainfont');
    $('#slide-title-text').text('CONDITIONS ACROSS THE REGION');
    var retown = [];
    var recond = [];
    for (let i = 0; i < 7; i++) {
        let l = i+1
        retown[i] = ((weatherInfo.currentCond.regionallocs.cities[i] == undefined ? "" : locReplace(weatherInfo.currentCond.regionallocs.cities[i].displayname).substring(0,15)));
        if (retown[i] != "") {$('.regional-conditions .cities .city-'+l).text(retown[i] + weatherInfo.currentCond.regionallocs.cities[i].statecode)} else {$('.regional-conditions .cities .city-'+l).text(retown[i])};
        recond[i] = ((retown[i] == "" ? "" : condReplace(weatherInfo.currentCond.regionallocs.cities[i].condition)));
        $('.regional-conditions .weathers .weather-'+l).text(recond[i]);
        if (retown[i] != "") {$('.regional-conditions .temps .temp-'+l).text( weatherInfo.currentCond.regionallocs.cities[i].temp)} else {$('.regional-conditions .temps .temp-'+l).text(retown[i])};
    }
    $('.regional-conditions').fadeIn(0);
    setTimeout(function() {
      $('.regional-conditions').fadeOut(0);
    }, slideLengthFinal);
}
function outlook() {
    $('#slide-title-text').css('text-align', 'center');
    $('#slide-title-text').css('font-family', 'mainfont');
    $('#slide-title-text').text('NAT\'L WEATHER SERVICE OUTLOOK');
    const omonth = ["JANUARY","FEBRUARY","MARCH","APRIL","MAY","JUNE","JULY","AUGUST","SEPTEMBER","OCTOBER","NOVEMBER","DECEMBER"];
    const od = new Date();
    let omonthname = omonth[od.getMonth()];

    $('.outlook .month').text(omonthname);

    $('.outlook').fadeIn(0);
    setTimeout(function() {
      $('.outlook').fadeOut(0);
    }, slideLengthFinal);
}
function gFunc() {
    $('.gholder').fadeIn(0), $('#slide-title-text').fadeOut(0), $('.daypart-forecast').fadeOut(0);
    setTimeout(function() {
      $('.gholder').fadeOut(0), $('#slide-title-text').fadeIn(0), $('.daypart-forecast').fadeIn(0);
    }, 100);
}
function loopBulletin() {
    //console.log("bulletin disabled")
    setTimeout(() => {if (weatherInfo.bulletin.marqueewarnings[0] != undefined) {bulletin()}}, 5000);
    setInterval(() => {if (weatherInfo.bulletin.marqueewarnings[0] != undefined) {bulletin()}}, 420000);
}
function flavorTest() {
    setTimeout(() => {travelForecast()}, 1);
    setTimeout(() => {extendedForecast()}, slideLength);
    setTimeout(() => {extendedForecast()}, 2*slideLength);
    setTimeout(() => {loopSlides()}, travelForecastLength);
}
function flavorA() {
    setTimeout(() => {currentConditions()}, 1);
    setTimeout(() => {dayPartForecast()}, slideLength);
    setTimeout(() => {hourlyObservation()}, (2+2) * slideLength);
    setTimeout(() => {loopSlides()}, (2+3) * slideLength);
    //50 seconds long
}
function flavorB() {
    setTimeout(() => {hourlyObservation()}, 1);
    setTimeout(() => {almanac()}, slideLength);
    setTimeout(() => {extendedForecast()}, 2 * slideLength);
    setTimeout(() => {regionalConditions()}, 3 * slideLength);
    setTimeout(() => {loopSlides()}, 4 * slideLength);
    //40 seconds long
}
function flavorC() {
    setTimeout(() => {regionalConditions()}, 1);
    setTimeout(() => {dayPartForecast()}, slideLength);
    setTimeout(() => {regionalForecast()}, (3+1) * slideLength);
    setTimeout(() => {loopSlides()}, (3+2) * slideLength);
    //50 seconds long
}
function flavorD() {
    setTimeout(() => {hourlyObservation()}, 1);
    setTimeout(() => {almanac()}, slideLength);
    setTimeout(() => {dayPartForecast()}, 2 * slideLength);
    setTimeout(() => {regionalConditions()}, (2+3) * slideLength);
    setTimeout(() => {loopSlides()}, (2+4) * slideLength);
    //60 seconds long
}
function flavorE() {
    setTimeout(() => {dayPartForecast()}, 1);
    setTimeout(() => {extendedForecast()}, (2+1)* slideLength);
    setTimeout(() => {hourlyObservation()}, (2+2) * slideLength);
    setTimeout(() => {loopSlides()}, (2+3) * slideLength);
    //50 seconds long
}
function flavorF() {
    setTimeout(() => {currentConditions()}, 1);
    setTimeout(() => {regionalConditions()}, slideLength);
    setTimeout(() => {dayPartForecast()}, 2 * slideLength);
    setTimeout(() => {almanac()}, (2+3) * slideLength);
    setTimeout(() => {loopSlides()}, (2+4) * slideLength);
    //60 seconds long
}
function flavorG() {
    setTimeout(() => {dayPartForecast()}, 1);
    setTimeout(() => {gFunc()}, (3 * slideLength) - 100);
    setTimeout(() => {loopSlides()}, 3 * slideLength);
    //30 seconds PLEASE RELOAD IF NOT WORKING PROPERLY
}
function flavorH() {
    setTimeout(() => {dayPartForecast()}, 1);
    setTimeout(() => {regionalForecast()}, (2+1) * slideLength);
    setTimeout(() => {almanac()}, (2+2) * slideLength);
    setTimeout(() => {regionalConditions()}, (2+3) * slideLength);
    setTimeout(() => {loopSlides()}, (2+4) * slideLength);
    //60 seconds long
}
function flavorI() {
    setTimeout(() => {currentConditions()}, 1);
    setTimeout(() => {hourlyObservation()}, slideLength);
    setTimeout(() => {regionalConditions()}, 2 * slideLength);
    setTimeout(() => {loopSlides()}, 3 * slideLength);
    //30 seconds long
}
function flavorJ() {
    setTimeout(() => {outlook()}, 1);
    setTimeout(() => {almanac()}, slideLength);
    setTimeout(() => {loopSlides()}, 2 * slideLength);
    //20 seconds long
}
function flavorK() {
    setTimeout(() => {currentConditions()}, 1);
    setTimeout(() => {almanac()}, slideLength);
    setTimeout(() => {regionalForecast()}, 2 * slideLength);
    setTimeout(() => {dayPartForecast()}, 3 * slideLength);
    setTimeout(() => {extendedForecast()}, (2+4) * slideLength);
    setTimeout(() => {hourlyObservation()}, (2+5) * slideLength);
    setTimeout(() => {loopSlides()}, (2+6) * slideLength);
    //80 seconds long
}
function flavorL() {
    setTimeout(() => {currentConditions()}, 1), 
    setTimeout(() => {hourlyObservation()}, slideLength), 
    setTimeout(() => {regionalConditions()}, 2 * slideLength), 
    setTimeout(() => {regionalForecast()}, 3 * slideLength), 
    setTimeout(() => {almanac()}, 4 * slideLength),
    setTimeout(() => {dayPartForecast()}, 5 * slideLength),
    setTimeout(() => {extendedForecast()}, (2+6) * slideLength)
    setTimeout(() => {loopSlides()}, (2+7) * slideLength);
    //90 seconds long
}
function flavorM() {
    setTimeout(() => {currentConditions()}, 1);
    setTimeout(() => {dayPartForecast()}, 1 * slideLength);
    setTimeout(() => {extendedForecast()}, (3+1) * slideLength);
    setTimeout(() => {travelForecast()}, (3+2) * slideLength);
    setTimeout(() => {loopSlides()}, ((3+2) * slideLength) + travelForecastLength);
    //112 seconds long
}
function flavorN() {
    setTimeout(() => {currentConditions()}, 1);
    setTimeout(() => {hourlyObservation()}, slideLength);
    setTimeout(() => {regionalConditions()}, 2 * slideLength);
    setTimeout(() => {dayPartForecast()}, 3 * slideLength);
    setTimeout(() => {almanac()}, (3+3) *slideLength);
    setTimeout(() => {regionalForecast()}, (3+4)*slideLength);
    setTimeout(() => {travelForecast()}, (3+5)*slideLength);
    setTimeout(() => {extendedForecast()}, ((3+5)*slideLength) + travelForecastLength);
    setTimeout(() => {outlook()}, ((3+6)*slideLength) + travelForecastLength);
    setTimeout(() => {currentConditions()}, ((3+7)*slideLength) + travelForecastLength);
    setTimeout(() => {dayPartForecast()}, ((3+8)*slideLength) + travelForecastLength);
    setTimeout(() => {extendedForecast()}, (((3+8)+3)*slideLength) + travelForecastLength);
    setTimeout(() => {travelForecast()}, (((3+9)+3)*slideLength) + travelForecastLength);
    setTimeout(() => {loopSlides()}, (((3+9)+3)*slideLength) + (2* travelForecastLength));
    //274 seconds long
}
function flavorO() {
    setTimeout(() => {currentConditions()}, 1);
    setTimeout(() => {hourlyObservation()}, slideLength);
    setTimeout(() => {regionalConditions()}, 2 * slideLength);
    setTimeout(() => {dayPartForecast()}, 3 * slideLength);
    setTimeout(() => {almanac()}, (3+3) *slideLength);
    setTimeout(() => {regionalForecast()}, (3+4)*slideLength);
    setTimeout(() => {travelForecast()}, (3+5)*slideLength);
    setTimeout(() => {extendedForecast()}, ((3+5)*slideLength) + travelForecastLength);
    setTimeout(() => {outlook()}, ((3+6)*slideLength) + travelForecastLength);
    setTimeout(() => {currentConditions()}, ((3+7)*slideLength) + travelForecastLength);
    setTimeout(() => {hourlyObservation()}, ((3+8)*slideLength) + travelForecastLength);
    setTimeout(() => {regionalConditions()}, ((3+9)*slideLength) + travelForecastLength);
    setTimeout(() => {dayPartForecast()}, ((3+10)*slideLength) + travelForecastLength);
    setTimeout(() => {almanac()}, (((3+10)+3)*slideLength) + travelForecastLength);
    setTimeout(() => {regionalForecast()}, (((3+11)+3)*slideLength) + travelForecastLength);
    setTimeout(() => {travelForecast()}, (((3+12)+3)*slideLength) + travelForecastLength);
    setTimeout(() => {extendedForecast()}, (((3+12)+3)*slideLength) + (2*travelForecastLength));
    setTimeout(() => {outlook()}, (((3+13)+3)*slideLength) + (2*travelForecastLength));
    setTimeout(() => {loopSlides()}, (((3+14)+3)*slideLength) + (2*travelForecastLength));
    //324 seconds long
}
function flavorP() {
    setTimeout(() => {dayPartForecast()}, 1)
    setTimeout(() => {extendedForecast()}, 4 * slideLength)
    setTimeout(() => {currentConditions()}, 5 * slideLength)
    setTimeout(() => {loopSlides()}, 6 * slideLength)
    //60 seconds long
}
function flavorQ() {
    setTimeout(() => {currentConditions()}, 1)
    setTimeout(() => {almanac()}, slideLength)
    setTimeout(() => {dayPartForecast()}, 2 * slideLength)
    setTimeout(() => {regionalConditions()}, (2+4) * slideLength)
    setTimeout(() => {loopSlides()}, (3+4) * slideLength)
    //70 seconds long
}
function showSlides() {
    $('#lowerline').fadeIn(0);
    $('#lowerbar').fadeIn(0);
    i = 10
    if (apperanceSettings.flavor == 'Z') {
        flavorTest();
    } 
    else if (apperanceSettings.flavor == 'A') {
        flavorA();
    } 
    else if (apperanceSettings.flavor == 'B') {
        flavorB();
    } 
    else if (apperanceSettings.flavor == 'C') {
        flavorC();
    } 
    else if (apperanceSettings.flavor == 'D') {
        flavorD();
    }
    else if (apperanceSettings.flavor == 'E') {
        flavorE();
    }
    else if (apperanceSettings.flavor == 'F') {
        flavorF();
    }
    else if (apperanceSettings.flavor == 'G') {
        flavorG();
    }
    else if (apperanceSettings.flavor == 'H') {
        flavorH();
    }
    else if (apperanceSettings.flavor == 'I') {
        flavorI();
    }
    else if (apperanceSettings.flavor == 'J') {
        flavorJ();
    }
    else if (apperanceSettings.flavor == 'K') {
        flavorK();
    }
    else if (apperanceSettings.flavor == 'L') {
        flavorL();
    }
    else if (apperanceSettings.flavor == 'M') {
        flavorM();
    }
    else if (apperanceSettings.flavor == 'N') {
        flavorN();
    }
    else if (apperanceSettings.flavor == 'O') {
        flavorO();
    }
    else if (apperanceSettings.flavor == 'P') {
        flavorP();
    }
    else if (apperanceSettings.flavor == 'Q') {
        flavorQ();
    }
    else {
        flavorN();
    };
}
function loopSlides() {
    i = 10
    if (apperanceSettings.loop == true) {
        if (apperanceSettings.flavor == 'Z') {
            flavorTest();
        } 
        else if (apperanceSettings.flavor == 'A') {
            flavorA();
        } 
        else if (apperanceSettings.flavor == 'B') {
            flavorB();
        } 
        else if (apperanceSettings.flavor == 'C') {
            flavorC();
        } 
        else if (apperanceSettings.flavor == 'D') {
            flavorD();
        }
        else if (apperanceSettings.flavor == 'E') {
            flavorE();
        }
        else if (apperanceSettings.flavor == 'F') {
            flavorF();
        }
        else if (apperanceSettings.flavor == 'G') {
            flavorG();
        }
        else if (apperanceSettings.flavor == 'H') {
            flavorH();
        }
        else if (apperanceSettings.flavor == 'I') {
            flavorI();
        }
        else if (apperanceSettings.flavor == 'J') {
            flavorJ();
        }
        else if (apperanceSettings.flavor == 'K') {
            flavorK();
        }
        else if (apperanceSettings.flavor == 'L') {
            flavorL();
        }
        else if (apperanceSettings.flavor == 'M') {
            flavorM();
        }
        else if (apperanceSettings.flavor == 'N') {
            flavorN();
        }
        else if (apperanceSettings.flavor == 'O') {
            flavorO();
        }
        else if (apperanceSettings.flavor == 'P') {
            flavorP();
        }
        else if (apperanceSettings.flavor == 'Q') {
            flavorQ();
        }
        else {
            flavorN();
        };
    } else {
        $('#main').fadeOut(0)
    }
}
