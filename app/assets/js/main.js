var app = app || {};

// shared app variables, move these inside the IIFE for production
var map,
    vizJSON,
    basemapLayer,
    layerToggle,
    mapLayers,
    carto,
    sql;

app.map = (function(w, d, L, $, async) {

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

    // set the cartodb sql object up
    sql = cartodb.SQL({ user: 'anhdnyc' });
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
          mapLayers.push(sublayer);
        }

        /* when using the layerSource object, create infowindows like so: */
        // cdb.vis.Vis.addInfowindow(map,layer.getSubLayer(0),['cartodb_id', 'address','bbl']);

        mapLayers[0].show(); // default data 
        mapLayers[1].hide(); // community board boundaries
        mapLayers[1].setInteraction(false);
        mapLayers[2].hide(); // city council districts
        mapLayers[2].setInteraction(false);
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
        if (mapLayers[1].isVisible()) {
          mapLayers[1].hide();
          $('.go-to-cb :nth-child(1)').prop('selected', true);
        }
        mapLayers[2].toggle();
        return true;
      },
      cb: function() {
        // hide / show community boards
        if (mapLayers[2].isVisible()) {
          debugger;
          mapLayers[2].hide();
          $('.go-to-cc :nth-child(1)').prop('selected', true);
        }
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

  function createSelect() {

    function createOptions(arr, name) {
      var toReturn = '';
      var first = name === 'coundist' ? '<option val="">Select a Council District</option>' :
        '<option val="">Select a Community Board</option>';
      var geoName = name === 'coundist' ? 'Council District ' : 'Community Board ';
      
      toReturn += first;
      
      toReturn += arr.map(function(el){
        return '<option value="' + el[name] + '">' + 
          geoName + el[name] + '</option>';
      }).join('');

      return toReturn;
    }

    function buildSelect(className, options) {
      $(className).append(options);
    }

    function initCC() {
      sql.execute('SELECT coundist FROM nycc order by coundist asc')
        .done(function(data){
          buildSelect('.go-to-cc', createOptions(data.rows, 'coundist'));
          initCB();
        });
    }

    function initCB() {
      sql.execute('SELECT borocd FROM nycd order by borocd asc')
        .done(function(data){
          buildSelect('.go-to-cb', createOptions(data.rows, 'borocd'));
          selectEvents();
        });
    }


    function selectEvents() {
      $('.go-to-cc').on('change', function(e){
        // set the other select to first option
        $('.go-to-cb :nth-child(1)').prop('selected', true);
        getCC($(this).val());
      });

      $('.go-to-cb').on('change', function(e){
        // set the other select to first option
        $('.go-to-cc :nth-child(1)').prop('selected', true);
        getCB($(this).val());
      });
    }

    initCC();
  }

  function getCC(num) {
    // to set the map position to a certain cc or cb
    sql.getBounds('SELECT * FROM nycc WHERE coundist = {{id}}', { id: num })
      .done(function(data){
        mapLayers[1].hide();
        mapLayers[2].show();
        map.fitBounds(data);
      });
  }

  function getCB(num) {
    sql.getBounds('SELECT * FROM nycd WHERE borocd = {{id}}', { id: num })
      .done(function(data){
        mapLayers[2].hide();
        mapLayers[1].show();
        map.fitBounds(data);
      });
  }

  function init(){
    initMap();
    createCDBLayer();
    wireLayerBtns();
    createSelect();
  }

  return {
    init: init
  };

})(window, document, L, jQuery, async);
