var MapWrapper = require('../models/map_wrapper.js');
var AjaxRequest = require('../services/ajax_request.js');

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
        var favouritesData = new AjaxRequest('/favourites');
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