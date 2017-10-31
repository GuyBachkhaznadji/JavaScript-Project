var AllBootcampsView = require('./views/all_bootcamps_view.js');
var BootcampDetailsView = require('./views/bootcamp_details_view.js');
var FavouritesView = require('./views/favourites_view.js');
var AjaxRequest = require('./services/ajax_request.js');
var Filter = require('./models/filter.js');
var WelcomePopUpWindow = require('./views/welcome_pop_up_window.js') // require pop up window

var app = function(){
    filter = new Filter()
    var welcomePopUpWindow = new WelcomePopUpWindow(main);
    welcomePopUpWindow.render();


    var favouritesData = new AjaxRequest('favourites');
    var favouritesTag = document.querySelector("#favourites");
    var favouritesView = new FavouritesView(favouritesTag);
    favouritesData.get(favouritesView.render.bind(favouritesView));

    var detailsTag = document.querySelector("#bootcamp-details");
    var bootcampDetailsView = new BootcampDetailsView(detailsTag);

    var bootcampsData = new AjaxRequest('api/code-bootcamps')
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
