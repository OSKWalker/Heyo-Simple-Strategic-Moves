let mp_map;
let mp_centerLng = -83.951859;
let mp_centerLat = 33.972199;
// Initialize and add the map
function initMap() {
  mp_map = new google.maps.Map(document.getElementById("map"), {
    zoom: 10,
    center: new google.maps.LatLng(mp_centerLat, mp_centerLng),
  });
}

// Loop through the results array and place a marker for each
// set of coordinates.
const setMarkers = function (mp_results) {
  const mp_image = {
    url: "./assets/images/img.png",
    size: new google.maps.Size(20, 32),
    origin: new google.map.Point(0, 0),
    anchor: new google.maps.Point(0, 32),
  };
  mp_results.forEach((element) => {
    const latLng = new google.maps.LatLng(element.latitude, element.longitude);
    new google.maps.Marker({
      position: latLng,
      map: mp_map,
      icon: mp_image.url,
    });
  });
};
