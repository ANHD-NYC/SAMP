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
    basemapLayer = L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
      });

    map = new L.Map('map', {
      center: [40.694045, -73.946571],
      zoom: 12,
      zoomControl: false,
    });

    new L.Control.Zoom({ position: 'bottomleft' }).addTo(map);

    map.addLayer(basemapLayer);

    // add address geocoder
    var geocoder = L.Control.geocoder({
      position: 'bottomleft', 
      collapsed: true, 
      placeholder:'Address Search', 
      defaultMarkGeocode: true, 
      geocoder:new L.Control.Geocoder.Google()
    })
    .on('markgeocode', function(e) {
      var bbox = e.geocode.bbox;
      map.fitBounds(bbox);
    })
    .addTo(map);




    // set the cartodb sql object up
    sql = cartodb.SQL({ user: 'anhdnyc' });
  }

  function createCDBLayer() {
    // adds the CartoDB overlay from the viz.json URL
    vizJSON = 'https://anhdnyc.cartodb.com/api/v2/viz/5dc8e250-31ab-11e6-a738-0ecfd53eb7d3/viz.json';
    // grab cartocss object
    carto = app.cartocss;

    // for use with CartoDB's 'Named Maps API', loads the data but
    // currently doesn't work with toggling the sublayers...
    var layerSource = {
      user_name: 'anhdnyc',
      type: 'namedmap',
      named_map: {
        name: 'SAMP_Map_2016',
        layers: [
          {
            layer_name: "sampscore",
          },
          {
            layer_name: "rentregscore"
          },
          {
            layer_name: "dobscore"
          },
          {
            layer_name: "dofscore",
          },
          {
            layer_name: "cb",
          },
          {
            layer_name: "cd",
          },
          {
            layer_name: "zipcode",
          }
        ]
      }
    };

    // you can switch how the cartodb layers are added below by passing either
    // layerSource or vizJSON as the second parameter to cartodb.createLayer()
    cartodb.createLayer(map, layerSource, {'https': true})
      .addTo(map)
      .done(function(layer) {

        mapLayers = [];
        var i = 0, sublayerCount = layer.getSubLayerCount();

        for (i; i < sublayerCount; i++) {
          var sublayer = layer.getSubLayer(i);
          mapLayers.push(sublayer);
        }

        /* when using the layerSource object, create infowindows like so: */
        cdb.vis.Vis.addInfowindow(map,layer.getSubLayer(0),["cartodb_id", "sampscore", "address", "dofscore", "dobscore", "rentregscore", "dobyn", "rentregyn", "props", "unitsres", "yearbuilt"], {infowindowTemplate: $('#sampscore_infowindow').html()});
        cdb.vis.Vis.addInfowindow(map,layer.getSubLayer(1),["cartodb_id", "rentregscore", "address", "uc2014", "rentstabdiff", "rentstabpctchange", "dobyn", "props", "unitsres", "yearbuilt"], {infowindowTemplate: $('#rentregscore_infowindow').html()});
        cdb.vis.Vis.addInfowindow(map,layer.getSubLayer(2),["cartodb_id", "dobscore", "address", "jobcount", "a1", "a2", "dm", "props", "rentregyn", "unitsres", "yearbuilt"], {infowindowTemplate: $('#dobscore_infowindow').html()});
        cdb.vis.Vis.addInfowindow(map,layer.getSubLayer(3),["cartodb_id", "dofscore", "address", "saledate", "saleprice", "priceresunit", "ppunit10_plutoresdunits", "pctchngunit_10_15", "dobyn", "rentregyn", "unitsres", "yearbuilt"], {infowindowTemplate: $('#dofscore_infowindow').html()});


        // very sloppy example tooltip creation
        // todo: make a separate function for these and use a templating engine like handlebars
/*        var testTooltip = layer.leafletMap.viz.addOverlay({
          type: 'tooltip',
          layer: layer.getSubLayer(0),
          template: '<div class="cartodb-tooltip-content-wrapper"><div class="cartodb-tooltip-content"><h4>Address</h4><p>{{address}}</p></div></div>',
          width: 200,
          position: 'bottom|right',
          fields: [{ address: 'address' }]
        });
        $('.cartodb-map.leaflet-container').append(testTooltip.render().el);*/

        mapLayers[0].show(); // sampscore layer
        mapLayers[1].hide(); // rentregscore
        mapLayers[2].hide(); // dobscore
        mapLayers[3].hide(); // dofscore

        mapLayers[4].hide(); // community districts
        mapLayers[4].setInteraction(false);
        mapLayers[5].hide(); // city council districts
        mapLayers[5].setInteraction(false);
        mapLayers[6].hide(); // city council districts
        mapLayers[6].setInteraction(false);

        // using the layerSource you can alter a "placeholder"
        // value from the template like so:
        // layer.setParams({ cc_sql: 30 });

        // listen for opening of popups to fomat numbers
        mapLayers[1].on('featureClick', function(e, latlng, pos, data, layer) {
          $('#pctchange').text((parseFloat($('#pctchange').text())*100).toFixed(0) + "%");
        });

        mapLayers[3].on('featureClick', function(e, latlng, pos, data, layer) {
          if ($('#pctchange').text().indexOf('%') == -1) {
            $('#pctchange').text((parseFloat($('#pctchange').text())*100).toFixed(0) + "%");
          }
          if ($('#saleprice').text().indexOf('$') == -1) {
            $('#saleprice').text("$" + numberWithCommas(parseInt($('#saleprice').text())));
          }
          if ($('#priceresunit').text().indexOf('$') == -1) {
            $('#priceresunit').text("$" + numberWithCommas(parseInt($('#priceresunit').text())));
          }
          if ($('#ppunit10_plutoresdunits').text().indexOf('$') == -1) {
            $('#ppunit10_plutoresdunits').text("$" + numberWithCommas(parseInt($('#ppunit10_plutoresdunits').text())));
          }
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
      sampscore: function() {
        if (mapLayers[0].isVisible()) {
          mapLayers[0].hide();
          $('.cartodb-infowindow').css('visibility', 'hidden');
        } else {
          hideAllLayers();
          mapLayers[0].show();
          // set max legend value to 300
          $('#maxLegendNumber').text(300);
        }

        return true;
      },
      rentregscore: function() {
        if (mapLayers[1].isVisible()) {
          mapLayers[1].hide();
          $('.cartodb-infowindow').css('visibility', 'hidden');
        } else {
          hideAllLayers();
          mapLayers[1].show();
          // set max legend value to 100
          $('#maxLegendNumber').text(100);
        }

        return true;
      },
      dobscore: function() {
        if (mapLayers[2].isVisible()) {
          mapLayers[2].hide();
          $('.cartodb-infowindow').css('visibility', 'hidden');
        } else {
          hideAllLayers();
          mapLayers[2].show();
          // set max legend value to 100
          $('#maxLegendNumber').text(100);
        }

        return true;
      },
      dofscore: function() {
        if (mapLayers[3].isVisible()) {
          mapLayers[3].hide();
          $('.cartodb-infowindow').css('visibility', 'hidden');
        } else {
          hideAllLayers();
          mapLayers[3].show();
          // set max legend value to 100
          $('#maxLegendNumber').text(100);
        }

        return true;
      },
      cd: function() {
        // hide / show council districts
        if (mapLayers[4].isVisible() || mapLayers[6].isVisible()) {
          mapLayers[4].hide();
          mapLayers[6].hide();
          $('.go-to-cb :nth-child(1)').prop('selected', true);          
        }
        if (mapLayers[5].isVisible()) {
          mapLayers[5].hide();
        } else {
          mapLayers[5].show();
        }
        return true;
      },
      cb: function() {
        // hide / show community boards
        if (mapLayers[5].isVisible() || mapLayers[6].isVisible()) {
          mapLayers[5].hide();
          mapLayers[6].hide();
          $('.go-to-cc :nth-child(1)').prop('selected', true);
        }
        if (mapLayers[4].isVisible()) {
          mapLayers[4].hide();
        } else {
          mapLayers[4].show();
        }
        return true;
      },
      zipcode: function() {
        // hide / show community boards
        if (mapLayers[4].isVisible() || mapLayers[5].isVisible()) {
          mapLayers[4].hide();
          mapLayers[5].hide();
          $('.go-to-zipcode :nth-child(1)').prop('selected', true);
        }
        if (mapLayers[6].isVisible()) {
          mapLayers[6].hide();
        } else {
          mapLayers[6].show();
        }
        return true;
      }
    }

    function hideAllLayers() {
      mapLayers[0].hide();
      mapLayers[1].hide();
      mapLayers[2].hide();
      mapLayers[3].hide();
      $('.cartodb-infowindow').css('visibility', 'hidden');
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
      console.log($(this).attr('id'));
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
      var toReturn = '',
          first = '',
          geoName = '';
      if (name === 'coundist') {
        first = '<option val="0">Select a Council District</option>';
        geoName = 'Council District ';
      } else if (name === 'borocd') {
        first = '<option val="0">Select a Community Board</option>';
        geoName = 'Community Board ';
      } else {
        first = '<option val="0">Select a Zip Code</option>';
        geoName = '';
      }

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
      sql.execute('SELECT coundist FROM nycc ORDER BY coundist ASC')
        .done(function(data){
          buildSelect('.go-to-cc', createOptions(data.rows, 'coundist'));
          initCB();
        });
    }

    function initCB() {
      sql.execute('SELECT borocd FROM nycd ORDER BY borocd ASC')
        .done(function(data){
          buildSelect('.go-to-cb', createOptions(data.rows, 'borocd'));
          initZipCode();
        });
    }

    function initZipCode() {
      sql.execute('SELECT zipcode FROM nyc_zip_codes GROUP BY zipcode ORDER BY zipcode ASC')
        .done(function(data){
          buildSelect('.go-to-zipcode', createOptions(data.rows, 'zipcode'));
          selectEvents();
        });
    }

    function selectEvents() {
      $('.go-to-cc').on('change', function(e){
        // set the other selects to first option
        $('.go-to-cb :nth-child(1)').prop('selected', true);
        $('.go-to-zipcode :nth-child(1)').prop('selected', true);
        console.log($(this).val());
        getCC($(this).val());
        $('.radio2').removeClass('selected');
        $('#cd').addClass('selected');
      });

      $('.go-to-cb').on('change', function(e){
        // set the other select to first option
        $('.go-to-cc :nth-child(1)').prop('selected', true);
        $('.go-to-zipcode :nth-child(1)').prop('selected', true);
        console.log($(this).val());
        getCB($(this).val());
        $('.radio2').removeClass('selected');
        $('#cb').addClass('selected');
      });

      $('.go-to-zipcode').on('change', function(e){
        // set the other select to first option
        $('.go-to-cb :nth-child(1)').prop('selected', true);
        $('.go-to-cc :nth-child(1)').prop('selected', true);
        getZipCode($(this).val());
        $('.radio2').removeClass('selected');
        $('#zipcode').addClass('selected');
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
          mapLayers[4].hide();
          mapLayers[5].show();
          mapLayers[6].hide();
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
          mapLayers[4].show();
          mapLayers[5].hide();
          mapLayers[6].hide();
          map.fitBounds(data);
        });
    }
  }

  function getZipCode(num) {
    // to set the map position to a zip code
    // zero means the first option in the select
    if (num !==0) {
      sql.getBounds("SELECT * FROM nyc_zip_codes WHERE zipcode = '{{id}}'", { id: num })
        .done(function(data){
          mapLayers[5].hide();
          mapLayers[4].hide();
          mapLayers[6].show();
          map.fitBounds(data);
        });
    }
  }

  function setupToggleListener() {
    // toggle closed class when hamburger is clicked
    $('#hamburger').on( "click", function() {
      $('#map-layers').toggleClass('hideMapLayers');
    });

  }

  function showModalonPageLoad() {
    if (!$.cookie('noIntro')) {
      location.href = "#";
      location.href = "#openModal";
      // set cookie if don't show this message is checked
      $('#toggleIntroCookie').change(function() {
        if($(this).is(":checked")) {
          $.cookie('noIntro', 'noIntro', { expires: 365, path: '/' });
        } else {
          $.removeCookie('noIntro', { path: '/' });
        }
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
    setupToggleListener();
    showModalonPageLoad();
  }

  return {
    init: init
  };

})(window, document, L, jQuery);
