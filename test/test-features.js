var fs = require('fs');

var $N = require('../lib/N-features');

$N(function() {
  fs.readFile('./log1.txt', 'utf8', this);
})
.N(function(err, text) {
  if (err) {
    console.log(err);
  } else {
    console.log('Some text: ' + text);
  }
  this.N(
    // you can even push
    // more functions onto the stack!
    function(err, results) {
      console.log('world');
      this(results);
    },
    // you can pass multiple args if
    // you want to use it like Step
    function(err, results) {
      console.log('how are you?');
      console.log('...even more text:', results);
    }
  )('hello');
})
.N(function(err, hello) {
  if (err) console.log('oh no, an error:', err)
  console.log(hello);
  fs.readFile('./log2.txt', 'utf8', this.para);
  fs.readFile('./log3.txt', 'utf8', this.para);
})();