// $N - features
// Copyright (c) 2011, Christopher Jeffrey (MIT Licensed)

// experimental version with more features and consistent arguments
// uses "this" instead of "next"

var slice = [].slice;

var $N = function() {
  var i = 0
    , fn = slice.call(arguments)
    , pending = 0
    , results = []; 
  
  var next = function() {
    if (!fn[i]) return;
    var args = slice.call(arguments);
    if (args.length && !(args[0] instanceof Error)) {
      args.unshift(undefined);
    }
    try {
      fn[i++].apply(next, args);
    } catch(e) {
      next(e);
    }
    return next;
  };
  
  next.N = function() {
    fn = fn.concat(slice.call(arguments));
    return next;
  };
  
  next.__defineGetter__('para', function() {
    pending++;
    return function() { 
      results.push(slice.call(arguments));
      --pending || next(results);
    };
  });
  
  return next; 
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = $N;
} else {
  this.$N = $N;
}