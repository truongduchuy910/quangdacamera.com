webpackHotUpdate("static/development/pages/index.js",{

/***/ "./modules.js":
/*!********************!*\
  !*** ./modules.js ***!
  \********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/taggedTemplateLiteral */ "../node_modules/@babel/runtime-corejs2/helpers/esm/taggedTemplateLiteral.js");
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! graphql-tag */ "../node_modules/graphql-tag/src/index.js");
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(graphql_tag__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var apollo_link_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! apollo-link-http */ "../node_modules/apollo-link-http/lib/bundle.esm.js");
/* harmony import */ var apollo_client__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! apollo-client */ "../node_modules/apollo-client/bundle.esm.js");
/* harmony import */ var apollo_cache_inmemory__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! apollo-cache-inmemory */ "../node_modules/apollo-cache-inmemory/lib/bundle.esm.js");
/* harmony import */ var react_apollo__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-apollo */ "../node_modules/react-apollo/lib/react-apollo.esm.js");
/* harmony import */ var _keystonejs_apollo_helpers__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @keystonejs/apollo-helpers */ "../node_modules/@keystonejs/apollo-helpers/dist/apollo-helpers.esm.js");

var _jsxFileName = "/home/truongduchuy910/apps/quangdacamera.com/app/modules.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement;

function _templateObject() {
  var data = Object(_babel_runtime_corejs2_helpers_esm_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__["default"])(["\n              ", "\n            "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}








var client = new apollo_client__WEBPACK_IMPORTED_MODULE_4__["ApolloClient"]({
  link: new apollo_link_http__WEBPACK_IMPORTED_MODULE_3__["HttpLink"]({
    uri: "/admin/api"
  }),
  cache: new apollo_cache_inmemory__WEBPACK_IMPORTED_MODULE_5__["InMemoryCache"]()
});

var Gql = function Gql(props) {
  if (props.query) return __jsx(react_apollo__WEBPACK_IMPORTED_MODULE_6__["ApolloProvider"], {
    client: client,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 15
    },
    __self: this
  }, __jsx(_keystonejs_apollo_helpers__WEBPACK_IMPORTED_MODULE_7__["KeystoneProvider"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 16
    },
    __self: this
  }, __jsx(_keystonejs_apollo_helpers__WEBPACK_IMPORTED_MODULE_7__["Query"], {
    query: graphql_tag__WEBPACK_IMPORTED_MODULE_1___default()(_templateObject(), props.query),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 17
    },
    __self: this
  }, props.children)));
};

/* harmony default export */ __webpack_exports__["default"] = ({
  Gql: Gql
});

/***/ })

})
//# sourceMappingURL=index.js.4c7866daf193de30b0d2.hot-update.js.map