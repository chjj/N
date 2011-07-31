var fs = require('fs');

var $N = require('../');

$N(function(next) {
  fs.readFile('./log.txt', 'utf8', next);
})
.N(function(next, err, txt) {
  if (err) {
    console.log(err.message);
  } else {
    console.log('Some text: ' + txt);
  }
  next.N(
    // you can even push
    // more functions onto the stack!
    function(next) {
      console.log('world');
      next();
    },
    // you can pass multiple args if
    // you want to use it like Step
    function() {
      console.log('how are you?');
    }
  )('hello');
})
.N(function(next, hello) {
  console.log(hello);
  next();
})();