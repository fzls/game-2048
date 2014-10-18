// Generated by CoffeeScript 1.8.0
(function() {
  define(['transform', 'element', 'data'], function(Transform, Ele, Data) {
    var GameLogic, gameLogic, proto;
    GameLogic = function() {
      return this.init();
    };
    proto = GameLogic.prototype;
    proto.init = function() {
      return this.numberPerLine = Data.numberPerLine;
    };
    proto.getTargets = function(objects, direction) {
      var lines, targetArr, targetLines;
      targetLines = [];
      lines = this.arrToLines(objects, direction);
      lines.forEach((function(_this) {
        return function(lineOfObjects, I, A) {
          var targetLine;
          targetLine = _this.lineCompile(lineOfObjects);
          return targetLines.push(targetLine);
        };
      })(this));
      targetArr = this.linesToArr(direction, targetLines);
      targetArr.forEach((function(_this) {
        return function(object, i, a) {
          var obj;
          if (object !== void 0) {
            obj = {};
            obj.position = {};
            if (direction === 'left') {
              obj.position.x = Transform.getPositionX(object.pos + 1);
              obj.position.y = object.position.y;
            }
            if (direction === 'right') {
              obj.position.x = Transform.getPositionX(_this.numberPerLine - object.pos);
              obj.position.y = object.position.y;
            }
            if (direction === 'down') {
              obj.position.y = Transform.getPositionY(object.pos + 1);
              obj.position.x = object.position.x;
            }
            if (direction === 'up') {
              obj.position.y = Transform.getPositionY(_this.numberPerLine - object.pos);
              obj.position.x = object.position.x;
            }
            return targetArr[i] = obj;
          }
        };
      })(this));
      return targetArr;
    };
    proto.lineCompile = function(array) {
      var arr, compile, filledArr, filledlength, i, killLine, targetLine, _i, _len;
      killLine = [];
      filledArr = array.filter(function(object) {
        return object !== void 0;
      });
      filledlength = filledArr.length;
      compile = (function(_this) {
        return function(i, pos, targetArr) {
          var n;
          n = i + 1;
          if (i === filledlength) {
            return targetArr;
          } else if (i + 1 === filledlength) {
            targetArr.push(pos);
            return compile(i + 1, pos + 1, targetArr);
          } else if (filledArr[i].power === filledArr[n].power) {
            killLine.push(i, i + 1);
            targetArr.push(pos, pos);
            return compile(i + 2, pos + 1, targetArr);
          } else {
            targetArr.push(pos);
            return compile(i + 1, pos + 1, targetArr);
          }
        };
      })(this);
      arr = compile(0, 0, []);
      for (_i = 0, _len = killLine.length; _i < _len; _i++) {
        i = killLine[_i];
        filledArr[i].kill = true;
      }
      targetLine = [];
      array.forEach(function(object, i) {
        if (object) {
          return object.pos = arr.shift();
        }
      });
      return array;
    };
    proto.arrToLines = function(objects, direction) {
      var lines, _i, _ref, _results;
      lines = [];
      (function() {
        _results = [];
        for (var _i = 1, _ref = this.numberPerLine; 1 <= _ref ? _i <= _ref : _i >= _ref; 1 <= _ref ? _i++ : _i--){ _results.push(_i); }
        return _results;
      }).apply(this).forEach((function(_this) {
        return function(a) {
          var line, _i, _ref, _results;
          line = [];
          (function() {
            _results = [];
            for (var _i = 1, _ref = _this.numberPerLine; 1 <= _ref ? _i <= _ref : _i >= _ref; 1 <= _ref ? _i++ : _i--){ _results.push(_i); }
            return _results;
          }).apply(this).forEach(function(b) {
            var i;
            if (direction === 'right' || direction === 'left') {
              i = Transform.getIndex(b, a);
            }
            if (direction === 'up' || direction === 'down') {
              i = Transform.getIndex(a, b);
            }
            return line.push(objects[i]);
          });
          if (direction === 'up' || direction === 'right') {
            line.reverse();
          }
          return lines.push(line);
        };
      })(this));
      return lines;
    };
    proto.linesToArr = function(direction, lines) {
      var targets, _i, _ref, _results;
      targets = [];
      (function() {
        _results = [];
        for (var _i = 0, _ref = this.numberPerLine; 0 <= _ref ? _i < _ref : _i > _ref; 0 <= _ref ? _i++ : _i--){ _results.push(_i); }
        return _results;
      }).apply(this).forEach((function(_this) {
        return function(a) {
          var _i, _ref, _results;
          return (function() {
            _results = [];
            for (var _i = 0, _ref = _this.numberPerLine; 0 <= _ref ? _i < _ref : _i > _ref; 0 <= _ref ? _i++ : _i--){ _results.push(_i); }
            return _results;
          }).apply(this).forEach(function(b) {
            var object, y;
            if (direction === 'left') {
              object = lines[a][b];
            }
            if (direction === 'right') {
              y = _this.numberPerLine - 1 - b;
              object = lines[a][y];
            }
            if (direction === 'down') {
              object = lines[b][a];
            }
            if (direction === 'up') {
              y = _this.numberPerLine - 1 - a;
              object = lines[b][y];
            }
            return targets.push(object);
          });
        };
      })(this));
      return targets;
    };
    return gameLogic = new GameLogic();
  });

}).call(this);


//# sourceMappingURL=gameLogic.js.map
