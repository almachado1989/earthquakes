const url = `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson`

fetch(url)
  .then((response) => response.json())
  .then((result) => init(result))

let i = 0

function init(data) {
  showEarthquake(data.features[i])
  addEventListenerToNext(data.features)
  addEventListenerToPrevious(data.features)
}

function showEarthquake(earthquake) {
  const card = document.createElement("div")

  const location = document.createElement("p")
  const magnitude = document.createElement("p")
  const date = document.createElement("p")
  const map = document.createElement("iframe")

  card.classList.add("card")
  location.classList.add("location")
  magnitude.classList.add("magnitude")
  map.classList.add("map")

  const latitude = earthquake.geometry.coordinates[0]
  const longitude = earthquake.geometry.coordinates[1]
  const mapUrl = `https://api.maptiler.com/maps/hybrid/?key=GRwZta99FfMcClWPOhTq#6/${longitude}/${latitude}`

  location.innerHTML = "Location: " + earthquake.properties.place
  magnitude.innerHTML = "Magnitude: " + earthquake.properties.mag
  date.innerHTML =
    "Date: " + new Date(earthquake.properties.time).toLocaleDateString("en-GB")
  map.src = mapUrl

  card.appendChild(location)
  card.appendChild(magnitude)
  card.appendChild(date)
  card.appendChild(map)

  document.querySelector(".container").appendChild(card)
}

function addEventListenerToNext(features) {
  document.querySelector(".next").addEventListener("click", () => {
    i++
    if (i === features.length) {
      i = 0
    }
    document.querySelector(".card").remove()
    showEarthquake(features[i])
  })
}

function addEventListenerToPrevious(features) {
  document.querySelector(".previous").addEventListener("click", () => {
    if (i === 0) {
      i = features.length
    }
    i--
    document.querySelector(".card").remove()
    showEarthquake(features[i])
  })
}
