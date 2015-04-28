/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	var _mapObj$callIfFunction$throwError = __webpack_require__(2);

	var _reducePaths$navigatePath = __webpack_require__(3);

	var _getCursorFns = __webpack_require__(4);

	'use strict';

	exports['default'] = {
		mapObj: _mapObj$callIfFunction$throwError.mapObj,
		callIfFunction: _mapObj$callIfFunction$throwError.callIfFunction,
		throwError: _mapObj$callIfFunction$throwError.throwError,
		reducePaths: _reducePaths$navigatePath.reducePaths,
		navigatePath: _reducePaths$navigatePath.navigatePath,
		getCursorFns: _getCursorFns.getCursorFns
	};
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	'use strict';

	exports['default'] = {
		mapObj: function mapObj(obj, fn) {
			return Object.keys(obj).reduce(function (acc, key) {
				acc[key] = fn(obj[key], key);
				return acc;
			}, {});
		},

		callIfFunction: function callIfFunction(obj) {
			for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
				args[_key - 1] = arguments[_key];
			}

			return typeof obj === 'function' ? obj.apply(undefined, args) : obj;
		},

		throwError: function throwError(err) {
			throw new Error(err);
		}
	};
	module.exports = exports['default'];

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	var _mapObj = __webpack_require__(2);

	'use strict';

	exports['default'] = {
		reducePaths: function reducePaths(paths, tree, desc, getFn) {
			var _this = this;

			// dont get rekt
			if (!paths) {
				return {};
			}if (!tree) throw new Error('No ' + desc + 's have been passed to your root component');

			// return a map of each path through the tree
			return _mapObj.mapObj(paths, function (val) {
				return _this.navigatePath(val, tree, desc, getFn);
			});
		},

		navigatePath: function navigatePath(path, tree, desc, getFn) {
			return pathAsArray(path).reduce(function (obj, key) {
				// if we have been given a getter then use it, otherwise treat as an object
				var value = obj && (getFn ? getFn(obj, key) : obj[key]);

				// return null if not found
				return !obj || value === undefined ? null : value;
			}, tree);
		}
	};

	var pathAsArray = function pathAsArray(path) {
		return path.constructor === Array ? path : path.split('.');
	};
	module.exports = exports['default'];

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	'use strict';

	exports['default'] = {
		getCursorFns: function getCursorFns(cursor) {
			switch (cursor.constructor.name) {
				case 'Cortex':
					return cursorFns.cortex;
				case 'Baobab':
					return cursorFns.baobab;
				default:
					return cursorFns['default'];
			}
		}
	};

	// define api for different tree implementations
	var cursorFns = {
		cortex: {
			get: function get(x, key) {
				return x[key];
			},
			value: function value(x) {
				return x.val();
			}
		},
		baobab: {
			get: function get(x, key) {
				return x.select(key);
			},
			value: function value(x) {
				return x.get();
			},
			on: function on(x, cb) {
				return x.on('update', cb);
			},
			off: function off(x, cb) {
				return x.off('update', cb);
			}
		},
		// immstruct: {
		// 	get: (x, key) => x.cursor(key),
		// 	value: x => x.deref(),
		// 	on: (x, cb) => x.on('swap', cb),
		// 	off: (x, cb) => x.off('swap', cb)
		// },
		// reactCursor: {
		// 	get: (x, key) => x.refine(key),
		// 	value: x => x.value
		// },
		'default': {
			get: function get(x, key) {
				return x[key];
			},
			value: function value(x) {
				return x;
			}
		}
	};
	module.exports = exports['default'];

/***/ }
/******/ ]);