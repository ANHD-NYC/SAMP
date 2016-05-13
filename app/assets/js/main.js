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

    // set the cartodb sql object up
    sql = cartodb.SQL({ user: 'anhdnyc' });
  }

  function createCDBLayer() {
    // adds the CartoDB overlay from the viz.json URL
    vizJSON = 'https://anhdnyc.cartodb.com/api/v2/viz/d7c7286a-f50f-11e5-8c19-0ecfd53eb7d3/viz.json';
    // grab cartocss object
    carto = app.cartocss;

    // for use with CartoDB's 'Named Maps API', loads the data but
    // currently doesn't work with toggling the sublayers...
    var layerSource = {
      user_name: 'anhdnyc',
      type: 'namedmap',
      named_map: {
        name: 'samp_test3',
        layers: [
          {
            layer_name: "all",
            // interactivity: 'cartodb_id, address, bbl, est2011'
          },
          {
            layer_name: "cc"
          },
          {
            layer_name: "cb"
          },
          {
            layer_name: "jobs",
            // interactivity: 'cartodb_id, address, bbl, a1, a2, a3, nb, yearbuilt'
          }
        ]
      }
    };

    // you can switch how the cartodb layers are added below by passing either
    // layerSource or vizJSON as the second parameter to cartodb.createLayer()
    cartodb.createLayer(map, layerSource)
      .addTo(map)
      .done(function(layer) {

        mapLayers = [];
        var i = 0, sublayerCount = layer.getSubLayerCount();

        for (i; i < sublayerCount; i++) {
          var sublayer = layer.getSubLayer(i);
          mapLayers.push(sublayer);
        }

        /* when using the layerSource object, create infowindows like so: */
        cdb.vis.Vis.addInfowindow(map,layer.getSubLayer(0),['address', 'bbl', 'est2011', 'est2014', 'ownername', 'saleprice', 'saledate', 'unitsres'], {infowindowTemplate: $('#spec_score_infowindow').html()});
        cdb.vis.Vis.addInfowindow(map,layer.getSubLayer(3),["address", "bbl", "jobcount", "a1", "a2", "a3", "nb", "unitsres", "yearbuilt"], {infowindowTemplate: $('#dob_infowindow').html()});


        // very sloppy example tooltip creation
        // todo: make a separate function for these and use a templating engine like handlebars
        var testTooltip = layer.leafletMap.viz.addOverlay({
          type: 'tooltip',
          layer: layer.getSubLayer(0),
          template: '<div class="cartodb-tooltip-content-wrapper"><div class="cartodb-tooltip-content"><h4>Address</h4><p>{{address}}</p><h4>Building Block Lot (BBL):</h4><p>{{bbl}}</p></div></div>',
          width: 200,
          position: 'bottom|right',
          fields: [{ address: 'address', bbl: 'bbl' }]
        });
        $('.cartodb-map.leaflet-container').append(testTooltip.render().el);

        mapLayers[0].show(); // default data
        mapLayers[1].hide(); // community board boundaries
        mapLayers[1].setInteraction(false);
        mapLayers[2].hide(); // city council districts
        mapLayers[2].setInteraction(false);
        mapLayers[3].hide(); // dob jobs

        // using the layerSource you can alter a "placeholder"
        // value from the template like so:
        // layer.setParams({ cc_sql: 30 });

        // listen for opening of popups to fomat numbers
        mapLayers[0].on('featureClick', function(e, latlng, pos, data, layer) {
          $('#salePrice').text(numberWithCommas($('#salePrice').text()));
          $('#unitsRes').text(numberWithCommas($('#unitsRes').text()));
        });

        mapLayers[3].on('featureClick', function(e, latlng, pos, data, layer) {
          $('#unitsRes').text(numberWithCommas($('#unitsRes').text()));
        });

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
        console.log('score');
        if (mapLayers[0].isVisible()) {
          mapLayers[0].hide();
        } else {
          hideAllLayers();
          mapLayers[0].show();
        }

        return true;
      },
      dob: function() {
        console.log('dob');
        // hide show the dob jobs layer
        if (mapLayers[3].isVisible()) {
          mapLayers[3].hide();
        } else {
          hideAllLayers();
          mapLayers[3].show();
        }

        return true;
      },
      rent: function() {
        console.log('rent');
        hideAllLayers();
        // todo: hide show the change in RS layer
        return true;
      },
      combined: function() {
        console.log('combined');
        hideAllLayers();
        // todo: hide show the combined alert score
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
          mapLayers[2].hide();
          $('.go-to-cc :nth-child(1)').prop('selected', true);
        }
        mapLayers[1].toggle();
        return true;
      }
    }

    function hideAllLayers() {
      mapLayers[0].hide();
      mapLayers[3].hide();
    }

    $('.radio1').click(function(e) {
      e.preventDefault();
      layerToggle[$(this).attr('id')]();
      if (!$(this).hasClass("selected")) {
        $('.radio1').removeClass('selected');
        $(this).addClass('selected');
      } else {
        $(this).removeClass('selected');
      }
    });
    $('.radio2').click(function(e) {
      e.preventDefault();
      layerToggle[$(this).attr('id')]();
      if (!$(this).hasClass("selected")) {
        $('.radio2').removeClass('selected');
        $(this).addClass('selected');
      } else {
        $(this).removeClass('selected');
      }

    });
  }

  function createSelect() {
    // sets up the select / dropdowns for community boards
    // and council districts
    function createOptions(arr, name) {
      var toReturn = '';
      var first = name === 'coundist' ? '<option val="0">Select a Council District</option>' :
        '<option val="0">Select a Community Board</option>';
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
        $('.radio2').removeClass('selected');
        $('#cd').addClass('selected');
      });

      $('.go-to-cb').on('change', function(e){
        // set the other select to first option
        $('.go-to-cc :nth-child(1)').prop('selected', true);
        getCB($(this).val());
        $('.radio2').removeClass('selected');
        $('#cb').addClass('selected');
      });
    }

    initCC();
  }

  function getCC(num) {
    // to set the map position to a city council district
    // zero means the first option in the select
    if (num !== 0) {
      sql.getBounds('SELECT * FROM nycc WHERE coundist = {{id}}', { id: num })
        .done(function(data){
          mapLayers[1].hide();
          mapLayers[2].show();
          map.fitBounds(data);
        });
    }
  }

  function getCB(num) {
    // to set the map position to a community board
    // zero means the first option in the select
    if (num !==0) {
      sql.getBounds('SELECT * FROM nycd WHERE borocd = {{id}}', { id: num })
        .done(function(data){
          mapLayers[2].hide();
          mapLayers[1].show();
          map.fitBounds(data);
        });
    }
  }

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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

})(window, document, L, jQuery);
