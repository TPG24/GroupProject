// ============================================================================
// GLOBAL VARIABLES
// ============================================================================
var map;
var restaurantInfo;
var request;
var service;
var markers = [];

// ============================================================================
// FUNCTIONS
// ============================================================================
function initMap() {
    var center = {lat: 33.7490, lng: -84.3880};
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 11,
        center: center
    });


   request = {
        location: center,
        radius: 8047,
        types: ["restaurant"]
   };

    service = new google.maps.places.PlacesService(map);
  
    service.nearbySearch(request, callback);

    restaurantInfo = new google.maps.InfoWindow();

    google.maps.event.addListener(map, 'click', function(){
        // event.preventDefault();
        map.setCenter(event.latlng);
        clearMarkers(markers);
    });
}

function callback(results, status) {
    var address = $('#zip-code').val();
    if (status === google.maps.places.PlacesServiceStatus.OK){
        for (var i = 0; i < results.length; i++){
            markers.push(createMarker(results[i]));
        }
    }
}

function createMarker(place) {
    var placeMarker = place.geometry.location;
    var marker = new google.maps.Marker({
        map: map,
        position: placeMarker
    });

    google.maps.event.addListener(marker, 'click', function(){
        restaurantInfo.setContent(place.name);
        restaurantInfo.open(map, this);
    });
    return marker; 
}

function clearMarkers(markers) {
    for (var m in markers){
        markers[m].setMap(null);
    }
    markers = [];
}