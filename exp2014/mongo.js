var mongoose = require('mongoose');
var mongodb = require('mongodb');
var fs = require('fs');


//Using fs to get all files from models folders
fs.readdirSync(__dirname + '/models').forEach(function(filename){
  if (~filename.indexOf('.js')) require(__dirname + '/models/' + filename)
});

/*var uri = 'mongodb://martin:Kicassu95@ds056727.mongolab.com:56727/pubguide';
//Connecting to mongodb database
mongoose.connect(uri, function(err){
  if(err){
    console.log(err)
  } else {
    console.log("Connected to mongodb database successfully")
  }
});*/

var func = function(sok, callback){
    var pubs = mongoose.model('pubs');
    var pub = "";
      pubs.findOne({'Pub' : sok }, function(err, pubs){

        if(err){
          console.log(err);
        }
        if(pubs){
          lol = pubs.Pub;
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

    /*app.use(function(req,res,next){
        req.pub = pub;
        next();
  });*/

};

exports.func = func;
