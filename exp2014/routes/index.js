var express = require('express');
var router = express.Router();
var app = express();

/* GET home page. */
router.get('/index', function(req, res) {
  res.render('index', { title: 'Express' });
});
var ror = 'lol';
exports.name = ror;
app.post('/', function(req, res){
  var sok = req.body.pubss;
});




router.get('/pub', function(req, res) {
  res.render('pub', { pu: req.pub});

});


module.exports = router;
