webpackHotUpdate("static/development/pages/index.js",{

/***/ "./components/Categories.js":
/*!**********************************!*\
  !*** ./components/Categories.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Categories; });
/* harmony import */ var _babel_runtime_corejs2_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/json/stringify */ "../node_modules/@babel/runtime-corejs2/core-js/json/stringify.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/link */ "../node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! graphql-tag */ "../node_modules/graphql-tag/src/index.js");
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(graphql_tag__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var apollo_link_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! apollo-link-http */ "../node_modules/apollo-link-http/lib/bundle.esm.js");
/* harmony import */ var apollo_client__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! apollo-client */ "../node_modules/apollo-client/bundle.esm.js");
/* harmony import */ var apollo_cache_inmemory__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! apollo-cache-inmemory */ "../node_modules/apollo-cache-inmemory/lib/bundle.esm.js");
/* harmony import */ var react_apollo__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-apollo */ "../node_modules/react-apollo/lib/react-apollo.esm.js");
/* harmony import */ var _keystonejs_apollo_helpers__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @keystonejs/apollo-helpers */ "../node_modules/@keystonejs/apollo-helpers/dist/apollo-helpers.esm.js");
/* harmony import */ var _modules__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../modules */ "./modules.js");

var _jsxFileName = "/home/truongduchuy910/apps/quangdacamera.com/app/components/Categories.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement;









var client = new apollo_client__WEBPACK_IMPORTED_MODULE_5__["ApolloClient"]({
  link: new apollo_link_http__WEBPACK_IMPORTED_MODULE_4__["HttpLink"]({
    uri: "/admin/api"
  }),
  cache: new apollo_cache_inmemory__WEBPACK_IMPORTED_MODULE_6__["InMemoryCache"]()
});
function Categories() {
  return __jsx(_modules__WEBPACK_IMPORTED_MODULE_9__["default"], {
    query: "\n    query {\n      allCategories {\n        name\n      }\n    }\n  ",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 17
    },
    __self: this
  }, function (_ref) {
    var data = _ref.data;
    return __jsx("pre", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 26
      },
      __self: this
    }, _babel_runtime_corejs2_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_0___default()(data));
  });
}

/***/ })

})
//# sourceMappingURL=index.js.4d9fa505edce3bcbcb91.hot-update.js.map