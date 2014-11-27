var express = require('express');
var router = express.Router();
var app = express();
var fs = require('fs');
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

router.get('/test', function(req, res) {
  res.render('test', { title: 'Test' });
});

router.get('/publiste', function(req, res) {

  var publist = new mongo.liste(function(publist){

    var uriString = [];
    //Tar alle puber fra publiste og konverter de til URI-format
    //Lagrer de så i egen array
    for (var i = 0; i < publist.length; i++){
      uriString[i] = querystring.stringify({pub: publist[i].pub});
    }

    //Plotter inn pubber og uristringen til hver enkelt pub inn i pubListe.jade-filen
    res.render('pubListe', {liste : publist, uriStr : uriString});
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

  if(req.query['rating']){
    console.log(req.query['rating'])
  }

  console.log('Pub: ' + pubFraHtml)
  //Kaller inn funksjonen som henter database verdiene
  var pub = new mongo.func(pubFraHtml, function(pub){

    res.render('pub', { pu: pub});
  });
});

router.get('/pubSok', function(req, res) {
  var pubsok = '';
  if(req.query['sok']){
    pubSok = req.query['sok'];
  } else{
    pubSok = "BrukBar"
  }

  var tag = new mongo.search(pubSok, function(tag){

    var uriString = [];
    //Tar alle puber fra publiste og konverter de til URI-format
    //Lagrer de så i egen array
    for (var i = 0; i < tag.length; i++){
      uriString[i] = querystring.stringify({pub: tag[i].pub});
    }

    //Plotter inn pubber og uristringen til hver enkelt pub inn i pubListe.jade-filen
    res.render('pubSok', {liste : tag, uriStr : uriString, lengde : tag.length});
    console.log(tag.length)
  });

});
module.exports = router;
