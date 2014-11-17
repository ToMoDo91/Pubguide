var express = require('express');
var router = express.Router();
var app = express();
var fs = require('fs');
var mongoose = require('mongoose');
var mongodb = require('mongodb');
var mongo = require('../mongo')
var querystring = require("querystring");

//Using fs to get all files from models folders
fs.readdirSync(__dirname + '/../').forEach(function(filename){
  if (~filename.indexOf('.js')) require(__dirname + '/../' + filename)
});





/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});



router.get('/publiste', function(req, res) {
  var publist = new mongo.liste(function(publist){

    var xsome = 12;

    var uriString = [];
    //Tar alle puber fra publiste og konverter de til URI-format
    //Lagrer de så i egen array
    for (var i = 0; i < publist.length; i++){
      uriString[i] = querystring.stringify({pub: publist[i]});
    }

    //Plotter inn pubber og uristringen til hver enkelt pub inn i pubListe.jade-filen
    res.render('pubListe', {liste : publist, uriStr : uriString, something: xsome});
  });

});

var pubFraHtml = "";

//GET puben som er aktuell etter at funksjonen har fått en variabel fra nettsie
router.get('/pub', function(req, res) {

  //Henter pubben fra form input på selve websiden, hvis ingen er oppgitt så går siden automatisk til 'BrukBar'
  if(req.query['pub']){
    pubFraHtml = req.query['pub'];
  } else{
    pubFraHtml = "BrukBar"
  }

  console.log('Pub: ' + pubFraHtml)
  //Kaller inn funksjonen som henter database verdiene
  var pub = new mongo.func(pubFraHtml, function(pub){

    res.render('pub', { pu: pub});
  });
});


module.exports = router;
