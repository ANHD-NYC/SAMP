# ANHD DAP MAP
Developed by the [Association For Neighborhood and Housing Development, Inc.
(ANHD)](http://www.anhd.org), the Displacement Alert Project (DAP) is to
be an important new organizing, advocacy, and policy development tool that provides
crucial information about recent building transactions where tenants might be facing
excessive displacement pressure.

## Dependencies
- [CartoDB](http://cartodb.com) paid account
- [CartoDB.JS](https://github.com/CartoDB/cartodb.js/) @3.15
- [CartoDB Named Maps API](http://docs.cartodb.com/cartodb-platform/maps-api/named-maps/) @v1
- [Leaflet.JS](http://leafletjs.com) @0.7.7
- [jQuery](#) @latest (currently used for prototype app)

## Installing
...

## Working With CartoDB's Named Maps API
**Named Maps** are what you use to can create interactive maps from private tables
in CartoDB. Most of the time maps made with CartoDB.JS use public tables. However,
with a paid account you have the option to make custom mapping applications using
your private tables. The following describes how this process works.

The following commands are intended to be run on the command line but could also
be run using an app like Postman. Replace `{anhd-api-key}` with the actual API key
found in the CartoDB account.

### Creating a named map
Requires using a config file, here it's called `template.json`, see the example
in the repo.

```bash
curl -X POST \
   -H 'Content-Type: application/json' \
   -d @template.json \
   'https://anhdnyc.cartodb.com/api/v1/map/named?api_key={anhd-api-key}'

# response to the above POST should look like:
{"template_id":"samp_test”}
```

### Instantiating the Named Map
We actually don’t need to do this by making an API call for our use case as we
instantiate it with the `cartodb.createLayer()` method which is passed a Named Map
`layerSource` config object in the client.

If you'd like to do this via an API call then you would need to pass a `params.json`
file containing values for `placeholders` in the config file. If you don't want to
override the default values, just have an empty object in `params.json` when making
the API call.

Sample API call:

```bash
curl -X POST \
  -H 'Content-Type: application/json' \
  -d @params.json \
  'https://anhdnyc.cartodb.com/api/v1/map/named/samp_test'

# sample response:
# "layergroupid":"anhdnyc@3ce3cc8d@d18b4ae3f34028a99ea3db066a60a612:1459188148983"
# "last_updated":"2016-03-28T18:02:28.983Z"
```

Use the value for `layergroupid` to fetch the map tiles. The tile URL would then look like:  
`https://anhdnyc.cartodb.com/api/v1/map/anhdnyc@3ce3cc8d@d18b4ae3f34028a99ea3db066a60a612:1459188148983/{z}/{x}/{y}.png`

### Updating a named map
Say you decide to make changes to the Named Map such as SQL, CartoCSS, placeholders, etc.
Use a `PUT` action to modify it with the updated config file. Note that the the value for
`name` from the config file must be the same as on the query string to the API call.

```bash
curl -X PUT \
  'https://anhdnyc.cartodb.com/api/v1/map/named/samp_test?api_key={anhd-api-key}' \
  -H 'Content-Type: application/json' \
  -d @template.json

# response to the above PUT should look like:  
# {"template_id":"samp_test"}
```

### Deleting a named map
```bash
curl -X DELETE 'https://anhdnyc.cartodb.com/api/v1/map/named/some_named_map?api_key={anhd-api-key}'
```
### Reference
See the following links for more info on Named Maps as well as some examples using
Named Maps with CartoDB.JS:  
- http://docs.cartodb.com/tutorials/named_maps/
- http://docs.cartodb.com/cartodb-platform/maps-api/named-maps/#placeholder-format
- http://bl.ocks.org/oriolbx/d8e6b71a2417b41c0e20
- http://bl.ocks.org/oriolbx/688c63b865e7045e9f90

## Compiling the CartoCSS
To make it easier to update CartoCSS in the app, individual `.mss` files for each
layer are stored in `app/assets/cartocss`. A Node.JS script, `convert-cartocss.js`,
concatenates these separate files into a single javascript file which can be used by
the app.

To run the script, make sure you have Node.JS installed and then do:  
`node convert-cartocss.js`

If all goes well it will create the file `carto.js` in `app/js`.

**NOTE:** Currently the script does not ignore `font-family` names, so you will
need to change a font name like "DejaVuSansBook" to "DejaVu Sans Book" after running
the script. Otherwise CartoDB won't recognize the font name and the CartoCSS will
break without warning.
