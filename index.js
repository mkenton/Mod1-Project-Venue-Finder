// Initialize and add the map
const addressInputForm = document.querySelector('form#addressInputForm')
const addressSubmitButtonElement = document.querySelector('button#submitAddress');
const addressInputTextElement = document.querySelector('input#addressTextInput');
const addressDisplayParentElement = document.querySelector('div#addressList');
const searchTermInputTextElement = document.querySelector('input#searchTerm');
const searchTermSubmitButtonElement = document.querySelector('button#submitSearch')
const placesContainer = document.querySelector('#placesContainer')
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
}
)


function initMap() {
  const newYorkCoord = { lat: 40.7128, lng: -74.0060 };
  const originCoord = newYorkCoord;
  // The map, centered at New York
  // const geocoder = new google.maps.Geocoder();
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 10,
    center: originCoord,
    mapTypeControl: false
  });
  handleAddressSubmitButtonEvent(map)
  handleSearchSubmitButtonEvent(map)
}

// keep an array that stores the id of the submitted address idArray = [0,1,2,3...]
// in an event that an address is removed, the marker should also be removed and the average latitude and longitude should also be recalculated.
// at a delete event, the id number of the deleted element can be returned, for example, 2
// then indexToRemove = idArray.indexOf(2) will give the index of the idArray whose element should be deleted
// then we can do idArray.splice(indexToRemove, 1)
// for example, idArray = [0,1,2,3,4] -> [0,1,3,4] (2 is removed)
// if the markers are stored in an array, markers = [mk0, mk1, mk2, mk3, mk4]
// we can do markers.splice(indexToRemove, 1)



// function addVoteButton(newAddress) {
//   const newVoteButton = document.createElement("button");
//   newVoteButton.setAttribute('class', 'vote');
//   newVoteButton.innerText = "vote";
//   newAddress.append(newVoteButton);
// }

function addDeleteButton(newAddress) {
  const newDeleteButton = document.createElement("button");
  newDeleteButton.setAttribute('class', 'delete');
  newDeleteButton.innerText = 'x';
  newDeleteButton.addEventListener('click', function (event) {
    console.log(event.target.parentNode.id);
    event.target.parentNode.remove();
  })
  newAddress.prepend(newDeleteButton)
}

let addressCreateCount = 0;
function addNewAddress(newAddress) {
  newAddress.innerText = "  " + addressInputTextElement.value + " ";
  newAddress.id = "address" + addressCreateCount++;
  addressDisplayParentElement.append(newAddress);
}

function handleAddressSubmitButtonEvent(map) {
  addressSubmitButtonElement.addEventListener('click', function (event) {
    event.preventDefault();
    const newAddress = document.createElement("p");
    newAddress.classList.add('addy')

    addNewAddress(newAddress);
    //addVoteButton(newAddress);
    addDeleteButton(newAddress);

    const geocoder = new google.maps.Geocoder();
    geocodeAddress(geocoder, map)

    //put marker on avgLatLong()
    // avgMarkerUpdate();
    // console.log(avgLatLng())

    // markerAvgLatLng = new google.maps.Marker({
    //   position: { lat: avgLatLng()[0], lng: avgLatLng()[1] },
    //   map: map,
    // });

    // console.log(avgLatLng())


    addressInputForm.reset();



  })
}

function handleSearchSubmitButtonEvent(map) {
  searchTermSubmitButtonElement.addEventListener('click', function (event) {
    event.preventDefault();
    getPlacesNearCenter();
    // addressInputForm.reset();
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

function avgMarkerUpdate(map) {
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
      new google.maps.Marker({
        map: resultsMap,
        position: results[0].geometry.location,
        icon: icons.person
      });
      avgMarkerUpdate(resultsMap);
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
    // keyword: ${searchTerm} // TODO: use correct variable
  }
  placeSearchService = new google.maps.places.PlacesService(map);
  placeSearchService.nearbySearch(request, placeSearchCallback);
}

function placeSearchCallback(searchResults, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    closestPlaces = searchResults.slice(0, 4)
    handlePlaces(closestPlaces);
    //console.log(closestPlaces) //see top 4 results
  } else {alert ("Enter starting locations first!")}
}

function handlePlaces(places) {
  places.forEach(place => {
    renderPlaceCards(place)
    let marker = new google.maps.Marker({
      position: place.geometry.location,
      map: map,
      title: place.name
    });
    
  });
}

function renderPlaceCards(place) {

  const placeCard = document.createElement('span');
  placeCard.id = place.place_id;
  placeCard.className = "place-card";

  const placeName = document.createElement('h4')
  placeName.textContent = place.name

  const placeRating = document.createElement('h4')
  placeRating.className = "place-rating"
  let rating = "None"
  if (place.rating) rating = place.rating;
  placeRating.textContent = ('Rating: ' + rating + '✮');
  
  if (place.photos) {
    let firstPhoto = place.photos[0];
    let photo = document.createElement('img');
    photo.classList.add('photo');
    photo.src = firstPhoto.getUrl();
    placeCard.append(photo)}

  const cardAddress = document.createElement('h6')
  cardAddress.className = "cardAddress"
  cardAddress.textContent = place.vicinity

    
  placeCard.append(placeName, placeRating, cardAddress)
  placesContainer.appendChild(placeCard);
}