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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.activate = exports.animate = exports.render = exports.boot = exports.module = exports.component = undefined;

var _module2 = __webpack_require__(5);

var _module3 = _interopRequireDefault(_module2);

var _component = __webpack_require__(6);

var _component2 = _interopRequireDefault(_component);

var _bootstrap = __webpack_require__(7);

var _animate = __webpack_require__(9);

var _animate2 = _interopRequireDefault(_animate);

__webpack_require__(10);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.component = _component2.default;
exports.module = _module3.default;
exports.boot = _bootstrap.boot;
exports.render = _bootstrap.render;
exports.animate = _animate2.default;
exports.activate = _bootstrap.activate;

/*
function requireAll(requireContext) {
  return requireContext.keys().map(requireContext);
}
// requires and returns html files in the views directory
var modules = requireAll(require.context("./views", true, /^\.html$/));
modules.forEach(function(htmlTemplate){ 
   // code to add each template to document.body
}
*/

/***/ }),
/* 1 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			memo[selector] = fn.call(this, selector);
		}

		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(12);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _main = __webpack_require__(4);

var _main2 = _interopRequireDefault(_main);

var _engine = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = new _main2.default();

window.socket = io();

window._game = {
	group: null,
	game: null,
	card: null,
	player: null,

	//collection
	cards: [],
	groups: [],
	players: []
};

function redraw() {
	var wheight = window.height || window.innerHeight;
	document.querySelector('app').style.height = wheight + 'px';
}

window.addEventListener("resize", redraw);

document.addEventListener('DOMContentLoaded', function () {
	document.removeEventListener("DOMContentLoaded", this, false);

	redraw();
});

(0, _engine.boot)(app);

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = undefined;

var _dec, _class;

var _engine = __webpack_require__(0);

var _group = __webpack_require__(13);

var _group2 = _interopRequireDefault(_group);

__webpack_require__(19);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var application = (_dec = (0, _engine.module)({
	components: [_group2.default],
	boot: _group2.default
}), _dec(_class = function application() {
	_classCallCheck(this, application);
}) || _class);
exports.default = application;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
function _module(value) {
  return function decorator(target) {
    target.prototype.module = value;
  };
}
exports.default = _module;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = component;
function component(value) {
  return function decorator(target) {
    target.meta = value;
  };
}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.stacked = exports.destroy = exports.activate = exports.boot = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _animations = __webpack_require__(8);

var _initComponents = {};
var _activeComponent;

function boot(com) {

	document.addEventListener('DOMContentLoaded', function () {

		activate(com.module.boot, true);
	}, false);
}

function htmlToElement(html) {
	var template = document.createElement('template');
	template.innerHTML = html;
	return template.content.firstChild;
}

function activate(component, replace) {

	var root = document.getElementsByTagName('app')[0];

	if (!root) {
		throw new Error('Root (<app>) is missing.');
	}

	var componentRef = htmlToElement(component.meta.template);

	var componentObject = new component(componentRef);

	component.instance = componentObject;

	// set element reference
	componentObject.elementRef = componentRef;

	// set params
	if ((typeof replace === 'undefined' ? 'undefined' : _typeof(replace)) == 'object') {
		componentObject.params = replace;
		componentObject.param = function (key) {
			return this.params[key];
		};
	}

	// cal init component
	componentObject.init();

	if (typeof replace == 'boolean' && replace == true) {
		root.innerHTML = '';
	}

	componentRef.classList.add('component');

	if (componentObject.animation) {

		var timeout = 0;

		if (_activeComponent) {

			var duration = _activeComponent.instance.animation.out.duration || _activeComponent.instance.animation.in.duration || _activeComponent.instance.animation.duration || 250;

			// component out
			(0, _animations.reverse)(_activeComponent.instance, _activeComponent.instance.animation.out || _activeComponent.instance.animation.in || _activeComponent.instance.animation);
			timeout = Number(parseFloat(duration.replace(/[^\d\.]*/g, ''))) * 1000;
		}

		setTimeout(function () {
			// component in
			(0, _animations.animate)(componentObject, componentObject.animation.in || componentObject.animation);
		}, timeout);
	}

	root.appendChild(componentRef);

	// set current component as active component
	_activeComponent = component;

	componentObject.rendered();
}

function stacked(component) {}

function destroy(root, component) {

	var componentObject = component.instance;

	if (componentObject.animation) {

		(0, _animations.animate)(componentObject, componentObject.animation.in || componentObject.animation);
		root.appendChild(componentRef);
	}
	setTimeout(function () {
		root.removeChild(componentObject.elementRef);
		componentObject.destroy();
	}, Number(componentObject.animation.out.duration || componentObject.animation.duration) * 1000);
}

exports.boot = boot;
exports.activate = activate;
exports.destroy = destroy;
exports.stacked = stacked;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
var animations = {
	slide: function slide(component, config, reverse) {

		var directions = ['left', 'right', 'top', 'bottom'];

		var directionIndex = directions.indexOf(config.from || null);

		if (directionIndex < 0) {
			throw new Error('Invalid direction in slide animation for component ' + component.constructor.name);
		}

		if (typeof reverse != 'undefined') {

			component.elementRef.style.zIndex = 2;
			component.elementRef.classList.add('slide');
			component.elementRef.classList.add(directions[directionIndex]);

			setTimeout(function () {
				//void component.elementRef.offsetWidth;
				component.elementRef.classList.remove('in');
				component.elementRef.classList.add('out');
			}, 0);
		} else {
			component.elementRef.style.zIndex = 4;
			component.elementRef.style.display = 'block';
			component.elementRef.classList.add('slide');
			component.elementRef.classList.add(directions[directionIndex]);

			setTimeout(function () {
				//void component.elementRef.offsetWidth;
				component.elementRef.classList.add('in');
			}, 0);
		}
	},

	fade: function fade(component, config, reverse) {

		var directions = ['fade-in', 'fade-out'];

		var directionIndex = directions.indexOf(config.effect || null);

		if (directionIndex < 0) {
			throw new Error('Invalid effect in fade animation for component ' + component.constructor.name);
		}

		if (typeof reverse != 'undefined') {

			component.elementRef.style.zIndex = 2;
			component.elementRef.classList.add('fade');
			component.elementRef.classList.add(directions[directionIndex]);

			setTimeout(function () {
				//void component.elementRef.offsetWidth;
				component.elementRef.classList.remove('in');
				component.elementRef.classList.add('out');
			}, 0);
		} else {

			component.elementRef.style.zIndex = 4;
			component.elementRef.style.display = 'block';
			component.elementRef.classList.add('fade');
			component.elementRef.classList.add(directions[directionIndex]);

			setTimeout(function () {
				//void component.elementRef.offsetWidth;
				component.elementRef.classList.add('in');
			}, 0);
		}
	}
};

function validateConfig(component, config) {
	if (typeof config.key == 'undefined') {
		throw new Error('Animation key is not defined for component ' + component.constructor.name);
	}

	if (typeof animations[config.key] == 'undefined') {
		throw new Error('Invalid animation key defined for component ' + component.constructor.name);
	}

	if (typeof component.elementRef == 'undefined' || !(component.elementRef instanceof Node)) {
		throw new Error('Invalid component or element reference is not provided for ' + component.constructor.name);
	}
}

function animate(component, config) {

	validateConfig(component, config);

	component.elementRef.style.display = 'none';

	component.elementRef.classList.add('animation');

	if (config.duration) {
		component.elementRef.style.transitionDuration = config.duration;
	}

	animations[config.key](component, config);
}

function reverse(component, config) {

	validateConfig(component, config);

	component.elementRef.classList.add('animation');

	if (config.duration) {
		component.elementRef.style.transitionDuration = config.duration;
	}

	animations[config.key](component, config, true);

	setTimeout(function () {
		component.elementRef.style.display = 'none';
	}, parseFloat(config.duration.replace(/[^\d\.]*/g, '')) * 1000);
}

exports.animate = animate;
exports.reverse = reverse;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = animate;
function animate(value) {
  return function decorator(target) {
    target.animation = value;
  };
}

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(11);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(2)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/lib/loader.js!./engine.scss", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/lib/loader.js!./engine.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, ".animation {\n  transition: all 0.5s ease-in;\n  left: 0;\n  top: 0;\n  position: relative; }\n\n.animation.slide.left {\n  left: -100%;\n  opacity: 0.5; }\n\n.animation.slide.right {\n  left: 100%;\n  opacity: 0.5; }\n\n.animation.slide.in.left, .animation.slide.in.right {\n  left: 0px;\n  opacity: 1; }\n\n.animation.slide.top {\n  top: -100%;\n  opacity: 0.5; }\n\n.animation.slide.bottom {\n  top: 100%;\n  opacity: 0.5; }\n\n.animation.slide.in.top, .animation.slide.in.bottom {\n  top: 0px;\n  opacity: 1; }\n\n.animation.fade.fade-in {\n  opacity: 0.1; }\n\n.animation.fade.fade-out {\n  opacity: 0; }\n\n.animation.fade.in.fade-in {\n  opacity: 1; }\n\n.component.stacked {\n  display: none; }\n", ""]);

// exports


/***/ }),
/* 12 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _class, _desc, _value, _class2;

var _group = __webpack_require__(14);

var _group2 = _interopRequireDefault(_group);

var _group3 = __webpack_require__(16);

var _group4 = _interopRequireDefault(_group3);

var _engine = __webpack_require__(0);

var _join = __webpack_require__(17);

var _join2 = _interopRequireDefault(_join);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
	var desc = {};
	Object['ke' + 'ys'](descriptor).forEach(function (key) {
		desc[key] = descriptor[key];
	});
	desc.enumerable = !!desc.enumerable;
	desc.configurable = !!desc.configurable;

	if ('value' in desc || desc.initializer) {
		desc.writable = true;
	}

	desc = decorators.slice().reverse().reduce(function (desc, decorator) {
		return decorator(target, property, desc) || desc;
	}, desc);

	if (context && desc.initializer !== void 0) {
		desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
		desc.initializer = undefined;
	}

	if (desc.initializer === void 0) {
		Object['define' + 'Property'](target, property, desc);
		desc = null;
	}

	return desc;
}

var group = (_dec = (0, _engine.component)({
	selector: 'group',
	template: _group4.default
}), _dec2 = (0, _engine.animate)({ in: {
		key: 'fade',
		effect: 'fade-in',
		duration: '0.7s'
	}, out: {
		key: 'fade',
		effect: 'fade-out',
		duration: '0.5s'
	} }), _dec(_class = (_class2 = function () {
	function group() {
		var _this = this;

		_classCallCheck(this, group);

		window.socket.on('connect', function () {
			console.log('connected to server...');
			_this.getGroups();
		});
	}

	_createClass(group, [{
		key: 'init',
		value: function init() {}
	}, {
		key: 'getGroups',
		value: function getGroups() {
			var _this2 = this;

			window.socket.emit('group.get', {});
			window.socket.on('group.get.response', function (e) {
				_this2.groupsList(e);
			});
		}
	}, {
		key: 'groupsList',
		value: function groupsList(data) {
			var _this3 = this;

			var groups = JSON.parse(data);

			var listing = this.elementRef.querySelector('ul#list');

			for (var i = 0; i < groups.length; i++) {
				var row = groups[i];

				var li = document.createElement('li');

				li.setAttribute('data-group', JSON.stringify(row));

				li.innerHTML = row.name;

				li.onclick = function (e) {
					_this3.selectGroup(e);
				};

				listing.appendChild(li);
			}
		}
	}, {
		key: 'selectGroup',
		value: function selectGroup(e) {

			console.log(_join2.default);

			(0, _engine.activate)(_join2.default, JSON.parse(e.target.getAttribute('data-group')));
		}
	}, {
		key: 'rendered',
		value: function rendered() {}
	}, {
		key: 'destroy',
		value: function destroy() {
			window.socket.removeListener('group.get.response', this.groupsList);
		}
	}]);

	return group;
}(), (_applyDecoratedDescriptor(_class2.prototype, 'init', [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, 'init'), _class2.prototype)), _class2)) || _class);
exports.default = group;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(15);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(2)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/lib/loader.js!./group.scss", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/sass-loader/lib/loader.js!./group.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, ".group {\n  color: red; }\n", ""]);

// exports


/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = "<group>\r\n\t<div class=\"container\">\r\n\t  <h5>Groups</h5>\r\n\t  <ul id=\"list\">\r\n\t  </ul>\r\n\t</div>  \r\n</group>";

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _class, _desc, _value, _class2;

var _join = __webpack_require__(18);

var _join2 = _interopRequireDefault(_join);

var _engine = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
	var desc = {};
	Object['ke' + 'ys'](descriptor).forEach(function (key) {
		desc[key] = descriptor[key];
	});
	desc.enumerable = !!desc.enumerable;
	desc.configurable = !!desc.configurable;

	if ('value' in desc || desc.initializer) {
		desc.writable = true;
	}

	desc = decorators.slice().reverse().reduce(function (desc, decorator) {
		return decorator(target, property, desc) || desc;
	}, desc);

	if (context && desc.initializer !== void 0) {
		desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
		desc.initializer = undefined;
	}

	if (desc.initializer === void 0) {
		Object['define' + 'Property'](target, property, desc);
		desc = null;
	}

	return desc;
}

var join = (_dec = (0, _engine.component)({
	selector: 'join',
	template: _join2.default
}), _dec2 = (0, _engine.animate)({ in: {
		key: 'slide',
		from: 'left',
		duration: '0.5s'
	}, out: {
		key: 'slide',
		to: 'right',
		duration: '0.5s'
	} }), _dec(_class = (_class2 = function () {
	function join() {
		_classCallCheck(this, join);
	}

	_createClass(join, [{
		key: 'init',
		value: function init() {
			this.groupId = this.param('groupId');
		}
	}, {
		key: 'joinGroup',
		value: function joinGroup() {
			var _this = this;

			var input = this.elementRef.querySelector('.selectedGroup #user');
			socket.emit('group.join', { user: input.value, groupID: this.groupId });
			window.socket.on('group.join.response', function (e) {
				_this.gorupJoined(e);
			});
		}
	}, {
		key: 'groupJoined',
		value: function groupJoined(e) {

			var _playerIdentity = JSON.parse(e);

			/*var playerCounter = play.querySelector('#playersCount');
     playerCounter.innerHTML = _playerIdentity.players.length;
     // on new player
   socket.on('player.in.'+_playerIdentity.group.id, function (data) {
     var res = JSON.parse(data);
     playerCounter.innerHTML = res.players.length;
   });*/
		}
	}, {
		key: 'rendered',
		value: function rendered() {}
	}, {
		key: 'destroy',
		value: function destroy() {
			var _this2 = this;

			window.socket.removeListener('group.join.response', function (e) {
				_this2.gorupJoined(e);
			});
		}
	}]);

	return join;
}(), (_applyDecoratedDescriptor(_class2.prototype, 'init', [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, 'init'), _class2.prototype)), _class2)) || _class);
exports.default = join;

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = "<style>\r\ngroup {display: none;}\r\n</style>\r\n<join>\r\n\t<div class=\"selectedGroup\">\r\n\t  <h5>Join</h5>\r\n\t    <form class=\"form-inline\" onsubmit=\"return false\">\r\n\t     <label>Name: <input id=\"user\" name=\"user\" class=\"input\" type=\"text\"></label>\r\n\t     <label><button class=\"button\" onclick=\"joinGroup()\">Join</button></label>\r\n\t   </form>\r\n\t</div>  \r\n</join>";

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(20);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(2)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/lib/loader.js!./main.scss", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/lib/loader.js!./main.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, "html {\n  font-family: san-serif; }\n\nbody, ul {\n  margin: 0;\n  padding: 0; }\n\nul {\n  list-style: none; }\n\na {\n  text-decoration: none; }\n\napp {\n  background: #d5d5d5;\n  float: left;\n  width: 100%;\n  height: 100%;\n  padding: 20px;\n  box-sizing: border-box;\n  overflow: hidden;\n  position: absolute;\n  display: block; }\n\n.component {\n  float: left;\n  width: 100%;\n  background: #e7e7e7;\n  height: 100%;\n  box-sizing: border-box;\n  padding: 20px;\n  position: relative;\n  display: block; }\n\n/* components */\n.btn {\n  border: none;\n  padding: 10px; }\n\ngroup #list li {\n  padding: 10px 20px;\n  background: slategrey;\n  color: #fff;\n  border-bottom: 1px solid #ccc; }\n", ""]);

// exports


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map