// Function to HIDE/SHOW country info with buttons
const countryButton = document.getElementsByClassName("country-button");
for (let i = 0; i < countryButton.length; i++) {
  countryButton[i].addEventListener("click", handleCountrySelect);
}
function handleCountrySelect(e) {
  const countryBtn = e.target.dataset.country;
  const countrySelections1 = document.getElementsByClassName("country-section");
  for (let i = 0; i < countrySelections1.length; i++) {
    const sectionID = countrySelections1[i].id;
    if (sectionID === countryBtn) {
      countrySelections1[i].classList.remove("hidden");
    } else {
      countrySelections1[i].classList.add("hidden");
    }
  }
  handleReserveReset("reserve-0");
  // Click button to show map-country based on the innerText
  changeMapLocation(e.target.innerText);
}

// Function to HIDE/SHOW RESERVE info with buttons
const reserveButton = document.getElementsByClassName("reserve-button");
for (let i = 0; i < reserveButton.length; i++) {
  reserveButton[i].addEventListener("click", handleReserveSelect);
}
function handleReserveSelect(e) {
  const reserveBtn = e.target.dataset.reserve;
  const reserveSelection = document.getElementsByClassName("reserve-section");
  for (let i = 0; i < reserveSelection.length; i++) {
    const reserveID = reserveSelection[i].id;
    if (reserveID === reserveBtn) {
      reserveSelection[i].classList.remove("hidden");
    } else {
      reserveSelection[i].classList.add("hidden");
    }
  }
  changeMapLocation(e.target.innerText); // click button to show map-country based on the innerText
}

// Function to RESET RESERVE info
function handleReserveReset(reserve) {
  const reserveBtn = reserve;
  const reserveSelection = document.getElementsByClassName("reserve-section");
  for (let i = 0; i < reserveSelection.length; i++) {
    const reserveID = reserveSelection[i].id;
    if (reserveID === reserveBtn) {
      reserveSelection[i].classList.remove("hidden");
    } else {
      reserveSelection[i].classList.add("hidden");
    }
  }
}

//MAPS API from https://leafletjs.com/
let mapTileLayers = L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}", //Attribution for map tiles import
    { attribution: "Powered by Esri" }
  );
  
  /*CREDIT: 
  Tim Nelson - Showing only map tiles for Southern Africa (avoid loading world map)*/
  let map = L.map("map", {
    layers: [mapTileLayers], // variable from above
    center: [-0, 20], // central lat-lng once loaded
    zoom: 0, // smaller numbers = zoomOut // larger numbers = zoomIn
    minZoom: 2.3, // max zoomOut permitted
    maxZoom: 18, // max zoomIn permitted
    maxBounds: [
      // stops map from infinite scrolling at edges
      [38, 50], //north east boundary
      [-35, -20], //south west boundary
    ],
    maxBoundsViscosity: 0.5, // elastic bounce-back of map edges
  });
  
  L.control.scale().addTo(map); // adds scale/legend in bottom-left corner of map
    //--- END CREDIT ---
  
  // Function to change map display with button click  
  let pinMarker = {};  
  function changeMapLocation(location) {
    /* CREDIT: .find() by location in array of objects: 
  https://stackoverflow.com/a/35398031/13484385*/
    const newMapLocation = mapLocations.find(
      (name) => name.location === location
    );
    //--- END CREDIT ---
  
    // map.setView(newMapLocation.center, newMapLocation.zoom);
    map.flyTo(newMapLocation.center, newMapLocation.zoom);
    if (newMapLocation.pin) {
      map.removeLayer(pinMarker);
      pinMarker = L.marker(newMapLocation.pin)
        .addTo(map)
        .bindPopup(
          "<strong><h6>" +
            newMapLocation.location +
            "</h6></strong>" +
            "<strong>" +
            "Website:       " +
            "</strong>" +
            newMapLocation.website +
            "<strong>" +
            "<br>Latitude:      " +
            "</strong>" +
            newMapLocation.pin[0] +
            "<strong>" +
            "<br>Longitude:     " +
            "</strong>" +
            newMapLocation.pin[1]
        );
    } else {
      map.removeLayer(pinMarker);
    }
  }
  
  //Arrays for initial locations
  const mapLocations = [
    //Start of Initial Country Objects
    {
      location: "South Africa",
      website: "",
      center: [-29.28864, 25.025732],
      zoom: 5,
    },
    {
      location: "Botswana",
      website: "",
      center: [-22.179045, 23.726907],
      zoom: 6,
    },
    {
      location: "Namibia",
      website: "",
      center: [-22.101561, 17.195369],
      zoom: 4.8,
    },
    {
      location: "Kenya",
      website: "",
      center: [0.501555, 37.930799],
      zoom: 5.7,
    },
    // end of Initial Country Objects
  
    //Start of Reserve Intial Objects
    //---South Africa Reserves
    {
      location: "Kruger National Park",
      website:
        '<a href="http://www.krugerpark.co.za/" target="_blank">krugerpark.co.za</a>',
      center: [-23.988669, 31.553925],
      zoom: 7.5,
      pin: [-23.988669, 31.553925],
    },
    {
      location: "Tembe Elephant Park",
      website: '<a href="https://tembe.co.za/" target="_blank">tembe.co.za</a>',
      center: [-26.965, 32.45],
      zoom: 10,
      pin: [-27.048843, 32.422914],
    },
    {
      location: "Shamwari Game Reserve",
      website:
        '<a href="https://www.shamwari.com/" target="_blank">shamwari.com</a>',
      center: [-33.47, 26.1],
      zoom: 11,
      pin: [-33.477947, 26.036215],
    },
    //---Botswana Reserves
    {
      location: "Chobe National Park",
      website:
        '<a href="https://chobenationalpark.co.za/" target="_blank">chobenationalpark.co.za</a>',
      center: [-18.5, 24.5],
      zoom: 8,
      pin: [-18.788571, 24.386086],
    },
    {
      location: "Central Kalahari Game Reserve",
      website:
        '<a href="https://kalaharinationalpark.com/display-view/Central-Kalahari-Game-Reserve/" target="_blank">kalaharinationalpark.com</a>',
      center: [-22.2, 24],
      zoom: 7,
      pin: [-22.390486, 23.838411],
    },
    {
      location: "Moremi Game Reserve",
      website: '<a href="https://www.moremi.com/" target="_blank">moremi.com</a>',
      center: [-19.33, 23.2],
      zoom: 8.5,
      pin: [-19.272781, 22.959351],
    },
    //---Namibia Reserves
    {
      location: "Etosha National Park",
      website:
        '<a href="http://www.met.gov.na/national-parks/etosha-national-park/217/" target="_blank">met.gov.na</a>',
      center: [-18.964107, 15.8],
      zoom: 7.2,
      pin: [-18.964107, 16.349421],
    },
    {
      location: "Skeleton Coast National Park",
      website:
        '<a href="http://www.met.gov.na/national-parks/skeleton-coast-park/227/" target="_blank">met.gov.na</a>',
      center: [-19.5, 13],
      zoom: 7,
      pin: [-20.072817, 13.316423],
    },
    {
      location: "Khaudum National Park",
      website:
        '<a href="http://www.met.gov.na/national-parks/khaudum-national-park/220/" target="_blank">met.gov.na</a>',
      center: [-18.78, 20.7],
      zoom: 9,
      pin: [-18.954467, 20.567399],
    },
    //---Kenya Reserves
    {
      location: "Maasai Mara Nature Reserve",
      website:
        '<a href="http://www.maasaimara.com/" target="_blank">maasaimara.com</a>',
      center: [-1.371569, 34.93885],
      zoom: 8.5,
      pin: [-1.371569, 34.93885],
    },
    {
      location: "Amboseli National Park",
      website:
        '<a href="http://www.kws.go.ke/amboseli-national-park" target="_blank">kws.go.ke</a>',
      center: [-2.652516, 37.260651],
      zoom: 10.5,
      pin: [-2.652516, 37.260651],
    },
    {
      location: "Lake Nakuru National Park",
      website:
        '<a href="http://www.kws.go.ke/lake-nakuru-national-park" target="_blank">kws.go.ke</a>',
      center: [-0.366763, 36.089139],
      zoom: 11,
      pin: [-0.366763, 36.089139],
    },
  ];
  