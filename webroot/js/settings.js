//location settings
var inputlocationdata = {name:"",lat:"",lon:"",state:""}, mainlocationdata = {displayname:"",name:"",lat:"",lon:"",state:""}, extralocsdata = [], city8slidedata = [], cctickerdata = [], settingstype;
function autocomplete(inp, option) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  var typingTimer;                //timer identifier
  var doneTypingInterval = 1000;  //time in ms, 5 second for example
  var val, weatherdata;
  inp.addEventListener("input", function(e) {
    val = e.target.value
    inputlocationdata = {name:"",lat:"",lon:""}
    clearTimeout(typingTimer);
    typingTimer = setTimeout(function() {doneTyping(e)}, doneTypingInterval);
  });
  function doneTyping(e) {
    var a, b, i;
    /*close any already open lists of autocompleted values*/
    closeAllLists();
    if (!val) { return false;}
    currentFocus = -1;
    arr = [];
    $.getJSON("https://api.weather.com/v3/location/search?query="+val+"&language=en-US&format=json&apiKey=" + api_key, function(data) {
      weatherdata = data
      data.location.address.forEach((locaddress, i) => {
        arr.push(locaddress)
      });
        inputInfo();
    });
    /*create a DIV element that will contain the items (values):*/
    a = document.createElement("DIV");
    a.setAttribute("id", this.id + "autocomplete-list");
    a.setAttribute("class", "autocomplete-items");
    /*append the DIV element as a child of the autocomplete container:*/
    e.target.parentNode.appendChild(a);
    function inputInfo() {
    /*for each item in the array...*/
    for (i = 0; i < arr.length; i++) {
      /*check if the item starts with the same letters as the text field value:*/
      if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
        /*create a DIV element for each matching element:*/
        b = document.createElement("DIV");
        /*make the matching letters bold:*/
        b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
        b.innerHTML += arr[i].substr(val.length);
        /*insert a input field that will hold the current array item's value:*/
        b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
        /*execute a function when someone clicks on the item value (DIV element):*/
            b.addEventListener("click", function(f) {
            /*insert the value for the autocomplete text field:*/
            e.target.value = this.getElementsByTagName("input")[0].value;
            wi = weatherdata.location.address.indexOf(this.getElementsByTagName("input")[0].value);
            inputlocationdata.name = weatherdata.location.displayName[wi]
            inputlocationdata.lat = weatherdata.location.latitude[wi]
            inputlocationdata.lon = weatherdata.location.longitude[wi]
            inputlocationdata.state = weatherdata.location.adminDistrict[wi];
            /*close the list of autocompleted values,
            (or any other open lists of autocompleted values:*/
            closeAllLists();
        });
        a.appendChild(b);
      }
      }
    }
  };
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 38) { //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].click();
        }
      }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
      x[i].parentNode.removeChild(x[i]);
    }
  }
}

/*execute a function when someone clicks in the document:*/
document.addEventListener("click", function (e) {
    closeAllLists(e.target);
});
}
//runs when ajax is finished
function initLocSettings() {
  mainlocationdata.name = maincitycoords.name
  mainlocationdata.lat = maincitycoords.lat
  mainlocationdata.lon = maincitycoords.lon
  mainlocationdata.displayname = maincitycoords.name
  mainlocationdata.state = state
  updateonResetMainLoc()
  extralocsdata = locList
  city8slidedata = citySlideList
  cctickerdata = ccTickerCitiesList
  updateLocs("extralocation")
  updateLocs("8slide")
  updateLocs("cctickerloc")
}
function saveLocSettings() {
  maincitycoords = mainlocationdata
  locList = extralocsdata
  citySlideList = city8slidedata
  ccTickerCitiesList = cctickerdata
  grabAlamanacSlidesData()
  grabSideandLowerBarData()
  grabCitySlidesData()
  grabHealthData()
  pullCCTickerData()
  buildHeaderGlobal()
  grabTrafficData ()
}
//runs when weatherman returns info
function updateonResetMainLoc() {
  $("#mainlocation #locationname").text("name: "+mainlocationdata.name)
  $("#mainlocation #locationdisplayname").text("display name: "+mainlocationdata.displayname)
  $("#mainlocation #coords").text("coordinates: "+mainlocationdata.lat+","+mainlocationdata.lon)
}
function updateonResetCCTickerLoc() {
  mainlocationdata.name = mainlocationsettingsobj.name
  mainlocationdata.lat = mainlocationsettingsobj.lat
  mainlocationdata.lon = mainlocationsettingsobj.lon
  mainlocationdata.displayname = mainlocationsettingsobj.displayname
  mainlocationdata.state = mainlocationsettingsobj.state
  $("#mainlocation #locationname").text("name: "+mainlocationsettingsobj.name)
  $("#mainlocation #locationdisplayname").text("display name: "+mainlocationsettingsobj.displayname)
  $("#mainlocation #coords").text("coordinates: "+mainlocationsettingsobj.lat+","+mainlocationsettingsobj.lon)
}