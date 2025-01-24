"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/micromark-util-classify-character";
exports.ids = ["vendor-chunks/micromark-util-classify-character"];
exports.modules = {

/***/ "(ssr)/./node_modules/micromark-util-classify-character/dev/index.js":
/*!*********************************************************************!*\
  !*** ./node_modules/micromark-util-classify-character/dev/index.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   classifyCharacter: () => (/* binding */ classifyCharacter)\n/* harmony export */ });\n/* harmony import */ var micromark_util_character__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! micromark-util-character */ \"(ssr)/./node_modules/micromark-util-character/dev/index.js\");\n/* harmony import */ var micromark_util_symbol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! micromark-util-symbol */ \"(ssr)/./node_modules/micromark-util-symbol/lib/codes.js\");\n/* harmony import */ var micromark_util_symbol__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! micromark-util-symbol */ \"(ssr)/./node_modules/micromark-util-symbol/lib/constants.js\");\n/**\n * @import {Code} from 'micromark-util-types'\n */ \n\n/**\n * Classify whether a code represents whitespace, punctuation, or something\n * else.\n *\n * Used for attention (emphasis, strong), whose sequences can open or close\n * based on the class of surrounding characters.\n *\n * > 👉 **Note**: eof (`null`) is seen as whitespace.\n *\n * @param {Code} code\n *   Code.\n * @returns {typeof constants.characterGroupWhitespace | typeof constants.characterGroupPunctuation | undefined}\n *   Group.\n */ function classifyCharacter(code) {\n    if (code === micromark_util_symbol__WEBPACK_IMPORTED_MODULE_0__.codes.eof || (0,micromark_util_character__WEBPACK_IMPORTED_MODULE_1__.markdownLineEndingOrSpace)(code) || (0,micromark_util_character__WEBPACK_IMPORTED_MODULE_1__.unicodeWhitespace)(code)) {\n        return micromark_util_symbol__WEBPACK_IMPORTED_MODULE_2__.constants.characterGroupWhitespace;\n    }\n    if ((0,micromark_util_character__WEBPACK_IMPORTED_MODULE_1__.unicodePunctuation)(code)) {\n        return micromark_util_symbol__WEBPACK_IMPORTED_MODULE_2__.constants.characterGroupPunctuation;\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvbWljcm9tYXJrLXV0aWwtY2xhc3NpZnktY2hhcmFjdGVyL2Rldi9pbmRleC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0NBRUMsR0FNZ0M7QUFDcUI7QUFFdEQ7Ozs7Ozs7Ozs7Ozs7Q0FhQyxHQUNNLFNBQVNLLGtCQUFrQkMsSUFBSTtJQUNwQyxJQUNFQSxTQUFTSCx3REFBS0EsQ0FBQ0ksR0FBRyxJQUNsQlAsbUZBQXlCQSxDQUFDTSxTQUMxQkosMkVBQWlCQSxDQUFDSSxPQUNsQjtRQUNBLE9BQU9GLDREQUFTQSxDQUFDSSx3QkFBd0I7SUFDM0M7SUFFQSxJQUFJUCw0RUFBa0JBLENBQUNLLE9BQU87UUFDNUIsT0FBT0YsNERBQVNBLENBQUNLLHlCQUF5QjtJQUM1QztBQUNGIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYXV0b19mcm9udGVuZC8uL25vZGVfbW9kdWxlcy9taWNyb21hcmstdXRpbC1jbGFzc2lmeS1jaGFyYWN0ZXIvZGV2L2luZGV4LmpzPzg5MTQiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAaW1wb3J0IHtDb2RlfSBmcm9tICdtaWNyb21hcmstdXRpbC10eXBlcydcbiAqL1xuXG5pbXBvcnQge1xuICBtYXJrZG93bkxpbmVFbmRpbmdPclNwYWNlLFxuICB1bmljb2RlUHVuY3R1YXRpb24sXG4gIHVuaWNvZGVXaGl0ZXNwYWNlXG59IGZyb20gJ21pY3JvbWFyay11dGlsLWNoYXJhY3RlcidcbmltcG9ydCB7Y29kZXMsIGNvbnN0YW50c30gZnJvbSAnbWljcm9tYXJrLXV0aWwtc3ltYm9sJ1xuXG4vKipcbiAqIENsYXNzaWZ5IHdoZXRoZXIgYSBjb2RlIHJlcHJlc2VudHMgd2hpdGVzcGFjZSwgcHVuY3R1YXRpb24sIG9yIHNvbWV0aGluZ1xuICogZWxzZS5cbiAqXG4gKiBVc2VkIGZvciBhdHRlbnRpb24gKGVtcGhhc2lzLCBzdHJvbmcpLCB3aG9zZSBzZXF1ZW5jZXMgY2FuIG9wZW4gb3IgY2xvc2VcbiAqIGJhc2VkIG9uIHRoZSBjbGFzcyBvZiBzdXJyb3VuZGluZyBjaGFyYWN0ZXJzLlxuICpcbiAqID4g8J+RiSAqKk5vdGUqKjogZW9mIChgbnVsbGApIGlzIHNlZW4gYXMgd2hpdGVzcGFjZS5cbiAqXG4gKiBAcGFyYW0ge0NvZGV9IGNvZGVcbiAqICAgQ29kZS5cbiAqIEByZXR1cm5zIHt0eXBlb2YgY29uc3RhbnRzLmNoYXJhY3Rlckdyb3VwV2hpdGVzcGFjZSB8IHR5cGVvZiBjb25zdGFudHMuY2hhcmFjdGVyR3JvdXBQdW5jdHVhdGlvbiB8IHVuZGVmaW5lZH1cbiAqICAgR3JvdXAuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjbGFzc2lmeUNoYXJhY3Rlcihjb2RlKSB7XG4gIGlmIChcbiAgICBjb2RlID09PSBjb2Rlcy5lb2YgfHxcbiAgICBtYXJrZG93bkxpbmVFbmRpbmdPclNwYWNlKGNvZGUpIHx8XG4gICAgdW5pY29kZVdoaXRlc3BhY2UoY29kZSlcbiAgKSB7XG4gICAgcmV0dXJuIGNvbnN0YW50cy5jaGFyYWN0ZXJHcm91cFdoaXRlc3BhY2VcbiAgfVxuXG4gIGlmICh1bmljb2RlUHVuY3R1YXRpb24oY29kZSkpIHtcbiAgICByZXR1cm4gY29uc3RhbnRzLmNoYXJhY3Rlckdyb3VwUHVuY3R1YXRpb25cbiAgfVxufVxuIl0sIm5hbWVzIjpbIm1hcmtkb3duTGluZUVuZGluZ09yU3BhY2UiLCJ1bmljb2RlUHVuY3R1YXRpb24iLCJ1bmljb2RlV2hpdGVzcGFjZSIsImNvZGVzIiwiY29uc3RhbnRzIiwiY2xhc3NpZnlDaGFyYWN0ZXIiLCJjb2RlIiwiZW9mIiwiY2hhcmFjdGVyR3JvdXBXaGl0ZXNwYWNlIiwiY2hhcmFjdGVyR3JvdXBQdW5jdHVhdGlvbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/micromark-util-classify-character/dev/index.js\n");

/***/ })

};
;