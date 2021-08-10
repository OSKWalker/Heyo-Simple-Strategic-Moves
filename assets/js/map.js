let mp_map;
let mp_overview;
let mp_centerLng = -83.951859;
let mp_centerLat = 33.972199;
/*
const mp_OVERVIEW_DIFFERENCE = 5;
const mp_OVERVIEW_MIN_ZOOM = 3;
const mp_OVERVIEW_MAX_ZOOM = 10;*/

// Initialize and add the map
function initMap() {
  const mp_Options = {
    zoom: 10,
    center: new google.maps.LatLng(mp_centerLat, mp_centerLng),
  };
  mp_map = new google.maps.Map(document.getElementById("map"), {
    ...mp_Options,
  });
  /*
  // instantiate the overview map without controls
  mp_overview = new google.maps.Map(document.getElementById("overview"), {
    ...mp_Options,
    disableDefaultUI: true,
    gestureHandling: "none",
    zoomControl: false,
  });

  function clamp(num, min, max) {
    return Math.min(Math.max(num, min), max);
  }
  mp_map.addListener("bounds_changed", () => {
    mp_overview.setCenter(mp_map.getCenter());
    mp_overview.setZoom(
      clamp(
        mp_map.getZoom() - mp_OVERVIEW_DIFFERENCE,
        mp_OVERVIEW_MIN_ZOOM,
        mp_OVERVIEW_MAX_ZOOM
      )
    );
  });*/
}

// Loop through the results array and place a marker for each
// set of coordinates.
const setMarkers = function (mp_results) {
  const mp_image = "./assets/images/map-marker-icon.png";

  mp_results.forEach((element) => {
    const mp_contentString = `<div><p id="listingPrice">$${element.list_price}</p></div>`;
    const mp_infowindow = new google.maps.InfoWindow({
      content: mp_contentString,
    });
    const latLng = new google.maps.LatLng(element.latitude, element.longitude);
    let marker = new google.maps.Marker({
      position: latLng,
      map: mp_map,
      icon: mp_image,
    });
    google.maps.event.addListener(marker, "mouseover", function (e) {
      mp_infowindow.open({
        anchor: marker,
        map,
        shouldFocus: false,
      });
    });
    google.maps.event.addListener(marker, "mouseout", function (e) {
      mp_infowindow.close();
    });
  });
};
