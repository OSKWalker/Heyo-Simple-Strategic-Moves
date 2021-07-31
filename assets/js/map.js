// Initialize and add the map
function initMap() {
    // The location of Uluru
    const uluru = { lat:41.8755616, lng: -87.6244212 };
    // The map, centered at Uluru
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 14,
        center: uluru,
    });

// The marker, positioned at Uluru
const marker = new google.maps.Marker({
        position: uluru,
        map: map,
        });
}
