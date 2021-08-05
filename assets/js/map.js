let map;
let mp_centerLng = -83.951859;
let mp_centerLat = 33.972199;
const mp_Results = [
  { lat: 34.041104, lng: -84.044093 },
  { lat: 34.038422, lng: -84.000473 },
  { lat: 34.007895, lng: -83.899684 },
];
// Initialize and add the map
function initMap() {
  /*
  // The location of Uluru
  const uluru = { lat: 41.8755616, lng: -87.6244212 };
  // The map, centered at Uluru
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 10,
    center: uluru */ /*

  const results = {
    A: { lat: 34.041104, lng: -84.044093 },
    B: { lat: 34.038422, lng: -84.000473 },
    C: { lat: 34.007895, lng: -83.899684 },
  };*/

  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 10,
    center: new google.maps.LatLng(33.972199, -83.951859),
  }); /*
  // The marker, positioned at Uluru
  const marker = new google.maps.Marker({
    position: mp_Locales.A,
    map: location,
  });
  console.log(marker);*/

  eqfeed_callback(mp_Results);
}
/*
("AIzaSyATFEudevkKspVTBdb - F7kwSoH__uxnFtw");*/

// Loop through the results array and place a marker for each
// set of coordinates.
const eqfeed_callback = function (results) {
  const image = "./assets/images/img.png";
  results.forEach((element) => {
    console.log(element);
    const latLng = new google.maps.LatLng(element.lat, element.lng);
    new google.maps.Marker({
      position: latLng,
      map: map,
      icon: image,
    });
  });
};
/*
  for (let i = 0; i < results.length; i++) {
    console.log(i);
    const coords = results[i];
    const latLng = new google.maps.LatLng(coords.lat, coords.lng);
    console.log(coords);
    new google.maps.Marker({
      position: latLng,
      map: map,
    });
  }*/
