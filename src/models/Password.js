"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var objection_1 = require("objection");
var constants_1 = require("../../constants");
var Password = /** @class */ (function (_super) {
    __extends(Password, _super);
    function Password() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Password.tableName = constants_1.tables.PW_TABLE;
    Password.jsonSchema = {
        type: 'object',
        required: ['username'],
        properties: {
            id: { type: 'integer' },
            username: { type: 'string', minLength: 1, maxLength: 255 },
            hash: { type: 'string', minLength: 1, maxLength: 255 }
        }
    };
    return Password;
}(objection_1.Model));
exports["default"] = Password;
