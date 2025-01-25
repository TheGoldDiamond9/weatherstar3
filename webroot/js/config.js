var api_key = 'e1f10a1e78da46f5b10a1e78da96f525';

var apperanceSettings = {
  providerName: "Mist Weather Media",
  loop: true,
  marqueeType: "observations", 
  //Default is both. Set to 'none' to hide the lower detail information, Set to 'observations' for only observations, 'ad' for only advertisements, 'both' for alternation between observations and advertisements.
  marqueeAd:  ["If you are interested in TWC, EAS, or anything weather/tech related, join Mist Weather Media! https://mistwx.com/discord"],
  onlyLDLMode: false,
  startupTime: 5000
}
var audioSettings = {
  enableMusic: true, //Something is wrong if you set this to false.
  order: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25],
  shuffle: false, //Shuffle audio. Default is false.
  randomStart: true, //Starts the order from a random spot. Default is true.
}
var slideSettings = {
  order:[
    {slideLineup:[
      {function:"currentConditions"},
      {function:"hourlyObservation"},
      {function:"regionalConditions"},
      {function:"dayPartForecast"},
      {function:"almanac"},
      {function:"regionalForecast"},
      {function:"travelForecast"},
      {function:"extendedForecast"},
      {function:"outlook"},
      {function:"currentConditions"},
      {function:"dayPartForecast"},
      {function:"extendedForecast"},
      {function:"travelForecast"},
    ]}
  ]   
}