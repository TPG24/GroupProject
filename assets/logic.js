// var request;
// var service;
// var markers = [];
// var map;
// var infoWindow;
//
// function initMap() {
//     var map = new google.maps.Map(document.getElementById('map'), {
//         zoom: 8,
//         center: {lat: 33.7490, lng: -84.3880}
//     });
//
//     // request = {
//     //     location: center,
//     //     radius: 8047,
//     //     query: 'restaurant'
//     // };
//     // infoWindow = new google.maps.InfoWindow();
//     // service = new google.maps.places.PlacesService(map);
//     // service.nearbySearch(request, callback);
//
//     var geocoder = new google.maps.Geocoder();
//
//
//
//     document.getElementById('submit').addEventListener('click', function () {
//         geocodeAddress(geocoder, map);
//     });
//
// }
//
//
// function geocodeAddress(geocoder, resultsMap) {
//
//     var address = document.getElementById('address').value;
//     geocoder.geocode({'address': address}, function(results, status) {
//         if (status === 'OK') {
//             resultsMap.setCenter(results[0].geometry.location);
//             var marker = new google.maps.Marker({
//                 map: resultsMap,
//                 position: results[0].geometry.location,
//                 radius: 500,
//                 query: 'restaurant'
//
//
//             });
//         } else {
//             alert('Geocode was not successful for the following reason: ' + status);
//         }
//     });
// }






////////////////////////////////////////////////////////////////////////////////////////////////////
//
var map;
var infowindow;

function initMap() {
    var atlanta ={lat: 33.7490, lng: -84.3880};
    // var atlanta = document.getElementById('address');
    // var input = getGeometry(atlanta);

    map = new google.maps.Map(document.getElementById('map'), {
        center: atlanta,
        zoom: 15
    });

    // var input = document.getElementById('submit');
    // var searchBox = new google.maps.places.SearchBox(input);
    // map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    // map.addListener('bounds_changed', function() {
    //     searchBox.setBounds(map.getBounds());


    infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
        location: atlanta,
        radius: 4000,
        type: ['restaurant']
    }, callback);
}

function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
        }
    }
}

function createMarker(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
    });

    google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
    });
}
//
// var map, places, infoWindow;
// var markers = [];
// var autocomplete;
// var countryRestrict = {'country': 'us'};
// var MARKER_PATH = 'https://developers.google.com/maps/documentation/javascript/images/marker_green';
// var hostnameRegexp = new RegExp('^https?://.+?/');
//
// var countries = {
//     'au': {
//         center: {lat: -25.3, lng: 133.8},
//         zoom: 4
//     },
//     'br': {
//         center: {lat: -14.2, lng: -51.9},
//         zoom: 3
//     },
//     'ca': {
//         center: {lat: 62, lng: -110.0},
//         zoom: 3
//     },
//     'fr': {
//         center: {lat: 46.2, lng: 2.2},
//         zoom: 5
//     },
//     'de': {
//         center: {lat: 51.2, lng: 10.4},
//         zoom: 5
//     },
//     'mx': {
//         center: {lat: 23.6, lng: -102.5},
//         zoom: 4
//     },
//     'nz': {
//         center: {lat: -40.9, lng: 174.9},
//         zoom: 5
//     },
//     'it': {
//         center: {lat: 41.9, lng: 12.6},
//         zoom: 5
//     },
//     'za': {
//         center: {lat: -30.6, lng: 22.9},
//         zoom: 5
//     },
//     'es': {
//         center: {lat: 40.5, lng: -3.7},
//         zoom: 5
//     },
//     'pt': {
//         center: {lat: 39.4, lng: -8.2},
//         zoom: 6
//     },
//     'us': {
//         center: {lat: 37.1, lng: -95.7},
//         zoom: 3
//     },
//     'uk': {
//         center: {lat: 54.8, lng: -4.6},
//         zoom: 5
//     }
// };
//
// function initMap() {
//     map = new google.maps.Map(document.getElementById('map'), {
//         zoom: countries['us'].zoom,
//         center: countries['us'].center,
//         mapTypeControl: false,
//         panControl: false,
//         zoomControl: false,
//         streetViewControl: false
//     });
//
//     infoWindow = new google.maps.InfoWindow({
//         content: document.getElementById('info-content')
//     });
//
//     // Create the autocomplete object and associate it with the UI input control.
//     // Restrict the search to the default country, and to place type "cities".
//     autocomplete = new google.maps.places.Autocomplete(
//         /** @type {!HTMLInputElement} */ (
//             document.getElementById('autocomplete')), {
//             types: ['(cities)'],
//             componentRestrictions: countryRestrict
//         });
//     places = new google.maps.places.PlacesService(map);
//
//     autocomplete.addListener('place_changed', onPlaceChanged);
//
//     // Add a DOM event listener to react when the user selects a country.
//     document.getElementById('country').addEventListener(
//         'change', setAutocompleteCountry);
// }
//
// // When the user selects a city, get the place details for the city and
// // zoom the map in on the city.
// function onPlaceChanged() {
//     var place = autocomplete.getPlace();
//     if (place.geometry) {
//         map.panTo(place.geometry.location);
//         map.setZoom(15);
//         search();
//     } else {
//         document.getElementById('autocomplete').placeholder = 'Enter a city';
//     }
// }
//
// // Search for hotels in the selected city, within the viewport of the map.
// function search() {
//     var search = {
//         bounds: map.getBounds(),
//         types: ['lodging']
//     };
//
//     places.nearbySearch(search, function(results, status) {
//         if (status === google.maps.places.PlacesServiceStatus.OK) {
//             clearResults();
//             clearMarkers();
//             // Create a marker for each hotel found, and
//             // assign a letter of the alphabetic to each marker icon.
//             for (var i = 0; i < results.length; i++) {
//                 var markerLetter = String.fromCharCode('A'.charCodeAt(0) + (i % 26));
//                 var markerIcon = MARKER_PATH + markerLetter + '.png';
//                 // Use marker animation to drop the icons incrementally on the map.
//                 markers[i] = new google.maps.Marker({
//                     position: results[i].geometry.location,
//                     animation: google.maps.Animation.DROP,
//                     icon: markerIcon
//                 });
//                 // If the user clicks a hotel marker, show the details of that hotel
//                 // in an info window.
//                 markers[i].placeResult = results[i];
//                 google.maps.event.addListener(markers[i], 'click', showInfoWindow);
//                 setTimeout(dropMarker(i), i * 100);
//                 addResult(results[i], i);
//             }
//         }
//     });
// }
//
// function clearMarkers() {
//     for (var i = 0; i < markers.length; i++) {
//         if (markers[i]) {
//             markers[i].setMap(null);
//         }
//     }
//     markers = [];
// }
//
// // Set the country restriction based on user input.
// // Also center and zoom the map on the given country.
// function setAutocompleteCountry() {
//     var country = document.getElementById('country').value;
//     if (country == 'all') {
//         autocomplete.setComponentRestrictions({'country': []});
//         map.setCenter({lat: 15, lng: 0});
//         map.setZoom(2);
//     } else {
//         autocomplete.setComponentRestrictions({'country': country});
//         map.setCenter(countries[country].center);
//         map.setZoom(countries[country].zoom);
//     }
//     clearResults();
//     clearMarkers();
// }
//
// function dropMarker(i) {
//     return function() {
//         markers[i].setMap(map);
//     };
// }
//
// function addResult(result, i) {
//     var results = document.getElementById('results');
//     var markerLetter = String.fromCharCode('A'.charCodeAt(0) + (i % 26));
//     var markerIcon = MARKER_PATH + markerLetter + '.png';
//
//     var tr = document.createElement('tr');
//     tr.style.backgroundColor = (i % 2 === 0 ? '#F0F0F0' : '#FFFFFF');
//     tr.onclick = function() {
//         google.maps.event.trigger(markers[i], 'click');
//     };
//
//     var iconTd = document.createElement('td');
//     var nameTd = document.createElement('td');
//     var icon = document.createElement('img');
//     icon.src = markerIcon;
//     icon.setAttribute('class', 'placeIcon');
//     icon.setAttribute('className', 'placeIcon');
//     var name = document.createTextNode(result.name);
//     iconTd.appendChild(icon);
//     nameTd.appendChild(name);
//     tr.appendChild(iconTd);
//     tr.appendChild(nameTd);
//     results.appendChild(tr);
// }
//
// function clearResults() {
//     var results = document.getElementById('results');
//     while (results.childNodes[0]) {
//         results.removeChild(results.childNodes[0]);
//     }
// }
//
// // Get the place details for a hotel. Show the information in an info window,
// // anchored on the marker for the hotel that the user selected.
// function showInfoWindow() {
//     var marker = this;
//     places.getDetails({placeId: marker.placeResult.place_id},
//         function(place, status) {
//             if (status !== google.maps.places.PlacesServiceStatus.OK) {
//                 return;
//             }
//             infoWindow.open(map, marker);
//             buildIWContent(place);
//         });
// }
//
// // Load the place information into the HTML elements used by the info window.
// function buildIWContent(place) {
//     document.getElementById('iw-icon').innerHTML = '<img class="hotelIcon" ' +
//         'src="' + place.icon + '"/>';
//     document.getElementById('iw-url').innerHTML = '<b><a href="' + place.url +
//         '">' + place.name + '</a></b>';
//     document.getElementById('iw-address').textContent = place.vicinity;
//
//     if (place.formatted_phone_number) {
//         document.getElementById('iw-phone-row').style.display = '';
//         document.getElementById('iw-phone').textContent =
//             place.formatted_phone_number;
//     } else {
//         document.getElementById('iw-phone-row').style.display = 'none';
//     }
//
//     // Assign a five-star rating to the hotel, using a black star ('&#10029;')
//     // to indicate the rating the hotel has earned, and a white star ('&#10025;')
//     // for the rating points not achieved.
//     if (place.rating) {
//         var ratingHtml = '';
//         for (var i = 0; i < 5; i++) {
//             if (place.rating < (i + 0.5)) {
//                 ratingHtml += '&#10025;';
//             } else {
//                 ratingHtml += '&#10029;';
//             }
//             document.getElementById('iw-rating-row').style.display = '';
//             document.getElementById('iw-rating').innerHTML = ratingHtml;
//         }
//     } else {
//         document.getElementById('iw-rating-row').style.display = 'none';
//     }
//
//     // The regexp isolates the first part of the URL (domain plus subdomain)
//     // to give a short URL for displaying in the info window.
//     if (place.website) {
//         var fullUrl = place.website;
//         var website = hostnameRegexp.exec(place.website);
//         if (website === null) {
//             website = 'http://' + place.website + '/';
//             fullUrl = website;
//         }
//         document.getElementById('iw-website-row').style.display = '';
//         document.getElementById('iw-website').textContent = website;
//     } else {
//         document.getElementById('iw-website-row').style.display = 'none';
//     }
// }
//
// function displayMovieInfo() {
//
//     var movie = $(this).attr("data-name");
//     var queryURL = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=" + zipcode + "&key=AIzaSyBR2e-onYfxF0Q1ST_ndCFMC6kzPGYCPA4";
//
//     $.ajax({
//         url: queryURL,
//         method: "GET"
//     }).then(function(response) {
//         $("#movies-view").text(JSON.stringify(response));
//         renderButtons();
//     });
// }
//
// // Function for displaying movie data
// function renderButtons() {
//
//     // Deleting the buttons prior to adding new movies
//     // (this is necessary otherwise you will have repeat buttons)
//     $("#buttons-view").empty();
//
//     // Looping through the array of movies
//     for (var i = 0; i < movies.length; i++) {
//
//         // Then dynamically generating buttons for each movie in the array
//         // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
//         var a = $("<button>");
//         // Adding a class of movie to our button
//         a.addClass("movie");
//         // Adding a data-attribute
//         a.attr("data-name", movies[i]);
//         // Providing the initial button text
//         a.text(movies[i]);
//         // Adding the button to the buttons-view div
//         $("#buttons-view").append(a);
//     }
// }
//
// // This function handles events where one button is clicked
// $("#add-movie").on("click", function(event) {
//     event.preventDefault();
//
//     // This line grabs the input from the textbox
//     var movie = $("#movie-input").val().trim();
//
//     // Adding the movie from the textbox to our array
//     movies.push(movie);
//     console.log(movies);
//
//     // Calling renderButtons which handles the processing of our movie array
//     renderButtons();
// });
//
// // Function for displaying the movie info
// // Using $(document).on instead of $(".movie").on to add event listeners to dynamically generated elements
// $(document).on("click", ".movie", displayMovieInfo);
//
// // Calling the renderButtons function to display the initial buttons
// renderButtons();