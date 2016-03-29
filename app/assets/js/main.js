var app = app || {};

// shared app variables, move these inside the IIFE for production
var map,
    vizJSON,
    basemapLayer,
    layerToggle,
    mapLayers,
    carto,
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
    // grab cartocss object
    carto = app.cartocss;

    // for use with CartoDB's 'Named Maps API', loads data but
    // currently doesn't work with toggling the sublayers
    var layerSource = {
      user_name: 'anhdnyc',
      type: 'namedmap',
      named_map: {
        name: 'samp_test',
        layers: [
          {
            layer_name: "samp_select_mapluto",
            interactivity: 'cartodb_id, address, bbl'
          },
          {
            layer_name: "nycc"
          },
          {
            layer_name: "nycd"
          },
          {
            layer_name: "samp_select_mapluto_jc",
            interactivity: 'cartodb_id, address, bbl, a1, a2, a3, nb, yearbuilt'
          }
        ]
      }
    };
    
    cartodb.createLayer(map, vizJSON)
      .addTo(map)
      .done(function(layer) {

        mapLayers = [];
        var i = 0, sublayerCount = layer.getSubLayerCount();

        for (i; i < sublayerCount; i++) {
          var sublayer = layer.getSubLayer(i);
          sublayer.setInteraction(true);
          mapLayers.push(sublayer);
        }

        /* when using the layerSource object, create infowindows like so: */
        // cdb.vis.Vis.addInfowindow(map,layer.getSubLayer(0),['cartodb_id', 'address','bbl']);

        mapLayers[1].hide(); // community board boundaries
        mapLayers[2].hide(); // city council districts
        mapLayers[3].hide(); // dob jobs

      })
      .error(function(error) {
        console.log('error loading CDB data', error);
      });
  }

  function wireLayerBtns() {
    // wires the UI map layer buttons to CartoDB
    layerToggle = {
      // hide / show the default map layer (speculation score)
      score : function() {
        if (mapLayers[0].isVisible()) {
          mapLayers[0].hide();
        } else {
          mapLayers[0].show();
        }

        return true;
      },
      dob: function() {
        // hide show the dob jobs layer
        if (!mapLayers[3].isVisible()) {
          mapLayers[0].hide();
          mapLayers[3].show();
        } else {
          mapLayers[0].show();
          mapLayers[3].hide();
        }
        
        return true;
      },
      rent: function() {
        // hide show the change in RS layer
        return true;
      },
      combined: function() {
        // hide show the combined alert score
        return true;
      },
      cd: function() {
        // hide / show council districts
        mapLayers[2].toggle();
        return true;
      },
      cb: function() {
        // hide / show community boards
        mapLayers[1].toggle();
        return true;
      }
    }

    $('.map-layers button').click(function(e) {
      e.preventDefault();
      $('.map-layers .button').removeClass('selected');
      $(this).addClass('selected');
      layerToggle[$(this).attr('id')]();
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
