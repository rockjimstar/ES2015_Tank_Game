/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "assets";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var canvas = exports.canvas = document.getElementById('canvas');
var ctx = exports.ctx = canvas.getContext('2d');

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _canvas = __webpack_require__(0);

var _tank = __webpack_require__(2);

var _tank2 = _interopRequireDefault(_tank);

var _mouse = __webpack_require__(4);

var _mouse2 = _interopRequireDefault(_mouse);

var _bullet = __webpack_require__(5);

var _bullet2 = _interopRequireDefault(_bullet);

var _world = __webpack_require__(6);

var _world2 = _interopRequireDefault(_world);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_canvas.canvas.width = document.body.clientWidth;
_canvas.canvas.height = document.body.clientHeight;

var world = new _world2.default(250, 0, 50, 600);
var world2 = new _world2.default(500, 0, 50, 600);
var worldObjects = [];

worldObjects.push(world);
worldObjects.push(world2);

var playerTank = new _tank2.default(_canvas.canvas.width / 2, _canvas.canvas.height / 2, 0, 0, 0, 112.5, 52.5);

var mouse = new _mouse2.default();
var bullets = [];

var setMouseOver = function setMouseOver() {
	mouse.mouseOver = true;
};

var setMouseOut = function setMouseOut() {
	mouse.mouseOver = false;
};

var setMouseMoveCordinates = function setMouseMoveCordinates(e) {
	mouse.x = e.clientX;
	mouse.y = e.clientY;
};

var setBulletCordinates = function setBulletCordinates(e) {
	//don't shoot if tank turret is up against wall.
	if (playerTank.collisionDetected) {
		return;
	}

	var bullet = new _bullet2.default(playerTank.x, playerTank.y, 3);

	bullet.setBulletVelocity(playerTank.rotation);
	bullet.moveBulletToEndOfTurret(playerTank.x, playerTank.y, playerTank.width, playerTank.rotation);

	bullets.push(bullet);
};

var bulletControl = function bulletControl() {
	bullets.map(function (thisBullet, index) {

		thisBullet.collisionDection(worldObjects);
		thisBullet.updateBulletPosition();

		if (thisBullet.ricochets > 0) {
			return thisBullet.draw();
		} else {
			bullets.splice(index, 1);
		}
	});
};

var tankControl = function tankControl() {
	if (mouse.mouseOver) {
		playerTank.setTankRotation(mouse.x, mouse.y);
		playerTank.setTankVelocity();
		playerTank.collisionDection(worldObjects);
		playerTank.updateTankPosition(mouse.x, mouse.y, mouse.radius);
	}

	playerTank.draw();
};

var gameLoop = function gameLoop() {
	_canvas.ctx.clearRect(0, 0, _canvas.canvas.width, _canvas.canvas.height);

	worldObjects.map(function (thisObject, index) {
		thisObject.draw();
	});

	bulletControl();
	tankControl();
};

var limitLoop = function limitLoop(fn, fps) {
	// Use var then = Date.now(); if you
	// don't care about targetting < IE9
	var then = new Date().getTime();

	// custom fps, otherwise fallback to 60
	fps = fps || 60;
	var interval = 1000 / fps;

	return function loop(time) {
		requestAnimationFrame(loop);

		// again, Date.now() if it's available
		var now = new Date().getTime();
		var delta = now - then;

		if (delta > interval) {
			// Update time
			// now - (delta % interval) is an improvement over just 
			// using then = now, which can end up lowering overall fps
			then = now - delta % interval;

			// call the fn
			fn();
		}
	}(0);
};

var frameRate = 60;

limitLoop(gameLoop, frameRate);

_canvas.canvas.addEventListener("mouseover", setMouseOver, false);
_canvas.canvas.addEventListener("mouseout", setMouseOut, false);

_canvas.canvas.addEventListener("mousemove", setMouseMoveCordinates, false);
_canvas.canvas.addEventListener("click", setBulletCordinates, false);

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _canvas = __webpack_require__(0);

var _tank = __webpack_require__(3);

var _tank2 = _interopRequireDefault(_tank);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Tank = function () {
	function Tank(x, y, vx, vy, rotation, width, height) {
		_classCallCheck(this, Tank);

		this._x = x;
		this._y = y;
		this._previousX = 0;
		this._previousY = 0;
		this._vx = vx;
		this._vy = vy;
		this._rotation = rotation;
		this._width = width;
		this._height = height;
		this._speed = 10;
		this._tankImage = new Image();
		this._tankImage.src = _tank2.default;
		this._collisionDetected = false;
	}

	_createClass(Tank, [{
		key: 'setTankVelocity',
		value: function setTankVelocity() {
			this._vx = Math.cos(this._rotation) * this._speed;
			this._vy = Math.sin(this._rotation) * this._speed;
		}
	}, {
		key: 'setTankRotation',
		value: function setTankRotation(mouseX, mouseY) {
			var targetX = mouseX - this._x;
			var targetY = mouseY - this._y;
			this._rotation = Math.atan2(targetY, targetX);
		}
	}, {
		key: 'updateTankPosition',
		value: function updateTankPosition(mouseX, mouseY, mouseRadius) {
			var a = this._x - mouseX;
			var b = this._y - mouseY;

			var distance = Math.sqrt(a * a + b * b);

			if (distance > mouseRadius + this._width / 2 && !this._collisionDetected) {
				this._x += this._vx;
				this._y += this._vy;
			}
		}
	}, {
		key: 'collisionDection',
		value: function collisionDection(worldObjects) {
			var frontBumperX = Math.cos(this._rotation) * (this._width / 2) + this._x;
			var frontBumperY = Math.sin(this._rotation) * (this._width / 2) + this._y;

			this._collisionDetected = false;
			var tank = this;
			//world objects detection
			worldObjects.map(function (obj, index) {
				if (frontBumperX + tank._vx > obj.x && frontBumperX + tank._vx < obj.x + obj.width && frontBumperY + tank._vy > obj.y && frontBumperY + tank._vy < obj.y + obj.height) {

					tank._collisionDetected = true;
				} else if (frontBumperX > obj.x && frontBumperX < obj.x + obj.width && frontBumperY > obj.y && frontBumperY < obj.y + obj.height) {

					tank._collisionDetected = true;
				} else if (tank._x + tank._vx > obj.x && tank._x + tank._vx < obj.x + obj.width && tank._y + tank._vy > obj.y && tank._y + tank._vy < obj.y + obj.height) {

					tank._collisionDetected = true;
				}
			});
		}
	}, {
		key: 'draw',
		value: function draw() {
			_canvas.ctx.save();

			_canvas.ctx.translate(this._x, this._y);
			_canvas.ctx.rotate(this._rotation);

			_canvas.ctx.beginPath();
			_canvas.ctx.drawImage(this._tankImage, -this._width / 2, -this._height / 2, this._width, this._height);
			_canvas.ctx.fill();
			_canvas.ctx.closePath();

			_canvas.ctx.restore();
		}
	}, {
		key: 'x',
		set: function set(x) {
			this._x = x;
		},
		get: function get() {
			return this._x;
		}
	}, {
		key: 'y',
		set: function set(y) {
			this._y = y;
		},
		get: function get() {
			return this._y;
		}
	}, {
		key: 'rotation',
		get: function get() {
			return this._rotation;
		}
	}, {
		key: 'height',
		get: function get() {
			return this._height;
		}
	}, {
		key: 'width',
		get: function get() {
			return this._width;
		}
	}, {
		key: 'collisionDetected',
		get: function get() {
			return this._collisionDetected;
		}
	}]);

	return Tank;
}();

exports.default = Tank;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "c2954da5d08a0e5c54eb4cc7eaf565a4.png";

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Mouse = function () {
	function Mouse() {
		_classCallCheck(this, Mouse);

		this._x = 0;
		this._y = 0;
		this._radius = 2;
		this._mouseOver = false;
	}

	_createClass(Mouse, [{
		key: "x",
		set: function set(x) {
			this._x = x;
		},
		get: function get() {
			return this._x;
		}
	}, {
		key: "y",
		set: function set(y) {
			this._y = y;
		},
		get: function get() {
			return this._y;
		}
	}, {
		key: "mouseOver",
		set: function set(mouseOver) {
			this._mouseOver = mouseOver;
		},
		get: function get() {
			return this._mouseOver;
		}
	}, {
		key: "radius",
		get: function get() {
			return this._radius;
		}
	}]);

	return Mouse;
}();

exports.default = Mouse;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _canvas = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Bullet = function () {
	function Bullet(x, y, radius) {
		_classCallCheck(this, Bullet);

		this._x = x;
		this._y = y;
		this._vx = 0;
		this._vy = 0;
		this._radius = radius;
		this._speed = 20;
		this._ricochets = 3;
	}

	_createClass(Bullet, [{
		key: 'setBulletVelocity',
		value: function setBulletVelocity(tankRotation) {
			this._vx = Math.cos(tankRotation) * this._speed;
			this._vy = Math.sin(tankRotation) * this._speed;
		}
	}, {
		key: 'moveBulletToEndOfTurret',
		value: function moveBulletToEndOfTurret(tankX, tankY, tankWidth, tankRotation) {
			this._x = Math.cos(tankRotation) * (tankWidth / 2) + tankX;
			this._y = Math.sin(tankRotation) * (tankWidth / 2) + tankY;
		}
	}, {
		key: 'updateBulletPosition',
		value: function updateBulletPosition() {
			this._x += this._vx;
			this._y += this._vy;
		}
	}, {
		key: 'collisionDection',
		value: function collisionDection(worldObjects) {
			//canvas edges detection
			if (this._y > _canvas.canvas.height - this._radius || this._y < this._radius) {
				this._vy = -this._vy;
				this._ricochets--;
			} else if (this._x > _canvas.canvas.width - this._radius || this._x < this._radius) {
				this._vx = -this._vx;
				this._ricochets--;
			}

			var bullet = this;
			//world objects detection
			worldObjects.map(function (obj, index) {
				if (bullet._x + bullet._vx > obj.x && bullet._x + bullet._vx < obj.x + obj.width && bullet._y > obj.y && bullet._y < obj.y + obj.height) {
					bullet._vx = -bullet._vx;
					bullet._ricochets--;
				} else if (bullet._y + bullet._vy > obj.y && bullet._y + bullet._vy < obj.y + obj.height && bullet._x > obj.x && bullet._x < obj.x + obj.width) {
					bullet._vy = -bullet._vy;
					bullet._ricochets--;
				}
			});
		}
	}, {
		key: 'draw',
		value: function draw() {
			_canvas.ctx.save();

			_canvas.ctx.beginPath();
			_canvas.ctx.arc(this._x, this._y, this._radius, 0, Math.PI * 2, true);
			_canvas.ctx.fillStyle = 'red';
			_canvas.ctx.fill();
			_canvas.ctx.closePath();

			_canvas.ctx.restore();
		}
	}, {
		key: 'x',
		set: function set(x) {
			this._x = x;
		},
		get: function get() {
			return this._x;
		}
	}, {
		key: 'y',
		set: function set(y) {
			this._y = y;
		},
		get: function get() {
			return this._y;
		}
	}, {
		key: 'ricochets',
		set: function set(ricochets) {
			this._ricochets = ricochets;
		},
		get: function get() {
			return this._ricochets;
		}
	}, {
		key: 'radius',
		get: function get() {
			return this._radius;
		}
	}]);

	return Bullet;
}();

exports.default = Bullet;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _canvas = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var World = function () {
	function World(x, y, width, height) {
		_classCallCheck(this, World);

		this._x = x;
		this._y = y;
		this._width = width;
		this._height = height;
	}

	_createClass(World, [{
		key: 'draw',
		value: function draw() {
			_canvas.ctx.save();

			_canvas.ctx.beginPath();

			_canvas.ctx.rect(this._x, this._y, this._width, this._height);
			_canvas.ctx.stroke();

			_canvas.ctx.closePath();

			_canvas.ctx.restore();
		}
	}, {
		key: 'x',
		get: function get() {
			return this._x;
		}
	}, {
		key: 'y',
		get: function get() {
			return this._y;
		}
	}, {
		key: 'height',
		get: function get() {
			return this._height;
		}
	}, {
		key: 'width',
		get: function get() {
			return this._width;
		}
	}]);

	return World;
}();

exports.default = World;

/***/ })
/******/ ]);