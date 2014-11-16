var mongoose = require('mongoose');
var mongodb = require('mongodb');
var fs = require('fs');


//Using fs to get all files from models folders
fs.readdirSync(__dirname + '/models').forEach(function(filename){
  if (~filename.indexOf('.js')) require(__dirname + '/models/' + filename)
});

var uri = 'mongodb://martin:Kicassu95@ds056727.mongolab.com:56727/pubguide';
//Connecting to mongodb database
mongoose.connect(uri, function(err){
  if(err){
    console.log(err)
  } else {
    console.log("Connected to mongodb database successfully")
  }
});

var pubs = mongoose.model('pubs');

var liste = function(callback){

  var pub = "";
    pubs.find({}, function(err, pubs){
      var publist = [];
      var i = 0;

      if(err){
        console.log(err);
      }
      if(pubs){
        pubs.forEach(function(pubs){
        publist[i] = pubs.Pub;
        i++;
        console.log(pubs.Pub)
      });

        callback(publist);
      };
    });
};

var func = function(sok, callback){

    var pub = "";
      pubs.findOne({'Pub' : sok }, function(err, pubs){

        if(err){
          console.log(err);
        }
        if(pubs){

          pub = {
            pub: pubs.Pub,
            alder: pubs.Aldersgrense,
            apning: pubs.Apningstider,
            hjemme: pubs.Hjemmside,
            type: pubs.Type,
            adresse: pubs.Adresse,
            tlf: pubs.Tlf,
            mail: pubs.Mail,
            kles: pubs.Kleskode,
            inngang: pubs.Inngangspris,
            dive: pubs.Diverse

        };
        callback(pub);
      };
    });
};

exports.func = func;
exports.liste = liste;
