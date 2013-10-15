// A filter that cleans out the header content in the Google Flu Trends data,
// returning just the CSV part

var stream = require('stream')
  , util = require('util')

function CleanIntro(options) {
  stream.Transform.call(this, options)
}

util.inherits(CleanIntro, stream.Transform)

CleanIntro.prototype._transform = function (chunk, enc, cb) {
  if (this.readingData) {
    this.push(chunk, enc)
  } else {
    // Ignore all text until we find a line beginning with 'Date,''
    var start = chunk.toString().search(/^Date,/m)
    if (start !== -1) {
      this.readingData = true
      this.push(chunk.slice(start), enc)
    }
  }
  cb()
}

module.exports = CleanIntro