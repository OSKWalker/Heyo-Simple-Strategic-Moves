let map;
let results = [];

// Initialize and add the map
function initMap() {
  let mp_centerLng = -83.951859;
  let mp_centerLat = 33.972199;

  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 10,
    center: new google.maps.LatLng(33.972199, -83.951859),
  });

}

// Loop through the results array and place a marker for each
// set of coordinates.
const eqfeed_callback = function (results) {
  results.forEach((element) => {
   // console.log(element);
    const latLng = new google.maps.LatLng(element.latitude, element.longitude);
    new google.maps.Marker({
      position: latLng,
      map: map,
    });
  });
};

