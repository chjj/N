# $N - A flow control tool

$N is my attempt at making something similar to Step, but with less indentation 
and slightly different syntax. $N is very light-weight and small, only a few lines, 
so it is copy & pastable if need be.

## Example Usage

    $N(function(next) {
      fs.readFile('./text.txt', 'utf-8', next);
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
      })('hello'); // the same thing as calling next() when inside a stack
    })
    .N(function(next, hello) {
      console.log(hello);
      next();
    })(); // execute the chain

### Outputs:

    Some text: [whatever text]
    hello
    world
    how are you?

## More Features 

There's also an "N-features.js" file, which is something I'm experimenting with. It includes parallel calls and
consistent arguments with error handling, e.g. (err, data). I'm unsure whether I want to include these features, 
I like keeping things simple.

    $N(function() {
      fs.readFile('./text1.txt', 'utf-8', this);
    })
    .N(function(err, text) {
      if (err) {
        console.log(err); 
      } else { 
        console.log('Some text: ' + text);
      }
      this.N(function(err, results) { 
        console.log('world');
        this(results);
      }, function(err, results) { 
        console.log('how are you?');
        console.log('...even more text:', results);
      })('hello'); 
    })
    .N(function(err, hello) {
      if (err) console.log('oh no, an error:', err)
      console.log(hello);
      fs.readFile('./text2.txt', 'utf-8', this.para);
      fs.readFile('./text3.txt', 'utf-8', this.para);
    })(); 

## License

See LICENSE for more info (MIT).