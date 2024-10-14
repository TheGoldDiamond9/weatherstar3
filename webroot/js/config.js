var api_key = 'YOUR API KEY';
var apperanceSettings = {
    loop: true,
    flavor: "N", //Upper case letter from A-Q. Default is N
    marqueeType: "", //Default is both. Set to 'observations' for only observations, 'ad' for only advertisements, 'both' for alternation between observations and advertisements.
    marqueeAd:  "With Comcast Spotlight, utilize the impact of interactive advertising. Specifically target areas of New Jersey on TV with commercials on networks like ESPN and TNT - and on the internet at XFINITY.com and FoxNews.com. For your custom advertising solution, call 244-2122.",
    onlyLDLMode: false,
}
function startup() {
  console.log(maincitycoords.name)
  setTimeout(() => { if (maincitycoords.name == "") {
    $('#startup-text').text('');
    $('#startup-credits').text('PLEASE INSERT A LOCATION (WEATHERSTAR3000.NET/LOCATIONNAME) OR REFRESH THE PAGE');
  } else {
    $('#startup-text').text('LOADING WEATHERSTAR 3000... \n FLAVOR ' + apperanceSettings.flavor);
  }}, 2)
};
var audioSettings = {
    enableMusic: true, //Something is wrong if you set this to false.
    order: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25],
    shuffle: false, //Shuffle audio. Default is false.
    randomStart: true, //Starts the order from a random spot. Default is true.
  }
  var locationSettings = {
    mainLocation:{
      displayName:"",//Name that will show up on the sim.
      searchQuery:{ //Type and val are required fields for search to work. Will be overridden if location is given in URL.
        type:"",//Leave type blank to use automatic search. "geocode", "state", "district", "city", "locality", "neighborhood", "postal" (zipcode), "address", "poi", "pws" (personal weatherstation) //If geocode is used all otherfields but val will be ignored.
        fuzzy:true, //Attempt approximate search.
        country:"US", //Two letter country code. //Recommend using "US".
        state:"", //Two letter state code.
        val:"", //for geocode "lat,lon"
        searchResultNum:0,//Defaults to 0. Use if the first result for a particular location sucks.
      }
    },
    extraLocations: {
      useAutoLocations: true, //Will add automatically searched locations to the list.
      maxLocations: 4, //Will limit amount of locations that appear on sim. Default is 3.
      locationOrderNum:[5,4,3,9], //Ordernum for automatically generated locations. Lower number will be placed closer to the front.
      locs:[
      {
        displayName:'',
        orderNum:2,
        searchQuery:{
          type:"",
          fuzzy:true,
          country:"US",
          state:"",
          val:"",
          searchResultNum:"",
        }
      },
      {
        displayName:"",
        orderNum:3,
        searchQuery:{
          type:"",
          fuzzy:true,
          country:"US",
          state:"",
          val:"",
          searchResultNum:"",
        }
      },
      {
        displayName:"",
        orderNum:3,
        searchQuery:{
          type:"",
          fuzzy:true,
          country:"US",
          state:"",
          val:"",
          searchResultNum:"",
        }
      },
    ]},
    aroundCityInfoLocs: {
      useAutoLocations: true, //Will add automatically searched locations to the list.
      maxLocations: 8, //Will limit amount of locations that appear on sim. Default is 8. Hard Limit is 8.
      locationOrderNum:[5,4,3], //Ordernum for automatically generated locations. Lower number will be placed closer to the front.
      locs:[//Cities for the nearby cities slide
      {
        displayName:"",
        searchQuery:{
          type:"",
          fuzzy:true,
          country:"",
          state:"",
          val:"",
          searchResultNum:"",
        }
      },
      {
        displayName:"",
        searchQuery:{
          type:"",
          fuzzy:true,
          country:"",
          state:"",
          val:"",
          searchResultNum:"",
        }
      },
      {
        displayName:"",
        searchQuery:{
          type:"",
          fuzzy:true,
          country:"",
          state:"",
          val:"",
          searchResultNum:"",
        }
      },
      {
        displayName:"",
        searchQuery:{
          type:"",
          fuzzy:true,
          country:"",
          state:"",
          val:"",
          searchResultNum:"",
        }
      },
      {
        displayName:"",
        searchQuery:{
          type:"",
          fuzzy:true,
          country:"",
          state:"",
          val:"",
          searchResultNum:"",
        }
      },
      {
        displayName:"",
        searchQuery:{
          type:"",
          fuzzy:true,
          country:"",
          state:"",
          val:"",
          searchResultNum:"",
        }
      },
      {
        displayName:"",
        searchQuery:{
          type:"",
          fuzzy:true,
          country:"",
          state:"",
          val:"",
          searchResultNum:"",
        }
      },
      {
        displayName:"",
        searchQuery:{
          type:"",
          fuzzy:true,
          country:"",
          state:"",
          val:"",
          searchResultNum:"",
        }
      },
    ]},
    regionalInfoLocs: {
      useAutoLocations: true, //Will add automatically searched locations to the list.
      maxLocations: 8, //Will limit amount of locations that appear on sim. Default is 8. Hard Limit is 8.
      locationOrderNum:[5,4,3], //Ordernum for automatically generated locations. Lower number will be placed closer to the front.
      locs:[//Cities for the nearby cities slide
      {
        displayName:"",
        searchQuery:{
          type:"",
          fuzzy:true,
          country:"",
          state:"",
          val:"",
          searchResultNum:"",
        }
      },
      {
        displayName:"",
        searchQuery:{
          type:"",
          fuzzy:true,
          country:"",
          state:"",
          val:"",
          searchResultNum:"",
        }
      },
      {
        displayName:"",
        searchQuery:{
          type:"",
          fuzzy:true,
          country:"",
          state:"",
          val:"",
          searchResultNum:"",
        }
      },
      {
        displayName:"",
        searchQuery:{
          type:"",
          fuzzy:true,
          country:"",
          state:"",
          val:"",
          searchResultNum:"",
        }
      },
      {
        displayName:"",
        searchQuery:{
          type:"",
          fuzzy:true,
          country:"",
          state:"",
          val:"",
          searchResultNum:"",
        }
      },
      {
        displayName:"",
        searchQuery:{
          type:"",
          fuzzy:true,
          country:"",
          state:"",
          val:"",
          searchResultNum:"",
        }
      },
      {
        displayName:"",
        searchQuery:{
          type:"",
          fuzzy:true,
          country:"",
          state:"",
          val:"",
          searchResultNum:"",
        }
      },
      {
        displayName:"",
        searchQuery:{
          type:"",
          fuzzy:true,
          country:"",
          state:"",
          val:"",
          searchResultNum:"",
        }
      },
    ]},
}
var weatherInfoSettings = {
    currentCond: {
      sidebar: {
        noReport:false, //If true, shows no report.
        displayname:"", //Ove
        temp:"", //
        cond:"",
        icon:"",
        humid:"",
        dewpt:"",
        pressure:"",
        wind:"",
        windspeed:"",
        gust:"",
        feelslike: {type:"",val:""},
        visibility:"",
        uvidx:"",
        ceiling:""
      },
      //loc:{noReport:"",displayname:"",temp:"",cond:"",icon:"",humid:"",dewpt:"",pressure:"",pressureTrend:"",wind:"",windspeed:"",gust:"",feelslike:{type:"",val:""},},
      weatherLocs:[
  
      ],
    //cityLoc:{noReport:false,displayname:"",temp:"",icon:"",wind:"",windspeed:""}
    city8slides:{noReport:false, cities:[]},
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
      lowerbar: {noReport:false,displayname:"",day:[{name:"",cond:"",icon:"",high:"",low:"",windspeed:"",weekend:""},{name:"",cond:"",icon:"",high:"",low:"",windspeed:"",weekend:""},{name:"",cond:"",icon:"",high:"",low:"",windspeed:"",weekend:""},{name:"",cond:"",icon:"",high:"",low:"",windspeed:"",weekend:""},{name:"",cond:"",icon:"",high:"",low:"",windspeed:"",weekend:""}]},
      /*loc:{noReport:"",displayname:"",day:[
        {name:"",cond:"",icon:"",high:"",low:"",windspeed:""},
        {name:"",cond:"",icon:"",high:"",low:"",windspeed:""},
        {name:"",cond:"",icon:"",high:"",low:"",windspeed:""},
        {name:"",cond:"",icon:"",high:"",low:"",windspeed:""},
        {name:"",cond:"",icon:"",high:"",low:"",windspeed:""}
      ]},*/
      weatherLocs:[]
    }, almanac: {displayname:"",date:"",avghigh:"",avglow:"",rechigh:"",reclow:"",rechighyear:"",reclowyear:"",sunrise:"",sunset:"",moonphases:[
      {name:"NEW",date:"Feb 10"},
      {name:"FIRST",date:"Feb 16"},
      {name:"FULL",date:"Feb 21"},
      {name:"LAST",date:"Feb 27"},
    ]}, bulletin: {
      //loc:{displayname:"",pages:[]},
      includesevereonbulletin: false,
      weatherLocs:[],
      severewarnings:[],
      //{name:"", desc:"", status:""}
  
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
      {displayname:"",iata:"MIA",arrivals:{delay:"No Delay",reason:""},departures:{delay:"No Delay",reason:""},temp:"",cond:"",icon:"",windspeed:""},
      {displayname:"",iata:"MCO",arrivals:{delay:"No Delay",reason:""},departures:{delay:"No Delay",reason:""},temp:"",cond:"",icon:"",windspeed:""}
    ], delays: [],
      //{iato:"",type:"",amount:"",amountmin:"",reason:""}
     otherairports:[
      {displayname:"New York / LaGaurdia",iata:"LGA",delay:"No Delay",temp:"",icon:"",windspeed:""},
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
    ccticker: {noReportCC:false,noReportFC:false,noReportAC:false,arrow:"",ccLocs:[],ccairportdelays:[]},
  }
  
