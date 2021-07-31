fetch("https://us-real-estate.p.rapidapi.com/property-detail?property_id=1961921598", {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "053d25221dmsh0bb7fb7b68fc3a4p1d74aajsn963047a10f6f",
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
