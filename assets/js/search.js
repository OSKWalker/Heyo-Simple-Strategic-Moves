//variable definitions
const apiKey = "3250849d40msh424508de5e59da2p1f9931jsna5bef39d390b";
const apiZipCodeHost = "zipcodebase-zip-code-search.p.rapidapi.com";
const apiRealEstateHost = "us-real-estate.p.rapidapi.com";

var srch_zipcodeEl = document.querySelector("#zip");
var srch_resultsOutput = document.getElementById("search-results");
var srch_button = $("input[type='button'");

let srch_listingFavorites = [];
let srch_searchFavorities = [];
let srch_latlng = [];

var Property = {
  zipcode: 30043,
  lat: 0.0,
  lon: 0.0,
  city: "",
  state: "",
  address: "",
  country_code: "",
  state_code: "",
};

$("#favorites").hide();

function searchProperty(event) {
  event.preventDefault();

  //get zipcode
  var zipCode = $("#zip").val();

  //change listing background css
  displayListingBackgroundCSS();

  //search zipcode
  getZipCodeJSON(zipCode);
}

function displayListingBackgroundCSS() {

  $("body").removeClass("body").addClass("listing-body");
  $("#favorites").show();
  $(".greeting").remove();
  $(".dropdown").show();
  $(".listcontainer").show();
}

function setListingFavorites(event) {
  // get letter from clicked letter button's `data-letter` attribute and use it for display
  var listingid = $(event.target).attr("data-favorite-property");
  var propertyid = $(event.target).attr("data-favorite-listing");

  if ($(event.target).hasClass("notsaved")) {
    $(event.target).removeClass("notsaved");
    $(event.target).addClass("saved");
  } else {
    $(event.target).removeClass("saved");
    $(event.target).addClass("notsaved");
  }

  srch_listingFavorites.push(listingid);
  localStorage.setItem(
    "listingFavorites",
    JSON.stringify(srch_listingFavorites)
  );
}

//add event listeners
function srch_addEventListeners() {
  // srch_zipcodeEl.addEventListener('submit', getZipCode);
  $("#list_search").on("click", searchProperty);

  //$("#property-results").on("click",displayPropertyDetail);

  $("#list").on("click", ".fa-heart", setListingFavorites);
}

//get listing/property favorites
function srch_getListingFavorites() {
  srch_listingFavorites = JSON.parse(localStorage.getItem("listingFavorites"));

  if (srch_listingFavorite === null) {
    srch_listingFavorite = [];
  } else {
    /** ADD LOGIC HERE TO RETURN SAVED LISTINGS   **/
    srch_listingFavorite.forEach((element) => {
      console.log(element);
      /*$("#city-search-section-output").append(
                `<div class="d-grid gap-2 city-search-hist"><button class="btn btn-secondary btn-lg" type="button" id="city-hist-btn" data-city-search="${element}">${element}</button></div>`
            */
    });
  }
}

//return search favorites
function srch_getSearchFavorites() {
  srch_searchFavorities = JSON.parse(localStorage.getItem("searchFavorites"));

  if (srch_searchFavorities === null) {
    srch_searchFavorities = [];
  } else {
    /** ADD LOGIC HERE TO RETURN SAVED LISTINGS   **/
    srch_searchFavorities.forEach((element) => {
      console.log(element);
      /*$("#city-search-section-output").append(
                `<div class="d-grid gap-2 city-search-hist"><button class="btn btn-secondary btn-lg" type="button" id="city-hist-btn" data-city-search="${element}">${element}</button></div>`
            */
    });
  }
}

function srch_saveListingFavorites() {}

function srch_saveSearchFavorites() {}

function displayProperty(data) {
  //console.log(data);
  data.data.results.forEach((p) => {
    var list_date = p.list_date;
    var list_price = p.list_price.toLocaleString();
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
    var sqft = p.description.sqft;
    var lot_sqft = p.description.log_sqft;
    var type = p.description.type;
    var year_built = p.description.year_built;

    var primary_photo = "";

    //set property if photo exists
    if (p?.primary_photo?.href != undefined) {
      primary_photo = p.primary_photo.href;
    }


    srch_latlng.push({ latitude, longitude, list_price, listing_id, property_id, sqft, year_built, lot_sqft, beds, baths });

    if(type === "single_family")
    {
        $("#list").append(`
            <div class="callout" data-open="reveal_modal_${property_id}" data-property-lon="${longitude}" data-property-lat="${latitude}" data-property-id="${property_id}" data-property-listing="${listing_id}">
            <div >
                    <img class= "list-details" src="${primary_photo}"><img>
                </div>
                <div class="details">
                    <div class="property-price"><h2>$${list_price}</h2></div>
                    <div class="property-review"><h3>${beds}bds/${baths}bath</h3></div>
                    <div class="property-address">${addressline}</div>
                    <div class="property-city">${city},${state_code} ${postal_code}</div>
                    <div class="property-county"><em>${county} County </em></div>
                    <div class="property-list-date">List Date: ${moment(
                    list_date
                    ).format("YYYY-MM-DD")}
                    </div>
                    <i class="fas fa-heart fa-2x notsaved" data-color="gray" data-favorite-property="${property_id}" data-favorite-listing=${listing_id}"></i><button class="button">Share It <i class="fas fa-share-alt"></i></button>     
                </div>
        </div>`);
        //display property detatil
        displayPropertyDetail(property_id, status);

        //place property on map
        setMarkers(srch_latlng);
    }
  });
}

function displayPropertyDetail(property_id, status) {
  $(".modals")
    .append(` <div class="reveal" id="reveal_modal_${property_id}" data-reveal>
        <h2>Property Header</h2>
        <p>${status}</p>
    </div>
   `);
}

//ZIPCODE SEARCH
var getZipCodeJSON = function (zipcode) {
  fetch(
    "https://zipcodebase-zip-code-search.p.rapidapi.com/search?codes=" +
      zipcode +
      "&country=US",
    {
      method: "GET",
      headers: {
        "x-rapidapi-key": apiKey,
        "x-rapidapi-host": apiZipCodeHost,
      },
    }
  ).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {

        Property.zipcode = data.results[zipcode][0].postal_code;
        Property.city = data.results[zipcode][0].city;
        Property.country_code = data.results[zipcode][0].country_code;
        Property.lat = data.results[zipcode][0].latitude;
        Property.lon = data.results[zipcode][0].longitude;
        Property.state = data.results[zipcode][0].state;
        Property.state_code = data.results[zipcode][0].state_code;

        getForSaleProperties();
      });
    } else {
      alert("Error: " + response.statusText);
    }
  });
};

var getForSaleProperties = function () {
  var state_code = Property.state_code;
  var city = Property.city;
  var location = Property.zipcode;

  fetch(
    "https://us-real-estate.p.rapidapi.com/for-sale?offset=0&limit=15&state_code=" +
      state_code +
      "&city=" +
      city +
      "&location=" +
      location +
      "&sort=newest",
    {
      method: "GET",
      headers: {
        "x-rapidapi-key": apiKey,
        "x-rapidapi-host": apiRealEstateHost,
      },
    }
  )
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          displayProperty(data);
        });
      }
    })
    .catch((err) => {
      console.error(err);
    });
};

function init() {
  srch_addEventListeners();
}

init();
