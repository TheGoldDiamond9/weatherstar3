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
        console.log('FLAVOR ' + apperanceSettings.flavor)
        loopBulletin();
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
       $('.current-condition').text(weatherInfo.currentCond.sidebar.cond);
       $('.current-temperature').text('TEMP:  ' + weatherInfo.currentCond.sidebar.temp + '°F');
       $('.current-windchill').text(weatherInfo.currentCond.sidebar.feelslike.type + ': ' + weatherInfo.currentCond.sidebar.feelslike.val + '°F');
       $('.current-humidity').text('HUMIDITY:  ' + weatherInfo.currentCond.sidebar.humid + '%');
       $('.current-dewpoint').text('DEWPOINT: ' + weatherInfo.currentCond.sidebar.dewpt + '°F');
       $('.current-pressure').text('BAROMETRIC PRESSURE: ' + weatherInfo.currentCond.sidebar.pressure + ' ' + weatherInfo.currentCond.sidebar.pressureTrend);
       $('.current-wind').text('WIND: ' + weatherInfo.currentCond.sidebar.wind);
       $('.current-visibility2').text(weatherInfo.currentCond.sidebar.visibility + ' MI.');
       if (weatherInfo.currentCond.sidebar.ceiling != null) {$('.current-ceiling').text('CEILING: ' + weatherInfo.currentCond.sidebar.ceiling +' FT.')} else {$('.current-ceiling').text('CEILING:UNLIMITED')};
       $('.current-month-precip').text(monthname + weatherInfo.currentCond.sidebar.monthToDatePrecip);

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
    var town1, town2, town3, town4, town5, town6, town7;
    var cond1, cond2, cond3, cond4, cond5, cond6, cond7;

    town1 = ((weatherInfo.currentCond.city8slides.cities[0] == undefined ? "" : weatherInfo.currentCond.city8slides.cities[0].displayname.replaceAll('Township', 'TWP').replaceAll('Fort', 'FT').replaceAll('Airport', 'ARPT').replaceAll('Airforce Base', 'A.F.B.').substring(0,15)));
    town2 = ((weatherInfo.currentCond.city8slides.cities[1] == undefined ? "" : weatherInfo.currentCond.city8slides.cities[1].displayname.replaceAll('Township', 'TWP').replaceAll('Fort', 'FT').replaceAll('Airport', 'ARPT').replaceAll('Airforce Base', 'A.F.B.').substring(0,15)));
    town3 = ((weatherInfo.currentCond.city8slides.cities[2] == undefined ? "" : weatherInfo.currentCond.city8slides.cities[2].displayname.replaceAll('Township', 'TWP').replaceAll('Fort', 'FT').replaceAll('Airport', 'ARPT').replaceAll('Airforce Base', 'A.F.B.').substring(0,15)));
    town4 = ((weatherInfo.currentCond.city8slides.cities[3] == undefined ? "" : weatherInfo.currentCond.city8slides.cities[3].displayname.replaceAll('Township', 'TWP').replaceAll('Fort', 'FT').replaceAll('Airport', 'ARPT').replaceAll('Airforce Base', 'A.F.B.').substring(0,15)));
    town5 = ((weatherInfo.currentCond.city8slides.cities[4] == undefined ? "" : weatherInfo.currentCond.city8slides.cities[4].displayname.replaceAll('Township', 'TWP').replaceAll('Fort', 'FT').replaceAll('Airport', 'ARPT').replaceAll('Airforce Base', 'A.F.B.').substring(0,15)));
    town6 = ((weatherInfo.currentCond.city8slides.cities[5] == undefined ? "" : weatherInfo.currentCond.city8slides.cities[5].displayname.replaceAll('Township', 'TWP').replaceAll('Fort', 'FT').replaceAll('Airport', 'ARPT').replaceAll('Airforce Base', 'A.F.B.').substring(0,15)));
    town7 = ((weatherInfo.currentCond.city8slides.cities[6] == undefined ? "" : weatherInfo.currentCond.city8slides.cities[6].displayname.replaceAll('Township', 'TWP').replaceAll('Fort', 'FT').replaceAll('Airport', 'ARPT').replaceAll('Airforce Base', 'A.F.B.').substring(0,15)));
    $('.hourly-observations .cities .city-1').text(town1);
    $('.hourly-observations .cities .city-2').text(town2);
    $('.hourly-observations .cities .city-3').text(town3);
    $('.hourly-observations .cities .city-4').text(town4);
    $('.hourly-observations .cities .city-5').text(town5);
    $('.hourly-observations .cities .city-6').text(town6);
    $('.hourly-observations .cities .city-7').text(town7);
   
    if (town1 != "") {$('.hourly-observations .temps .temp-1').text(weatherInfo.currentCond.city8slides.cities[0].temp)} else {$('.hourly-observations .temps .temp-1').text(town1)};
    if (town2 != "") {$('.hourly-observations .temps .temp-2').text(weatherInfo.currentCond.city8slides.cities[1].temp)} else {$('.hourly-observations .temps .temp-2').text(town2)};
    if (town3 != "") {$('.hourly-observations .temps .temp-3').text(weatherInfo.currentCond.city8slides.cities[2].temp)} else {$('.hourly-observations .temps .temp-3').text(town3)};
    if (town4 != "") {$('.hourly-observations .temps .temp-4').text(weatherInfo.currentCond.city8slides.cities[3].temp)} else {$('.hourly-observations .temps .temp-4').text(town4)};
    if (town5 != "") {$('.hourly-observations .temps .temp-5').text(weatherInfo.currentCond.city8slides.cities[4].temp)} else {$('.hourly-observations .temps .temp-5').text(town5)};
    if (town6 != "") {$('.hourly-observations .temps .temp-6').text(weatherInfo.currentCond.city8slides.cities[5].temp)} else {$('.hourly-observations .temps .temp-6').text(town6)};
    if (town7 != "") {$('.hourly-observations .temps .temp-7').text(weatherInfo.currentCond.city8slides.cities[6].temp)} else {$('.hourly-observations .temps .temp-7').text(town7)};

    cond1 = ((town1 == "" ? "" : weatherInfo.currentCond.city8slides.cities[0].condition.replaceAll('Shower', 'SHWR',).replaceAll('Near', 'NR',).replaceAll('Light', 'LGT',).replaceAll('Heavy', 'HVY').replaceAll('Early', 'ERLY').substring(0,9)));
    cond2 = ((town2 == "" ? "" : weatherInfo.currentCond.city8slides.cities[1].condition.replaceAll('Shower', 'SHWR',).replaceAll('Near', 'NR',).replaceAll('Light', 'LGT',).replaceAll('Heavy', 'HVY').replaceAll('Early', 'ERLY').substring(0,9)));
    cond3 = ((town3 == "" ? "" : weatherInfo.currentCond.city8slides.cities[2].condition.replaceAll('Shower', 'SHWR',).replaceAll('Near', 'NR',).replaceAll('Light', 'LGT',).replaceAll('Heavy', 'HVY').replaceAll('Early', 'ERLY').substring(0,9)));
    cond4 = ((town4 == "" ? "" : weatherInfo.currentCond.city8slides.cities[3].condition.replaceAll('Shower', 'SHWR',).replaceAll('Near', 'NR',).replaceAll('Light', 'LGT',).replaceAll('Heavy', 'HVY').replaceAll('Early', 'ERLY').substring(0,9)));
    cond5 = ((town5 == "" ? "" : weatherInfo.currentCond.city8slides.cities[4].condition.replaceAll('Shower', 'SHWR',).replaceAll('Near', 'NR',).replaceAll('Light', 'LGT',).replaceAll('Heavy', 'HVY').replaceAll('Early', 'ERLY').substring(0,9)));
    cond6 = ((town6 == "" ? "" : weatherInfo.currentCond.city8slides.cities[5].condition.replaceAll('Shower', 'SHWR',).replaceAll('Near', 'NR',).replaceAll('Light', 'LGT',).replaceAll('Heavy', 'HVY').replaceAll('Early', 'ERLY').substring(0,9)));
    cond7 = ((town7 == "" ? "" : weatherInfo.currentCond.city8slides.cities[6].condition.replaceAll('Shower', 'SHWR',).replaceAll('Near', 'NR',).replaceAll('Light', 'LGT',).replaceAll('Heavy', 'HVY').replaceAll('Early', 'ERLY').substring(0,9)));
    $('.hourly-observations .weathers .weather-1').text(cond1);
    $('.hourly-observations .weathers .weather-2').text(cond2);
    $('.hourly-observations .weathers .weather-3').text(cond3);
    $('.hourly-observations .weathers .weather-4').text(cond4);
    $('.hourly-observations .weathers .weather-5').text(cond5);
    $('.hourly-observations .weathers .weather-6').text(cond6);
    $('.hourly-observations .weathers .weather-7').text(cond7);

    if (town1 != "") {$('.hourly-observations .winds .wind-1').text(weatherInfo.currentCond.city8slides.cities[0].wind)} else {$('.hourly-observations .winds .wind-1').text(town1)};
    if (town2 != "") {$('.hourly-observations .winds .wind-2').text(weatherInfo.currentCond.city8slides.cities[1].wind)} else {$('.hourly-observations .winds .wind-2').text(town2)};
    if (town3 != "") {$('.hourly-observations .winds .wind-3').text(weatherInfo.currentCond.city8slides.cities[2].wind)} else {$('.hourly-observations .winds .wind-3').text(town3)};
    if (town4 != "") {$('.hourly-observations .winds .wind-4').text(weatherInfo.currentCond.city8slides.cities[3].wind)} else {$('.hourly-observations .winds .wind-4').text(town4)};
    if (town5 != "") {$('.hourly-observations .winds .wind-5').text(weatherInfo.currentCond.city8slides.cities[4].wind)} else {$('.hourly-observations .winds .wind-5').text(town5)};
    if (town6 != "") {$('.hourly-observations .winds .wind-6').text(weatherInfo.currentCond.city8slides.cities[5].wind)} else {$('.hourly-observations .winds .wind-6').text(town6)};
    if (town7 != "") {$('.hourly-observations .winds .wind-7').text(weatherInfo.currentCond.city8slides.cities[6].wind)} else {$('.hourly-observations .winds .wind-7').text(town7)};
    
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

    $('.extended-forecast .days .day-1').text(weatherInfo.fiveDay.lowerbar.day[0].name);
    $('.extended-forecast .days .day-2').text(weatherInfo.fiveDay.lowerbar.day[1].name);
    $('.extended-forecast .days .day-3').text(weatherInfo.fiveDay.lowerbar.day[2].name);
    $('.extended-forecast .extended-conditions .con-1').text(weatherInfo.fiveDay.lowerbar.day[0].cond.replaceAll('PM', 'Afternoon').replaceAll('AM', 'Morning'));
    $('.extended-forecast .extended-conditions .con-2').text(weatherInfo.fiveDay.lowerbar.day[1].cond.replaceAll('PM', 'Afternoon').replaceAll('AM', 'Morning'));
    $('.extended-forecast .extended-conditions .con-3').text(weatherInfo.fiveDay.lowerbar.day[2].cond.replaceAll('PM', 'Afternoon').replaceAll('AM', 'Morning'));
    $('.extended-forecast .extended-los .lo-1').text('LO: ' + weatherInfo.fiveDay.lowerbar.day[0].low);
    $('.extended-forecast .extended-los .lo-2').text('LO: ' + weatherInfo.fiveDay.lowerbar.day[1].low);
    $('.extended-forecast .extended-los .lo-3').text('LO: ' + weatherInfo.fiveDay.lowerbar.day[2].low);
    $('.extended-forecast .extended-his .hi-1').text('HI: ' + weatherInfo.fiveDay.lowerbar.day[0].high);
    $('.extended-forecast .extended-his .hi-2').text('HI: ' + weatherInfo.fiveDay.lowerbar.day[1].high);
    $('.extended-forecast .extended-his .hi-3').text('HI: ' + weatherInfo.fiveDay.lowerbar.day[2].high);


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
function concludeLoop() {
    showSlides();
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

    $('#travel-container #travel-content .weathers').text('WEATHER\n' + weatherInfo.travel.cities[0].days[1].condition.replaceAll('Shower', 'SHWR',).replaceAll('Near', 'NR',).replaceAll('Light', 'LGT',).replaceAll('Heavy', 'HVY').replaceAll('Early', 'ERLY').substring(0,9) + '\n'
        + weatherInfo.travel.cities[1].days[1].condition.replaceAll('Shower', 'SHWR',).replaceAll('Near', 'NR',).replaceAll('Light', 'LGT',).replaceAll('Heavy', 'HVY').replaceAll('Early', 'ERLY').substring(0,9) + '\n'
        + weatherInfo.travel.cities[2].days[1].condition.replaceAll('Shower', 'SHWR',).replaceAll('Near', 'NR',).replaceAll('Light', 'LGT',).replaceAll('Heavy', 'HVY').replaceAll('Early', 'ERLY').substring(0,9) + '\n'
        + weatherInfo.travel.cities[3].days[1].condition.replaceAll('Shower', 'SHWR',).replaceAll('Near', 'NR',).replaceAll('Light', 'LGT',).replaceAll('Heavy', 'HVY').replaceAll('Early', 'ERLY').substring(0,9) + '\n'
        + weatherInfo.travel.cities[4].days[1].condition.replaceAll('Shower', 'SHWR',).replaceAll('Near', 'NR',).replaceAll('Light', 'LGT',).replaceAll('Heavy', 'HVY').replaceAll('Early', 'ERLY').substring(0,9) + '\n'
        + weatherInfo.travel.cities[5].days[1].condition.replaceAll('Shower', 'SHWR',).replaceAll('Near', 'NR',).replaceAll('Light', 'LGT',).replaceAll('Heavy', 'HVY').replaceAll('Early', 'ERLY').substring(0,9) + '\n'
        + weatherInfo.travel.cities[6].days[1].condition.replaceAll('Shower', 'SHWR',).replaceAll('Near', 'NR',).replaceAll('Light', 'LGT',).replaceAll('Heavy', 'HVY').replaceAll('Early', 'ERLY').substring(0,9) + '\n'
        + weatherInfo.travel.cities[7].days[1].condition.replaceAll('Shower', 'SHWR',).replaceAll('Near', 'NR',).replaceAll('Light', 'LGT',).replaceAll('Heavy', 'HVY').replaceAll('Early', 'ERLY').substring(0,9) + '\n'
        + weatherInfo.travel.cities[8].days[1].condition.replaceAll('Shower', 'SHWR',).replaceAll('Near', 'NR',).replaceAll('Light', 'LGT',).replaceAll('Heavy', 'HVY').replaceAll('Early', 'ERLY').substring(0,9) + '\n'
        + weatherInfo.travel.cities[9].days[1].condition.replaceAll('Shower', 'SHWR',).replaceAll('Near', 'NR',).replaceAll('Light', 'LGT',).replaceAll('Heavy', 'HVY').replaceAll('Early', 'ERLY').substring(0,9) + '\n'
        + weatherInfo.travel.cities[10].days[1].condition.replaceAll('Shower', 'SHWR',).replaceAll('Near', 'NR',).replaceAll('Light', 'LGT',).replaceAll('Heavy', 'HVY').replaceAll('Early', 'ERLY').substring(0,9) + '\n'
        + weatherInfo.travel.cities[11].days[1].condition.replaceAll('Shower', 'SHWR',).replaceAll('Near', 'NR',).replaceAll('Light', 'LGT',).replaceAll('Heavy', 'HVY').replaceAll('Early', 'ERLY').substring(0,9) + '\n'
        + weatherInfo.travel.cities[12].days[1].condition.replaceAll('Shower', 'SHWR',).replaceAll('Near', 'NR',).replaceAll('Light', 'LGT',).replaceAll('Heavy', 'HVY').replaceAll('Early', 'ERLY').substring(0,9) + '\n'
        + weatherInfo.travel.cities[13].days[1].condition.replaceAll('Shower', 'SHWR',).replaceAll('Near', 'NR',).replaceAll('Light', 'LGT',).replaceAll('Heavy', 'HVY').replaceAll('Early', 'ERLY').substring(0,9) + '\n'
        + weatherInfo.travel.cities[14].days[1].condition.replaceAll('Shower', 'SHWR',).replaceAll('Near', 'NR',).replaceAll('Light', 'LGT',).replaceAll('Heavy', 'HVY').replaceAll('Early', 'ERLY').substring(0,9) + '\n'
        + weatherInfo.travel.cities[15].days[1].condition.replaceAll('Shower', 'SHWR',).replaceAll('Near', 'NR',).replaceAll('Light', 'LGT',).replaceAll('Heavy', 'HVY').replaceAll('Early', 'ERLY').substring(0,9) + '\n'
        + weatherInfo.travel.cities[16].days[1].condition.replaceAll('Shower', 'SHWR',).replaceAll('Near', 'NR',).replaceAll('Light', 'LGT',).replaceAll('Heavy', 'HVY').replaceAll('Early', 'ERLY').substring(0,9) + '\n'
        + weatherInfo.travel.cities[17].days[1].condition.replaceAll('Shower', 'SHWR',).replaceAll('Near', 'NR',).replaceAll('Light', 'LGT',).replaceAll('Heavy', 'HVY').replaceAll('Early', 'ERLY').substring(0,9) + '\n'
        + weatherInfo.travel.cities[18].days[1].condition.replaceAll('Shower', 'SHWR',).replaceAll('Near', 'NR',).replaceAll('Light', 'LGT',).replaceAll('Heavy', 'HVY').replaceAll('Early', 'ERLY').substring(0,9) + '\n'
        + weatherInfo.travel.cities[19].days[1].condition.replaceAll('Shower', 'SHWR',).replaceAll('Near', 'NR',).replaceAll('Light', 'LGT',).replaceAll('Heavy', 'HVY').replaceAll('Early', 'ERLY').substring(0,9) + '\n'
        + weatherInfo.travel.cities[20].days[1].condition.replaceAll('Shower', 'SHWR',).replaceAll('Near', 'NR',).replaceAll('Light', 'LGT',).replaceAll('Heavy', 'HVY').replaceAll('Early', 'ERLY').substring(0,9) + '\n'
        + weatherInfo.travel.cities[21].days[1].condition.replaceAll('Shower', 'SHWR',).replaceAll('Near', 'NR',).replaceAll('Light', 'LGT',).replaceAll('Heavy', 'HVY').replaceAll('Early', 'ERLY').substring(0,9) + '\n'
        + weatherInfo.travel.cities[22].days[1].condition.replaceAll('Shower', 'SHWR',).replaceAll('Near', 'NR',).replaceAll('Light', 'LGT',).replaceAll('Heavy', 'HVY').replaceAll('Early', 'ERLY').substring(0,9) + '\n'
        + weatherInfo.travel.cities[23].days[1].condition.replaceAll('Shower', 'SHWR',).replaceAll('Near', 'NR',).replaceAll('Light', 'LGT',).replaceAll('Heavy', 'HVY').replaceAll('Early', 'ERLY').substring(0,9) + '\n'  + '\n'  + '\n'  + '\n'
    )

    $('#travel-container #travel-content .his').text('HI\n' + weatherInfo.travel.cities[0].days[1].high + '\n'
        + weatherInfo.travel.cities[1].days[1].high + '\n'
        + weatherInfo.travel.cities[2].days[1].high + '\n'
        + weatherInfo.travel.cities[3].days[1].high + '\n'
        + weatherInfo.travel.cities[4].days[1].high + '\n'
        + weatherInfo.travel.cities[5].days[1].high + '\n'
        + weatherInfo.travel.cities[6].days[1].high + '\n'
        + weatherInfo.travel.cities[7].days[1].high + '\n'
        + weatherInfo.travel.cities[8].days[1].high + '\n'
        + weatherInfo.travel.cities[9].days[1].high + '\n'
        + weatherInfo.travel.cities[10].days[1].high + '\n'
        + weatherInfo.travel.cities[11].days[1].high + '\n'
        + weatherInfo.travel.cities[12].days[1].high + '\n'
        + weatherInfo.travel.cities[13].days[1].high + '\n'
        + weatherInfo.travel.cities[14].days[1].high + '\n'
        + weatherInfo.travel.cities[15].days[1].high + '\n'
        + weatherInfo.travel.cities[16].days[1].high + '\n'
        + weatherInfo.travel.cities[17].days[1].high + '\n'
        + weatherInfo.travel.cities[18].days[1].high + '\n'
        + weatherInfo.travel.cities[19].days[1].high + '\n'
        + weatherInfo.travel.cities[20].days[1].high + '\n'
        + weatherInfo.travel.cities[21].days[1].high + '\n'
        + weatherInfo.travel.cities[22].days[1].high + '\n'
        + weatherInfo.travel.cities[23].days[1].high + '\n'  + '\n'  + '\n'  + '\n'
    )

    $('#travel-container #travel-content .lows').text('LOW\n' + weatherInfo.travel.cities[0].days[1].high + '\n'
        + weatherInfo.travel.cities[1].days[1].low + '\n'
        + weatherInfo.travel.cities[2].days[1].low + '\n'
        + weatherInfo.travel.cities[3].days[1].low + '\n'
        + weatherInfo.travel.cities[4].days[1].low + '\n'
        + weatherInfo.travel.cities[5].days[1].low + '\n'
        + weatherInfo.travel.cities[6].days[1].low + '\n'
        + weatherInfo.travel.cities[7].days[1].low + '\n'
        + weatherInfo.travel.cities[8].days[1].low + '\n'
        + weatherInfo.travel.cities[9].days[1].low + '\n'
        + weatherInfo.travel.cities[10].days[1].low + '\n'
        + weatherInfo.travel.cities[11].days[1].low + '\n'
        + weatherInfo.travel.cities[12].days[1].low + '\n'
        + weatherInfo.travel.cities[13].days[1].low + '\n'
        + weatherInfo.travel.cities[14].days[1].low + '\n'
        + weatherInfo.travel.cities[15].days[1].low + '\n'
        + weatherInfo.travel.cities[16].days[1].low + '\n'
        + weatherInfo.travel.cities[17].days[1].low + '\n'
        + weatherInfo.travel.cities[18].days[1].low + '\n'
        + weatherInfo.travel.cities[19].days[1].low + '\n'
        + weatherInfo.travel.cities[20].days[1].low + '\n'
        + weatherInfo.travel.cities[21].days[1].low + '\n'
        + weatherInfo.travel.cities[22].days[1].low + '\n'
        + weatherInfo.travel.cities[23].days[1].low + '\n'  + '\n'  + '\n'  + '\n'
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
    var rtown1, rtown2, rtown3, rtown4, rtown5, rtown6, rtown7;
    var rcond1, rcond2, rcond3, rcond4, rcond5, rcond6, rcond7;

    rtown1 = ((weatherInfo.currentCond.city8slides.cities[0] == undefined ? "" : weatherInfo.currentCond.city8slides.cities[0].displayname.replaceAll('Township', 'TWP').replaceAll('Fort', 'FT').replaceAll('Airport', 'ARPT').replaceAll('Airforce Base', 'A.F.B.').substring(0,14)));
    rtown2 = ((weatherInfo.currentCond.city8slides.cities[1] == undefined ? "" : weatherInfo.currentCond.city8slides.cities[1].displayname.replaceAll('Township', 'TWP').replaceAll('Fort', 'FT').replaceAll('Airport', 'ARPT').replaceAll('Airforce Base', 'A.F.B.').substring(0,14)));
    rtown3 = ((weatherInfo.currentCond.city8slides.cities[2] == undefined ? "" : weatherInfo.currentCond.city8slides.cities[2].displayname.replaceAll('Township', 'TWP').replaceAll('Fort', 'FT').replaceAll('Airport', 'ARPT').replaceAll('Airforce Base', 'A.F.B.').substring(0,14)));
    rtown4 = ((weatherInfo.currentCond.city8slides.cities[3] == undefined ? "" : weatherInfo.currentCond.city8slides.cities[3].displayname.replaceAll('Township', 'TWP').replaceAll('Fort', 'FT').replaceAll('Airport', 'ARPT').replaceAll('Airforce Base', 'A.F.B.').substring(0,14)));
    rtown5 = ((weatherInfo.currentCond.city8slides.cities[4] == undefined ? "" : weatherInfo.currentCond.city8slides.cities[4].displayname.replaceAll('Township', 'TWP').replaceAll('Fort', 'FT').replaceAll('Airport', 'ARPT').replaceAll('Airforce Base', 'A.F.B.').substring(0,14)));
    rtown6 = ((weatherInfo.currentCond.city8slides.cities[5] == undefined ? "" : weatherInfo.currentCond.city8slides.cities[5].displayname.replaceAll('Township', 'TWP').replaceAll('Fort', 'FT').replaceAll('Airport', 'ARPT').replaceAll('Airforce Base', 'A.F.B.').substring(0,14)));
    rtown7 = ((weatherInfo.currentCond.city8slides.cities[6] == undefined ? "" : weatherInfo.currentCond.city8slides.cities[6].displayname.replaceAll('Township', 'TWP').replaceAll('Fort', 'FT').replaceAll('Airport', 'ARPT').replaceAll('Airforce Base', 'A.F.B.').substring(0,14)));
    $('.regional-forecast .cities .city-1').text(rtown1);
    $('.regional-forecast .cities .city-2').text(rtown2);
    $('.regional-forecast .cities .city-3').text(rtown3);
    $('.regional-forecast .cities .city-4').text(rtown4);
    $('.regional-forecast .cities .city-5').text(rtown5);
    $('.regional-forecast .cities .city-6').text(rtown6);
    $('.regional-forecast .cities .city-7').text(rtown7);

    rcond1 = ((rtown1 == "" ? "" : weatherInfo.currentCond.city8slides.cities[0].wxforecast.replaceAll('Shower', 'SHWR',).replaceAll('Near', 'NR',).replaceAll('Light', 'LGT',).replaceAll('Heavy', 'HVY').replaceAll('Early', 'ERLY').substring(0,9)));
    rcond2 = ((rtown2 == "" ? "" : weatherInfo.currentCond.city8slides.cities[1].wxforecast.replaceAll('Shower', 'SHWR',).replaceAll('Near', 'NR',).replaceAll('Light', 'LGT',).replaceAll('Heavy', 'HVY').replaceAll('Early', 'ERLY').substring(0,9)));
    rcond3 = ((rtown3 == "" ? "" : weatherInfo.currentCond.city8slides.cities[2].wxforecast.replaceAll('Shower', 'SHWR',).replaceAll('Near', 'NR',).replaceAll('Light', 'LGT',).replaceAll('Heavy', 'HVY').replaceAll('Early', 'ERLY').substring(0,9)));
    rcond4 = ((rtown4 == "" ? "" : weatherInfo.currentCond.city8slides.cities[3].wxforecast.replaceAll('Shower', 'SHWR',).replaceAll('Near', 'NR',).replaceAll('Light', 'LGT',).replaceAll('Heavy', 'HVY').replaceAll('Early', 'ERLY').substring(0,9)));
    rcond5 = ((rtown5 == "" ? "" : weatherInfo.currentCond.city8slides.cities[4].wxforecast.replaceAll('Shower', 'SHWR',).replaceAll('Near', 'NR',).replaceAll('Light', 'LGT',).replaceAll('Heavy', 'HVY').replaceAll('Early', 'ERLY').substring(0,9)));
    rcond6 = ((rtown6 == "" ? "" : weatherInfo.currentCond.city8slides.cities[5].wxforecast.replaceAll('Shower', 'SHWR',).replaceAll('Near', 'NR',).replaceAll('Light', 'LGT',).replaceAll('Heavy', 'HVY').replaceAll('Early', 'ERLY').substring(0,9)));   
    rcond7 = ((rtown7 == "" ? "" : weatherInfo.currentCond.city8slides.cities[6].wxforecast.replaceAll('Shower', 'SHWR',).replaceAll('Near', 'NR',).replaceAll('Light', 'LGT',).replaceAll('Heavy', 'HVY').replaceAll('Early', 'ERLY').substring(0,9)));   
    $('.regional-forecast .weathers .weather-1').text(rcond1);
    $('.regional-forecast .weathers .weather-2').text(rcond2);
    $('.regional-forecast .weathers .weather-3').text(rcond3);
    $('.regional-forecast .weathers .weather-4').text(rcond4);
    $('.regional-forecast .weathers .weather-5').text(rcond5);
    $('.regional-forecast .weathers .weather-6').text(rcond6);
    $('.regional-forecast .weathers .weather-7').text(rcond7);
   
    if (rtown1 != "") {$('.regional-forecast .lows .low-1').text(weatherInfo.currentCond.city8slides.cities[0].low)} else {$('.regional-forecast .lows .low-1').text(rtown1)};
    if (rtown2 != "") {$('.regional-forecast .lows .low-2').text(weatherInfo.currentCond.city8slides.cities[1].low)} else {$('.regional-forecast .lows .low-2').text(rtown2)};
    if (rtown3 != "") {$('.regional-forecast .lows .low-3').text(weatherInfo.currentCond.city8slides.cities[2].low)} else {$('.regional-forecast .lows .low-3').text(rtown3)};
    if (rtown4 != "") {$('.regional-forecast .lows .low-4').text(weatherInfo.currentCond.city8slides.cities[3].low)} else {$('.regional-forecast .lows .low-4').text(rtown4)};
    if (rtown5 != "") {$('.regional-forecast .lows .low-5').text(weatherInfo.currentCond.city8slides.cities[4].low)} else {$('.regional-forecast .lows .low-5').text(rtown5)};
    if (rtown6 != "") {$('.regional-forecast .lows .low-6').text(weatherInfo.currentCond.city8slides.cities[5].low)} else {$('.regional-forecast .lows .low-6').text(rtown6)};
    if (rtown7 != "") {$('.regional-forecast .lows .low-7').text(weatherInfo.currentCond.city8slides.cities[6].low)} else {$('.regional-forecast .lows .low-7').text(rtown7)};

    if (rtown1 != "") {$('.regional-forecast .highs .hi-1').text(weatherInfo.currentCond.city8slides.cities[0].hi)} else {$('.regional-forecast .highs .hi-1').text(rtown1)};
    if (rtown2 != "") {$('.regional-forecast .highs .hi-2').text(weatherInfo.currentCond.city8slides.cities[1].hi)} else {$('.regional-forecast .highs .hi-2').text(rtown2)};
    if (rtown3 != "") {$('.regional-forecast .highs .hi-3').text(weatherInfo.currentCond.city8slides.cities[2].hi)} else {$('.regional-forecast .highs .hi-3').text(rtown3)};
    if (rtown4 != "") {$('.regional-forecast .highs .hi-4').text(weatherInfo.currentCond.city8slides.cities[3].hi)} else {$('.regional-forecast .highs .hi-4').text(rtown4)};
    if (rtown5 != "") {$('.regional-forecast .highs .hi-5').text(weatherInfo.currentCond.city8slides.cities[4].hi)} else {$('.regional-forecast .highs .hi-5').text(rtown5)};
    if (rtown6 != "") {$('.regional-forecast .highs .hi-6').text(weatherInfo.currentCond.city8slides.cities[5].hi)} else {$('.regional-forecast .highs .hi-6').text(rtown6)};
    if (rtown7 != "") {$('.regional-forecast .highs .hi-7').text(weatherInfo.currentCond.city8slides.cities[6].hi)} else {$('.regional-forecast .highs .hi-7').text(rtown7)};

    $('.regional-forecast').fadeIn(0);
    setTimeout(function() {
      $('.regional-forecast').fadeOut(0);
    }, slideLengthFinal);
}
function regionalConditions() {
    $('#slide-title-text').css('text-align', 'center');
    $('#slide-title-text').css('font-family', 'mainfont');
    $('#slide-title-text').text('CONDITIONS ACROSS THE REGION');
    var retown1, retown2, retown3, retown4, retown5, retown6, retown7;
    var recond1, recond2, recond3, recond4, recond5, recond6, recond7;

    retown1 = ((weatherInfo.currentCond.regionallocs.cities[0] == undefined ? "" : weatherInfo.currentCond.regionallocs.cities[0].displayname.replaceAll('Township', 'TWP').replaceAll('Fort', 'FT').replaceAll('Airport', 'ARPT').replaceAll('Airforce Base', 'A.F.B.').substring(0,15)));
    retown2 = ((weatherInfo.currentCond.regionallocs.cities[1] == undefined ? "" : weatherInfo.currentCond.regionallocs.cities[1].displayname.replaceAll('Township', 'TWP').replaceAll('Fort', 'FT').replaceAll('Airport', 'ARPT').replaceAll('Airforce Base', 'A.F.B.').substring(0,15)));
    retown3 = ((weatherInfo.currentCond.regionallocs.cities[2] == undefined ? "" : weatherInfo.currentCond.regionallocs.cities[2].displayname.replaceAll('Township', 'TWP').replaceAll('Fort', 'FT').replaceAll('Airport', 'ARPT').replaceAll('Airforce Base', 'A.F.B.').substring(0,15)));
    retown4 = ((weatherInfo.currentCond.regionallocs.cities[3] == undefined ? "" : weatherInfo.currentCond.regionallocs.cities[3].displayname.replaceAll('Township', 'TWP').replaceAll('Fort', 'FT').replaceAll('Airport', 'ARPT').replaceAll('Airforce Base', 'A.F.B.').substring(0,15)));
    retown5 = ((weatherInfo.currentCond.regionallocs.cities[4] == undefined ? "" : weatherInfo.currentCond.regionallocs.cities[4].displayname.replaceAll('Township', 'TWP').replaceAll('Fort', 'FT').replaceAll('Airport', 'ARPT').replaceAll('Airforce Base', 'A.F.B.').substring(0,15)));
    retown6 = ((weatherInfo.currentCond.regionallocs.cities[5] == undefined ? "" : weatherInfo.currentCond.regionallocs.cities[5].displayname.replaceAll('Township', 'TWP').replaceAll('Fort', 'FT').replaceAll('Airport', 'ARPT').replaceAll('Airforce Base', 'A.F.B.').substring(0,15)));
    retown7 = ((weatherInfo.currentCond.regionallocs.cities[6] == undefined ? "" : weatherInfo.currentCond.regionallocs.cities[6].displayname.replaceAll('Township', 'TWP').replaceAll('Fort', 'FT').replaceAll('Airport', 'ARPT').replaceAll('Airforce Base', 'A.F.B.').substring(0,15)));
    if (retown1 != "") {$('.regional-conditions .cities .city-1').text(retown1 + weatherInfo.currentCond.regionallocs.cities[0].statecode)} else {$('.regional-conditions .cities .city-1').text(retown1)};
    if (retown2 != "") {$('.regional-conditions .cities .city-2').text(retown2 + weatherInfo.currentCond.regionallocs.cities[1].statecode)} else {$('.regional-conditions .cities .city-2').text(retown2)};
    if (retown3 != "") {$('.regional-conditions .cities .city-3').text(retown3 + weatherInfo.currentCond.regionallocs.cities[2].statecode)} else {$('.regional-conditions .cities .city-3').text(retown3)};
    if (retown4 != "") {$('.regional-conditions .cities .city-4').text(retown4 + weatherInfo.currentCond.regionallocs.cities[3].statecode)} else {$('.regional-conditions .cities .city-4').text(retown4)};
    if (retown5 != "") {$('.regional-conditions .cities .city-5').text(retown5 + weatherInfo.currentCond.regionallocs.cities[4].statecode)} else {$('.regional-conditions .cities .city-5').text(retown5)};
    if (retown6 != "") {$('.regional-conditions .cities .city-6').text(retown6 + weatherInfo.currentCond.regionallocs.cities[5].statecode)} else {$('.regional-conditions .cities .city-6').text(retown6)};
    if (retown7 != "") {$('.regional-conditions .cities .city-7').text(retown7 + weatherInfo.currentCond.regionallocs.cities[6].statecode)} else {$('.regional-conditions .cities .city-7').text(retown7)};

    recond1 = ((retown1 == "" ? "" : weatherInfo.currentCond.regionallocs.cities[0].condition.replaceAll('Shower', 'SHWR',).replaceAll('Near', 'NR',).replaceAll('Light', 'LGT',).replaceAll('Heavy', 'HVY').replaceAll('Early', 'ERLY').substring(0,9)));   
    recond2 = ((retown2 == "" ? "" : weatherInfo.currentCond.regionallocs.cities[1].condition.replaceAll('Shower', 'SHWR',).replaceAll('Near', 'NR',).replaceAll('Light', 'LGT',).replaceAll('Heavy', 'HVY').replaceAll('Early', 'ERLY').substring(0,9)));   
    recond3 = ((retown3 == "" ? "" : weatherInfo.currentCond.regionallocs.cities[2].condition.replaceAll('Shower', 'SHWR',).replaceAll('Near', 'NR',).replaceAll('Light', 'LGT',).replaceAll('Heavy', 'HVY').replaceAll('Early', 'ERLY').substring(0,9)));   
    recond4 = ((retown4 == "" ? "" : weatherInfo.currentCond.regionallocs.cities[3].condition.replaceAll('Shower', 'SHWR',).replaceAll('Near', 'NR',).replaceAll('Light', 'LGT',).replaceAll('Heavy', 'HVY').replaceAll('Early', 'ERLY').substring(0,9)));   
    recond5 = ((retown5 == "" ? "" : weatherInfo.currentCond.regionallocs.cities[4].condition.replaceAll('Shower', 'SHWR',).replaceAll('Near', 'NR',).replaceAll('Light', 'LGT',).replaceAll('Heavy', 'HVY').replaceAll('Early', 'ERLY').substring(0,9)));   
    recond6 = ((retown6 == "" ? "" : weatherInfo.currentCond.regionallocs.cities[5].condition.replaceAll('Shower', 'SHWR',).replaceAll('Near', 'NR',).replaceAll('Light', 'LGT',).replaceAll('Heavy', 'HVY').replaceAll('Early', 'ERLY').substring(0,9)));   
    recond7 = ((retown7 == "" ? "" : weatherInfo.currentCond.regionallocs.cities[6].condition.replaceAll('Shower', 'SHWR',).replaceAll('Near', 'NR',).replaceAll('Light', 'LGT',).replaceAll('Heavy', 'HVY').replaceAll('Early', 'ERLY').substring(0,9)));   
    $('.regional-conditions .weathers .weather-1').text(recond1);
    $('.regional-conditions .weathers .weather-2').text(recond2);
    $('.regional-conditions .weathers .weather-3').text(recond3);
    $('.regional-conditions .weathers .weather-4').text(recond4);
    $('.regional-conditions .weathers .weather-5').text(recond5);
    $('.regional-conditions .weathers .weather-6').text(recond6);
    $('.regional-conditions .weathers .weather-7').text(recond7);

    if (retown1 != "") {$('.regional-conditions .temps .temp-1').text( weatherInfo.currentCond.regionallocs.cities[0].temp)} else {$('.regional-conditions .temps .temp-1').text(retown1)};
    if (retown2 != "") {$('.regional-conditions .temps .temp-2').text( weatherInfo.currentCond.regionallocs.cities[1].temp)} else {$('.regional-conditions .temps .temp-2').text(retown2)};
    if (retown3 != "") {$('.regional-conditions .temps .temp-3').text( weatherInfo.currentCond.regionallocs.cities[2].temp)} else {$('.regional-conditions .temps .temp-3').text(retown3)};
    if (retown4 != "") {$('.regional-conditions .temps .temp-4').text( weatherInfo.currentCond.regionallocs.cities[3].temp)} else {$('.regional-conditions .temps .temp-4').text(retown4)};
    if (retown5 != "") {$('.regional-conditions .temps .temp-5').text( weatherInfo.currentCond.regionallocs.cities[4].temp)} else {$('.regional-conditions .temps .temp-5').text(retown5)};
    if (retown6 != "") {$('.regional-conditions .temps .temp-6').text( weatherInfo.currentCond.regionallocs.cities[5].temp)} else {$('.regional-conditions .temps .temp-6').text(retown6)};
    if (retown7 != "") {$('.regional-conditions .temps .temp-7').text( weatherInfo.currentCond.regionallocs.cities[6].temp)} else {$('.regional-conditions .temps .temp-7').text(retown7)};

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
    setTimeout(() => {currentConditions()}, travelForecastLength);
    setTimeout(() => {extendedForecast()}, travelForecastLength + slideLength);
    setTimeout(() => {loopSlides()}, travelForecastLength + (2*slideLength));
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
