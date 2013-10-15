var request = require('request')
  , csv = require('csv-stream')
  , util = require('util')
  , _ = require('lodash')
  , moment = require('moment')
  , OutStream = require('./out-stream')
  , CleanIntroFilter = require('./clean-intro-filter')

// Returns a Stream that emits CSV records from Google Flu Trends.
// options:
//   - regions: an array of regions for which data should be generated.
//     See http://www.google.org/flutrends/us/data.txt for possible values
module.exports = function (options) {
  options = _.extend({
    regions: ['United States']
  }, options)

  var out = new OutStream()
  out.write('Date,' + options.regions.join())

  var earliest = moment().subtract('years', 1)

  request('http://www.google.org/flutrends/us/data.txt')
    .pipe(new CleanIntroFilter())
    .pipe(csv.createStream({}))
    .on('error',function(err){
        out.emit('error', err)
    })
    .on('data',function(data) {
      var date = moment(data.Date)

      // Only return data from the past year
      if (date.isAfter(earliest) || date.isSame(earliest)) {
        out.write(data.Date + ',' + _.map(options.regions, function (region) {
          return data[region]
        }).join())
      }
    })
    .on('end', function () {
      out.end()
    })

  return out
}