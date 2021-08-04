// Initialize and add the map
const addressInputForm = document.querySelector('form#addressInputForm')
const addressSubmitButtonElement = document.querySelector('button#submitAddress');
const addressInputTextElement = document.querySelector('input#addressTextInput');
const addressDisplayParentElement = document.querySelector('div#addressList');
let geocodedAddressObjectArray = [];
const icons = {
  person: "img/icon_person.png",
  center: "img/icon_center.png"
}
searchForm = document.getElementById("searchForm");
searchForm.addEventListener('submit', e => {
  e.preventDefault();
  console.log(e.target.searchTerm.value)}
)


function initMap() {
  const newYorkCoord = { lat: 40.7128, lng: -74.0060 };
  const originCoord = newYorkCoord;
  // The map, centered at New York
  // const geocoder = new google.maps.Geocoder();
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 10,
    center: originCoord,
  });
  handleSubmitButtonEvent(map)
}

// keep an array that stores the id of the submitted address idArray = [0,1,2,3...]
// in an event that an address is removed, the marker should also be removed and the average latitude and longitude should also be recalculated.
// at a delete event, the id number of the deleted element can be returned, for example, 2
// then indexToRemove = idArray.indexOf(2) will give the index of the idArray whose element should be deleted
// then we can do idArray.splice(indexToRemove, 1)
// for example, idArray = [0,1,2,3,4] -> [0,1,3,4] (2 is removed)
// if the markers are stored in an array, markers = [mk0, mk1, mk2, mk3, mk4]
// we can do markers.splice(indexToRemove, 1)



function addVoteButton(newAddress) {
  const newVoteButton = document.createElement("button");
  newVoteButton.setAttribute('class', 'vote');
  newVoteButton.innerText = "vote";
  newAddress.append(newVoteButton);
}

function addDeleteButton(newAddress) {
  const newDeleteButton = document.createElement("button");
  newDeleteButton.setAttribute('class', 'delete');
  newDeleteButton.innerText = 'x';
  newDeleteButton.addEventListener('click', function (event) {
    console.log(event.target.parentNode.id);
    event.target.parentNode.remove();
  })
  newAddress.append(newDeleteButton)
}

let addressCreateCount = 0;
function addNewAddress(newAddress) {
  newAddress.innerText = addressInputTextElement.value + " ";
  newAddress.id = "address" + addressCreateCount++;
  addressDisplayParentElement.append(newAddress);
}

function handleSubmitButtonEvent(map) {
  addressSubmitButtonElement.addEventListener('click', function (event) {
    event.preventDefault();
    const newAddress = document.createElement("p");

    addNewAddress(newAddress);
    addVoteButton(newAddress);
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

let currentAvgLatLng;
let markerAvgLatLng;
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
  }
  else {
    markerAvgLatLng.setMap(null);
    placeMarkerAvgLatLng(map);
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

/* search for places using earch term
use coordinates calculated form center of mass of all addresses as the central search location
*/
// function getPlacesNearCenter(position) {
  
//     let request = {
//       location: currentAvgLatLng
//       rankBy: google.maps.places.RankBy.DISTANCE
//       keyword: ${searchTerm} // TODO: use correct variable
//   }
// }