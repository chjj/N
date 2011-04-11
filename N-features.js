// $N - flow control
// Copyright (c) 2011, Christopher Jeffrey (MIT Licensed)

// experimental version with more features and consistent arguments
// uses "this" instead of "next"

var $N = module.exports = function() {
  var cur = 0, func = Array.prototype.slice.call(arguments);
  var total = 0, called = 0, results = []; // used for .para
  var next = function next() {
    if (!func[cur]) return;
    var args = Array.prototype.slice.call(arguments);
    if (args[0] != null && !(args[0] instanceof Error)) 
      args.unshift(null);
    try {
      func[cur++].apply(next, args);
    } catch(err) {
      next(err);
    }
  };
  next.N = function() {
    func = func.concat(Array.prototype.slice.call(arguments));
    return next;
  };
  next.__defineGetter__('para', function() {
    return ++total && function() { 
      results.push(Array.prototype.slice.call(arguments));
      if ((++called) === total) {
        total = called = 0;
        next.call(null, results);
      }
    };
  });
  return next; 
};
