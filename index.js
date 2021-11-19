// Initialize and add the map

script = document.createElement('script');
script.src = getenv('MAPS_CALL')
script.async;
document.querySelector('head').append(script);

const addressInputForm = document.querySelector('form#addressInputForm')
const addressSubmitButtonElement = document.querySelector('button#submitAddress');
const addressInputTextElement = document.querySelector('input#addressTextInput');
const addressDisplayParentElement = document.querySelector('div#addressList');
const searchFormElement = document.querySelector('form#searchForm');
const searchTermInputTextElement = document.querySelector('input#searchTerm');
const searchTermSubmitButtonElement = document.querySelector('button#submitSearch')
const placesContainer = document.querySelector('#placesContainer')
const refreshButton = document.getElementById("refresh")
const startOverButton = document.getElementById("startOver")

let geocodedAddressObjectArray = [];
let map;
const icons = {
  person: "img/icon_person.png",
  center: "img/icon_center.png"
}
searchForm = document.getElementById("searchForm");
searchForm.addEventListener('submit', e => {
  e.preventDefault();
  //console.log(e.target.searchTerm.value)
})

const newYorkCoord = { lat: 40.7128, lng: -74.0060 };
const originCoord = newYorkCoord;
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 11,
    center: originCoord,
    mapTypeControl: false
  });
  handleAddressSubmitButtonEvent(map)
  handleSearchSubmitButtonEvent(map)
}

let addressIdArray = [];
let addressMarkerArray = [];

function addDeleteButton(newAddress) {
  const newDeleteButton = document.createElement("button");
  newDeleteButton.setAttribute('class', 'delete');
  newDeleteButton.innerText = 'x';
  newDeleteButton.addEventListener('click', function (event) {
    let deleteId = event.target.parentNode.id.slice("address".length);
    let deleteIndex = addressIdArray.indexOf(parseInt(deleteId));
    geocodedAddressObjectArray.splice(deleteIndex, 1);
    addressIdArray.splice(deleteIndex, 1);
    deleteAddressMarker(deleteIndex);
    avgMarkerUpdate(map, "remove");
    event.target.parentNode.remove();
  })
  newAddress.prepend(newDeleteButton)
}

function deleteAddressMarker(deleteIndex) {
  addressMarkerArray[deleteIndex].setMap(null);
  addressMarkerArray.splice(deleteIndex, 1);
}

let addressCreateCount = 0;
function addNewAddress(newAddress) {
  newAddress.innerText = "  " + addressInputTextElement.value + " ";
  newAddress.id = "address" + addressCreateCount;
  addressIdArray.push(addressCreateCount++);
  addressDisplayParentElement.append(newAddress);
}

function handleAddressSubmitButtonEvent(map) {
  addressSubmitButtonElement.addEventListener('click', function (event) {
    event.preventDefault();
    const newAddress = document.createElement("p");
    newAddress.classList.add('addy')

    addNewAddress(newAddress);
    addDeleteButton(newAddress);

    const geocoder = new google.maps.Geocoder();
    geocodeAddress(geocoder, map)

    addressInputForm.reset();
  })
}

function handleSearchSubmitButtonEvent(map) {
  searchTermSubmitButtonElement.addEventListener('click', function (event) {
    event.preventDefault();
    getPlacesNearCenter();
    map.setZoom(13);
    searchFormElement.reset();
  })
}

let currentAvgLatLng;
let markerAvgLatLng;
let searchRangeCircle;

function placeMarkerAvgLatLng(map) {
  markerAvgLatLng = new google.maps.Marker({
    position: { lat: avgLatLng()[0], lng: avgLatLng()[1] },
    map: map,
    icon: icons.center
  });
}

function avgMarkerUpdate(map, updateType) {
  if (updateType === "add") {
    if (markerAvgLatLng === undefined) {
      placeMarkerAvgLatLng(map);
      searchRangeCircle = showSearchRange(map, { lat: avgLatLng()[0], lng: avgLatLng()[1] })
    }
    else {
      markerAvgLatLng.setMap(null);
      placeMarkerAvgLatLng(map);
      searchRangeCircle.setMap(null);
      searchRangeCircle = showSearchRange(map, { lat: avgLatLng()[0], lng: avgLatLng()[1] })
    }
  }
  else if (updateType === "remove") {
    if (Number.isNaN(avgLatLng()[0])) {
      map.setCenter(originCoord);
      markerAvgLatLng.setMap(null);
      searchRangeCircle.setMap(null);
    }
    else {
      map.setCenter({ lat: avgLatLng()[0], lng: avgLatLng()[1] }); 
      markerAvgLatLng.setMap(null);
      placeMarkerAvgLatLng(map);
      searchRangeCircle.setMap(null);
      searchRangeCircle = showSearchRange(map, { lat: avgLatLng()[0], lng: avgLatLng()[1] })
    }
  }
}

function avgLatLng() {
  let sumLatitude = 0, sumLongitude = 0, avgLatitude, avgLongitude;
  for (let i = 0; i < geocodedAddressObjectArray.length; i++) {
    sumLatitude += geocodedAddressObjectArray[i].geometry.location.lat();
    sumLongitude += geocodedAddressObjectArray[i].geometry.location.lng();
  }
  // console.log(geocodedAddressObjectArray.length)
  avgLatitude = sumLatitude / (geocodedAddressObjectArray.length);
  avgLongitude = sumLongitude / (geocodedAddressObjectArray.length);
  return [avgLatitude, avgLongitude]
}

function showSearchRange(map, location) {
  const options = {
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 1,
    map: map,
    center: location,
    radius: 3000
  }
  const circle = new google.maps.Circle(options);
  return circle;
}

function geocodeAddress(geocoder, resultsMap) {
  const address = addressInputTextElement.value;
  geocoder
    .geocode({ address: address })
    .then(({ results }) => {
      // console.log(results[0])
      geocodedAddressObjectArray.push(results[0]);
      currentAvgLatLng = [avgLatLng()[0], avgLatLng()[1]];
      resultsMap.setCenter({ lat: avgLatLng()[0], lng: avgLatLng()[1] });
      newAddressMarker = new google.maps.Marker({
        map: resultsMap,
        position: results[0].geometry.location,
        icon: icons.person
      });
      addressMarkerArray.push(newAddressMarker);
      avgMarkerUpdate(resultsMap, "add");
    })
    .catch((exception) =>
      alert("Geocode was not successful for the following reason: " + exception)
    );
}

// /* search for places using earch term
// use coordinates calculated form center of mass of all addresses as the central search location
// */
let placeSearchService;
function getPlacesNearCenter() {
  let request = {
    location: { lat: avgLatLng()[0], lng: avgLatLng()[1] },
    rankBy: google.maps.places.RankBy.DISTANCE,
    keyword: searchTermInputTextElement.value
  }
  placeSearchService = new google.maps.places.PlacesService(map);
  placeSearchService.nearbySearch(request, placeSearchCallback);
}

function placeSearchCallback(searchResults, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    closestPlaces = searchResults.slice(0, 4)
    handlePlaces(closestPlaces);
    //console.log(closestPlaces) //see top results
  } else { alert("No results found. Make sure to enter starting locations first!") }
}


let placeMarkersOnDisplay = [];
function handlePlaces(places) {
  places.forEach(place => {
    renderPlaceCards(place)
    let marker = new google.maps.Marker({
      position: place.geometry.location,
      map: map,
      title: place.name
    });
    placeMarkersOnDisplay.push(marker);
  });
}

startOverButton.addEventListener('click', event => {
  placeMarkersOnDisplay.forEach(marker => {
    marker.setMap(null)
  })
  removeAllChilds(placesContainer);
  placeMarkersOnDisplay = [];
  // location.reload()
})

// refreshButton.addEventListener('click', event => {
//   location.reload()
// })

function removeAllChilds(parentNode) {
  while(parentNode.firstChild) {
    parentNode.removeChild(parentNode.lastChild);
  }
}

let mouseOverMarker;
function renderPlaceCards(place) {
  const placeCard = document.createElement('span');
  placeCard.id = place.place_id;
  placeCard.className = "place-card";
  placeCard.addEventListener('mouseenter', function(event) {
    mouseOverMarker = new google.maps.Marker({
      position: place.geometry.location,
      map: map,
      icon: "img/icon_mouseover.png"
    });
    placeCard.style.border = '3px solid rgb(7, 7, 7)';
  });
  placeCard.addEventListener('mouseleave', function(event) {
    placeCard.style.border = '3px solid #F9F9F9';
    mouseOverMarker.setMap(null);
  });

  const placeName = document.createElement('h5');
  placeName.textContent = place.name;

  //TODO: add website link to place card (website currently not accessible in Places API request)

  const placeRating = document.createElement('h6');
  placeRating.className = "place-rating";
  let rating = "None";
  if (place.rating) rating = place.rating;
  placeRating.textContent = ('Rating: ' + rating + '✮');
  placeRating.style.color = "#af8d1d"

  let photo = document.createElement('img');
  photo.classList.add('photo');
  if (place.photos) {
    let firstPhoto = place.photos[0];
    photo.src = firstPhoto.getUrl();
  }
  else {
    photo.src = "img/no-img-found.png"
  }
  placeCard.append(photo)

  const cardAddress = document.createElement('h6');
  cardAddress.className = "cardAddress";
  cardAddress.textContent = place.vicinity;

  const newVoteButton = document.createElement("button");
  newVoteButton.setAttribute('class', 'vote');
  newVoteButton.innerText = "Vote";
  newVoteButton.addEventListener('click', (event) => voteEventHandler(heartContainer))

  const heartContainer = document.createElement("p");
  heartContainer.setAttribute('class', 'heart');
  heartContainer.innerText = "";

  placeCard.append(placeName, placeRating, cardAddress, newVoteButton, heartContainer)
  placesContainer.appendChild(placeCard);
}

function voteEventHandler(heartContainer) {
  heartContainer.innerText += "♡"
}
