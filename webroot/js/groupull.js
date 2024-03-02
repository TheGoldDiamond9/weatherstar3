var noreportmodecc = false, noreportmodefc = false, noreportmodeac = false, marqueeDone = false;
var lowerDetailInfoTime = 4000
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
	setTimeout(() => {$('#lowerinfotext').text(weatherInfo.currentCond.sidebar.cond)}, 1 * lowerDetailInfoTime);
	setTimeout(() => {$('#lowerinfotext').text('TEMP:  ' + weatherInfo.currentCond.sidebar.temp + '°F')}, 2 * lowerDetailInfoTime);
	setTimeout(() => {$('#lowerinfotext').text('HUMIDITY: ' + weatherInfo.currentCond.sidebar.humid + '%   ' + 'DEWPOINT: ' + weatherInfo.currentCond.sidebar.dewpt + '°F')}, 3 * lowerDetailInfoTime);
	setTimeout(() => {$('#lowerinfotext').text('BAROMETRIC PRESSURE: ' + weatherInfo.currentCond.sidebar.pressure + weatherInfo.currentCond.sidebar.pressureTrend)}, 4 * lowerDetailInfoTime);
	setTimeout(() => {$('#lowerinfotext').text('WIND: ' + weatherInfo.currentCond.sidebar.wind)}, 5 * lowerDetailInfoTime);
	setTimeout(() => {if (weatherInfo.currentCond.sidebar.ceiling != null) {$('#lowerinfotext').text('VISIB: ' + weatherInfo.currentCond.sidebar.visibility + ' MI. ' + 'CEILING: ' + weatherInfo.currentCond.sidebar.ceiling +' FT.')} else {$('#lowerinfotext').text('VISIB: ' + weatherInfo.currentCond.sidebar.visibility + ' MI. ' + 'CEILING:UNLIMITED')}}, 6 * lowerDetailInfoTime);
	setTimeout(() => {$('#lowerinfotext').text('CONDITIONS AT ' + maincitycoords.displayname)}, 7 * lowerDetailInfoTime);
	setTimeout(() => {$('#lowerinfotext').text(weatherInfo.currentCond.sidebar.cond)}, 8 * lowerDetailInfoTime);
	setTimeout(() => {$('#lowerinfotext').text('TEMP:  ' + weatherInfo.currentCond.sidebar.temp + '°F')}, 9 * lowerDetailInfoTime);
	setTimeout(() => {$('#lowerinfotext').text('HUMIDITY: ' + weatherInfo.currentCond.sidebar.humid + '%   ' + 'DEWPOINT: ' + weatherInfo.currentCond.sidebar.dewpt + '°F')}, 10 * lowerDetailInfoTime);
	setTimeout(() => {$('#lowerinfotext').text('BAROMETRIC PRESSURE: ' + weatherInfo.currentCond.sidebar.pressure + weatherInfo.currentCond.sidebar.pressureTrend)}, 11 * lowerDetailInfoTime);
	setTimeout(() => {$('#lowerinfotext').text('WIND: ' + weatherInfo.currentCond.sidebar.wind)}, 12 * lowerDetailInfoTime);
	setTimeout(() => {if (weatherInfo.currentCond.sidebar.ceiling != null) {$('#lowerinfotext').text('VISIB: ' + weatherInfo.currentCond.sidebar.visibility + ' MI. ' + 'CEILING: ' + weatherInfo.currentCond.sidebar.ceiling +' FT.')} else {$('#lowerinfotext').text('VISIB: ' + weatherInfo.currentCond.sidebar.visibility + ' MI. ' + 'CEILING:UNLIMITED')}}, 13 * lowerDetailInfoTime);
	setTimeout(() => {marqueeObsOnlyOne()}, 14 * lowerDetailInfoTime);
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
	setTimeout(() => {$('#lowerinfotext').text(weatherInfo.currentCond.sidebar.cond)}, 1 * lowerDetailInfoTime);
	setTimeout(() => {$('#lowerinfotext').text('TEMP:  ' + weatherInfo.currentCond.sidebar.temp + '°F')}, 2 * lowerDetailInfoTime);
	setTimeout(() => {$('#lowerinfotext').text('HUMIDITY: ' + weatherInfo.currentCond.sidebar.humid + '%   ' + 'DEWPOINT: ' + weatherInfo.currentCond.sidebar.dewpt + '°F')}, 3 * lowerDetailInfoTime);
	setTimeout(() => {$('#lowerinfotext').text('BAROMETRIC PRESSURE: ' + weatherInfo.currentCond.sidebar.pressure + weatherInfo.currentCond.sidebar.pressureTrend)}, 4 * lowerDetailInfoTime);
	setTimeout(() => {$('#lowerinfotext').text('WIND: ' + weatherInfo.currentCond.sidebar.wind)}, 5 * lowerDetailInfoTime);
	setTimeout(() => {if (weatherInfo.currentCond.sidebar.ceiling != null) {$('#lowerinfotext').text('VISIB: ' + weatherInfo.currentCond.sidebar.visibility + ' MI. ' + 'CEILING: ' + weatherInfo.currentCond.sidebar.ceiling +' FT.')} else {$('#lowerinfotext').text('VISIB: ' + weatherInfo.currentCond.sidebar.visibility + ' MI. ' + 'CEILING:UNLIMITED')}}, 6 * lowerDetailInfoTime);
	setTimeout(() => {$('#lowerinfotext').text('CONDITIONS AT ' + maincitycoords.displayname)}, 7 * lowerDetailInfoTime);
	setTimeout(() => {$('#lowerinfotext').text(weatherInfo.currentCond.sidebar.cond)}, 8 * lowerDetailInfoTime);
	setTimeout(() => {$('#lowerinfotext').text('TEMP:  ' + weatherInfo.currentCond.sidebar.temp + '°F')}, 9 * lowerDetailInfoTime);
	setTimeout(() => {$('#lowerinfotext').text('HUMIDITY: ' + weatherInfo.currentCond.sidebar.humid + '%   ' + 'DEWPOINT: ' + weatherInfo.currentCond.sidebar.dewpt + '°F')}, 10 * lowerDetailInfoTime);
	setTimeout(() => {$('#lowerinfotext').text('BAROMETRIC PRESSURE: ' + weatherInfo.currentCond.sidebar.pressure + weatherInfo.currentCond.sidebar.pressureTrend)}, 11 * lowerDetailInfoTime);
	setTimeout(() => {$('#lowerinfotext').text('WIND: ' + weatherInfo.currentCond.sidebar.wind)}, 12 * lowerDetailInfoTime);
	setTimeout(() => {if (weatherInfo.currentCond.sidebar.ceiling != null) {$('#lowerinfotext').text('VISIB: ' + weatherInfo.currentCond.sidebar.visibility + ' MI. ' + 'CEILING: ' + weatherInfo.currentCond.sidebar.ceiling +' FT.')} else {$('#lowerinfotext').text('VISIB: ' + weatherInfo.currentCond.sidebar.visibility + ' MI. ' + 'CEILING:UNLIMITED')}}, 13 * lowerDetailInfoTime);
	setTimeout(() => {marqueeBothAd()}, 14 * lowerDetailInfoTime);
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
	}
	if (apperanceSettings.marqueeType == 'observations') {
		marqueeObsOnlyOne();
	}
	if (apperanceSettings.marqueeType !== 'observations' && apperanceSettings.marqueeType !== 'ad') {
		marqueeBothObs();
	}
}
//function lowerMarquee () {
//	for (let i = 0; i < 5; i++) {
//		marqueeShow();
//	}
//}