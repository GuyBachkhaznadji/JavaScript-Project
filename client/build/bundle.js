/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var AjaxRequest= function(url) {
    this.url = url;
    this.onUpdate = null;
  }
  
  AjaxRequest.prototype.get = function(callback) {
    var request = new XMLHttpRequest();
    request.open("GET", this.url);
    request.onload = function(){
      if(request.status === 200){
        var jsonString = request.responseText;
        var bootcamps = JSON.parse(jsonString);
        if (bootcamps[0] && !bootcamps[0].id) {
          for (var i = 0 ; i < bootcamps.length; i++) {
            bootcamps[i].id = i;
          }
       }
       this.data = bootcamps;
      callback(bootcamps);
      }
    }.bind(this);
    request.send();
  }
  
  AjaxRequest.prototype.post = function(data) {
  
    var request = new XMLHttpRequest();
    request.open("POST", this.url);
    request.setRequestHeader("Content-Type", "application/json");
    request.onload = function(){
      if(request.status === 200){
        var jsonString = request.responseText;
      }
    }.bind(this);
    request.send(JSON.stringify(data));
  }
  
  AjaxRequest.prototype.delete = function(index) {
  
    var request = new XMLHttpRequest();
    request.open("DELETE", this.url + "/" + index);
    request.setRequestHeader("Content-Type", "application/json");
    request.onload = function(){
      if(request.status === 200){
        var jsonString = request.responseText;
        this.characters = JSON.parse(jsonString);
      }
    }.bind(this);
    request.send();
  }
  
  module.exports = AjaxRequest;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var AllBootcampsView = __webpack_require__(2);
var BootcampDetailsView = __webpack_require__(3);
var FavouritesView = __webpack_require__(5);
var AjaxRequest = __webpack_require__(0);
var Filter = __webpack_require__(6);
var WelcomePopUpWindow = __webpack_require__(7) // require pop up window

var app = function(){
    filter = new Filter()
    var welcomePopUpWindow = new WelcomePopUpWindow(main);
    welcomePopUpWindow.render();


    var favouritesData = new AjaxRequest('http://localhost:3000/favourites');
    var favouritesTag = document.querySelector("#favourites");
    var favouritesView = new FavouritesView(favouritesTag);
    favouritesData.get(favouritesView.render.bind(favouritesView));

    var detailsTag = document.querySelector("#bootcamp-details");
    var bootcampDetailsView = new BootcampDetailsView(detailsTag);

    var bootcampsData = new AjaxRequest('http://localhost:3000/api/code-bootcamps')
    var main = document.querySelector("#all-bootcamps");


    var allBootcampsView = new AllBootcampsView(main);
    bootcampsData.get(allBootcampsView.render.bind(allBootcampsView));
        

    allBootcampsView.main.addEventListener("click", function(event){
        var chosenCamp = bootcampsData.data[event.path[1].id]
        bootcampDetailsView.render(chosenCamp);
        favouritesView.render(favouritesData.data);
    });

    var locationInput = document.querySelector("#locationInput");
    locationInput.addEventListener("keyup", function(){
        var dataToRender = filter.allFilter(bootcampsData.data);
        bootcampDetailsView.data = dataToRender;
        allBootcampsView.render(dataToRender)
    })

    var priceInput = document.querySelector("#priceInput");
    priceInput.addEventListener("input", function(){
        var dataToRender = filter.allFilter(bootcampsData.data);
        bootcampDetailsView.data = dataToRender;
        allBootcampsView.render(dataToRender);
    })

    var lengthInput = document.querySelector("#lengthInput");
    lengthInput.addEventListener("input", function(){
        var dataToRender = filter.allFilter(bootcampsData.data);
        bootcampDetailsView.data = dataToRender;
        allBootcampsView.render(dataToRender);
    })

    var langInput = document.querySelector("#langInput");
    langInput.addEventListener("keyup", function(){
        var dataToRender = filter.allFilter(bootcampsData.data);
        bootcampDetailsView.data = dataToRender;
        allBootcampsView.render(dataToRender);
    })

    var filterButton = document.querySelector("#filter");
    filterButton.addEventListener("click", function(){
        var dataToRender =  filter.allFilter(bootcampsData.data);
        bootcampDetailsView.data = dataToRender;
        allBootcampsView.render(dataToRender);    
    })


    var logo = document.querySelector("#logo");
    logo.addEventListener("click", function(){
        allBootcampsView.render(bootcampsData.data);
        bootcampDetailsView.data = bootcampsData.data;
        favouritesView.render(favouritesData.data);
    })

    favouritesView.main.addEventListener("click", function(event){
        var chosenCamp = favouritesData.data[event.path[1].id]
        bootcampDetailsView.render(chosenCamp);
        favouritesView.render(favouritesData.data);
    });

       setTimeout(function(){
        bootcampDetailsView.data = bootcampsData.data;
    }, 1000).bind(this);

};




window.addEventListener('load', app);


/***/ }),
/* 2 */
/***/ (function(module, exports) {

var AllBootcampsView = function(main){
    this.main = main;
    this.onChange = null;
}

AllBootcampsView.prototype.render = function(data){
   if (data) this.bootcampsData = data;
   var detailsTag = document.querySelector("#bootcamp-details")

   this.main.innerText = ""
   detailsTag.innerText = "";

        for (var i = 0 ; i < this.bootcampsData.length; i++){         
            var articleTag = document.createElement("article");
            var logo = document.createElement("img");
            var bootcampName = document.createElement("h3");
            articleTag.id = this.bootcampsData[i].id;
            bootcampName.innerText = this.bootcampsData[i].name;
            logo.src = this.bootcampsData[i].logo;
            logo.alt = "Logo of " + this.bootcampsData[i].name;
            
            articleTag.appendChild(logo);
            articleTag.appendChild(bootcampName);
            this.main.appendChild(articleTag);
        }

}



module.exports = AllBootcampsView;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var MapWrapper = __webpack_require__(4);
var AjaxRequest = __webpack_require__(0);

var BootcampDetailsView = function(detailsElement) {
    this.detailsElement = detailsElement;
  }
  
  BootcampDetailsView.prototype.render = function(bootcamp){
    this.detailsElement.innerText = ""
    // while (this.detailsElement.hasChildNodes()) {
    //     this.detailsElement.removeChild(main.lastChild);
    // }


    var priceTag = document.createElement("h2");
    var weeksTag = document.createElement("h2");
    var langTag = document.createElement("h3");
    var coreSkillsTag = document.createElement("h3");
    var locationsCostTag = document.createElement("p");
    var totalCostTag = document.createElement("p");
    var tasterTag = document.createElement("p");
    var fundingTag = document.createElement("p");
    var descTag = document.createElement("p");
    var addressTag = document.createElement("p");
    var websiteTag = document.createElement("a");

    var navBox = document.createElement("nav");
    var logo = document.createElement("img");
    var nameTag = document.createElement("h1");

    var leftButton = document.createElement("button");
    var rightButton = document.createElement("button");

    leftButton.id = "leftButton";
    rightButton.id = "rightButton";

    var favButton = document.createElement("button");
    var favButtonImg = document.createElement("img");
    favButtonImg.id = "favButtonImg";
    favButtonImg.src = "../public/pictures/favourite.png";
    // favButton.innerHTML = '<img src="../public/favourite.png">';
    favButton.id = "favButton";

    logo.src = bootcamp.logo;
    nameTag.innerText = bootcamp.name;
    leftButton.innerText = "<"
    rightButton.innerText = ">"

    leftButton.addEventListener("click", function(){
        var index = this.data.indexOf(bootcamp);
        console.log(index);
        if ( (index - 1) < 0){
            index = (this.data.length - 1);
        } else {
            index -= 1;
        }
        this.render(this.data[index]);
    }.bind(this));

    rightButton.addEventListener("click", function(){
        var index = this.data.indexOf(bootcamp);
        if ( (index + 1) > (this.data.length - 1) ){
            index = 0;
        } else {
            index += 1;
        }
        this.render(this.data[index]);
    }.bind(this));

    navBox.appendChild(leftButton);
    navBox.appendChild(logo);
    navBox.appendChild(nameTag);
    navBox.appendChild(rightButton);
    this.detailsElement.appendChild(navBox)

    priceTag.innerText = "Price: £" + bootcamp.price[0];
    weeksTag.innerText = "Length in Weeks: " + bootcamp.lengthWeeks;

    languagesString = "Programming Languages: "
    for(var i = 0; i < bootcamp.languages.length; i++){
        if(i === (bootcamp.languages.length - 1)){
            languagesString += bootcamp.languages[i];
        } else {
            languagesString += bootcamp.languages[i] + ", ";
            // console.log(languagesString);
        }
    }
    langTag.innerText = languagesString;
    
    
    coreSkillsString = "Core Skills: "
    for(var i = 0; i < bootcamp.coreSkills.length; i++){
        if(i === (bootcamp.coreSkills.length - 1)){
            coreSkillsString += bootcamp.coreSkills[i];
        } else {
            coreSkillsString += bootcamp.coreSkills[i] + ", ";
        }
    }
    coreSkillsTag.innerText = coreSkillsString;

    if (bootcamp.taster){
        tasterTag.innerText = "Taster Session: Available"
    }
    
    if (bootcamp.locations.length > 1){
        addressString = "Addresses: <br>"
        for(var i = 0; i < bootcamp.locations.length; i++){
            if(i === (bootcamp.locations.length - 1)){
                addressString += bootcamp.locations[i].address;
            } else {
                addressString += bootcamp.locations[i].address + "<br>";
            }
        } 
    } else {
        addressString = "Address: <br>"
        addressString += bootcamp.locations[0].address;
    } 
    addressTag.innerHTML = addressString
    
    




    descTag.innerText = bootcamp.details
    
    websiteTag.href = bootcamp.website
    websiteTag.innerText = "Website"

    var allDetailsTag = document.createElement("article");
    allDetailsTag.id = "allDetailsTag";
    var priceLengthBox = document.createElement("section");
    priceLengthBox.id = "priceLengthBox";
    var skillsBox = document.createElement("section");
    skillsBox.id = "skillsBox";
    var otherSection = document.createElement("section");
    otherSection.id = "otherSection";
    var descriptiveBox = document.createElement("section");
    descriptiveBox.id = "descriptiveBox";
    var locationsBox = document.createElement("section");
    locationsBox.id = "locationsBox";

    var mapBox = document.createElement("section");
    mapBox.id = "mapBox";
    var mapTag = document.createElement("div");
    mapTag.id = "mapTag";

    mapBox.appendChild(mapTag);

    var coords = {
        lat: bootcamp.locations[0].lat,
        lng: bootcamp.locations[0].lng
    }


    var map = new MapWrapper(mapTag, coords, 7);
    
    for (var i = 0 ; i < bootcamp.locations.length ; i++){
        var coords = {
        lat: bootcamp.locations[i].lat,
        lng: bootcamp.locations[i].lng 
        }
        map.addMarker(coords);
    }

    google.maps.event.addListenerOnce(map.googleMap, 'idle', function(){
        google.maps.event.trigger(map.googleMap,'resize');
        map.googleMap.setCenter(coords);

    }.bind(this));

    
    
    
    var addressWebBox = document.createElement("section");
    addressWebBox.id = "addressWebBox";
    priceLengthBox.appendChild(priceTag);

    favButton.addEventListener("click", function(){
        var favouritesData = new AjaxRequest('http://localhost:3000/favourites');
        favouritesData.post(bootcamp);
    })

    // favourite button
    favButton.appendChild(favButtonImg);
    addressWebBox.appendChild(favButton);


    priceLengthBox.appendChild(weeksTag);
    skillsBox.appendChild(langTag);
    skillsBox.appendChild(coreSkillsTag);
    skillsBox.appendChild(tasterTag);

    if (bootcamp.qualification){
        var qualificationTag = document.createElement("p");
        qualificationTag.innerText = "Qualification: " + bootcamp.qualificationName
        descriptiveBox.appendChild(qualificationTag);
    }

    if (bootcamp.depositAmount > 0){
        var depositTag = document.createElement("p");
        depositTag.innerText = "Deposit: £" + bootcamp.depositAmount;
        descriptiveBox.appendChild(depositTag);
    }

    if (bootcamp.fundingOptions.length !== 0){
        fundingString = "Funding Options: "
        for(var i = 0; i < bootcamp.fundingOptions.length; i++){
            if(i === (bootcamp.fundingOptions.length - 1)){
                fundingString += bootcamp.fundingOptions[i];
            } else {
                fundingString += bootcamp.fundingOptions[i] + ", ";
            }
        }
        fundingTag.innerText = fundingString;
        descriptiveBox.appendChild(fundingTag);
    }

    locationsCostString = "Cost of Living Per Week: "
    totalCostString = "Total Cost: "

    for(var i = 0; i < bootcamp.locations.length; i++){
        if(bootcamp.locations.length > 1){
            if(i === (bootcamp.locations.length - 1)){
                locationsCostString += "£" + bootcamp.locations[i].costOfLiving;            
                locationsCostString += " (" + bootcamp.locations[i].city + ")";

                locationTotal =  (bootcamp.locations[i].costOfLiving * bootcamp.lengthWeeks ) + bootcamp.price[0];
                totalCostString += "£" + locationTotal; 
                totalCostString += " (" + bootcamp.locations[i].city + ")"

            } else {
                locationsCostString += "£" + bootcamp.locations[i].costOfLiving;            
                locationsCostString += " (" + bootcamp.locations[i].city + ")" + ", ";

                locationTotal =  (bootcamp.locations[i].costOfLiving * bootcamp.lengthWeeks ) + bootcamp.price[0];
                totalCostString += "£" + locationTotal;
                totalCostString +=  " (" + bootcamp.locations[i].city + ")" + ", ";
            }
        } else {
            locationsCostString += "£" + bootcamp.locations[i].costOfLiving;            

            locationTotal =  (bootcamp.locations[i].costOfLiving * bootcamp.lengthWeeks ) + bootcamp.price[0];
            totalCostString += "£" + locationTotal;
        }
    }
    locationsCostTag.innerText = locationsCostString;
    totalCostTag.innerText = totalCostString

    descriptiveBox.appendChild(locationsCostTag);
    descriptiveBox.appendChild(totalCostTag);
    descriptiveBox.appendChild(descTag);
    addressWebBox.appendChild(addressTag);
    addressWebBox.appendChild(websiteTag);
    locationsBox.appendChild(mapBox);
    locationsBox.appendChild(addressWebBox);
    // locationsBox.appendChild(mapBox);
    otherSection.appendChild(descriptiveBox);
    otherSection.appendChild(locationsBox);
    allDetailsTag.appendChild(priceLengthBox);
    allDetailsTag.appendChild(skillsBox);
    allDetailsTag.appendChild(otherSection);
    this.detailsElement.appendChild(allDetailsTag);

    var allBootcamps = document.querySelector('#all-bootcamps');
    while (allBootcamps.hasChildNodes()) {
        allBootcamps.removeChild(allBootcamps.lastChild);
    }

    var favouritesTag = document.querySelector('#favourites');
    while (favouritesTag.hasChildNodes()) {
        favouritesTag.removeChild(favouritesTag.lastChild);
    }



    
    window.scrollTo(0, 0);
  }

  module.exports = BootcampDetailsView;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

var MapWrapper = function(container, coords, zoom) {
  this.googleMap = new google.maps.Map(container, {
    center: coords,
    zoom: zoom
  });
  this.markers = [];
};

MapWrapper.prototype.addMarker = function(coords){
  var marker = new google.maps.Marker({
    position: coords,
    map: this.googleMap
  });
  this.markers.push(marker);
};

module.exports = MapWrapper;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

var FavouritesView = function(main){
    this.main = main;
    this.onChange = null;
}

FavouritesView.prototype.render = function(data){
   if (data) this.favouritesData = data;
    this.main.innerText = "";
   var favTitleTag = document.createElement("h2");
   favTitleTag.innerText = "Favourites:"
   this.main.appendChild(favTitleTag);


        for (var i = 0 ; i < this.favouritesData.length; i++){         
            var articleTag = document.createElement("article");
            var logo = document.createElement("img");
            var bootcampName = document.createElement("h3");
            articleTag.id = i;
            bootcampName.innerText = this.favouritesData[i].name;
            logo.src = this.favouritesData[i].logo;
            logo.alt = "Logo of " + this.favouritesData[i].name;
            // logo.width = 500;
            
            articleTag.appendChild(logo);
            articleTag.appendChild(bootcampName)
            this.main.appendChild(articleTag);
        }

}



module.exports = FavouritesView;

/***/ }),
/* 6 */
/***/ (function(module, exports) {

var Filter = function() {

}
 
// By one
Filter.prototype.locationFilter = function(searchableData){
    var dataToRender = [];
    var locationInput = document.querySelector('#locationInput');
    var locationFilter = locationInput.value.toUpperCase();

    if (locationFilter === "") return searchableData;
    
    for (var mainI = 0; mainI < searchableData.length; mainI++) {
        if (searchableData[mainI].locations.length > 1){
            for (var i = 0; i < searchableData[mainI].locations.length; i++){
                if(searchableData[mainI].locations[i].city.toUpperCase().includes(locationFilter)){
                    dataToRender.push(searchableData[mainI]); 
                } 
            }   
        } else if (searchableData[mainI].locations[0].city.toUpperCase().includes(locationFilter)){
            dataToRender.push(searchableData[mainI]);
        }
    }   
    
    var dataToRender2 = []
    console.log(dataToRender[0].name);
    for (var i = 0; i < dataToRender.length; i++){
        // Check if the next item in the array is the same as this one.
        // If it's not we add it to the array we are going to return
        // We also check that we're not at the end of the array
        if((dataToRender.length > 1) && ( i !== dataToRender.length -1) && dataToRender[i].name !== dataToRender[i + 1].name ){
            dataToRender2.push(dataToRender[i])
        } else if (dataToRender.length === 1) {
            dataToRender2.push(dataToRender[0]);
        }
    }
    return dataToRender2;
}
    
Filter.prototype.priceFilter = function(searchableData){
    var dataToRender = [];
    var priceInput = document.querySelector('#priceInput');
    var priceFilter = priceInput.value;
    if (priceFilter === "") return searchableData;
    for (var i = 0; i < searchableData.length; i++) {
        if(searchableData[i].price[0] <= priceFilter){
            dataToRender.push(searchableData[i]);
        }
    }
    return dataToRender;
}


Filter.prototype.langFilter = function(searchableData){
    var dataToRender = [];
    var langInput = document.querySelector('#langInput');
    var langFilter = langInput.value.toUpperCase();
    if (langFilter === "") return searchableData;
    for (var mainI = 0; mainI < searchableData.length; mainI++) {
        if (searchableData[mainI].languages.length > 1){
            for (var i = 0; i < searchableData[mainI].languages.length; i++){
                if(searchableData[mainI].languages[i].toUpperCase().includes(langFilter)){
                        dataToRender.push(searchableData[mainI]); 
                } 
            }
        } else if (searchableData[mainI].languages.length > 0 && searchableData[mainI].languages[0].toUpperCase().includes(langFilter)){
            dataToRender.push(searchableData[mainI]);
        }
    }
    return dataToRender;
}

Filter.prototype.lengthFilter = function(searchableData){
    var dataToRender = [];
    var lengthInput = document.getElementById('lengthInput');
    var lengthFilter = lengthInput.value;
    if (lengthFilter === "") return searchableData;
    for (var i = 0; i < searchableData.length; i++) {
        if(searchableData[i].lengthWeeks <= lengthFilter){
            dataToRender.push(searchableData[i]);
        }
    }
    return dataToRender;
}


// Worked out that only the all filter is needed...
// // By Two
// // Location + Length
// Filter.prototype.locationLengthFilter = function(searchableData){
//     var firstFilter = this.locationFilter(searchableData);
//     var dataToRender = this.lengthFilter(firstFilter);
//     return dataToRender;
//     return dataToRender;
// }

// // Location + Price
// Filter.prototype.locationPriceFilter = function(searchableData){
//     var firstFilter = this.locationFilter(searchableData);
//     var dataToRender = this.priceFilter(firstFilter);
//     return dataToRender;
// }

// // Location + Lang
// Filter.prototype.locationLangFilter = function(searchableData){
//     var firstFilter = this.locationFilter(searchableData);
//     var dataToRender = this.langFilter(firstFilter);
//     return dataToRender; 
// }

// // Lang + Price
// Filter.prototype.langPriceFilter = function(searchableData){
//     var firstFilter = this.langFilter(searchableData);
//     var dataToRender = this.priceFilter(firstFilter);
//     return dataToRender; 
// }

// // Lang + Length
// Filter.prototype.langLengthFilter = function(searchableData){
//     var firstFilter = this.langFilter(searchableData);
//     var dataToRender = this.lengthFilter(firstFilter);
//     return dataToRender; 
// }

// // Length + Price
// Filter.prototype.lengthPriceFilter = function(searchableData){
//     var firstFilter = this.lengthFilter(searchableData);
//     var dataToRender = this.priceFilter(firstFilter);
//     return dataToRender; 
// }


// // By Three
// // Location - Lang 2, Price 2, Length 2
// // Lang - Location 2, Price 1, Length 1
// // Price - Location 2, Lang 1, Length 1

// // Location + Lang + Length
// Filter.prototype.locationLangLengthFilter = function(searchableData){
//     var firstFilter = this.locationFilter(searchableData);
//     var secondFilter = this.langFilter(firstFilter);
//     var dataToRender = this.lengthFilter(secondFilter);
//     return dataToRender; 
// }

// // Location + Lang + Price
// Filter.prototype.locationLangPriceFilter = function(searchableData){
//     var firstFilter = this.locationFilter(searchableData);
//     var secondFilter = this.langFilter(firstFilter);
//     var dataToRender = this.priceFilter(secondFilter);
//     return dataToRender; 
// }

// // Location + Length + Price
// Filter.prototype.locationLengthPriceFilter = function(searchableData){
//     var firstFilter = this.locationFilter(searchableData);
//     var secondFilter = this.lengthFilter(firstFilter);
//     var dataToRender = this.priceFilter(secondFilter);
//     return dataToRender; 
// }

// // Lang + Length + Price
// Filter.prototype.langLengthPriceFilter = function(searchableData){
//     var firstFilter = this.langFilter(searchableData);
//     var secondFilter = this.lengthFilter(firstFilter);
//     var dataToRender = this.priceFilter(secondFilter);
//     return dataToRender; 
// }

// // Match up count for by two
// // Location - Lang 2, Price 2, Length 2
// // Lang - Location 2, Price 2, Length 2
// // Price - Location 2, Lang 2, Length 2

// // All Filter
// // Location + Price + Lang + Length
Filter.prototype.allFilter = function(searchableData){
    var firstFilter = this.locationFilter(searchableData)
    var secondFilter = this.priceFilter(firstFilter);
    var thirdFilter = this.langFilter(secondFilter);
    var dataToRender = this.lengthFilter(thirdFilter);
    return dataToRender; 
}


module.exports = Filter;

/***/ }),
/* 7 */
/***/ (function(module, exports) {

var WelcomePopUpWindow = function(main){
  this.main = main
}

WelcomePopUpWindow.prototype.render = function(){
  var headerText = "Welcome to the most comprehensive UK coding bootcamps database!"
  this.text = "Here you can find the latest available information about every coding bootcamp existing in the UK .\n \n You can filter bootcamps by specific requirement such as: Location, Price, Programming languages.";

  var popUp = document.getElementById('pop-up');

  var popUpContent = document.createElement('article');
  popUpContent.id = "popUpWindow";

  var header = document.createElement('h1');
  header.id = "popUpHeader";
  header.innerText= headerText;

  var image = document.createElement('img');
  image.id = "mainImage";
  image.src = "http://art.fritsahlefeldt.com/assets/cache/idMjcyMWU4OTBkYjU1ZmY=-1ee547777c05df3effc27124f61347be.jpg";

  var closeButton = document.createElement('button');
  closeButton.id = "okButton";
  closeButton.innerText = "OK";
  closeButton.onclick = function(){
    popUp.style.display = "none"
  }

  var content = document.createElement('p');
  content.id = "content";
  content.innerText= this.text;

  popUpContent.appendChild(header);
  popUpContent.appendChild(image);
  popUpContent.appendChild(content);
  popUpContent.appendChild(closeButton);

  popUp.appendChild(popUpContent);

  var body = document.querySelector("body");
  body.appendChild(popUp);


}

module.exports = WelcomePopUpWindow;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map