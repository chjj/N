var fs = require('fs');

var $N = require('../N');

$N(function(next) {
  fs.readFile('./log.txt', 'utf-8', next);
})
.N(function(next, err, txt) {
  if (err) {
    console.log(err.message); 
  } else { 
    console.log('Some text: ' + txt);
  }
  next.N(function(next) { // you can even push more functions onto the stack!
    console.log('world');
    next();
  }, function() { // you can pass multiple args if you want to use it like Step
    console.log('how are you?');
  })('hello'); // the same thing as calling next() when inside a stack, the .N() func returns "next"
})
.N(function(next, hello) {
  console.log(hello);
  next();
})(); // execute the chain