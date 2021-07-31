//ZIPCODE SEARCH
fetch("https://zipcodebase-zip-code-search.p.rapidapi.com/search?codes=30043&country=US", {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "",
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
		"x-rapidapi-key": "",
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
});
