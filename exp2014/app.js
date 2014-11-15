function search(){
};

exports.search = search;
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var mongodb = require('mongodb');
var bodyParser = require('body-parser');
var fs = require('fs');
var mongoosePages = require('mongoose-pages');
var mongo

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

var uri = 'mongodb://martin:Kicassu95@ds056727.mongolab.com:56727/pubguide';
//Connecting to mongodb database
mongoose.connect(uri, function(err){
  if(err){
    console.log(err)
  } else {
    console.log("Connected to mongodb database successfully")
  }
});


//Using fs to get all files from models folders
fs.readdirSync(__dirname + '/models').forEach(function(filename){
  if (~filename.indexOf('.js')) require(__dirname + '/models/' + filename)
});



search.func = function(){
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
    return pub;
    /*app.use(function(req,res,next){
        req.pub = pub;
        next();
  });*/
};

app.use('/', routes);
app.use('/users', users);




console.log('running')

var docsPerPage = 1;
var pageNumber = 2;

//Using mongoosePages plugin to paginate each doc in db
app.get('/pubs', function(req, res) {
  mongoose.model('pubs').findPaginated({}, function(err, result) {
    if (err) throw err;
    res.send(result);
  }, docsPerPage, pageNumber); // pagination options go here
});

/*app.get('/pub', function(req, res) {
  mongoose.model('pub').find(function(err, pub) {
    res.send(pub);
  });
});*/

app.get('/ror', function(req, res) {
  mongoose.model('ror').find(function(err, ror) {
    res.send(ror);
  });
});




// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
