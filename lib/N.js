// $N
// Copyright (c) 2011, Christopher Jeffrey (MIT Licensed)

var slice = [].slice;

var $N = function() {
  var i = 0
    , fn = slice.call(arguments);
  
  var next = function() {
    if (!fn[i]) return;
    var args = slice.call(arguments);
    if (fn[i+1]) args.unshift(next);
    fn[i++].apply(next.N, args);
    return next;
  };
  
  next.N = function() {
    fn = fn.concat(slice.call(arguments));
    return next;
  };
  
  return next; 
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = $N;
} else {
  this.$N = $N;
}