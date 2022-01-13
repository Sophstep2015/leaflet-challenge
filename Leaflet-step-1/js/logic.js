let initialMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 4
  });

  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 513,
    zoomOffset: -1,
    accessToken: API_KEY
}).addTo(initialMap);

let url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson'

function markerSize(mag){
    return mag * 5;
}

function markerColors(i) {
  return i > 50 ? '#f06b6b' :
        i > 40 ? '#f0936b' :
        i > 30 ? '#f3ba4e' :
        i > 20 ? '#f3db4c' :
        i > 10 ? '#e1f34c' :
                  '#b7f34d';
};
function marker(feature, latlng){
      let mformat = {
        radius: markerSize(feature.properties.mag),
        fillColor: markerColors(feature.geometry.coordinates[2]),
        color: "black",
        weight: 1,
        opacity: 2,
        fillOpacity: .75
      }
      return L.circleMarker(latlng, mformat);
    };
function Legend(map) {
      var leg = L.control({ position: "bottomright"});
      leg.onAdd = function (initialMap) {
          var i = L.DomUtil.create("div", "legend");
          i.innerHTML += '<h3>Depth</h3>';
          i.innerHTML += '<i style="background: #b7f34d"></i><span>0 - 10</span><br>';
          i.innerHTML += '<i style="background: #e1f34c"></i><span>10 - 20</span><br>';
          i.innerHTML += '<i style="background: #f3db4c"></i><span>20 - 30</span><br>';
          i.innerHTML += '<i style="background: #f3ba4e"></i><span>30 - 40</span><br>';
          i.innerHTML += '<i style="background: #f0936b"></i><span>40 - 50</span><br>';
          i.innerHTML += '<i style="background: #f06b6b"></i><span>50+</span><br>';
          return i;
      };
    leg.addTo(initialMap);
  };
  Legend(initialMap);

d3.json(url).then(function(res){
    console.log(res)
  
    let quakedata = res.features
        console.log(quakedata)
    
        quakedata.forEach(function(res2){
            L.geoJSON(res2,{
              pointToLayer: marker
            }).bindPopup("<br>Location: " + res2.properties.place + "<br>Magnitude: " + res2.properties.mag).addTo(initialMap)
          })
        });