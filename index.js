// Initialize and add the map
const addressInputForm = document.querySelector('form#addressInputForm')
const addressSubmitButtonElement = document.querySelector('button#submitAddress');
const addressInputTextElement = document.querySelector('input#addressTextInput');
const addressDisplayParentElement = document.querySelector('div#addressList');
let geocodedAddressObjectArray = [];

function initMap() {
    const newYorkCoord = { lat: 40.7128, lng: -74.0060 };
    const originCoord = newYorkCoord;
    // The map, centered at New York
    // const geocoder = new google.maps.Geocoder();
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 8,
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
  newDeleteButton.addEventListener('click', function(event) {
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
  addressSubmitButtonElement.addEventListener('click', function(event) {
      event.preventDefault();
      const newAddress = document.createElement("p");
      
      addNewAddress(newAddress);
      addVoteButton(newAddress);
      addDeleteButton(newAddress);

      const geocoder = new google.maps.Geocoder();
      geocodeAddress(geocoder, map)
      
      addressInputForm.reset();
      
      // const marker = new google.maps.Marker({
      //   position: originCoord,
      //   map: map,
      // });

  }) 
}



function geocodeAddress(geocoder, resultsMap) {
  const address = addressInputTextElement.value;
  geocoder
    .geocode({ address: address })
    .then(({ results }) => {
      console.log(results)
      geocodedAddressObjectArray.push(results[0]);
      resultsMap.setCenter(results[0].geometry.location);
      new google.maps.Marker({
        map: resultsMap,
        position: results[0].geometry.location,
      });
    })
    .catch((exception) =>
      alert("Geocode was not successful for the following reason: " + exception)
    );
}