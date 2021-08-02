
var srch_zipcodeEl ='30043';// document.querySelector('#zipcode');
var srch_resultsOutput = document.getElementById('search-results');

let srch_listingFavorites = [];
let srch_searchFavorities = [];

var Property = {
    zipcode: 30043,
    lat: 0.00,
    lon: 0.00,
    city: '',
    state: '',
    address: '',
    country_code: '',
    state_code: '',
}



function getZipCode(event){

    console.log("h");

    //handle
    event.preventDefault();

    //get zipcode
    let zipCode = event.target;
    console.log(event);
};

//add event listeners
function srch_addEventListeners(){
  
    srch_zipcodeEl.addEventListener('submit', getZipCode);
    $("#property-results").on("click",displayPropertyDetail);

};

//get listing/property favorites
function srch_getListingFavorites(){

    srch_listingFavorites = JSON.parse(localStorage.getItem("listingFavorites"));

    if(srch_listingFavorite === null)
    {
        srch_listingFavorite = [];
    }
    else{
       /** ADD LOGIC HERE TO RETURN SAVED LISTINGS   **/
        srch_listingFavorite.forEach(element => {
            console.log(element);
            /*$("#city-search-section-output").append(
                `<div class="d-grid gap-2 city-search-hist"><button class="btn btn-secondary btn-lg" type="button" id="city-hist-btn" data-city-search="${element}">${element}</button></div>`
            */     
        });   

    }

};

//return search favorites
function srch_getSearchFavorites(){


    srch_searchFavorities = JSON.parse(localStorage.getItem("searchFavorites"));

    if(srch_searchFavorities === null)
    {
        srch_searchFavorities = [];
    }
    else{
       /** ADD LOGIC HERE TO RETURN SAVED LISTINGS   **/
       srch_searchFavorities.forEach(element => {
            console.log(element);
            /*$("#city-search-section-output").append(
                `<div class="d-grid gap-2 city-search-hist"><button class="btn btn-secondary btn-lg" type="button" id="city-hist-btn" data-city-search="${element}">${element}</button></div>`
            */     
        });   

    }

};

function srch_saveListingFavorites(){

};

function srch_saveSearchFavorites(){

};


function displayProperty(data){

    //console.log(data);
    data.data.results.forEach( p => {


        var list_date = p.list_date;
        var list_price = p.list_price;
        var listing_id = p.listing_id;
        var latitude = p.location.address.coordinate.lat;
        var longitude = p.location.address.coordinate.lon;
        var city = p.location.address.city;
        var postal_code = p.location.address.postal_code;
        var state = p.location.address.state;
        var state_code = p.location.address.state_code;
        var addressline = p.location.address.line;
        var county = p.location.county.name;

        var property_id = p.property_id;
        var status = p.status;
        var baths = p.description.baths;
        var beds = p.description.beds;
        var sqft = p.description.lot_sqft;
        var type = p.description.type;
        var year_built = p.description.year_built;

        var primary_photo = '';

        if(p.hasOwnProperty('primary_photo'))
        {
            primary_photo = p.primary_photo.href;
        }

        //console.log(primary_photo);

        $("#property-results").append(`
        <div class="listing" data-open="reveal_modal_${property_id}" data-property-lon="${longitude}" data-property-lat="${latitude}" data-property-id="${property_id}" data-property-listing="${listing_id}">
            <div class="property-header"><img src="${primary_photo}"><img></div>
            <div class="property-price"><h2>$${list_price}</h2></div>
            <div class="property-address"><a data-open="reveal_modal_${property_id}">${addressline}</a></div>
            <div class="property-city">${city},${state_code} ${postal_code}</div>
            <div class="property-list-date">Listing Date: ${list_date}</div>
        </div>
        
       <div class="reveal" id = "reveal_modal_${property_id}" data-reveal>
        <h2>Property Header</h2>
        <p>${status}</p>
    </div>`
    )
        
       displayPropertyDetail(property_id, status)


    });
}

function displayPropertyDetail(property_id, status){
    console.log("detail");

  $('.modals').append( ` <div class="reveal" id="reveal_modal_${property_id}" data-reveal>
        <h2>Property Header</h2>
        <p>${status}</p>
    </div>
   `);
}

//ZIPCODE SEARCH
var getZipCodeJSON = function(zipcode){
    
    fetch("https://zipcodebase-zip-code-search.p.rapidapi.com/search?codes="+zipcode+"&country=US", {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": apiKey,
		"x-rapidapi-host": apiZipCodeHost
	    }
    })
    .then(function (response) {
        if (response.ok) {
        response.json().then(function (data) {
            Property.zipcode = data.results[zipcode][0].postal_code;
            Property.city = data.results[zipcode][0].city;
            Property.country_code = data.results[zipcode][0].country_code;
            Property.lat = data.results[zipcode][0].latitude;
            Property.lon = data.results[zipcode][0].longitude;
            Property.state = data.results[zipcode][0].state;
            Property.state_code = data.results[zipcode][0].state_code;  
            
           // console.log("https://zipcodebase-zip-code-search.p.rapidapi.com/search?codes="+zipcode+"&country=US");
            getForSaleProperties();
         });
        } else {
        alert('Error: ' + response.statusText);
        }
    });
};

var getForSaleProperties = function(){

    var state_code = Property.state_code;
    var city = Property.city;
    var location = Property.zipcode;

  
    fetch("https://us-real-estate.p.rapidapi.com/for-sale?offset=0&limit=5&state_code="+state_code+"&city="+city+"&location="+location+"&sort=newest", {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": apiKey,
		"x-rapidapi-host": apiRealEstateHost
        }
    })
    .then(function(response){
        if(response.ok){
            response.json().then(function(data){
                
                displayProperty(data);
            })
        }
    })
    .catch(err => {
        console.error(err);
    });

};

$("#modalLauncher").on("click",function (e) {
    $('#myModal').foundation('reveal', 'open');
});

function init(){
    //srch_addEventListeners();
    getZipCodeJSON("30043");
}

init();
//*/
