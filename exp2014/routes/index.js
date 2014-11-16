var express = require('express');
var router = express.Router();
var app = express();
var fs = require('fs');
var mongoose = require('mongoose');
var mongodb = require('mongodb');
var some = require('../mongo')

//Using fs to get all files from models folders
fs.readdirSync(__dirname + '/../').forEach(function(filename){
  if (~filename.indexOf('.js')) require(__dirname + '/../' + filename)
});




/* GET home page. */
router.get('/index', function(req, res) {
  res.render('index', { title: 'Express' });
});

var ror = "";

router.get('/publiste', function(req, res) {
  var publist = new some.liste(function(publist){
    console.log(publist)
    res.render('pubListe', {liste : publist});
  });

});

//GET puben som er aktuell etter at funksjonen har fått en variabel fra nettsie
router.get('/pub', function(req, res) {

  if(req.query['pub']){
    ror = req.query['pub'];
  } else{
    ror = "BrukBar"
  }

  console.log('Pub: ' + ror)

  var pub = new some.func(ror, function(pub){

    res.render('pub', { pu: pub});
  });
});


module.exports = router;
