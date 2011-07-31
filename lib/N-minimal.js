/**
 * $N - minimal version
 * Copyright (c) 2011, Christopher Jeffrey (MIT Licensed)
 */

var $N = function() {
  var i = 0
    , fn = Array.prototype.slice.call(arguments);
  var next = function n() {
    if (fn[i]) fn[i++].apply(n.N, [n].concat(fn.slice.call(arguments)));
  };
  next.N = function() {
    fn = fn.concat(fn.slice.call(arguments));
    return next;
  };
  return next;
};