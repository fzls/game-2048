// Generated by CoffeeScript 1.7.1
(function() {
  define(['data', 'transform', 'three'], function(Data, Transform) {
    var Shapes, random, vector;
    Shapes = {};
    random = function(scale) {
      if (scale) {
        return scale * (Math.random() - 0.5);
      } else {
        return Math.random() - 0.5;
      }
    };
    vector = new THREE.Vector3();
    Shapes.getTargets = function(shape) {
      var a, b, c, i, length, object, r, scale, targets, theta, width, _i, _j, _k, _l;
      width = Data.numberPerLine;
      length = width * width;
      targets = [];
      if (shape === 'random') {
        for (i = _i = 0; 0 <= length ? _i < length : _i > length; i = 0 <= length ? ++_i : --_i) {
          object = new THREE.Object3D();
          scale = 1600;
          object.position.x = random(scale);
          object.position.y = random(scale);
          object.position.z = random(scale);
          vector.x = random(scale);
          vector.y = random(scale);
          vector.z = random(scale);
          object.lookAt(vector);
          targets.push(object);
        }
      }
      if (shape === 'cone') {
        for (i = _j = 1; 1 <= length ? _j <= length : _j >= length; i = 1 <= length ? ++_j : --_j) {
          object = new THREE.Object3D();
          a = 20;
          b = 50;
          c = 50;
          r = a * i;
          theta = b * i;
          object.position.x = r * Math.cos(theta);
          object.position.y = r * Math.sin(theta);
          object.position.z = c * i - 800;
          vector.x = 0;
          vector.y = 0;
          vector.z = object.position.z + 2 * i;
          object.lookAt(vector);
          targets.push(object);
        }
      }
      if (shape === 'board') {
        for (a = _k = 1; 1 <= width ? _k <= width : _k >= width; a = 1 <= width ? ++_k : --_k) {
          for (b = _l = 1; 1 <= width ? _l <= width : _l >= width; b = 1 <= width ? ++_l : --_l) {
            object = new THREE.Object3D();
            object.position.x = Transform.getPositionX(a);
            object.position.y = Transform.getPositionY(b);
            object.position.z = 0;
            vector.x = object.position.x;
            vector.y = object.position.y;
            vector.z = object.position.z + 1;
            object.lookAt(vector);
            targets.push(object);
          }
        }
      }
      return targets;
    };
    return Shapes;
  });

}).call(this);

//# sourceMappingURL=shapes.map
