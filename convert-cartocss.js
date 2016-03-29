// This script converts .mss cartocss files into strings to be consumed by cartodb.js
var fs = require('fs');
var indir = './app/assets/cartocss/';
var outdir = './app/assets/js/'
var mssFiles;
var cartoStrings = {};

/*
    Process:
    1. Read files from mss/
    2. convert each file contents to concatenated string
    3. assign each cartocss string to a key in an {}
    4. write object to a .js outfile
*/

function readdir() {
  fs.readdir(indir, function(err,files){
    if (err) return console.error(err);
    mssFiles = files;
    console.log(mssFiles);
    iterateFiles();
  });
}

function iterateFiles() {
  mssFiles.forEach(function(file,i,arr){
    
    fs.readFile(indir + file, 'utf8', function(err, contents) {
      if (err) return console.error(err);

      convertString(file, contents);

      if (i === mssFiles.length -1 ){
        writeJSON();
      }      

    });
  });
}

function convertString(file, data) {
  file = file.replace('.mss','');
  var x = data.split('\n').join('').replace(/ /g,'').replace(/\t/g, '');
  cartoStrings[file] = x;
  console.log(x); 
}

function writeJSON() {
  var data = JSON.stringify(cartoStrings);  
  var js = "var app = app || {} \n\napp.cartocss = (function(){ \n  return " + data + ";\n})();";

  fs.writeFile(outdir + 'carto.js', js,  function(err){
    if (err) throw err;
    console.log('success!');
  });  
}

readdir();