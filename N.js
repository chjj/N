// $N - flow control
// Copyright (c) 2011, Christopher Jeffrey (MIT Licensed)

var $N = function $N() {
  var cur = 0, func = Array.prototype.slice.call(arguments);
  var next = function next() {
    if (!func[cur]) return;
    var args = Array.prototype.slice.call(arguments);
    if (func[cur+1]) args.unshift(next);
    func[cur++].apply(next.N, args);
    return next;
  };
  next.N = function() {
    func = func.concat(Array.prototype.slice.call(arguments));
    return next;
  };
  return next; 
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = $N;
} else {
  this.$N = $N;
}