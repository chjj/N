// $N - flow control
// Copyright (c) 2011, Christopher Jeffrey (MIT Licensed)

var $N = module.exports = function() {
  var cur = 0, func = Array.prototype.slice.call(arguments);
  var exec = function next() {
    if (!func[cur]) return;
    var args = Array.prototype.slice.call(arguments);
    if (func[cur+1]) args.unshift(next);
    func[cur++].apply(next.N, args);
  };
  exec.N = function() {
    func = func.concat(Array.prototype.slice.call(arguments));
    return exec;
  };
  return exec; 
};