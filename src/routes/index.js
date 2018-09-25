var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var apis = [{
    products : [
      { name : 'Play/Pause Music', url : "localhost:3000/music/play-pause", method : "GET"},
      { name : 'Play Music', url : "localhost:3000/music/play", method : "GET"}, 
      { name : 'Pause Music', url : "localhost:3000/music/pause", method : "GET"},
      { name : 'Next Track', url : "localhost:3000/music/next", method : "GET"},
      { name : 'Previous Track', url : "localhost:3000/music/previous", method : "GET"},
      { name : 'Increase Volume by 10%', url : "localhost:3000/music/inc-vol", method : "PUT"},
      { name : 'Decrease Volume by 10%', url : "localhost:3000/music/dec-vol", method : "PUT"}
    ]
  }];

  res.render('index', {
    title: 'Node JS Simple Restful by Irfan Maulana',
    apis: apis
  });
});



module.exports = router;
