//variable definitions
let srch_zipcodeEl = document.getElementById("#zipcode");



function getZipCode(event){

    //handle event prop
    
    //get zipcode
    let zipCode = event.value;
    console.log(zipCode);
};

//add event listeners
function srch_addEventListeners(){

    srch_zipcodeEl.addEventListener("submit",getZipCode);

};

function srch_saveSearch(){

};

function srch_saveHomes(){

};



//ZIPCODE SEARCH
/*fetch("https://zipcodebase-zip-code-search.p.rapidapi.com/search?codes=30043&country=US", {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "3250849d40msh424508de5e59da2p1f9931jsna5bef39d390b",
		"x-rapidapi-host": "zipcodebase-zip-code-search.p.rapidapi.com"
	}
})
.then(response => {
	console.log(response);
})
.catch(err => {
	console.error(err);
});


//PROPERTY SEARCH
fetch("https://us-real-estate.p.rapidapi.com/property-detail?property_id=1961921598", {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "3250849d40msh424508de5e59da2p1f9931jsna5bef39d390b",
		"x-rapidapi-host": "us-real-estate.p.rapidapi.com"
	}
})
.then(function(response){
    if(response.ok){
        response.json().then(function(data){
            console.log(data);
        })
    }
})
.catch(err => {
	console.error(err);
});*/
