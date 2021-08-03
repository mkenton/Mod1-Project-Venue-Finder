// Initialize and add the map
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
  
  