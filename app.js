var express = require("express");
var app = express();
var path = require('path');
var data = require('./server/public/data/data');
var bodyParser = require('body-parser');
var pg = require('pg');

var connectionString = '';
if(process.env.DATABASE_URL != undefined) {
    connectionString = process.env.DATABASE_URL + 'ssl';
} else {
    connectionString = 'postgres://localhost:5432/pet_finder';
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/favorite', function(req,res,next){
  var results = [];
  pg.connect(connectionString, function(err, client, done) {
    var query = client.query('SELECT * FROM favorite');

    query.on('row', function(row) {
      results.push(row);
    });
    query.on('end', function() {
      done();
      return res.json(results);
    });

    if(err) {
      console.log(err);
    }
  });
});

app.get('/count', function(req,res,next){
  var count = 0;
  pg.connect(connectionString, function(err, client, done) {
    var query = client.query('SELECT COUNT(*) FROM favorite');

    query.on('row', function(row) {
      count = row.count;
    });
    query.on('end', function() {
      done();
      return res.send(count);
    });

    if(err) {
      console.log(err);
    }
  });
});

app.post('/favorite', function (req, res, next) {
  var animal = {
    id: req.body.id,
    type: req.body.type,
    name: req.body.name,
    photoUrl: req.body.photoUrl,
    description: req.body.description
  };

  pg.connect(connectionString, function(err, client, done) {
    client.query("INSERT INTO favorite (id, type, name, photourl, description) VALUES ($1, $2, $3, $4, $5) RETURNING id",

      [animal.id, animal.type, animal.name, animal.photoUrl, animal.description.substring(0, 100)],
      function (err, result) {
        done();

        if(err) {
          console.log('Error inserting data: ', err);
          res.send(result);
        } else {
          res.send(err);
        }
      });
  });
});

app.get("/*", function(req,res,next){
  var file = req.params[0] || "views/index.html";
  res.sendFile(path.join(__dirname, "./server/public/", file))
});

app.set("port", process.env.PORT || 5000);

app.listen(app.get("port"), function(req,res,next){
    console.log("Listening on port: " + app.get("port"));
});

console.log(app._router.stack);

module.exports = app;