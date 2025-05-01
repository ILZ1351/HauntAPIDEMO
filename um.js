// Map configuration and state
const mapConfig = {
  center: { lat: 40.7128, lng: -74.0060 }, // NYC center
  zoom: 12,
  styles: [
    {
      "stylers": [
        { "saturation": -100 },
        { "lightness": -20 }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        { "color": "#1a1a1a" }
      ]
    }
  ]
};

// Haunted locations data
const hauntedLocations = {
  "The Dakota": {
    position: { lat: 40.7767, lng: -73.9762 },
    story: "The famous apartment building where John Lennon lived and died. Many residents and visitors have reported seeing his ghost, and some claim to hear piano music late at night.",
    type: "Residential"
  },
  "Merchant's House Museum": {
    position: { lat: 40.7277, lng: -73.9919 },
    story: "Built in 1832, this house is considered one of NYC's most haunted locations. The ghost of Gertrude Tredwell, the last family member to live there, is said to still roam the halls.",
    type: "Museum"
  },
  "One if by Land, Two if by Sea": {
    position: { lat: 40.7337, lng: -74.0007 },
    story: "This restaurant was once Aaron Burr's carriage house. Staff and diners have reported seeing a ghostly woman in white and experiencing unexplained cold spots.",
    type: "Restaurant"
  },
  "The Algonquin Hotel": {
    position: { lat: 40.7614, lng: -73.9807 },
    story: "The ghost of a man in a top hat is often seen in the lobby, and some guests have reported their room keys mysteriously moving on their own.",
    type: "Hotel"
  },
  "The White Horse Tavern": {
    position: { lat: 40.7357, lng: -74.0077 },
    story: "Dylan Thomas's favorite bar, where he had his last drink. His ghost is said to still visit, and some claim to see him at his favorite table.",
    type: "Bar"
  },
  "The New Amsterdam Theatre": {
    position: { lat: 40.7564, lng: -73.9861 },
    story: "The ghost of Olive Thomas, a Ziegfeld Follies performer, is said to haunt the theater. She's often seen in her dressing room or on the catwalk.",
    type: "Theater"
  },
  "The House of Death": {
    position: { lat: 40.7337, lng: -73.9997 },
    story: "Mark Twain once lived here, and his ghost is said to still reside in the building. Other spirits have also been reported, including a woman in a white dress.",
    type: "Residential"
  },
  "The Ear Inn": {
    position: { lat: 40.7197, lng: -74.0077 },
    story: "Built in 1817, this bar is haunted by a former resident named Mickey. Staff and customers have reported seeing his ghost and hearing unexplained noises.",
    type: "Bar"
  },
  "The Haunted House of Harlem": {
    position: { lat: 40.8116, lng: -73.9465 },
    story: "Built in 1790 by Johann Hermann Raub, this is reputed to be the oldest haunted house in Harlem. The building has a long history of supernatural occurrences.",
    type: "Residential"
  },
  "The Ghostly Pianist of Flushing": {
    position: { lat: 40.7625, lng: -73.8301 },
    story: "In 1927, residents reported hearing sad, classical music issuing nightly from the attic of a deserted dwelling. The spectral pianist's identity remains unknown.",
    type: "Residential"
  },
  "The Twenty-Seventh Street Goblin": {
    position: { lat: 40.7470, lng: -73.9918 },
    story: "In 1870, this area was the site of a famous ghost hoax involving an unscrupulous reporter and several policemen. The story became a sensation in New York City.",
    type: "Residential"
  },
  "The Ghost of West Fourteenth Street": {
    position: { lat: 40.7378, lng: -74.0007 },
    story: "In 1881, residents of a boarding house at 131 West Fourteenth Street reported seeing spectral lodgers. The building was known for its paranormal activity.",
    type: "Residential"
  }
};

// Global variables
let map;
let markers = [];
let isNightMode = false;

// Initialize the map
function initMap() {
  try {
    map = new google.maps.Map(document.getElementById('map'), mapConfig);
    addHauntedLocations();
  } catch (error) {
    console.error('Error initializing map:', error);
    alert('Failed to load the map. Please try refreshing the page.');
  }
}

// Add all haunted locations to the map
function addHauntedLocations() {
  Object.entries(hauntedLocations).forEach(([name, data]) => {
    addHauntedMarker(data.position.lat, data.position.lng, name, data.type);
  });
}

// Add a single haunted location marker
function addHauntedMarker(lat, lng, name, type) {
  const marker = new google.maps.Marker({
    position: { lat, lng },
    map: map,
    title: name,
    icon: {
      url: getIconForType(type),
      scaledSize: new google.maps.Size(32, 32)
    }
  });

  marker.addListener("click", () => {
    showHauntedInfo(name);
  });

  markers.push(marker);
}

// Get icon based on location type
function getIconForType(type) {
  const icons = {
    'Residential': 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
    'Museum': 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
    'Restaurant': 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
    'Hotel': 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
    'Bar': 'http://maps.google.com/mapfiles/ms/icons/purple-dot.png',
    'Theater': 'http://maps.google.com/mapfiles/ms/icons/orange-dot.png'
  };
  return icons[type] || 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
}

// Show haunted location information
function showHauntedInfo(name) {
  const infoDiv = document.getElementById("hauntedInfo");
  const description = document.getElementById("hauntedDescription");
  const location = hauntedLocations[name];
  
  if (location) {
    const info = `
      <strong>Type:</strong> ${location.type}<br>
      <strong>Story:</strong> ${location.story}
    `;
    description.innerHTML = info;
    infoDiv.style.display = "block";
  }
}

// Close the information modal
function closeHauntedInfo() {
  document.getElementById("hauntedInfo").style.display = "none";
}

// Toggle night mode
function toggleNightMode() {
  isNightMode = !isNightMode;
  document.body.style.backgroundColor = isNightMode ? "#000" : "#1a1a1a";
  
  // Update map style based on mode
  const newStyles = isNightMode ? 
    [...mapConfig.styles, { "elementType": "labels", "stylers": [{ "visibility": "off" }] }] :
    mapConfig.styles;
  
  map.setOptions({ styles: newStyles });
}

// Toggle haunted stories (prototype feature)
function toggleHauntedStories() {
  alert("Haunted stories feature coming soon...");
}
