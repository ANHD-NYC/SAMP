var app = app || {};

// shared app variables, move these inside the IIFE for production
var map,
    vizJSON,
    basemapLayer,
    sql;

app.map = (function(w, d, L, $) {

  function initMap() {
    // initiates the Leaflet map
    basemapLayer = L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
      }),;

    map = new L.Map('map', { 
      center: [40.694045,-73.946571],
      zoom: 12
    });

    map.addLayer(basemapLayer);
  }

  function createCDBLayer() {
    // adds the CartoDB overlay from the viz.json URL
    vizJSON = 'https://anhdnyc.cartodb.com/api/v2/viz/d7c7286a-f50f-11e5-8c19-0ecfd53eb7d3/viz.json';
    
    cartodb.createLayer(map, vizJSON)
      .addTo(map)
      .on('done', function(layer) {
        console.log(layer);
        layer.setInteraction(true);
        layer.on('featureOver', function(e, latlng, pos, data, layerNumber) {
          // console.log(e, latlng, pos, data, layerNumber);
        });
      }).on('error', function() {
        //log the error
      });
  }

  function init(){
    initMap();
    createCDBLayer();
  }

  return {
    init: init
  };

})(window, document, L, jQuery);
