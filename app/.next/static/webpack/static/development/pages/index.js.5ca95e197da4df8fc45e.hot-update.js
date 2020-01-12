webpackHotUpdate("static/development/pages/index.js",{

/***/ "../node_modules/string-hash/index.js":
/*!********************************************!*\
  !*** ../node_modules/string-hash/index.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function hash(str) {
  var hash = 5381,
      i    = str.length;

  while(i) {
    hash = (hash * 33) ^ str.charCodeAt(--i);
  }

  /* JavaScript does bitwise operations (like XOR, above) on 32-bit signed
   * integers. Since we want the results to be always positive, convert the
   * signed int to an unsigned by doing an unsigned bitshift. */
  return hash >>> 0;
}

module.exports = hash;


/***/ }),

/***/ "../node_modules/styled-jsx/dist/lib/stylesheet.js":
/*!*********************************************************!*\
  !*** ../node_modules/styled-jsx/dist/lib/stylesheet.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

exports.__esModule = true;
exports["default"] = void 0;

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*
Based on Glamor's sheet
https://github.com/threepointone/glamor/blob/667b480d31b3721a905021b26e1290ce92ca2879/src/sheet.js
*/
var isProd = typeof process !== 'undefined' && process.env && "development" === 'production';

var isString = function isString(o) {
  return Object.prototype.toString.call(o) === '[object String]';
};

var StyleSheet =
/*#__PURE__*/
function () {
  function StyleSheet(_temp) {
    var _ref = _temp === void 0 ? {} : _temp,
        _ref$name = _ref.name,
        name = _ref$name === void 0 ? 'stylesheet' : _ref$name,
        _ref$optimizeForSpeed = _ref.optimizeForSpeed,
        optimizeForSpeed = _ref$optimizeForSpeed === void 0 ? isProd : _ref$optimizeForSpeed,
        _ref$isBrowser = _ref.isBrowser,
        isBrowser = _ref$isBrowser === void 0 ? typeof window !== 'undefined' : _ref$isBrowser;

    invariant(isString(name), '`name` must be a string');
    this._name = name;
    this._deletedRulePlaceholder = "#" + name + "-deleted-rule____{}";
    invariant(typeof optimizeForSpeed === 'boolean', '`optimizeForSpeed` must be a boolean');
    this._optimizeForSpeed = optimizeForSpeed;
    this._isBrowser = isBrowser;
    this._serverSheet = undefined;
    this._tags = [];
    this._injected = false;
    this._rulesCount = 0;
    var node = this._isBrowser && document.querySelector('meta[property="csp-nonce"]');
    this._nonce = node ? node.getAttribute('content') : null;
  }

  var _proto = StyleSheet.prototype;

  _proto.setOptimizeForSpeed = function setOptimizeForSpeed(bool) {
    invariant(typeof bool === 'boolean', '`setOptimizeForSpeed` accepts a boolean');
    invariant(this._rulesCount === 0, 'optimizeForSpeed cannot be when rules have already been inserted');
    this.flush();
    this._optimizeForSpeed = bool;
    this.inject();
  };

  _proto.isOptimizeForSpeed = function isOptimizeForSpeed() {
    return this._optimizeForSpeed;
  };

  _proto.inject = function inject() {
    var _this = this;

    invariant(!this._injected, 'sheet already injected');
    this._injected = true;

    if (this._isBrowser && this._optimizeForSpeed) {
      this._tags[0] = this.makeStyleTag(this._name);
      this._optimizeForSpeed = 'insertRule' in this.getSheet();

      if (!this._optimizeForSpeed) {
        if (!isProd) {
          console.warn('StyleSheet: optimizeForSpeed mode not supported falling back to standard mode.');
        }

        this.flush();
        this._injected = true;
      }

      return;
    }

    this._serverSheet = {
      cssRules: [],
      insertRule: function insertRule(rule, index) {
        if (typeof index === 'number') {
          _this._serverSheet.cssRules[index] = {
            cssText: rule
          };
        } else {
          _this._serverSheet.cssRules.push({
            cssText: rule
          });
        }

        return index;
      },
      deleteRule: function deleteRule(index) {
        _this._serverSheet.cssRules[index] = null;
      }
    };
  };

  _proto.getSheetForTag = function getSheetForTag(tag) {
    if (tag.sheet) {
      return tag.sheet;
    } // this weirdness brought to you by firefox


    for (var i = 0; i < document.styleSheets.length; i++) {
      if (document.styleSheets[i].ownerNode === tag) {
        return document.styleSheets[i];
      }
    }
  };

  _proto.getSheet = function getSheet() {
    return this.getSheetForTag(this._tags[this._tags.length - 1]);
  };

  _proto.insertRule = function insertRule(rule, index) {
    invariant(isString(rule), '`insertRule` accepts only strings');

    if (!this._isBrowser) {
      if (typeof index !== 'number') {
        index = this._serverSheet.cssRules.length;
      }

      this._serverSheet.insertRule(rule, index);

      return this._rulesCount++;
    }

    if (this._optimizeForSpeed) {
      var sheet = this.getSheet();

      if (typeof index !== 'number') {
        index = sheet.cssRules.length;
      } // this weirdness for perf, and chrome's weird bug
      // https://stackoverflow.com/questions/20007992/chrome-suddenly-stopped-accepting-insertrule


      try {
        sheet.insertRule(rule, index);
      } catch (error) {
        if (!isProd) {
          console.warn("StyleSheet: illegal rule: \n\n" + rule + "\n\nSee https://stackoverflow.com/q/20007992 for more info");
        }

        return -1;
      }
    } else {
      var insertionPoint = this._tags[index];

      this._tags.push(this.makeStyleTag(this._name, rule, insertionPoint));
    }

    return this._rulesCount++;
  };

  _proto.replaceRule = function replaceRule(index, rule) {
    if (this._optimizeForSpeed || !this._isBrowser) {
      var sheet = this._isBrowser ? this.getSheet() : this._serverSheet;

      if (!rule.trim()) {
        rule = this._deletedRulePlaceholder;
      }

      if (!sheet.cssRules[index]) {
        // @TBD Should we throw an error?
        return index;
      }

      sheet.deleteRule(index);

      try {
        sheet.insertRule(rule, index);
      } catch (error) {
        if (!isProd) {
          console.warn("StyleSheet: illegal rule: \n\n" + rule + "\n\nSee https://stackoverflow.com/q/20007992 for more info");
        } // In order to preserve the indices we insert a deleteRulePlaceholder


        sheet.insertRule(this._deletedRulePlaceholder, index);
      }
    } else {
      var tag = this._tags[index];
      invariant(tag, "old rule at index `" + index + "` not found");
      tag.textContent = rule;
    }

    return index;
  };

  _proto.deleteRule = function deleteRule(index) {
    if (!this._isBrowser) {
      this._serverSheet.deleteRule(index);

      return;
    }

    if (this._optimizeForSpeed) {
      this.replaceRule(index, '');
    } else {
      var tag = this._tags[index];
      invariant(tag, "rule at index `" + index + "` not found");
      tag.parentNode.removeChild(tag);
      this._tags[index] = null;
    }
  };

  _proto.flush = function flush() {
    this._injected = false;
    this._rulesCount = 0;

    if (this._isBrowser) {
      this._tags.forEach(function (tag) {
        return tag && tag.parentNode.removeChild(tag);
      });

      this._tags = [];
    } else {
      // simpler on server
      this._serverSheet.cssRules = [];
    }
  };

  _proto.cssRules = function cssRules() {
    var _this2 = this;

    if (!this._isBrowser) {
      return this._serverSheet.cssRules;
    }

    return this._tags.reduce(function (rules, tag) {
      if (tag) {
        rules = rules.concat(Array.prototype.map.call(_this2.getSheetForTag(tag).cssRules, function (rule) {
          return rule.cssText === _this2._deletedRulePlaceholder ? null : rule;
        }));
      } else {
        rules.push(null);
      }

      return rules;
    }, []);
  };

  _proto.makeStyleTag = function makeStyleTag(name, cssString, relativeToTag) {
    if (cssString) {
      invariant(isString(cssString), 'makeStyleTag acceps only strings as second parameter');
    }

    var tag = document.createElement('style');
    if (this._nonce) tag.setAttribute('nonce', this._nonce);
    tag.type = 'text/css';
    tag.setAttribute("data-" + name, '');

    if (cssString) {
      tag.appendChild(document.createTextNode(cssString));
    }

    var head = document.head || document.getElementsByTagName('head')[0];

    if (relativeToTag) {
      head.insertBefore(tag, relativeToTag);
    } else {
      head.appendChild(tag);
    }

    return tag;
  };

  _createClass(StyleSheet, [{
    key: "length",
    get: function get() {
      return this._rulesCount;
    }
  }]);

  return StyleSheet;
}();

exports["default"] = StyleSheet;

function invariant(condition, message) {
  if (!condition) {
    throw new Error("StyleSheet: " + message + ".");
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../process/browser.js */ "../node_modules/process/browser.js")))

/***/ }),

/***/ "../node_modules/styled-jsx/dist/style.js":
/*!************************************************!*\
  !*** ../node_modules/styled-jsx/dist/style.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.flush = flush;
exports["default"] = void 0;

var _react = __webpack_require__(/*! react */ "../node_modules/react/index.js");

var _stylesheetRegistry = _interopRequireDefault(__webpack_require__(/*! ./stylesheet-registry */ "../node_modules/styled-jsx/dist/stylesheet-registry.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var styleSheetRegistry = new _stylesheetRegistry["default"]();

var JSXStyle =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(JSXStyle, _Component);

  function JSXStyle(props) {
    var _this;

    _this = _Component.call(this, props) || this;
    _this.prevProps = {};
    return _this;
  }

  JSXStyle.dynamic = function dynamic(info) {
    return info.map(function (tagInfo) {
      var baseId = tagInfo[0];
      var props = tagInfo[1];
      return styleSheetRegistry.computeId(baseId, props);
    }).join(' ');
  } // probably faster than PureComponent (shallowEqual)
  ;

  var _proto = JSXStyle.prototype;

  _proto.shouldComponentUpdate = function shouldComponentUpdate(otherProps) {
    return this.props.id !== otherProps.id || // We do this check because `dynamic` is an array of strings or undefined.
    // These are the computed values for dynamic styles.
    String(this.props.dynamic) !== String(otherProps.dynamic);
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    styleSheetRegistry.remove(this.props);
  };

  _proto.render = function render() {
    // This is a workaround to make the side effect async safe in the "render" phase.
    // See https://github.com/zeit/styled-jsx/pull/484
    if (this.shouldComponentUpdate(this.prevProps)) {
      // Updates
      if (this.prevProps.id) {
        styleSheetRegistry.remove(this.prevProps);
      }

      styleSheetRegistry.add(this.props);
      this.prevProps = this.props;
    }

    return null;
  };

  return JSXStyle;
}(_react.Component);

exports["default"] = JSXStyle;

function flush() {
  var cssRules = styleSheetRegistry.cssRules();
  styleSheetRegistry.flush();
  return cssRules;
}

/***/ }),

/***/ "../node_modules/styled-jsx/dist/stylesheet-registry.js":
/*!**************************************************************!*\
  !*** ../node_modules/styled-jsx/dist/stylesheet-registry.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _stringHash = _interopRequireDefault(__webpack_require__(/*! string-hash */ "../node_modules/string-hash/index.js"));

var _stylesheet = _interopRequireDefault(__webpack_require__(/*! ./lib/stylesheet */ "../node_modules/styled-jsx/dist/lib/stylesheet.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var sanitize = function sanitize(rule) {
  return rule.replace(/\/style/gi, '\\/style');
};

var StyleSheetRegistry =
/*#__PURE__*/
function () {
  function StyleSheetRegistry(_temp) {
    var _ref = _temp === void 0 ? {} : _temp,
        _ref$styleSheet = _ref.styleSheet,
        styleSheet = _ref$styleSheet === void 0 ? null : _ref$styleSheet,
        _ref$optimizeForSpeed = _ref.optimizeForSpeed,
        optimizeForSpeed = _ref$optimizeForSpeed === void 0 ? false : _ref$optimizeForSpeed,
        _ref$isBrowser = _ref.isBrowser,
        isBrowser = _ref$isBrowser === void 0 ? typeof window !== 'undefined' : _ref$isBrowser;

    this._sheet = styleSheet || new _stylesheet["default"]({
      name: 'styled-jsx',
      optimizeForSpeed: optimizeForSpeed
    });

    this._sheet.inject();

    if (styleSheet && typeof optimizeForSpeed === 'boolean') {
      this._sheet.setOptimizeForSpeed(optimizeForSpeed);

      this._optimizeForSpeed = this._sheet.isOptimizeForSpeed();
    }

    this._isBrowser = isBrowser;
    this._fromServer = undefined;
    this._indices = {};
    this._instancesCounts = {};
    this.computeId = this.createComputeId();
    this.computeSelector = this.createComputeSelector();
  }

  var _proto = StyleSheetRegistry.prototype;

  _proto.add = function add(props) {
    var _this = this;

    if (undefined === this._optimizeForSpeed) {
      this._optimizeForSpeed = Array.isArray(props.children);

      this._sheet.setOptimizeForSpeed(this._optimizeForSpeed);

      this._optimizeForSpeed = this._sheet.isOptimizeForSpeed();
    }

    if (this._isBrowser && !this._fromServer) {
      this._fromServer = this.selectFromServer();
      this._instancesCounts = Object.keys(this._fromServer).reduce(function (acc, tagName) {
        acc[tagName] = 0;
        return acc;
      }, {});
    }

    var _this$getIdAndRules = this.getIdAndRules(props),
        styleId = _this$getIdAndRules.styleId,
        rules = _this$getIdAndRules.rules; // Deduping: just increase the instances count.


    if (styleId in this._instancesCounts) {
      this._instancesCounts[styleId] += 1;
      return;
    }

    var indices = rules.map(function (rule) {
      return _this._sheet.insertRule(rule);
    }) // Filter out invalid rules
    .filter(function (index) {
      return index !== -1;
    });
    this._indices[styleId] = indices;
    this._instancesCounts[styleId] = 1;
  };

  _proto.remove = function remove(props) {
    var _this2 = this;

    var _this$getIdAndRules2 = this.getIdAndRules(props),
        styleId = _this$getIdAndRules2.styleId;

    invariant(styleId in this._instancesCounts, "styleId: `" + styleId + "` not found");
    this._instancesCounts[styleId] -= 1;

    if (this._instancesCounts[styleId] < 1) {
      var tagFromServer = this._fromServer && this._fromServer[styleId];

      if (tagFromServer) {
        tagFromServer.parentNode.removeChild(tagFromServer);
        delete this._fromServer[styleId];
      } else {
        this._indices[styleId].forEach(function (index) {
          return _this2._sheet.deleteRule(index);
        });

        delete this._indices[styleId];
      }

      delete this._instancesCounts[styleId];
    }
  };

  _proto.update = function update(props, nextProps) {
    this.add(nextProps);
    this.remove(props);
  };

  _proto.flush = function flush() {
    this._sheet.flush();

    this._sheet.inject();

    this._fromServer = undefined;
    this._indices = {};
    this._instancesCounts = {};
    this.computeId = this.createComputeId();
    this.computeSelector = this.createComputeSelector();
  };

  _proto.cssRules = function cssRules() {
    var _this3 = this;

    var fromServer = this._fromServer ? Object.keys(this._fromServer).map(function (styleId) {
      return [styleId, _this3._fromServer[styleId]];
    }) : [];

    var cssRules = this._sheet.cssRules();

    return fromServer.concat(Object.keys(this._indices).map(function (styleId) {
      return [styleId, _this3._indices[styleId].map(function (index) {
        return cssRules[index].cssText;
      }).join(_this3._optimizeForSpeed ? '' : '\n')];
    }) // filter out empty rules
    .filter(function (rule) {
      return Boolean(rule[1]);
    }));
  }
  /**
   * createComputeId
   *
   * Creates a function to compute and memoize a jsx id from a basedId and optionally props.
   */
  ;

  _proto.createComputeId = function createComputeId() {
    var cache = {};
    return function (baseId, props) {
      if (!props) {
        return "jsx-" + baseId;
      }

      var propsToString = String(props);
      var key = baseId + propsToString; // return `jsx-${hashString(`${baseId}-${propsToString}`)}`

      if (!cache[key]) {
        cache[key] = "jsx-" + (0, _stringHash["default"])(baseId + "-" + propsToString);
      }

      return cache[key];
    };
  }
  /**
   * createComputeSelector
   *
   * Creates a function to compute and memoize dynamic selectors.
   */
  ;

  _proto.createComputeSelector = function createComputeSelector(selectoPlaceholderRegexp) {
    if (selectoPlaceholderRegexp === void 0) {
      selectoPlaceholderRegexp = /__jsx-style-dynamic-selector/g;
    }

    var cache = {};
    return function (id, css) {
      // Sanitize SSR-ed CSS.
      // Client side code doesn't need to be sanitized since we use
      // document.createTextNode (dev) and the CSSOM api sheet.insertRule (prod).
      if (!this._isBrowser) {
        css = sanitize(css);
      }

      var idcss = id + css;

      if (!cache[idcss]) {
        cache[idcss] = css.replace(selectoPlaceholderRegexp, id);
      }

      return cache[idcss];
    };
  };

  _proto.getIdAndRules = function getIdAndRules(props) {
    var _this4 = this;

    var css = props.children,
        dynamic = props.dynamic,
        id = props.id;

    if (dynamic) {
      var styleId = this.computeId(id, dynamic);
      return {
        styleId: styleId,
        rules: Array.isArray(css) ? css.map(function (rule) {
          return _this4.computeSelector(styleId, rule);
        }) : [this.computeSelector(styleId, css)]
      };
    }

    return {
      styleId: this.computeId(id),
      rules: Array.isArray(css) ? css : [css]
    };
  }
  /**
   * selectFromServer
   *
   * Collects style tags from the document with id __jsx-XXX
   */
  ;

  _proto.selectFromServer = function selectFromServer() {
    var elements = Array.prototype.slice.call(document.querySelectorAll('[id^="__jsx-"]'));
    return elements.reduce(function (acc, element) {
      var id = element.id.slice(2);
      acc[id] = element;
      return acc;
    }, {});
  };

  return StyleSheetRegistry;
}();

exports["default"] = StyleSheetRegistry;

function invariant(condition, message) {
  if (!condition) {
    throw new Error("StyleSheetRegistry: " + message + ".");
  }
}

/***/ }),

/***/ "../node_modules/styled-jsx/style.js":
/*!*******************************************!*\
  !*** ../node_modules/styled-jsx/style.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./dist/style */ "../node_modules/styled-jsx/dist/style.js")


/***/ }),

/***/ "./components/Nav.js":
/*!***************************!*\
  !*** ./components/Nav.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Posts; });
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-jsx/style */ "../node_modules/styled-jsx/style.js");
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/link */ "../node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _modules__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../modules */ "./modules.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
var _jsxFileName = "/home/truongduchuy910/apps/quangdacamera.com/app/components/Nav.js";

var __jsx = react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement;



function Posts() {
  return __jsx("div", {
    className: "jsx-419124778",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 6
    },
    __self: this
  }, __jsx(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a, {
    id: "419124778",
    __self: this
  }, ".footer-basic.jsx-419124778{padding:40px 0;background-color:#fff;color:#4b4c4d;}.footer-basic.jsx-419124778 ul.jsx-419124778{padding:0;list-style:none;text-align:center;font-size:18px;line-height:1.6;margin-bottom:0;}.footer-basic.jsx-419124778 li.jsx-419124778{padding:0 10px;}.footer-basic.jsx-419124778 ul.jsx-419124778 a.jsx-419124778{color:inherit;-webkit-text-decoration:none;text-decoration:none;opacity:0.8;}.footer-basic.jsx-419124778 ul.jsx-419124778 a.jsx-419124778:hover{opacity:1;}.footer-basic.jsx-419124778 .social.jsx-419124778{text-align:center;padding-bottom:25px;}.footer-basic.jsx-419124778 .social.jsx-419124778>a.jsx-419124778{font-size:24px;width:40px;height:40px;line-height:40px;display:inline-block;text-align:center;border-radius:50%;border:1px solid #ccc;margin:0 8px;color:inherit;opacity:0.75;}.footer-basic.jsx-419124778 .social.jsx-419124778>a.jsx-419124778:hover{opacity:0.9;}.footer-basic.jsx-419124778 .copyright.jsx-419124778{margin-top:15px;text-align:center;font-size:13px;color:#aaa;margin-bottom:0;}.header-blue.jsx-419124778{background:linear-gradient(135deg,#172a74,#21a9af);background-color:#184e8e;padding-bottom:80px;font-family:\"Source Sans Pro\",sans-serif;}@media (min-width:768px){.header-blue.jsx-419124778{padding-bottom:120px;}}.header-blue.jsx-419124778 .navbar.jsx-419124778{background:0 0;padding-top:0.75rem;padding-bottom:0.75rem;color:#fff;border-radius:0;box-shadow:none;border:none;}.header-blue.jsx-419124778 .navbar.jsx-419124778 .navbar-brand.jsx-419124778{font-weight:700;color:inherit;}.header-blue.jsx-419124778 .navbar.jsx-419124778 .navbar-brand.jsx-419124778:hover{color:#f0f0f0;}.header-blue.jsx-419124778 .navbar.jsx-419124778 .navbar-collapse.jsx-419124778{border-top:1px solid rgba(255,255,255,0.3);margin-top:0.5rem;}@media (min-width:768px){.header-blue.jsx-419124778 .navbar.jsx-419124778{padding-top:1rem;padding-bottom:1rem;}.header-blue.jsx-419124778 .navbar.jsx-419124778 .navbar-collapse.jsx-419124778{border-color:transparent;margin:0;}.header-blue.jsx-419124778 .navbar-nav.jsx-419124778 .nav-link.jsx-419124778{padding-left:0.7rem;padding-right:0.7rem;}}.header-blue.jsx-419124778 .navbar.jsx-419124778 .navbar-collapse.jsx-419124778 span.jsx-419124778 .login.jsx-419124778{color:#d9d9d9;margin-right:0.5rem;-webkit-text-decoration:none;text-decoration:none;}.header-blue.jsx-419124778 .navbar.jsx-419124778 .navbar-collapse.jsx-419124778 span.jsx-419124778 .login.jsx-419124778:hover{color:#fff;}.header-blue.jsx-419124778 .navbar.jsx-419124778 .navbar-toggler.jsx-419124778{border-color:rgba(255,255,255,0.3);}.header-blue.jsx-419124778 .navbar.jsx-419124778 .navbar-toggler.jsx-419124778:hover,.header-blue.jsx-419124778 .navbar-toggler.jsx-419124778:focus{background:0 0;}@media (min-width:992px){.header-blue.jsx-419124778 .navbar-nav.jsx-419124778 .nav-link.jsx-419124778{padding-left:1.2rem;padding-right:1.2rem;}}.header-blue.jsx-419124778 .navbar.navbar-light.jsx-419124778 .navbar-nav.jsx-419124778 .nav-link.jsx-419124778{color:#d9d9d9;}.header-blue.jsx-419124778 .navbar.navbar-light.jsx-419124778 .navbar-nav.jsx-419124778 .nav-link.jsx-419124778:focus,.header-blue.jsx-419124778 .navbar.navbar-light.jsx-419124778 .navbar-nav.jsx-419124778 .nav-link.jsx-419124778:hover{color:#fcfeff !important;background-color:transparent;}.header-blue.jsx-419124778 .navbar.jsx-419124778 .navbar-nav.jsx-419124778>li.jsx-419124778>.dropdown-menu.jsx-419124778{margin-top:-5px;box-shadow:0 4px 8px rgba(0,0,0,0.1);background-color:#fff;border-radius:2px;}.header-blue.jsx-419124778 .navbar.jsx-419124778 .dropdown-menu.jsx-419124778 .dropdown-item.jsx-419124778,.header-blue.jsx-419124778 .navbar.jsx-419124778 .dropdown-menu.jsx-419124778 .dropdown-item.jsx-419124778:focus{line-height:2;color:#37434d;}.header-blue.jsx-419124778 .navbar.jsx-419124778 .dropdown-menu.jsx-419124778 .dropdown-item.jsx-419124778:focus,.header-blue.jsx-419124778 .navbar.jsx-419124778 .dropdown-menu.jsx-419124778 .dropdown-item.jsx-419124778:hover{background:#ebeff1;}.header-blue.jsx-419124778 .action-button.jsx-419124778,.header-blue.jsx-419124778 .action-button.jsx-419124778:not(.disabled):active{border:1px solid rgba(255,255,255,0.7);border-radius:40px;color:#ebeff1;box-shadow:none;text-shadow:none;padding:0.3rem 0.8rem;background:0 0;-webkit-transition:background-color 0.25s;transition:background-color 0.25s;outline:0;}.header-blue.jsx-419124778 .action-button.jsx-419124778:hover{color:#fff;}.header-blue.jsx-419124778 .navbar.jsx-419124778 .form-inline.jsx-419124778 label.jsx-419124778{color:#d9d9d9;}.header-blue.jsx-419124778 .navbar.jsx-419124778 .form-inline.jsx-419124778 .search-field.jsx-419124778{display:inline-block;width:80%;background:0 0;border:none;border-bottom:1px solid transparent;border-radius:0;box-shadow:none;color:inherit;-webkit-transition:border-bottom-color 0.3s;transition:border-bottom-color 0.3s;}.header-blue.jsx-419124778 .navbar.jsx-419124778 .form-inline.jsx-419124778 .search-field.jsx-419124778:focus{border-bottom:1px solid #ccc;}.header-blue.jsx-419124778 .hero.jsx-419124778{margin-top:20px;text-align:center;}@media (min-width:768px){.header-blue.jsx-419124778 .hero.jsx-419124778{margin-top:60px;text-align:left;}}.header-blue.jsx-419124778 .hero.jsx-419124778 h1.jsx-419124778{color:#fff;font-size:40px;margin-top:0;margin-bottom:15px;font-weight:300;line-height:1.4;}@media (min-width:992px){.header-blue.jsx-419124778 .hero.jsx-419124778 h1.jsx-419124778{margin-top:190px;margin-bottom:24px;line-height:1.2;}}.header-blue.jsx-419124778 .hero.jsx-419124778 p.jsx-419124778{color:rgba(255,255,255,0.8);font-size:20px;margin-bottom:30px;font-weight:300;}.header-blue.jsx-419124778 .phone-holder.jsx-419124778{text-align:right;}.header-blue.jsx-419124778 div.iphone-mockup.jsx-419124778{position:relative;max-width:300px;margin:20px;display:inline-block;}.header-blue.jsx-419124778 .iphone-mockup.jsx-419124778 img.device.jsx-419124778{width:100%;height:auto;}.header-blue.jsx-419124778 .iphone-mockup.jsx-419124778 .screen.jsx-419124778{position:absolute;width:88%;height:77%;top:12%;border-radius:2px;left:6%;border:1px solid #444;overflow:hidden;background:url(../../assets/img/screen-content-iphone-6.jpg) center;background-size:cover;}.header-blue.jsx-419124778 .iphone-mockup.jsx-419124778 .screen.jsx-419124778:before{content:\"\";background-color:#fff;position:absolute;width:70%;height:140%;top:-12%;right:-60%;-webkit-transform:rotate(-19deg);-ms-transform:rotate(-19deg);transform:rotate(-19deg);opacity:0.2;}.navigation-clean.jsx-419124778{background:#fff;padding-top:0.75rem;padding-bottom:0.75rem;color:#333;border-radius:0;box-shadow:none;border:none;margin-bottom:0;}.navigation-clean.jsx-419124778 .navbar-brand.jsx-419124778{font-weight:700;color:inherit;}.navigation-clean.jsx-419124778 .navbar-brand.jsx-419124778:hover{color:#222;}.navigation-clean.navbar-dark.jsx-419124778 .navbar-brand.jsx-419124778:hover{color:#f0f0f0;}.navigation-clean.jsx-419124778 .navbar-brand.jsx-419124778 img.jsx-419124778{height:100%;display:inline-block;margin-right:10px;width:auto;}.navigation-clean.jsx-419124778 .navbar-toggler.jsx-419124778{border-color:#ddd;color:#888;}.navigation-clean.jsx-419124778 .navbar-toggler.jsx-419124778:focus,.navigation-clean.jsx-419124778 .navbar-toggler.jsx-419124778:hover{background:0 0;}.navigation-clean.navbar-dark.jsx-419124778 .navbar-toggler.jsx-419124778{border-color:#555;color:#eee;}.navigation-clean.jsx-419124778 .form-inline.jsx-419124778,.navigation-clean.jsx-419124778 .navbar-collapse.jsx-419124778{border-top-color:#ddd;}.navigation-clean.navbar-dark.jsx-419124778 .form-inline.jsx-419124778,.navigation-clean.navbar-dark.jsx-419124778 .navbar-collapse.jsx-419124778{border-top-color:#333;}.navigation-clean.jsx-419124778 .navbar-nav.jsx-419124778>.active.jsx-419124778>a.jsx-419124778,.navigation-clean.jsx-419124778 .navbar-nav.jsx-419124778>.show.jsx-419124778>a.jsx-419124778{background:0 0;box-shadow:none;}.navigation-clean.navbar-light.jsx-419124778 .navbar-nav.jsx-419124778 .nav-link.active.jsx-419124778,.navigation-clean.navbar-light.jsx-419124778 .navbar-nav.jsx-419124778 .nav-link.active.jsx-419124778:focus,.navigation-clean.navbar-light.jsx-419124778 .navbar-nav.jsx-419124778 .nav-link.active.jsx-419124778:hover{color:#8f8f8f;box-shadow:none;background:0 0;pointer-events:none;}.navigation-clean.navbar.jsx-419124778 .navbar-nav.jsx-419124778 .nav-link.jsx-419124778{padding-left:18px;padding-right:18px;}.navigation-clean.navbar-light.jsx-419124778 .navbar-nav.jsx-419124778 .nav-link.jsx-419124778{color:#465765;}.navigation-clean.navbar-light.jsx-419124778 .navbar-nav.jsx-419124778 .nav-link.jsx-419124778:focus,.navigation-clean.navbar-light.jsx-419124778 .navbar-nav.jsx-419124778 .nav-link.jsx-419124778:hover{color:#37434d !important;background-color:transparent;}.navigation-clean.jsx-419124778 .navbar-nav.jsx-419124778>li.jsx-419124778>.dropdown-menu.jsx-419124778{margin-top:-5px;box-shadow:none;background-color:#fff;border-radius:2px;}@media (min-width:768px){.navigation-clean.jsx-419124778{padding-top:1rem;padding-bottom:1rem;}.navigation-clean.jsx-419124778 .navbar-nav.jsx-419124778 .show.jsx-419124778 .dropdown-menu.jsx-419124778{box-shadow:0 4px 8px rgba(0,0,0,0.1);}}@media (max-width:767px){.navigation-clean.jsx-419124778 .navbar-nav.jsx-419124778 .show.jsx-419124778 .dropdown-menu.jsx-419124778 .dropdown-item.jsx-419124778{color:#37434d;padding-top:0.8rem;padding-bottom:0.8rem;line-height:1;}}.projects-clean.jsx-419124778 .projects.jsx-419124778,.projects-horizontal.jsx-419124778 .projects.jsx-419124778{padding-bottom:40px;}.navigation-clean.jsx-419124778 .dropdown-menu.jsx-419124778 .dropdown-item.jsx-419124778,.navigation-clean.jsx-419124778 .dropdown-menu.jsx-419124778 .dropdown-item.jsx-419124778:focus{line-height:2;color:#37434d;}.navigation-clean.jsx-419124778 .dropdown-menu.jsx-419124778 .dropdown-item.jsx-419124778:focus,.navigation-clean.jsx-419124778 .dropdown-menu.jsx-419124778 .dropdown-item.jsx-419124778:hover{background:#eee;color:inherit;}.navigation-clean.navbar-dark.jsx-419124778{background-color:#1f2021;color:#fff;}.navigation-clean.navbar-dark.jsx-419124778 .navbar-nav.jsx-419124778 a.active.jsx-419124778,.navigation-clean.navbar-dark.jsx-419124778 .navbar-nav.jsx-419124778 a.active.jsx-419124778:focus,.navigation-clean.navbar-dark.jsx-419124778 .navbar-nav.jsx-419124778 a.active.jsx-419124778:hover{color:#8f8f8f;box-shadow:none;background:0 0;pointer-events:none;}.navigation-clean.navbar-dark.jsx-419124778 .navbar-nav.jsx-419124778 .nav-link.jsx-419124778{color:#dfe8ee;}.navigation-clean.navbar-dark.jsx-419124778 .navbar-nav.jsx-419124778 .nav-link.jsx-419124778:focus,.navigation-clean.navbar-dark.jsx-419124778 .navbar-nav.jsx-419124778 .nav-link.jsx-419124778:hover{color:#fff;background-color:transparent;}.navigation-clean.navbar-dark.jsx-419124778 .navbar-nav.jsx-419124778>li.jsx-419124778>.dropdown-menu.jsx-419124778{background-color:#1f2021;}.navigation-clean.navbar-dark.jsx-419124778 .dropdown-menu.jsx-419124778 .dropdown-item.jsx-419124778,.navigation-clean.navbar-dark.jsx-419124778 .dropdown-menu.jsx-419124778 .dropdown-item.jsx-419124778:focus{color:#f2f5f8;}.navigation-clean.navbar-dark.jsx-419124778 .dropdown-menu.jsx-419124778 .dropdown-item.jsx-419124778:focus,.navigation-clean.navbar-dark.jsx-419124778 .dropdown-menu.jsx-419124778 .dropdown-item.jsx-419124778:hover{background:#363739;}@media (max-width:767px){.navigation-clean.navbar-dark.jsx-419124778 .navbar-nav.jsx-419124778 .show.jsx-419124778 .dropdown-menu.jsx-419124778 .dropdown-item.jsx-419124778{color:#fff;}}.category_item.jsx-419124778:hover{background-color:rgba(0,0,0,0.3);color:#fff;-webkit-transition-duration:0.3s;transition-duration:0.3s;}.text-decoration-none.jsx-419124778:hover{color:inherit;}.duration.jsx-419124778{-webkit-transition:background 0.5s;transition:background 0.5s;}.projects-clean.jsx-419124778{color:#313437;background-color:#fff;}.projects-clean.jsx-419124778 p.jsx-419124778{color:#7d8285;}.projects-clean.jsx-419124778 h2.jsx-419124778{font-weight:700;margin-bottom:40px;padding-top:40px;color:inherit;}@media (max-width:767px){.projects-clean.jsx-419124778 h2.jsx-419124778{margin-bottom:25px;padding-top:25px;font-size:24px;}}.projects-clean.jsx-419124778 .intro.jsx-419124778{font-size:16px;max-width:500px;margin:0 auto;}.projects-clean.jsx-419124778 .intro.jsx-419124778 p.jsx-419124778{margin-bottom:0;}.projects-clean.jsx-419124778 .item.jsx-419124778{text-align:center;padding-top:50px;min-height:425px;}.projects-clean.jsx-419124778 .item.jsx-419124778 .name.jsx-419124778{font-weight:700;margin-top:28px;margin-bottom:8px;color:inherit;}.projects-clean.jsx-419124778 .item.jsx-419124778 .description.jsx-419124778{font-size:15px;margin-top:15px;margin-bottom:0;}.projects-horizontal.jsx-419124778{color:#313437;background-color:#fff;}.projects-horizontal.jsx-419124778 p.jsx-419124778{color:#7d8285;}.projects-horizontal.jsx-419124778 h2.jsx-419124778{font-weight:700;margin-bottom:40px;padding-top:40px;color:inherit;}@media (max-width:767px){.projects-horizontal.jsx-419124778 h2.jsx-419124778{margin-bottom:25px;padding-top:25px;font-size:24px;}}.projects-horizontal.jsx-419124778 .intro.jsx-419124778{font-size:16px;max-width:500px;margin:0 auto 10px;}.projects-horizontal.jsx-419124778 .item.jsx-419124778{padding-top:60px;min-height:160px;}@media (max-width:767px){.projects-horizontal.jsx-419124778 .item.jsx-419124778{padding-top:40px;min-height:160px;}}.projects-horizontal.jsx-419124778 .item.jsx-419124778 .name.jsx-419124778{font-size:18px;font-weight:700;margin-top:10px;margin-bottom:15px;color:inherit;}@media (max-width:991px){.projects-horizontal.jsx-419124778 .item.jsx-419124778 .name.jsx-419124778{margin-top:22px;}}.projects-horizontal.jsx-419124778 .item.jsx-419124778 .description.jsx-419124778{font-size:15px;margin-bottom:0;}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3RydW9uZ2R1Y2h1eTkxMC9hcHBzL3F1YW5nZGFjYW1lcmEuY29tL2FwcC9jb21wb25lbnRzL05hdi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFNa0IsQUFHMEIsQUFLTCxBQVFLLEFBR0QsQUFLSixBQUdRLEFBSUgsQUFhSCxBQUdJLEFBT3FDLEFBTzlCLEFBSVIsQUFTQyxBQUlGLEFBR2dDLEFBSzNCLEFBSVEsQUFJTCxBQUtSLEFBS0gsQUFHMkIsQUFJdkIsQUFJTyxBQUtSLEFBSVcsQUFJVCxBQU9GLEFBS0ssQUFJdUIsQUFXL0IsQUFHRyxBQUdPLEFBV1EsQUFHYixBQUtFLEFBS1AsQUFTUSxBQU1ZLEFBTWQsQUFHQyxBQU1QLEFBSU8sQUFZUCxBQVdLLEFBVUEsQUFJTCxBQUdHLEFBR0YsQUFNTSxBQUtILEFBR0csQUFLSSxBQUlBLEFBSVAsQUFNRCxBQU1JLEFBSUosQUFJVyxBQUlULEFBT0csQUFJdUIsQUFLMUIsQUFRSSxBQUlOLEFBS0UsQUFJUyxBQU1YLEFBTUEsQUFJSCxBQUljLEFBSVgsQUFJSyxBQVFOLEFBSXVCLEFBS3RCLEFBR2EsQUFHYixBQUlBLEFBR0UsQUFPSyxBQU1OLEFBS0MsQUFHRSxBQUtGLEFBTUQsQUFLRCxBQUlBLEFBR0UsQUFPSyxBQU1OLEFBS0UsQUFLRSxBQUtKLEFBUUcsQUFJSCxVQW5lQyxBQWdCbEIsQ0FnRkEsQUFtREEsQUE4QmlCLEFBOEJILEFBZ0JVLEFBeUJ4QixBQThHK0IsQUFvQjdCLENBdFZGLEFBME51QixFQW5QQSxBQTJEdkIsQUFxQnNCLEFBcUJ0QixBQWVnQixBQXVCaEIsQUFxR0EsQUFvQ2tCLEFBVWxCLEFBd0J1QixBQVlQLEFBZUUsQUFNbEIsQUFZQSxBQXFCQSxBQU13QixBQUl4QixBQXdDd0IsQUFJeEIsQ0E5YndCLEFBYXhCLEFBZWEsQUFrQ1MsQUE4Q3RCLEFBa0tBLEFBZ0JrQixBQW9JQSxBQW1CQSxBQXlCQSxBQWVBLEFBWUEsQ0E3YkUsQUEyQkosQUFzRDBCLEFBK0N0QixBQUtBLEFBOERFLEFBVU4sQUE2REUsQUFpQ0YsQUE4REssQUFrQnJCLEFBUWtCLEFBa0JHLEFBb0NuQixDQWxac0IsQUE0R0QsQUFZdkIsQUFrSHdCLEFBc0pMLEFBS0UsQ0FoY0MsQUFzTEosQUFVTixBQWlEQyxBQVFBLEFBeUJRLEFBZ0lGLENBalNuQixBQThPQSxBQXFDcUIsQUE0Q0EsQ0E3V0ksQUFxQkEsQUE4TnpCLENBcFJFLEFBb0dVLENBd0haLEFBSUEsQ0FyRUEsRUE5SGEsQUFrQ2tCLEFBeUxBLEFBeUNsQixBQW9CYixDQXpXb0IsQUF1Qk4sQUEwSkMsRUFsRGYsQUFnRWlCLEFBb0JKLEFBMEhiLENBMUtBLEFBaUdBLEFBUUEsQ0ExTUEsQUFrTEEsQUEyQ2lCLEFBbURqQixBQVVpQixDQW5NQSxBQWdJakIsQUFvSWdCLEFBbUJFLEFBeUJHLEFBZUgsQUFZbEIsQ0F4VEUsQUFxSXNCLEFBeUhKLENBM01BLEFBK0JBLEFBbUVNLEFBNERiLENBdFZJLEFBMkNmLEFBU3FCLEFBNEV2QixBQWtDYyxBQXFRZCxBQUtFLENBMVp1QixBQXlDekIsQUE4U21CLEFBcUJBLEFBdUJBLENBbFFDLEFBZ0RLLEFBNEd6QixBQW1EQSxBQWNtQixBQThCbkIsQUFjbUIsQ0F4Y0gsQUFtRmQsQUF1TkYsQUFtQkUsQUFHQSxDQXhTRixBQUttQixDQStHRSxBQTJDQSxBQWtDWCxDQWtKVixDQWhSRSxBQXFCQSxFQW5Da0IsQUF3SEMsQ0EvTEosQUE2WFUsQ0E5RkwsQUE2REEsQUFpRXRCLENBcFFjLEFBZ0RTLENBV0gsQUE0TnBCLEFBd0NxQixFQWpiUixDQW1ZRyxBQStCaEIsQ0E5Y0EsQUFpRDJCLEFBbUxmLEFBK0JDLEFBeUpYLEFBNENBLENBelFBLEFBc05jLEFBcUJoQixBQXVCZ0IsQ0FyVVEsQ0FKeEIsQUF5TEEsQUFLb0IsQ0F6UkcsQUF5U0wsR0F4UUwsQUE4RUcsQUFtQnNCLEFBd0JwQixDQWpMQSxBQXlPTCxDQWxNSyxDQWdDbEIsQUF3SmMsQ0FoQ0ksQUErRGxCLEFBcUlBLEVBMVhjLEFBaWFkLENBdE5VLEFBMkVWLEFBNkRBLENBb0RBLEFBNENBLEFBNEJnQixDQS9RaEIsRUFoSmtCLEFBd1FoQixDQXZGZ0IsRUFuR0EsQUEwS2xCLENBNUZ3QixBQVdiLENBOUNPLENBakxBLEFBc0hFLENBN0dwQixBQWNvQixBQWdCcEIsQUFJc0IsRUFvSnRCLEVBeVJBLEVBeFBhLEVBdkliLENBaENrQixDQWlMQSxFQW5HQyxFQTJDbkIsQ0FqTEEsRUFzSEEsQUEwRzJCLENBek1QLEFBaUlGLENBNERBLENBekswQixLQWM5QixDQWlMQSxBQWlKZCxHQXBQd0IsS0FrQk4sQ0E0RG9ELENBN0w5QyxDQWtDeEIsQ0FpTGtCLFlBakZGLENBbEJDLEdBb0dqQixJQW5OZSxHQW1CZixHQStHc0MsRUFsQkYsS0EvR3BCLGNBQ0QsYUFDZixLQTBMd0IsQ0FXVixZQUNkLFNBWEEsaUJBN0VZLEVBa0JaLFFBakJBIiwiZmlsZSI6Ii9ob21lL3RydW9uZ2R1Y2h1eTkxMC9hcHBzL3F1YW5nZGFjYW1lcmEuY29tL2FwcC9jb21wb25lbnRzL05hdi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBMaW5rIGZyb20gXCJuZXh0L2xpbmtcIjtcbmltcG9ydCB7IEdxbCB9IGZyb20gXCIuLi9tb2R1bGVzXCI7XG5pbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBQb3N0cygpIHtcbiAgcmV0dXJuIChcbiAgICA8ZGl2PlxuICAgICAgPHN0eWxlIGpzeD57YFxuICAgICAgICAuZm9vdGVyLWJhc2ljIHtcbiAgICAgICAgICBwYWRkaW5nOiA0MHB4IDA7XG4gICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcbiAgICAgICAgICBjb2xvcjogIzRiNGM0ZDtcbiAgICAgICAgfVxuICAgICAgICAuZm9vdGVyLWJhc2ljIHVsIHtcbiAgICAgICAgICBwYWRkaW5nOiAwO1xuICAgICAgICAgIGxpc3Qtc3R5bGU6IG5vbmU7XG4gICAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgICAgIGZvbnQtc2l6ZTogMThweDtcbiAgICAgICAgICBsaW5lLWhlaWdodDogMS42O1xuICAgICAgICAgIG1hcmdpbi1ib3R0b206IDA7XG4gICAgICAgIH1cbiAgICAgICAgLmZvb3Rlci1iYXNpYyBsaSB7XG4gICAgICAgICAgcGFkZGluZzogMCAxMHB4O1xuICAgICAgICB9XG4gICAgICAgIC5mb290ZXItYmFzaWMgdWwgYSB7XG4gICAgICAgICAgY29sb3I6IGluaGVyaXQ7XG4gICAgICAgICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICAgICAgICAgIG9wYWNpdHk6IDAuODtcbiAgICAgICAgfVxuICAgICAgICAuZm9vdGVyLWJhc2ljIHVsIGE6aG92ZXIge1xuICAgICAgICAgIG9wYWNpdHk6IDE7XG4gICAgICAgIH1cbiAgICAgICAgLmZvb3Rlci1iYXNpYyAuc29jaWFsIHtcbiAgICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgICAgICAgcGFkZGluZy1ib3R0b206IDI1cHg7XG4gICAgICAgIH1cbiAgICAgICAgLmZvb3Rlci1iYXNpYyAuc29jaWFsID4gYSB7XG4gICAgICAgICAgZm9udC1zaXplOiAyNHB4O1xuICAgICAgICAgIHdpZHRoOiA0MHB4O1xuICAgICAgICAgIGhlaWdodDogNDBweDtcbiAgICAgICAgICBsaW5lLWhlaWdodDogNDBweDtcbiAgICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICAgICAgICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xuICAgICAgICAgIG1hcmdpbjogMCA4cHg7XG4gICAgICAgICAgY29sb3I6IGluaGVyaXQ7XG4gICAgICAgICAgb3BhY2l0eTogMC43NTtcbiAgICAgICAgfVxuICAgICAgICAuZm9vdGVyLWJhc2ljIC5zb2NpYWwgPiBhOmhvdmVyIHtcbiAgICAgICAgICBvcGFjaXR5OiAwLjk7XG4gICAgICAgIH1cbiAgICAgICAgLmZvb3Rlci1iYXNpYyAuY29weXJpZ2h0IHtcbiAgICAgICAgICBtYXJnaW4tdG9wOiAxNXB4O1xuICAgICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgICAgICBmb250LXNpemU6IDEzcHg7XG4gICAgICAgICAgY29sb3I6ICNhYWE7XG4gICAgICAgICAgbWFyZ2luLWJvdHRvbTogMDtcbiAgICAgICAgfVxuICAgICAgICAuaGVhZGVyLWJsdWUge1xuICAgICAgICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxMzVkZWcsICMxNzJhNzQsICMyMWE5YWYpO1xuICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICMxODRlOGU7XG4gICAgICAgICAgcGFkZGluZy1ib3R0b206IDgwcHg7XG4gICAgICAgICAgZm9udC1mYW1pbHk6IFwiU291cmNlIFNhbnMgUHJvXCIsIHNhbnMtc2VyaWY7XG4gICAgICAgIH1cbiAgICAgICAgQG1lZGlhIChtaW4td2lkdGg6IDc2OHB4KSB7XG4gICAgICAgICAgLmhlYWRlci1ibHVlIHtcbiAgICAgICAgICAgIHBhZGRpbmctYm90dG9tOiAxMjBweDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLmhlYWRlci1ibHVlIC5uYXZiYXIge1xuICAgICAgICAgIGJhY2tncm91bmQ6IDAgMDtcbiAgICAgICAgICBwYWRkaW5nLXRvcDogMC43NXJlbTtcbiAgICAgICAgICBwYWRkaW5nLWJvdHRvbTogMC43NXJlbTtcbiAgICAgICAgICBjb2xvcjogI2ZmZjtcbiAgICAgICAgICBib3JkZXItcmFkaXVzOiAwO1xuICAgICAgICAgIGJveC1zaGFkb3c6IG5vbmU7XG4gICAgICAgICAgYm9yZGVyOiBub25lO1xuICAgICAgICB9XG4gICAgICAgIC5oZWFkZXItYmx1ZSAubmF2YmFyIC5uYXZiYXItYnJhbmQge1xuICAgICAgICAgIGZvbnQtd2VpZ2h0OiA3MDA7XG4gICAgICAgICAgY29sb3I6IGluaGVyaXQ7XG4gICAgICAgIH1cbiAgICAgICAgLmhlYWRlci1ibHVlIC5uYXZiYXIgLm5hdmJhci1icmFuZDpob3ZlciB7XG4gICAgICAgICAgY29sb3I6ICNmMGYwZjA7XG4gICAgICAgIH1cbiAgICAgICAgLmhlYWRlci1ibHVlIC5uYXZiYXIgLm5hdmJhci1jb2xsYXBzZSB7XG4gICAgICAgICAgYm9yZGVyLXRvcDogMXB4IHNvbGlkIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4zKTtcbiAgICAgICAgICBtYXJnaW4tdG9wOiAwLjVyZW07XG4gICAgICAgIH1cbiAgICAgICAgQG1lZGlhIChtaW4td2lkdGg6IDc2OHB4KSB7XG4gICAgICAgICAgLmhlYWRlci1ibHVlIC5uYXZiYXIge1xuICAgICAgICAgICAgcGFkZGluZy10b3A6IDFyZW07XG4gICAgICAgICAgICBwYWRkaW5nLWJvdHRvbTogMXJlbTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLmhlYWRlci1ibHVlIC5uYXZiYXIgLm5hdmJhci1jb2xsYXBzZSB7XG4gICAgICAgICAgICBib3JkZXItY29sb3I6IHRyYW5zcGFyZW50O1xuICAgICAgICAgICAgbWFyZ2luOiAwO1xuICAgICAgICAgIH1cbiAgICAgICAgICAuaGVhZGVyLWJsdWUgLm5hdmJhci1uYXYgLm5hdi1saW5rIHtcbiAgICAgICAgICAgIHBhZGRpbmctbGVmdDogMC43cmVtO1xuICAgICAgICAgICAgcGFkZGluZy1yaWdodDogMC43cmVtO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAuaGVhZGVyLWJsdWUgLm5hdmJhciAubmF2YmFyLWNvbGxhcHNlIHNwYW4gLmxvZ2luIHtcbiAgICAgICAgICBjb2xvcjogI2Q5ZDlkOTtcbiAgICAgICAgICBtYXJnaW4tcmlnaHQ6IDAuNXJlbTtcbiAgICAgICAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG4gICAgICAgIH1cbiAgICAgICAgLmhlYWRlci1ibHVlIC5uYXZiYXIgLm5hdmJhci1jb2xsYXBzZSBzcGFuIC5sb2dpbjpob3ZlciB7XG4gICAgICAgICAgY29sb3I6ICNmZmY7XG4gICAgICAgIH1cbiAgICAgICAgLmhlYWRlci1ibHVlIC5uYXZiYXIgLm5hdmJhci10b2dnbGVyIHtcbiAgICAgICAgICBib3JkZXItY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4zKTtcbiAgICAgICAgfVxuICAgICAgICAuaGVhZGVyLWJsdWUgLm5hdmJhciAubmF2YmFyLXRvZ2dsZXI6aG92ZXIsXG4gICAgICAgIC5oZWFkZXItYmx1ZSAubmF2YmFyLXRvZ2dsZXI6Zm9jdXMge1xuICAgICAgICAgIGJhY2tncm91bmQ6IDAgMDtcbiAgICAgICAgfVxuICAgICAgICBAbWVkaWEgKG1pbi13aWR0aDogOTkycHgpIHtcbiAgICAgICAgICAuaGVhZGVyLWJsdWUgLm5hdmJhci1uYXYgLm5hdi1saW5rIHtcbiAgICAgICAgICAgIHBhZGRpbmctbGVmdDogMS4ycmVtO1xuICAgICAgICAgICAgcGFkZGluZy1yaWdodDogMS4ycmVtO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAuaGVhZGVyLWJsdWUgLm5hdmJhci5uYXZiYXItbGlnaHQgLm5hdmJhci1uYXYgLm5hdi1saW5rIHtcbiAgICAgICAgICBjb2xvcjogI2Q5ZDlkOTtcbiAgICAgICAgfVxuICAgICAgICAuaGVhZGVyLWJsdWUgLm5hdmJhci5uYXZiYXItbGlnaHQgLm5hdmJhci1uYXYgLm5hdi1saW5rOmZvY3VzLFxuICAgICAgICAuaGVhZGVyLWJsdWUgLm5hdmJhci5uYXZiYXItbGlnaHQgLm5hdmJhci1uYXYgLm5hdi1saW5rOmhvdmVyIHtcbiAgICAgICAgICBjb2xvcjogI2ZjZmVmZiAhaW1wb3J0YW50O1xuICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICAgICAgICB9XG4gICAgICAgIC5oZWFkZXItYmx1ZSAubmF2YmFyIC5uYXZiYXItbmF2ID4gbGkgPiAuZHJvcGRvd24tbWVudSB7XG4gICAgICAgICAgbWFyZ2luLXRvcDogLTVweDtcbiAgICAgICAgICBib3gtc2hhZG93OiAwIDRweCA4cHggcmdiYSgwLCAwLCAwLCAwLjEpO1xuICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XG4gICAgICAgICAgYm9yZGVyLXJhZGl1czogMnB4O1xuICAgICAgICB9XG4gICAgICAgIC5oZWFkZXItYmx1ZSAubmF2YmFyIC5kcm9wZG93bi1tZW51IC5kcm9wZG93bi1pdGVtLFxuICAgICAgICAuaGVhZGVyLWJsdWUgLm5hdmJhciAuZHJvcGRvd24tbWVudSAuZHJvcGRvd24taXRlbTpmb2N1cyB7XG4gICAgICAgICAgbGluZS1oZWlnaHQ6IDI7XG4gICAgICAgICAgY29sb3I6ICMzNzQzNGQ7XG4gICAgICAgIH1cbiAgICAgICAgLmhlYWRlci1ibHVlIC5uYXZiYXIgLmRyb3Bkb3duLW1lbnUgLmRyb3Bkb3duLWl0ZW06Zm9jdXMsXG4gICAgICAgIC5oZWFkZXItYmx1ZSAubmF2YmFyIC5kcm9wZG93bi1tZW51IC5kcm9wZG93bi1pdGVtOmhvdmVyIHtcbiAgICAgICAgICBiYWNrZ3JvdW5kOiAjZWJlZmYxO1xuICAgICAgICB9XG4gICAgICAgIC5oZWFkZXItYmx1ZSAuYWN0aW9uLWJ1dHRvbixcbiAgICAgICAgLmhlYWRlci1ibHVlIC5hY3Rpb24tYnV0dG9uOm5vdCguZGlzYWJsZWQpOmFjdGl2ZSB7XG4gICAgICAgICAgYm9yZGVyOiAxcHggc29saWQgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjcpO1xuICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDQwcHg7XG4gICAgICAgICAgY29sb3I6ICNlYmVmZjE7XG4gICAgICAgICAgYm94LXNoYWRvdzogbm9uZTtcbiAgICAgICAgICB0ZXh0LXNoYWRvdzogbm9uZTtcbiAgICAgICAgICBwYWRkaW5nOiAwLjNyZW0gMC44cmVtO1xuICAgICAgICAgIGJhY2tncm91bmQ6IDAgMDtcbiAgICAgICAgICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kLWNvbG9yIDAuMjVzO1xuICAgICAgICAgIG91dGxpbmU6IDA7XG4gICAgICAgIH1cbiAgICAgICAgLmhlYWRlci1ibHVlIC5hY3Rpb24tYnV0dG9uOmhvdmVyIHtcbiAgICAgICAgICBjb2xvcjogI2ZmZjtcbiAgICAgICAgfVxuICAgICAgICAuaGVhZGVyLWJsdWUgLm5hdmJhciAuZm9ybS1pbmxpbmUgbGFiZWwge1xuICAgICAgICAgIGNvbG9yOiAjZDlkOWQ5O1xuICAgICAgICB9XG4gICAgICAgIC5oZWFkZXItYmx1ZSAubmF2YmFyIC5mb3JtLWlubGluZSAuc2VhcmNoLWZpZWxkIHtcbiAgICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgICAgICAgd2lkdGg6IDgwJTtcbiAgICAgICAgICBiYWNrZ3JvdW5kOiAwIDA7XG4gICAgICAgICAgYm9yZGVyOiBub25lO1xuICAgICAgICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCB0cmFuc3BhcmVudDtcbiAgICAgICAgICBib3JkZXItcmFkaXVzOiAwO1xuICAgICAgICAgIGJveC1zaGFkb3c6IG5vbmU7XG4gICAgICAgICAgY29sb3I6IGluaGVyaXQ7XG4gICAgICAgICAgdHJhbnNpdGlvbjogYm9yZGVyLWJvdHRvbS1jb2xvciAwLjNzO1xuICAgICAgICB9XG4gICAgICAgIC5oZWFkZXItYmx1ZSAubmF2YmFyIC5mb3JtLWlubGluZSAuc2VhcmNoLWZpZWxkOmZvY3VzIHtcbiAgICAgICAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2NjYztcbiAgICAgICAgfVxuICAgICAgICAuaGVhZGVyLWJsdWUgLmhlcm8ge1xuICAgICAgICAgIG1hcmdpbi10b3A6IDIwcHg7XG4gICAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgICB9XG4gICAgICAgIEBtZWRpYSAobWluLXdpZHRoOiA3NjhweCkge1xuICAgICAgICAgIC5oZWFkZXItYmx1ZSAuaGVybyB7XG4gICAgICAgICAgICBtYXJnaW4tdG9wOiA2MHB4O1xuICAgICAgICAgICAgdGV4dC1hbGlnbjogbGVmdDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLmhlYWRlci1ibHVlIC5oZXJvIGgxIHtcbiAgICAgICAgICBjb2xvcjogI2ZmZjtcbiAgICAgICAgICBmb250LXNpemU6IDQwcHg7XG4gICAgICAgICAgbWFyZ2luLXRvcDogMDtcbiAgICAgICAgICBtYXJnaW4tYm90dG9tOiAxNXB4O1xuICAgICAgICAgIGZvbnQtd2VpZ2h0OiAzMDA7XG4gICAgICAgICAgbGluZS1oZWlnaHQ6IDEuNDtcbiAgICAgICAgfVxuICAgICAgICBAbWVkaWEgKG1pbi13aWR0aDogOTkycHgpIHtcbiAgICAgICAgICAuaGVhZGVyLWJsdWUgLmhlcm8gaDEge1xuICAgICAgICAgICAgbWFyZ2luLXRvcDogMTkwcHg7XG4gICAgICAgICAgICBtYXJnaW4tYm90dG9tOiAyNHB4O1xuICAgICAgICAgICAgbGluZS1oZWlnaHQ6IDEuMjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLmhlYWRlci1ibHVlIC5oZXJvIHAge1xuICAgICAgICAgIGNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuOCk7XG4gICAgICAgICAgZm9udC1zaXplOiAyMHB4O1xuICAgICAgICAgIG1hcmdpbi1ib3R0b206IDMwcHg7XG4gICAgICAgICAgZm9udC13ZWlnaHQ6IDMwMDtcbiAgICAgICAgfVxuICAgICAgICAuaGVhZGVyLWJsdWUgLnBob25lLWhvbGRlciB7XG4gICAgICAgICAgdGV4dC1hbGlnbjogcmlnaHQ7XG4gICAgICAgIH1cbiAgICAgICAgLmhlYWRlci1ibHVlIGRpdi5pcGhvbmUtbW9ja3VwIHtcbiAgICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgICAgbWF4LXdpZHRoOiAzMDBweDtcbiAgICAgICAgICBtYXJnaW46IDIwcHg7XG4gICAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgICAgICB9XG4gICAgICAgIC5oZWFkZXItYmx1ZSAuaXBob25lLW1vY2t1cCBpbWcuZGV2aWNlIHtcbiAgICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgICBoZWlnaHQ6IGF1dG87XG4gICAgICAgIH1cbiAgICAgICAgLmhlYWRlci1ibHVlIC5pcGhvbmUtbW9ja3VwIC5zY3JlZW4ge1xuICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgICB3aWR0aDogODglO1xuICAgICAgICAgIGhlaWdodDogNzclO1xuICAgICAgICAgIHRvcDogMTIlO1xuICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDJweDtcbiAgICAgICAgICBsZWZ0OiA2JTtcbiAgICAgICAgICBib3JkZXI6IDFweCBzb2xpZCAjNDQ0O1xuICAgICAgICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgICAgICAgYmFja2dyb3VuZDogdXJsKC4uLy4uL2Fzc2V0cy9pbWcvc2NyZWVuLWNvbnRlbnQtaXBob25lLTYuanBnKSBjZW50ZXI7XG4gICAgICAgICAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcbiAgICAgICAgfVxuICAgICAgICAuaGVhZGVyLWJsdWUgLmlwaG9uZS1tb2NrdXAgLnNjcmVlbjpiZWZvcmUge1xuICAgICAgICAgIGNvbnRlbnQ6IFwiXCI7XG4gICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcbiAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgICAgd2lkdGg6IDcwJTtcbiAgICAgICAgICBoZWlnaHQ6IDE0MCU7XG4gICAgICAgICAgdG9wOiAtMTIlO1xuICAgICAgICAgIHJpZ2h0OiAtNjAlO1xuICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlKC0xOWRlZyk7XG4gICAgICAgICAgb3BhY2l0eTogMC4yO1xuICAgICAgICB9XG4gICAgICAgIC5uYXZpZ2F0aW9uLWNsZWFuIHtcbiAgICAgICAgICBiYWNrZ3JvdW5kOiAjZmZmO1xuICAgICAgICAgIHBhZGRpbmctdG9wOiAwLjc1cmVtO1xuICAgICAgICAgIHBhZGRpbmctYm90dG9tOiAwLjc1cmVtO1xuICAgICAgICAgIGNvbG9yOiAjMzMzO1xuICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDA7XG4gICAgICAgICAgYm94LXNoYWRvdzogbm9uZTtcbiAgICAgICAgICBib3JkZXI6IG5vbmU7XG4gICAgICAgICAgbWFyZ2luLWJvdHRvbTogMDtcbiAgICAgICAgfVxuICAgICAgICAubmF2aWdhdGlvbi1jbGVhbiAubmF2YmFyLWJyYW5kIHtcbiAgICAgICAgICBmb250LXdlaWdodDogNzAwO1xuICAgICAgICAgIGNvbG9yOiBpbmhlcml0O1xuICAgICAgICB9XG4gICAgICAgIC5uYXZpZ2F0aW9uLWNsZWFuIC5uYXZiYXItYnJhbmQ6aG92ZXIge1xuICAgICAgICAgIGNvbG9yOiAjMjIyO1xuICAgICAgICB9XG4gICAgICAgIC5uYXZpZ2F0aW9uLWNsZWFuLm5hdmJhci1kYXJrIC5uYXZiYXItYnJhbmQ6aG92ZXIge1xuICAgICAgICAgIGNvbG9yOiAjZjBmMGYwO1xuICAgICAgICB9XG4gICAgICAgIC5uYXZpZ2F0aW9uLWNsZWFuIC5uYXZiYXItYnJhbmQgaW1nIHtcbiAgICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgICAgICAgIG1hcmdpbi1yaWdodDogMTBweDtcbiAgICAgICAgICB3aWR0aDogYXV0bztcbiAgICAgICAgfVxuICAgICAgICAubmF2aWdhdGlvbi1jbGVhbiAubmF2YmFyLXRvZ2dsZXIge1xuICAgICAgICAgIGJvcmRlci1jb2xvcjogI2RkZDtcbiAgICAgICAgICBjb2xvcjogIzg4ODtcbiAgICAgICAgfVxuICAgICAgICAubmF2aWdhdGlvbi1jbGVhbiAubmF2YmFyLXRvZ2dsZXI6Zm9jdXMsXG4gICAgICAgIC5uYXZpZ2F0aW9uLWNsZWFuIC5uYXZiYXItdG9nZ2xlcjpob3ZlciB7XG4gICAgICAgICAgYmFja2dyb3VuZDogMCAwO1xuICAgICAgICB9XG4gICAgICAgIC5uYXZpZ2F0aW9uLWNsZWFuLm5hdmJhci1kYXJrIC5uYXZiYXItdG9nZ2xlciB7XG4gICAgICAgICAgYm9yZGVyLWNvbG9yOiAjNTU1O1xuICAgICAgICAgIGNvbG9yOiAjZWVlO1xuICAgICAgICB9XG4gICAgICAgIC5uYXZpZ2F0aW9uLWNsZWFuIC5mb3JtLWlubGluZSxcbiAgICAgICAgLm5hdmlnYXRpb24tY2xlYW4gLm5hdmJhci1jb2xsYXBzZSB7XG4gICAgICAgICAgYm9yZGVyLXRvcC1jb2xvcjogI2RkZDtcbiAgICAgICAgfVxuICAgICAgICAubmF2aWdhdGlvbi1jbGVhbi5uYXZiYXItZGFyayAuZm9ybS1pbmxpbmUsXG4gICAgICAgIC5uYXZpZ2F0aW9uLWNsZWFuLm5hdmJhci1kYXJrIC5uYXZiYXItY29sbGFwc2Uge1xuICAgICAgICAgIGJvcmRlci10b3AtY29sb3I6ICMzMzM7XG4gICAgICAgIH1cbiAgICAgICAgLm5hdmlnYXRpb24tY2xlYW4gLm5hdmJhci1uYXYgPiAuYWN0aXZlID4gYSxcbiAgICAgICAgLm5hdmlnYXRpb24tY2xlYW4gLm5hdmJhci1uYXYgPiAuc2hvdyA+IGEge1xuICAgICAgICAgIGJhY2tncm91bmQ6IDAgMDtcbiAgICAgICAgICBib3gtc2hhZG93OiBub25lO1xuICAgICAgICB9XG4gICAgICAgIC5uYXZpZ2F0aW9uLWNsZWFuLm5hdmJhci1saWdodCAubmF2YmFyLW5hdiAubmF2LWxpbmsuYWN0aXZlLFxuICAgICAgICAubmF2aWdhdGlvbi1jbGVhbi5uYXZiYXItbGlnaHQgLm5hdmJhci1uYXYgLm5hdi1saW5rLmFjdGl2ZTpmb2N1cyxcbiAgICAgICAgLm5hdmlnYXRpb24tY2xlYW4ubmF2YmFyLWxpZ2h0IC5uYXZiYXItbmF2IC5uYXYtbGluay5hY3RpdmU6aG92ZXIge1xuICAgICAgICAgIGNvbG9yOiAjOGY4ZjhmO1xuICAgICAgICAgIGJveC1zaGFkb3c6IG5vbmU7XG4gICAgICAgICAgYmFja2dyb3VuZDogMCAwO1xuICAgICAgICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICAgICAgICB9XG4gICAgICAgIC5uYXZpZ2F0aW9uLWNsZWFuLm5hdmJhciAubmF2YmFyLW5hdiAubmF2LWxpbmsge1xuICAgICAgICAgIHBhZGRpbmctbGVmdDogMThweDtcbiAgICAgICAgICBwYWRkaW5nLXJpZ2h0OiAxOHB4O1xuICAgICAgICB9XG4gICAgICAgIC5uYXZpZ2F0aW9uLWNsZWFuLm5hdmJhci1saWdodCAubmF2YmFyLW5hdiAubmF2LWxpbmsge1xuICAgICAgICAgIGNvbG9yOiAjNDY1NzY1O1xuICAgICAgICB9XG4gICAgICAgIC5uYXZpZ2F0aW9uLWNsZWFuLm5hdmJhci1saWdodCAubmF2YmFyLW5hdiAubmF2LWxpbms6Zm9jdXMsXG4gICAgICAgIC5uYXZpZ2F0aW9uLWNsZWFuLm5hdmJhci1saWdodCAubmF2YmFyLW5hdiAubmF2LWxpbms6aG92ZXIge1xuICAgICAgICAgIGNvbG9yOiAjMzc0MzRkICFpbXBvcnRhbnQ7XG4gICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgICAgIH1cbiAgICAgICAgLm5hdmlnYXRpb24tY2xlYW4gLm5hdmJhci1uYXYgPiBsaSA+IC5kcm9wZG93bi1tZW51IHtcbiAgICAgICAgICBtYXJnaW4tdG9wOiAtNXB4O1xuICAgICAgICAgIGJveC1zaGFkb3c6IG5vbmU7XG4gICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcbiAgICAgICAgICBib3JkZXItcmFkaXVzOiAycHg7XG4gICAgICAgIH1cbiAgICAgICAgQG1lZGlhIChtaW4td2lkdGg6IDc2OHB4KSB7XG4gICAgICAgICAgLm5hdmlnYXRpb24tY2xlYW4ge1xuICAgICAgICAgICAgcGFkZGluZy10b3A6IDFyZW07XG4gICAgICAgICAgICBwYWRkaW5nLWJvdHRvbTogMXJlbTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLm5hdmlnYXRpb24tY2xlYW4gLm5hdmJhci1uYXYgLnNob3cgLmRyb3Bkb3duLW1lbnUge1xuICAgICAgICAgICAgYm94LXNoYWRvdzogMCA0cHggOHB4IHJnYmEoMCwgMCwgMCwgMC4xKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgQG1lZGlhIChtYXgtd2lkdGg6IDc2N3B4KSB7XG4gICAgICAgICAgLm5hdmlnYXRpb24tY2xlYW4gLm5hdmJhci1uYXYgLnNob3cgLmRyb3Bkb3duLW1lbnUgLmRyb3Bkb3duLWl0ZW0ge1xuICAgICAgICAgICAgY29sb3I6ICMzNzQzNGQ7XG4gICAgICAgICAgICBwYWRkaW5nLXRvcDogMC44cmVtO1xuICAgICAgICAgICAgcGFkZGluZy1ib3R0b206IDAuOHJlbTtcbiAgICAgICAgICAgIGxpbmUtaGVpZ2h0OiAxO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAucHJvamVjdHMtY2xlYW4gLnByb2plY3RzLFxuICAgICAgICAucHJvamVjdHMtaG9yaXpvbnRhbCAucHJvamVjdHMge1xuICAgICAgICAgIHBhZGRpbmctYm90dG9tOiA0MHB4O1xuICAgICAgICB9XG4gICAgICAgIC5uYXZpZ2F0aW9uLWNsZWFuIC5kcm9wZG93bi1tZW51IC5kcm9wZG93bi1pdGVtLFxuICAgICAgICAubmF2aWdhdGlvbi1jbGVhbiAuZHJvcGRvd24tbWVudSAuZHJvcGRvd24taXRlbTpmb2N1cyB7XG4gICAgICAgICAgbGluZS1oZWlnaHQ6IDI7XG4gICAgICAgICAgY29sb3I6ICMzNzQzNGQ7XG4gICAgICAgIH1cbiAgICAgICAgLm5hdmlnYXRpb24tY2xlYW4gLmRyb3Bkb3duLW1lbnUgLmRyb3Bkb3duLWl0ZW06Zm9jdXMsXG4gICAgICAgIC5uYXZpZ2F0aW9uLWNsZWFuIC5kcm9wZG93bi1tZW51IC5kcm9wZG93bi1pdGVtOmhvdmVyIHtcbiAgICAgICAgICBiYWNrZ3JvdW5kOiAjZWVlO1xuICAgICAgICAgIGNvbG9yOiBpbmhlcml0O1xuICAgICAgICB9XG4gICAgICAgIC5uYXZpZ2F0aW9uLWNsZWFuLm5hdmJhci1kYXJrIHtcbiAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMWYyMDIxO1xuICAgICAgICAgIGNvbG9yOiAjZmZmO1xuICAgICAgICB9XG4gICAgICAgIC5uYXZpZ2F0aW9uLWNsZWFuLm5hdmJhci1kYXJrIC5uYXZiYXItbmF2IGEuYWN0aXZlLFxuICAgICAgICAubmF2aWdhdGlvbi1jbGVhbi5uYXZiYXItZGFyayAubmF2YmFyLW5hdiBhLmFjdGl2ZTpmb2N1cyxcbiAgICAgICAgLm5hdmlnYXRpb24tY2xlYW4ubmF2YmFyLWRhcmsgLm5hdmJhci1uYXYgYS5hY3RpdmU6aG92ZXIge1xuICAgICAgICAgIGNvbG9yOiAjOGY4ZjhmO1xuICAgICAgICAgIGJveC1zaGFkb3c6IG5vbmU7XG4gICAgICAgICAgYmFja2dyb3VuZDogMCAwO1xuICAgICAgICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICAgICAgICB9XG4gICAgICAgIC5uYXZpZ2F0aW9uLWNsZWFuLm5hdmJhci1kYXJrIC5uYXZiYXItbmF2IC5uYXYtbGluayB7XG4gICAgICAgICAgY29sb3I6ICNkZmU4ZWU7XG4gICAgICAgIH1cbiAgICAgICAgLm5hdmlnYXRpb24tY2xlYW4ubmF2YmFyLWRhcmsgLm5hdmJhci1uYXYgLm5hdi1saW5rOmZvY3VzLFxuICAgICAgICAubmF2aWdhdGlvbi1jbGVhbi5uYXZiYXItZGFyayAubmF2YmFyLW5hdiAubmF2LWxpbms6aG92ZXIge1xuICAgICAgICAgIGNvbG9yOiAjZmZmO1xuICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICAgICAgICB9XG4gICAgICAgIC5uYXZpZ2F0aW9uLWNsZWFuLm5hdmJhci1kYXJrIC5uYXZiYXItbmF2ID4gbGkgPiAuZHJvcGRvd24tbWVudSB7XG4gICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzFmMjAyMTtcbiAgICAgICAgfVxuICAgICAgICAubmF2aWdhdGlvbi1jbGVhbi5uYXZiYXItZGFyayAuZHJvcGRvd24tbWVudSAuZHJvcGRvd24taXRlbSxcbiAgICAgICAgLm5hdmlnYXRpb24tY2xlYW4ubmF2YmFyLWRhcmsgLmRyb3Bkb3duLW1lbnUgLmRyb3Bkb3duLWl0ZW06Zm9jdXMge1xuICAgICAgICAgIGNvbG9yOiAjZjJmNWY4O1xuICAgICAgICB9XG4gICAgICAgIC5uYXZpZ2F0aW9uLWNsZWFuLm5hdmJhci1kYXJrIC5kcm9wZG93bi1tZW51IC5kcm9wZG93bi1pdGVtOmZvY3VzLFxuICAgICAgICAubmF2aWdhdGlvbi1jbGVhbi5uYXZiYXItZGFyayAuZHJvcGRvd24tbWVudSAuZHJvcGRvd24taXRlbTpob3ZlciB7XG4gICAgICAgICAgYmFja2dyb3VuZDogIzM2MzczOTtcbiAgICAgICAgfVxuICAgICAgICBAbWVkaWEgKG1heC13aWR0aDogNzY3cHgpIHtcbiAgICAgICAgICAubmF2aWdhdGlvbi1jbGVhbi5uYXZiYXItZGFya1xuICAgICAgICAgICAgLm5hdmJhci1uYXZcbiAgICAgICAgICAgIC5zaG93XG4gICAgICAgICAgICAuZHJvcGRvd24tbWVudVxuICAgICAgICAgICAgLmRyb3Bkb3duLWl0ZW0ge1xuICAgICAgICAgICAgY29sb3I6ICNmZmY7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC5jYXRlZ29yeV9pdGVtOmhvdmVyIHtcbiAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMyk7XG4gICAgICAgICAgY29sb3I6ICNmZmY7XG4gICAgICAgICAgdHJhbnNpdGlvbi1kdXJhdGlvbjogMC4zcztcbiAgICAgICAgfVxuICAgICAgICAudGV4dC1kZWNvcmF0aW9uLW5vbmU6aG92ZXIge1xuICAgICAgICAgIGNvbG9yOiBpbmhlcml0O1xuICAgICAgICB9XG4gICAgICAgIC5kdXJhdGlvbiB7XG4gICAgICAgICAgdHJhbnNpdGlvbjogYmFja2dyb3VuZCAwLjVzO1xuICAgICAgICB9XG4gICAgICAgIC5wcm9qZWN0cy1jbGVhbiB7XG4gICAgICAgICAgY29sb3I6ICMzMTM0Mzc7XG4gICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcbiAgICAgICAgfVxuICAgICAgICAucHJvamVjdHMtY2xlYW4gcCB7XG4gICAgICAgICAgY29sb3I6ICM3ZDgyODU7XG4gICAgICAgIH1cbiAgICAgICAgLnByb2plY3RzLWNsZWFuIGgyIHtcbiAgICAgICAgICBmb250LXdlaWdodDogNzAwO1xuICAgICAgICAgIG1hcmdpbi1ib3R0b206IDQwcHg7XG4gICAgICAgICAgcGFkZGluZy10b3A6IDQwcHg7XG4gICAgICAgICAgY29sb3I6IGluaGVyaXQ7XG4gICAgICAgIH1cbiAgICAgICAgQG1lZGlhIChtYXgtd2lkdGg6IDc2N3B4KSB7XG4gICAgICAgICAgLnByb2plY3RzLWNsZWFuIGgyIHtcbiAgICAgICAgICAgIG1hcmdpbi1ib3R0b206IDI1cHg7XG4gICAgICAgICAgICBwYWRkaW5nLXRvcDogMjVweDtcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMjRweDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLnByb2plY3RzLWNsZWFuIC5pbnRybyB7XG4gICAgICAgICAgZm9udC1zaXplOiAxNnB4O1xuICAgICAgICAgIG1heC13aWR0aDogNTAwcHg7XG4gICAgICAgICAgbWFyZ2luOiAwIGF1dG87XG4gICAgICAgIH1cbiAgICAgICAgLnByb2plY3RzLWNsZWFuIC5pbnRybyBwIHtcbiAgICAgICAgICBtYXJnaW4tYm90dG9tOiAwO1xuICAgICAgICB9XG4gICAgICAgIC5wcm9qZWN0cy1jbGVhbiAuaXRlbSB7XG4gICAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgICAgIHBhZGRpbmctdG9wOiA1MHB4O1xuICAgICAgICAgIG1pbi1oZWlnaHQ6IDQyNXB4O1xuICAgICAgICB9XG4gICAgICAgIC5wcm9qZWN0cy1jbGVhbiAuaXRlbSAubmFtZSB7XG4gICAgICAgICAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgICAgICAgICBtYXJnaW4tdG9wOiAyOHB4O1xuICAgICAgICAgIG1hcmdpbi1ib3R0b206IDhweDtcbiAgICAgICAgICBjb2xvcjogaW5oZXJpdDtcbiAgICAgICAgfVxuICAgICAgICAucHJvamVjdHMtY2xlYW4gLml0ZW0gLmRlc2NyaXB0aW9uIHtcbiAgICAgICAgICBmb250LXNpemU6IDE1cHg7XG4gICAgICAgICAgbWFyZ2luLXRvcDogMTVweDtcbiAgICAgICAgICBtYXJnaW4tYm90dG9tOiAwO1xuICAgICAgICB9XG4gICAgICAgIC5wcm9qZWN0cy1ob3Jpem9udGFsIHtcbiAgICAgICAgICBjb2xvcjogIzMxMzQzNztcbiAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xuICAgICAgICB9XG4gICAgICAgIC5wcm9qZWN0cy1ob3Jpem9udGFsIHAge1xuICAgICAgICAgIGNvbG9yOiAjN2Q4Mjg1O1xuICAgICAgICB9XG4gICAgICAgIC5wcm9qZWN0cy1ob3Jpem9udGFsIGgyIHtcbiAgICAgICAgICBmb250LXdlaWdodDogNzAwO1xuICAgICAgICAgIG1hcmdpbi1ib3R0b206IDQwcHg7XG4gICAgICAgICAgcGFkZGluZy10b3A6IDQwcHg7XG4gICAgICAgICAgY29sb3I6IGluaGVyaXQ7XG4gICAgICAgIH1cbiAgICAgICAgQG1lZGlhIChtYXgtd2lkdGg6IDc2N3B4KSB7XG4gICAgICAgICAgLnByb2plY3RzLWhvcml6b250YWwgaDIge1xuICAgICAgICAgICAgbWFyZ2luLWJvdHRvbTogMjVweDtcbiAgICAgICAgICAgIHBhZGRpbmctdG9wOiAyNXB4O1xuICAgICAgICAgICAgZm9udC1zaXplOiAyNHB4O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAucHJvamVjdHMtaG9yaXpvbnRhbCAuaW50cm8ge1xuICAgICAgICAgIGZvbnQtc2l6ZTogMTZweDtcbiAgICAgICAgICBtYXgtd2lkdGg6IDUwMHB4O1xuICAgICAgICAgIG1hcmdpbjogMCBhdXRvIDEwcHg7XG4gICAgICAgIH1cbiAgICAgICAgLnByb2plY3RzLWhvcml6b250YWwgLml0ZW0ge1xuICAgICAgICAgIHBhZGRpbmctdG9wOiA2MHB4O1xuICAgICAgICAgIG1pbi1oZWlnaHQ6IDE2MHB4O1xuICAgICAgICB9XG4gICAgICAgIEBtZWRpYSAobWF4LXdpZHRoOiA3NjdweCkge1xuICAgICAgICAgIC5wcm9qZWN0cy1ob3Jpem9udGFsIC5pdGVtIHtcbiAgICAgICAgICAgIHBhZGRpbmctdG9wOiA0MHB4O1xuICAgICAgICAgICAgbWluLWhlaWdodDogMTYwcHg7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC5wcm9qZWN0cy1ob3Jpem9udGFsIC5pdGVtIC5uYW1lIHtcbiAgICAgICAgICBmb250LXNpemU6IDE4cHg7XG4gICAgICAgICAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgICAgICAgICBtYXJnaW4tdG9wOiAxMHB4O1xuICAgICAgICAgIG1hcmdpbi1ib3R0b206IDE1cHg7XG4gICAgICAgICAgY29sb3I6IGluaGVyaXQ7XG4gICAgICAgIH1cbiAgICAgICAgQG1lZGlhIChtYXgtd2lkdGg6IDk5MXB4KSB7XG4gICAgICAgICAgLnByb2plY3RzLWhvcml6b250YWwgLml0ZW0gLm5hbWUge1xuICAgICAgICAgICAgbWFyZ2luLXRvcDogMjJweDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLnByb2plY3RzLWhvcml6b250YWwgLml0ZW0gLmRlc2NyaXB0aW9uIHtcbiAgICAgICAgICBmb250LXNpemU6IDE1cHg7XG4gICAgICAgICAgbWFyZ2luLWJvdHRvbTogMDtcbiAgICAgICAgfVxuICAgICAgYH08L3N0eWxlPlxuICAgICAgPG5hdiBjbGFzcz1cIm5hdmJhciBuYXZiYXItbGlnaHQgbmF2YmFyLWV4cGFuZC1tZFwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyXCI+XG4gICAgICAgICAgPGEgY2xhc3M9XCJuYXZiYXItYnJhbmQgdGV4dC11cHBlcmNhc2UgdGV4dC1kYW5nZXJcIiBocmVmPVwiI1wiPlxuICAgICAgICAgICAgPGltZ1xuICAgICAgICAgICAgICBzcmM9XCIvaW1nLzczMTg4ODM4XzIzNjc5ODgyNzM1MTc5MTZfNjM5MTY0NzQ1MDg5Mjg2MTQ0MF9uLmpwZ1wiXG4gICAgICAgICAgICAgIHN0eWxlPVwiaGVpZ2h0OiA0MHB4O3dpZHRoOiA0MHB4O1wiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgJm5ic3A7UXXhuqNuZyDEkMOgIENhbWVyYVxuICAgICAgICAgIDwvYT5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLTYgY29sLXNtLTRcIj5cbiAgICAgICAgICAgICAgPGg2IGNsYXNzPVwidGV4dC1kYW5nZXJcIj5cbiAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhIGZhLW1hcC1tYXJrZXIgbXItMlwiPjwvaT7EkOG7i2EgY2jhu4kgMVxuICAgICAgICAgICAgICA8L2g2PlxuICAgICAgICAgICAgICA8aHIgLz5cbiAgICAgICAgICAgICAgPHAgZGF0YS1hb3M9XCJmYWRlLWRvd25cIj5cbiAgICAgICAgICAgICAgICBCw6xuaCDEkMOgbywgVGjEg25nIELDrG5oLCBRdeG6o25nIE5hbVxuICAgICAgICAgICAgICAgIDxiciAvPlxuICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtNiBjb2wtc20tNFwiPlxuICAgICAgICAgICAgICA8aDYgY2xhc3M9XCJ0ZXh0LWRhbmdlclwiPlxuICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmEgZmEtbWFwLW1hcmtlciBtci0yXCI+PC9pPsSQ4buLYSBjaOG7iSAyXG4gICAgICAgICAgICAgIDwvaDY+XG4gICAgICAgICAgICAgIDxociAvPlxuICAgICAgICAgICAgICA8cCBkYXRhLWFvcz1cImZhZGUtZG93blwiIGRhdGEtYW9zLWRlbGF5PVwiMTAwXCI+XG4gICAgICAgICAgICAgICAgVGh14bqtbiBBbiA0LCBUaGFuaCBLaMOqLCBUcC4gxJDDoCBO4bq1bmdcbiAgICAgICAgICAgICAgICA8YnIgLz5cbiAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLTEyIGNvbC1zbS00XCI+XG4gICAgICAgICAgICAgIDxoNiBjbGFzcz1cInRleHQtZGFuZ2VyXCI+XG4gICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYSBmYS1waG9uZSBtci0yXCI+PC9pPsSQaeG7h24gdGhv4bqhaVxuICAgICAgICAgICAgICA8L2g2PlxuICAgICAgICAgICAgICA8aHIgLz5cbiAgICAgICAgICAgICAgPHAgZGF0YS1hb3M9XCJmYWRlLWRvd25cIiBkYXRhLWFvcy1kZWxheT1cIjIwMFwiPlxuICAgICAgICAgICAgICAgIDA5MzUuNTg0LjU2OVxuICAgICAgICAgICAgICAgIDxiciAvPlxuICAgICAgICAgICAgICAgIDA4NjYuNDUzLjU4MFxuICAgICAgICAgICAgICAgIDxiciAvPlxuICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L25hdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn1cbiJdfQ== */\n/*@ sourceURL=/home/truongduchuy910/apps/quangdacamera.com/app/components/Nav.js */"), __jsx("nav", {
    "class": "navbar navbar-light navbar-expand-md",
    className: "jsx-419124778",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 502
    },
    __self: this
  }, __jsx("div", {
    "class": "container",
    className: "jsx-419124778",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 503
    },
    __self: this
  }, __jsx("a", {
    "class": "navbar-brand text-uppercase text-danger",
    href: "#",
    className: "jsx-419124778",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 504
    },
    __self: this
  }, __jsx("img", {
    src: "/img/73188838_2367988273517916_6391647450892861440_n.jpg",
    style: "height: 40px;width: 40px;",
    className: "jsx-419124778",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 505
    },
    __self: this
  }), "\xA0Qu\u1EA3ng \u0110\xE0 Camera"), __jsx("div", {
    "class": "row",
    className: "jsx-419124778",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 511
    },
    __self: this
  }, __jsx("div", {
    "class": "col-6 col-sm-4",
    className: "jsx-419124778",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 512
    },
    __self: this
  }, __jsx("h6", {
    "class": "text-danger",
    className: "jsx-419124778",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 513
    },
    __self: this
  }, __jsx("i", {
    "class": "fa fa-map-marker mr-2",
    className: "jsx-419124778",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 514
    },
    __self: this
  }), "\u0110\u1ECBa ch\u1EC9 1"), __jsx("hr", {
    className: "jsx-419124778",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 516
    },
    __self: this
  }), __jsx("p", {
    "data-aos": "fade-down",
    className: "jsx-419124778",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 517
    },
    __self: this
  }, "B\xECnh \u0110\xE0o, Th\u0103ng B\xECnh, Qu\u1EA3ng Nam", __jsx("br", {
    className: "jsx-419124778",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 519
    },
    __self: this
  }))), __jsx("div", {
    "class": "col-6 col-sm-4",
    className: "jsx-419124778",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 522
    },
    __self: this
  }, __jsx("h6", {
    "class": "text-danger",
    className: "jsx-419124778",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 523
    },
    __self: this
  }, __jsx("i", {
    "class": "fa fa-map-marker mr-2",
    className: "jsx-419124778",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 524
    },
    __self: this
  }), "\u0110\u1ECBa ch\u1EC9 2"), __jsx("hr", {
    className: "jsx-419124778",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 526
    },
    __self: this
  }), __jsx("p", {
    "data-aos": "fade-down",
    "data-aos-delay": "100",
    className: "jsx-419124778",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 527
    },
    __self: this
  }, "Thu\u1EADn An 4, Thanh Kh\xEA, Tp. \u0110\xE0 N\u1EB5ng", __jsx("br", {
    className: "jsx-419124778",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 529
    },
    __self: this
  }))), __jsx("div", {
    "class": "col-12 col-sm-4",
    className: "jsx-419124778",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 532
    },
    __self: this
  }, __jsx("h6", {
    "class": "text-danger",
    className: "jsx-419124778",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 533
    },
    __self: this
  }, __jsx("i", {
    "class": "fa fa-phone mr-2",
    className: "jsx-419124778",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 534
    },
    __self: this
  }), "\u0110i\u1EC7n tho\u1EA1i"), __jsx("hr", {
    className: "jsx-419124778",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 536
    },
    __self: this
  }), __jsx("p", {
    "data-aos": "fade-down",
    "data-aos-delay": "200",
    className: "jsx-419124778",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 537
    },
    __self: this
  }, "0935.584.569", __jsx("br", {
    className: "jsx-419124778",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 539
    },
    __self: this
  }), "0866.453.580", __jsx("br", {
    className: "jsx-419124778",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 541
    },
    __self: this
  })))))));
}

/***/ }),

/***/ "./pages/index.js":
/*!************************!*\
  !*** ./pages/index.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_Posts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/Posts */ "./components/Posts.js");
/* harmony import */ var _components_Products__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/Products */ "./components/Products.js");
/* harmony import */ var _components_Categories__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/Categories */ "./components/Categories.js");
/* harmony import */ var _components_Hashtags__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/Hashtags */ "./components/Hashtags.js");
/* harmony import */ var _components_Nav__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/Nav */ "./components/Nav.js");
/* harmony import */ var _public_bootstrap_css_bootstrap_min_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../public/bootstrap/css/bootstrap.min.css */ "./public/bootstrap/css/bootstrap.min.css");
/* harmony import */ var _public_bootstrap_css_bootstrap_min_css__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_public_bootstrap_css_bootstrap_min_css__WEBPACK_IMPORTED_MODULE_6__);
var _jsxFileName = "/home/truongduchuy910/apps/quangdacamera.com/app/pages/index.js";

var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;






/* harmony default export */ __webpack_exports__["default"] = (function () {
  return __jsx("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 9
    },
    __self: this
  }, __jsx(_components_Nav__WEBPACK_IMPORTED_MODULE_5__["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 10
    },
    __self: this
  }), __jsx(_components_Posts__WEBPACK_IMPORTED_MODULE_1__["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 11
    },
    __self: this
  }), __jsx(_components_Products__WEBPACK_IMPORTED_MODULE_2__["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 12
    },
    __self: this
  }), __jsx(_components_Categories__WEBPACK_IMPORTED_MODULE_3__["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 13
    },
    __self: this
  }), __jsx(_components_Hashtags__WEBPACK_IMPORTED_MODULE_4__["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 14
    },
    __self: this
  }));
});

/***/ })

})
//# sourceMappingURL=index.js.5ca95e197da4df8fc45e.hot-update.js.map