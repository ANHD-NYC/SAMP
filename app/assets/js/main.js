var app = app || {};

// shared app variables, move these inside the IIFE for production
var map,
    vizJSON,
    basemapLayer,
    layerToggle,
    mapLayers = {},
    sql;

app.map = (function(w, d, L, $) {

  function initMap() {
    // initiates the Leaflet map
    basemapLayer = L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
      });

    map = new L.Map('map', { 
      center: [40.694045, -73.946571],
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

        // to do: create layers for CB & CB boundaries, or add them to the viz in the CDB dashboard

        layer.setInteraction(true);
        layer.on('featureOver', function(e, latlng, pos, data, layerNumber) {
          // console.log(e, latlng, pos, data, layerNumber);
        });
      }).on('error', function(error) {
        console.log('error loading CDB data', error);
      });
  }

  function wireLayerBtns() {
    // wires the UI map layer buttons to CartoDB
    layerToggle = {
      score : function() {
        // update cartocss
        // update sql
        // if legend render legend
        return true;
      },
      dob: function() {
        // update cartocss
        // update sql
        // if legend render legend
        return true;
      },
      rent: function() {
        // update cartocss
        // update sql
        // if legend render legend
        return true;
      },
      combined: function() {
        // update cartocss
        // update sql
        // if legend render legend
        return true;
      },
      cd: function() {
        // update cartocss
        // update sql
        // if legend render legend
        return true;
      },
      cb: function() {
        // update cartocss
        // update sql
        // if legend render legend
        return true;
      }
    }

    $('.map-layers button').click(function(e) {
      e.preventDefault();
      $('.map-layers .button').removeClass('selected');
      $(this).addClass('selected');
      layerToggle[$(this).attr('id')]();
      // + potentially show layers if they hidden
    });
  }

  function init(){
    initMap();
    createCDBLayer();
    wireLayerBtns();
  }

  return {
    init: init
  };

})(window, document, L, jQuery);
