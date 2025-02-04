var api_key = 'e1f10a1e78da46f5b10a1e78da96f525';

var apperanceSettings = {
  providerName: "Mist Weather Media",
  loop: true,
  marqueeType: "both", 
  //Default is both. Set to 'none' to hide the lower detail information, Set to 'observations' for only observations, 'ad' for only advertisements, 'both' for alternation between observations and advertisements.
  marqueeAd:  ["If you are interested in TWC, EAS, or anything weather/tech related, join Mist Weather Media! https://mistwx.com/discord"],
  onlyLDLMode: false,
  startupTime: 5000//set to 0 if you want to skip, not recommended
}

var slideSettings = {
  order:[
    {slideLineup:[
      {function:"currentConditions"},
      {function:"bulletin"},
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

var audioSettings = {
  enableMusic: true,
  shuffle: false,
  randomStart: true,
  order: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25],//1 to 25
}