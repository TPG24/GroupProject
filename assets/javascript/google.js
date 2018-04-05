// ============================================================================
// GLOBAL VARIABLES
// ============================================================================
var map;
var restaurantInfo;
var request;
var service;
var markers = [];
var input;
var searchBox;
var geocoder;
// var zipCode;
var foodType;
var center;
// ============================================================================
// FUNCTIONS
// ============================================================================
// Initializes the map 
function initMap() {
    geocoder = new google.maps.Geocoder();
    var center = {lat: 33.7490, lng: -84.3880};
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 11,
        center: center
    });

    // filters the request to match our parameters
   request = {
        location: center,
        radius: 8047,
        types: ["restaurant"],
        // keyword: foodType
   };

    service = new google.maps.places.PlacesService(map);
  
    service.nearbySearch(request, callback);

    restaurantInfo = new google.maps.InfoWindow();

    // When a user clicks on a different portion of the map
    // Markers clear from the previous location
    // and repopulate in the new location
    google.maps.event.addListener(map, 'click', function(event){
        map.setCenter(event.latLng);
        clearMarkers(markers);
        request = {
            location: event.latLng,
            radius: 8047,
            types: ["restaurant"],
            keyword: foodType
       };
       service.nearbySearch(request, callback);
    });
    

    input = document.getElementById("zip-code");
    searchBox = new google.maps.places.SearchBox(input);
}

function callback(results, status) {
    // var zipCode = $('#zip-code').val();
    if (status === google.maps.places.PlacesServiceStatus.OK){
        for (var i = 0; i < results.length; i++){
            markers.push(createMarker(results[i]));
        }
    }
}

// creates the location markers for the map
function createMarker(place) {
    var placeMarker = place.geometry.location;
    var marker = new google.maps.Marker({
        map: map,
        position: placeMarker
    });

    // listens for a click on the map 
    // and displays the name of the restaurant when a specific marker is clicked
    google.maps.event.addListener(marker, 'click', function(){
        restaurantInfo.setContent(place.name);
        restaurantInfo.open(map, this);
    });
    return marker; 
}

// Clears markers after a new location has been selected
function clearMarkers(markers) {
    for (var m in markers){
        markers[m].setMap(null);
    }
    markers = [];
}

// accepts user input when Search button is clicked
$(document).on("click", "#search-rest", function(){
    event.preventDefault();
    codeAddress();
    zipCode= $("#zip-code").val();
    foodType = $("#food-type").val();
    center = {lat: 33.7490, lng: -84.3880};
    console.log("click");
    // console.log(zipCode);
    console.log(foodType);
    // map.setCenter(zipCode);
    clearMarkers(markers);
    request = {
        location: center,
        radius: 8047,
        types: ["restaurant"],
        keyword: foodType
    }
    service.nearbySearch(request, callback);


});

// function codeAddress(zipCode) {
//     geocoder.geocode( { 'address': zipCode}, function(results, status) {
//         if (status == google.maps.GeocoderStatus.OK) {
//         //Got result, center the map and put it out there
//         map.setCenter(results[0].geometry.location);
//         var marker = new google.maps.Marker({
//             map: map,
//             position: results[0].geometry.location
//         });
//         } 
//     });
// }