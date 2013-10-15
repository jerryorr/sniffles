var express = require('express')
  , data = require('./lib/data')
  , _ = require('lodash')

var app = express()

app.get('/', function(req, res){
  var options = {}

  if (req.query.region) {
    options.regions = _.isArray(req.query.region) ? req.query.region : [req.query.region]
  }

  res.setHeader('Content-Type', 'text/csv')

  data(options)
    .on('data', function (data) {
      res.write(data)
      res.write('\n')
    })
    .on('end', function (data) {
      res.end()
    })
    .on('error', function (err) {
      console.log('error: ', error)
    })
})

var port = process.env.PORT || 5000
app.listen(port)
console.log('Listening on port ' + port)