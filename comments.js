// Create web server
var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');

// Create a variable to store the data
var comments = [];

// Read comments from file
fs.readFile(path.join(__dirname, 'comments.json'), 'utf8', function(err, data) {
  if (err) {
    console.log(err);
  }
  else {
    comments = JSON.parse(data);
  }
});

// Create a route to get comments
router.get('/', function(req, res) {
  res.json(comments);
});

// Create a route to add comments
router.post('/', function(req, res) {
  comments.push(req.body);
  fs.writeFile(path.join(__dirname, 'comments.json'), JSON.stringify(comments), function(err) {
    if (err) {
      console.log(err);
    }
  });
  res.json(comments);
});

// Export the router
module.exports = router;
