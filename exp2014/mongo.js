var mongoose = require('mongoose');
var mongodb = require('mongodb')
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
        publist[i] = {
          pub: pubs.Pub,
          type: pubs.Type,
          alder: pubs.Aldersgrense,
          bilde: pubs.Bilder
        };
        i++;

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
            dive: pubs.Diverse,
            bilde: pubs.Bilder,
            rate: pubs.rate,
            votes: pubs.votes

        };
        callback(pub);
      };
    });
};


var search = function(tag, callback){
  pubs.find({}, function(err, pubs){
    var puben = [];
    var i = 0;
    if(err){
      console.log(err);
    }
    if(pubs){
      pubs.forEach(function(pubs){
        puben[i] = {
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
          dive: pubs.Diverse,
          bilde: pubs.Bilder
        };
        i++;
      });

    };

    var puber = [];
    for (var z = 0; z < puben.length; z++){
      puber[z] = [
        puben[z].pub,
        puben[z].alder,
        puben[z].type,
        puben[z].adresse,
        puben[z].kles,
        puben[z].inngang,
        puben[z].dive
      ];
    }

    var o = 0;
    var pubFunnet = [];
    for (var j = 0; j < puben.length; j++){
      for(var x = 0; x < puber[j].length; x++){
        if (puber[j][x].toLowerCase().indexOf(tag.toLowerCase()) > -1){
          console.log('Det funke')

          pubFunnet[o] = puben[j];
          x=11;
          o++;
        } else {
          //console.log('Det funke ike')
        }
      }
    }
    callback(pubFunnet);
  });
};









exports.func = func;
exports.liste = liste;
exports.search = search;
