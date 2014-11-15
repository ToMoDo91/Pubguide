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
