"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConvertCamelCaseToSnakeCase = exports.ConvertSnakeCaseToCamelCase = void 0;
exports.escapeString = escapeString;
const ConvertSnakeCaseToCamelCase = (str) => {
    return str.replace(/_([a-z])/g, (match, letter) => letter.toUpperCase());
};
exports.ConvertSnakeCaseToCamelCase = ConvertSnakeCaseToCamelCase;
const ConvertCamelCaseToSnakeCase = (str) => {
    return str.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
};
exports.ConvertCamelCaseToSnakeCase = ConvertCamelCaseToSnakeCase;
function escapeString(str) {
    return str.replace(/'/g, "''");
}
