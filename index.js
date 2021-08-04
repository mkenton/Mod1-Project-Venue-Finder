// Initialize and add the map
const addressInputForm = document.querySelector('form#addressInputForm')
const addressSubmitButtonElement = document.querySelector('button#submitAddress');
const addressInputTextElement = document.querySelector('input#addressTextInput');
const addressDisplayParentElement = document.querySelector('div#addressList');
function initMap() {
    const newYorkCoord = { lat: 40.7128, lng: -74.0060 };
    const originCoord = newYorkCoord;
    // The map, centered at New York
    const geocoder = new google.maps.Geocoder();
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 8,
      center: originCoord,
    });
}
 
addressSubmitButtonElement.addEventListener('click', function(event) {
      event.preventDefault();
      const newAddress = document.createElement("p");
      newAddress.innerText = addressInputTextElement.value + " ";

      const newVoteButton = document.createElement("button");
      newVoteButton.setAttribute('class', 'vote');
      newVoteButton.innerText = "vote";

      const newDeleteButton = document.createElement("button");
      newDeleteButton.setAttribute('class', 'delete');
      newDeleteButton.innerText = 'x';
      newDeleteButton.addEventListener('click', function(event) {
      event.target.parentNode.remove();
      })

      addressDisplayParentElement.append(newAddress);
      newAddress.append(newVoteButton);
      newAddress.append(newDeleteButton)
      const geocoder = new google.maps.Geocoder();
      geocodeAddress(geocoder, map)
      
      addressInputForm.reset();
      

      // const marker = new google.maps.Marker({
      //   position: originCoord,
      //   map: map,
      // });

}) 

// function geocodeAddress(geocoder, resultsMap) {
//   const address = addressInputTextElement.value;
//   console.log(address);
//   geocoder
//     .geocode({ address: address })
//     .then(({ results }) => {
//       resultsMap.setCenter(results[0].geometry.location);
//       new google.maps.Marker({
//         map: resultsMap,
//         position: results[0].geometry.location,
//       });
//     })
//     .catch((exception) =>
//       alert("Geocode was not successful for the following reason: " + exception)
//     );
// }

function geocodeAddress(geocoder, resultsMap) {
  const address = addressInputTextElement.value;
  geocoder
    .geocode({ address: address })
    .then(({ results }) => {
      console.log(results)
      resultsMap.setCenter(results[0].geometry.location);
      new google.maps.Marker({
        map: resultsMap,
        position: results[0].geometry.location,
      });
    })
    .catch((e) =>
      alert("Geocode was not successful for the following reason: " + e)
    );
}