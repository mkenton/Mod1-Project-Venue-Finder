// Initialize and add the map
const addressInputForm = document.querySelector('form#addressInputForm')
const addressSubmitButtonElement = document.querySelector('button#submitAddress');
const addressInputTextElement = document.querySelector('input#addressTextInput');
const addressDisplayParentElement = document.querySelector('div#addressList');
function initMap() {
    const newYorkCoord = { lat: 40.7128, lng: -74.0060 };
  
    const originCoord = newYorkCoord;
    // The map, centered at (0,0)
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 8,
      center: originCoord,
    });
    // The marker, positioned at Uluru
    const marker = new google.maps.Marker({
      position: originCoord,
      map: map,
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
      addressInputForm.reset();
    })


  //   let deleteButton = document.createElement('button');
  //   deleteButton.textContent = 'x';
  //   deleteButton.addEventListener('click', handleDelete)
  
  //   taskItem.appendChild(deleteButton);
  //   document.querySelector("#tasks").appendChild(taskItem);
  // }
  
  // function handleDelete(event) {
  //   event.target.parentNode.remove();
  // }