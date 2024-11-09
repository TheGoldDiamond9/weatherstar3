var noreportmodecc = false, noreportmodefc = false, noreportmodeac = false, marqueeDone = false;
var lowerDetailInfoTime = 4000
const gromonth = ["JANUARY PRECIPITATION: ","FEBRUARY PRECIPITATION: ","MARCH PRECIPITATION: ","APRIL PRECIPITATION: ","MAY PRECIPITATION: ","JUNE PRECIPITATION: ","JULY PRECIPITATION: ","AUGUST PRECIPITATION: ","SEPTEMBER PRECIPITATION: ","OCTOBER PRECIPITATION: ","NOVEMBER PRECIPITATION: ","DECEMBER PRECIPITATION: "];

    const grod = new Date();
    let gromonthname = gromonth[grod.getMonth()];
function marqueeIsDone () {
	marqueeDone = true
	setTimeout(function() {marqueeDone = false}, 1)
}
function marqueeObsOnlyOne () {
	$('#marqueetext').marquee({speed: 0, pauseOnHover: false})
	$('#marqueeholder').fadeOut(0);
	$('#lowerinfotext').fadeIn(0);
	$('#date').fadeIn(0);
	$('#time').fadeIn(0);
	setTimeout(() => {$('#lowerinfotext').text('CONDITIONS AT ' + maincitycoords.displayname)}, 1);
	setTimeout(() => {$('#lowerinfotext').text(weatherInfo.currentCond.weatherLocs[0].cond)}, 1 * lowerDetailInfoTime);
	setTimeout(() => {if (weatherInfo.currentCond.weatherLocs[0].feelslike.type == "dontdisplay") {$('#lowerinfotext').text('TEMP:  ' + weatherInfo.currentCond.weatherLocs[0].temp + '°F   ')} else {$('#lowerinfotext').text('TEMP:  ' + weatherInfo.currentCond.weatherLocs[0].temp + '°F   ' + weatherInfo.currentCond.weatherLocs[0].feelslike.type + ': ' + weatherInfo.currentCond.weatherLocs[0].feelslike.val + '°F')}}, 2 * lowerDetailInfoTime);
	setTimeout(() => {$('#lowerinfotext').text('HUMIDITY: ' +weatherInfo.currentCond.weatherLocs[0].humid + '%   ' + 'DEWPOINT: ' + weatherInfo.currentCond.weatherLocs[0].dewpt + '°F')}, 3 * lowerDetailInfoTime);
	setTimeout(() => {$('#lowerinfotext').text('BAROMETRIC PRESSURE: ' + weatherInfo.currentCond.weatherLocs[0].pressure + " " + weatherInfo.currentCond.weatherLocs[0].pressureTrend)}, 4 * lowerDetailInfoTime);
	setTimeout(() => {$('#lowerinfotext').text('WIND: ' + weatherInfo.currentCond.weatherLocs[0].wind)}, 5 * lowerDetailInfoTime);
	setTimeout(() => {if (weatherInfo.currentCond.weatherLocs[0].ceiling != null) {$('#lowerinfotext').text('VISIB: ' + weatherInfo.currentCond.weatherLocs[0].visibility + ' MI. ' + 'CEILING: ' + weatherInfo.currentCond.weatherLocs[0].ceiling +' FT.')} else {$('#lowerinfotext').text('VISIB: ' + weatherInfo.currentCond.weatherLocs[0].visibility + ' MI. ' + 'CEILING:UNLIMITED')}}, 6 * lowerDetailInfoTime);
	setTimeout(() => {$('#lowerinfotext').text(gromonthname + weatherInfo.currentCond.weatherLocs[0].monthToDatePrecip)}, 7 * lowerDetailInfoTime);
	setTimeout(() => {$('#lowerinfotext').text('CONDITIONS AT ' + maincitycoords.displayname)}, 8 * lowerDetailInfoTime);
	setTimeout(() => {$('#lowerinfotext').text(weatherInfo.currentCond.weatherLocs[0].cond)}, 9 * lowerDetailInfoTime);
	setTimeout(() => {if (weatherInfo.currentCond.weatherLocs[0].feelslike.type == "dontdisplay") {$('#lowerinfotext').text('TEMP:  ' + weatherInfo.currentCond.weatherLocs[0].temp + '°F   ')} else {$('#lowerinfotext').text('TEMP:  ' + weatherInfo.currentCond.weatherLocs[0].temp + '°F   ' + weatherInfo.currentCond.weatherLocs[0].feelslike.type + ': ' + weatherInfo.currentCond.weatherLocs[0].feelslike.val + '°F')}}, 10 * lowerDetailInfoTime);
	setTimeout(() => {$('#lowerinfotext').text('HUMIDITY: ' + weatherInfo.currentCond.weatherLocs[0].humid + '%   ' + 'DEWPOINT: ' + weatherInfo.currentCond.weatherLocs[0].dewpt + '°F')}, 11 * lowerDetailInfoTime);
	setTimeout(() => {$('#lowerinfotext').text('BAROMETRIC PRESSURE: ' + weatherInfo.currentCond.weatherLocs[0].pressure + " " + weatherInfo.currentCond.weatherLocs[0].pressureTrend)}, 12 * lowerDetailInfoTime);
	setTimeout(() => {$('#lowerinfotext').text('WIND: ' + weatherInfo.currentCond.weatherLocs[0].wind)}, 13 * lowerDetailInfoTime);
	setTimeout(() => {if (weatherInfo.currentCond.weatherLocs[0].ceiling != null) {$('#lowerinfotext').text('VISIB: ' + weatherInfo.currentCond.weatherLocs[0].visibility + ' MI. ' + 'CEILING: ' + weatherInfo.currentCond.weatherLocs[0].ceiling +' FT.')} else {$('#lowerinfotext').text('VISIB: ' + weatherInfo.currentCond.weatherLocs[0].visibility + ' MI. ' + 'CEILING:UNLIMITED')}}, 14 * lowerDetailInfoTime);
	setTimeout(() => {$('#lowerinfotext').text(gromonthname + weatherInfo.currentCond.weatherLocs[0].monthToDatePrecip)}, 15 * lowerDetailInfoTime);
	setTimeout(() => {marqueeObsOnlyOne()}, 16 * lowerDetailInfoTime);
}	
function marqueeAdOnlyOne () {
	$('#marqueeholder').fadeIn(0),
	$('#lowerinfotext').fadeOut(0),
	$('#date').fadeOut(0),
	$('#time').fadeOut(0),
	$('#marqueetext').text(apperanceSettings.marqueeAd);
	$('#marqueetext').marquee({speed: 150, pauseOnHover: false, delayBeforeStart: 2000, pauseOnCycle: true})
}
function marqueeBothObs () {
	setTimeout(() => {
$('#marqueetext').marquee({speed: 0, pauseOnHover: false})
	$('#marqueeholder').fadeOut(0);
	$('#lowerinfotext').fadeIn(0);
	$('#date').fadeIn(0);
	$('#time').fadeIn(0);
	}, 50)
	
	setTimeout(() => {$('#lowerinfotext').text('CONDITIONS AT ' + maincitycoords.displayname)}, 1);
	setTimeout(() => {$('#lowerinfotext').text(weatherInfo.currentCond.weatherLocs[0].cond)}, 1 * lowerDetailInfoTime);
	setTimeout(() => {if (weatherInfo.currentCond.weatherLocs[0].feelslike.type == "dontdisplay") {$('#lowerinfotext').text('TEMP:  ' + weatherInfo.currentCond.weatherLocs[0].temp + '°F   ')} else {$('#lowerinfotext').text('TEMP:  ' + weatherInfo.currentCond.weatherLocs[0].temp + '°F   ' + weatherInfo.currentCond.weatherLocs[0].feelslike.type + ': ' + weatherInfo.currentCond.weatherLocs[0].feelslike.val + '°F')}}, 2 * lowerDetailInfoTime);
	setTimeout(() => {$('#lowerinfotext').text('HUMIDITY: ' +weatherInfo.currentCond.weatherLocs[0].humid + '%   ' + 'DEWPOINT: ' + weatherInfo.currentCond.weatherLocs[0].dewpt + '°F')}, 3 * lowerDetailInfoTime);
	setTimeout(() => {$('#lowerinfotext').text('BAROMETRIC PRESSURE: ' + weatherInfo.currentCond.weatherLocs[0].pressure + " " + weatherInfo.currentCond.weatherLocs[0].pressureTrend)}, 4 * lowerDetailInfoTime);
	setTimeout(() => {$('#lowerinfotext').text('WIND: ' + weatherInfo.currentCond.weatherLocs[0].wind)}, 5 * lowerDetailInfoTime);
	setTimeout(() => {if (weatherInfo.currentCond.weatherLocs[0].ceiling != null) {$('#lowerinfotext').text('VISIB: ' + weatherInfo.currentCond.weatherLocs[0].visibility + ' MI. ' + 'CEILING: ' + weatherInfo.currentCond.weatherLocs[0].ceiling +' FT.')} else {$('#lowerinfotext').text('VISIB: ' + weatherInfo.currentCond.weatherLocs[0].visibility + ' MI. ' + 'CEILING:UNLIMITED')}}, 6 * lowerDetailInfoTime);
	setTimeout(() => {$('#lowerinfotext').text(gromonthname + weatherInfo.currentCond.weatherLocs[0].monthToDatePrecip)}, 7 * lowerDetailInfoTime);
	setTimeout(() => {$('#lowerinfotext').text('CONDITIONS AT ' + maincitycoords.displayname)}, 8 * lowerDetailInfoTime);
	setTimeout(() => {$('#lowerinfotext').text(weatherInfo.currentCond.weatherLocs[0].cond)}, 9 * lowerDetailInfoTime);
	setTimeout(() => {if (weatherInfo.currentCond.weatherLocs[0].feelslike.type == "dontdisplay") {$('#lowerinfotext').text('TEMP:  ' + weatherInfo.currentCond.weatherLocs[0].temp + '°F   ')} else {$('#lowerinfotext').text('TEMP:  ' + weatherInfo.currentCond.weatherLocs[0].temp + '°F   ' + weatherInfo.currentCond.weatherLocs[0].feelslike.type + ': ' + weatherInfo.currentCond.weatherLocs[0].feelslike.val + '°F')}}, 10 * lowerDetailInfoTime);
	setTimeout(() => {$('#lowerinfotext').text('HUMIDITY: ' + weatherInfo.currentCond.weatherLocs[0].humid + '%   ' + 'DEWPOINT: ' + weatherInfo.currentCond.weatherLocs[0].dewpt + '°F')}, 11 * lowerDetailInfoTime);
	setTimeout(() => {$('#lowerinfotext').text('BAROMETRIC PRESSURE: ' + weatherInfo.currentCond.weatherLocs[0].pressure + " " + weatherInfo.currentCond.weatherLocs[0].pressureTrend)}, 12 * lowerDetailInfoTime);
	setTimeout(() => {$('#lowerinfotext').text('WIND: ' + weatherInfo.currentCond.weatherLocs[0].wind)}, 13 * lowerDetailInfoTime);
	setTimeout(() => {if (weatherInfo.currentCond.weatherLocs[0].ceiling != null) {$('#lowerinfotext').text('VISIB: ' + weatherInfo.currentCond.weatherLocs[0].visibility + ' MI. ' + 'CEILING: ' + weatherInfo.currentCond.weatherLocs[0].ceiling +' FT.')} else {$('#lowerinfotext').text('VISIB: ' + weatherInfo.currentCond.weatherLocs[0].visibility + ' MI. ' + 'CEILING:UNLIMITED')}}, 14 * lowerDetailInfoTime);
	setTimeout(() => {$('#lowerinfotext').text(gromonthname + weatherInfo.currentCond.weatherLocs[0].monthToDatePrecip)}, 15 * lowerDetailInfoTime);
	setTimeout(() => {marqueeBothAd()}, 16 * lowerDetailInfoTime);
}	
function marqueeBothAd () {
	$('#marqueeholder').fadeIn(0),
	$('#lowerinfotext').fadeOut(0),
	$('#date').fadeOut(0),
	$('#time').fadeOut(0),
	$('#marqueetext').text(apperanceSettings.marqueeAd);
	$('#marqueetext').marquee({speed: 150, pauseOnHover: false, delayBeforeStart: 2000, pauseOnCycle: true})
	$('#marqueetext').on('finished', function() {marqueeBothObs()});
}
function marqueeSettings () {
	$('#lowerline').fadeIn(0);
	$('#lowerbar').fadeIn(0);
	if (apperanceSettings.marqueeType == 'ad') {
		marqueeAdOnlyOne();
	} else if (apperanceSettings.marqueeType == 'observations') {
		marqueeObsOnlyOne();
	} else if (apperanceSettings.marqueeType == 'none') {
		$('#lowerline').fadeOut(0);
		$('#lowerbar').fadeOut(0);
	} else {
		marqueeBothObs();
	}
}
//function lowerMarquee () {
//	for (let i = 0; i < 5; i++) {
//		marqueeShow();
//	}
//}
