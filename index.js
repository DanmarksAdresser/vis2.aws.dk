"use strict";

var express = require('express')
  , kf = require('kf-getticket')
  , rp= require('request-promise');

var app = express();

console.log(__dirname);

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + "/public/index.html", function (err) {
    if (err) {
      console.log(err);
      res.status(404).end();
    }
    else {
      console.log('/');
    }
  });
});


app.get('/multi', function (req, res) {
  //console.log(req);
  res.sendFile(__dirname + "/public/multi.html", function (err) {
    if (err) {
      console.log('fejl: ' + err);
    }
    else {
      console.log('multi.html');
    }
  });
}); 

app.get('/getticket', function (req, res, next) { 
  kf.getTicket(usr,pw).then((ticket) => {
    res.status(200).send(ticket);
  })
  .catch((err) => {
    res.status(400).send('Ukendt username og password: ' + err);
  });
}); 

app.get(/.+/, function (req, res) {
  //console.log(req);
  res.sendFile(__dirname + "/public/app.html", function (err) {
    if (err) {
      console.log('fejl: ' + err);
    }
    else {
      console.log('app.html');
    }
  });
}); 

var usr= process.argv[2]
  , pw= process.argv[3]
  , port= process.argv[4];

if (!port) port= 3000;

kf.getTicket(usr,pw).then(ticket => {
  var server = app.listen(port, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('URL http://%s:%s', host, port);
  });
})
.catch(err => {
  console.log("Ukendt username og password (%s)",err);
});
