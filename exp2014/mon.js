var fs = require('fs');
var mongoose = require('mongoose');
var mongodb = require('mongodb');
var app = express();


//Connecting to mongodb database at mongolab
var uri = 'mongodb://martin:Kicassu95@ds056727.mongolab.com:56727/pubguide';
mongoose.connect(uri);

//Using fs to get all files from models folders
fs.readdirSync(__dirname + '/models').forEach(function(filename){
  if (~filename.indexOf('.js')) require(__dirname + '/models/' + filename)
});

exports.search = function search(søk){
  var pubs = mongoose.model('pubs');
  var pub = "";
  var søk = "BrukBar";
    pubs.findOne({'Pub' : søk }, function(err, pubs){
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
    };
  });
  search("BrukBar");
  app.use(function(req,res,next){
      req.pub = pub;
      next();
});
return pub;
};
