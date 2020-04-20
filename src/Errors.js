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
var HttpError = /** @class */ (function (_super) {
    __extends(HttpError, _super);
    function HttpError(message) {
        var _this = _super.call(this) || this;
        _this.message = message;
        _this.statusCode = 500;
        return _this;
    }
    return HttpError;
}(Error));
exports.HttpError = HttpError;
var NotFoundError = /** @class */ (function (_super) {
    __extends(NotFoundError, _super);
    function NotFoundError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return NotFoundError;
}(HttpError));
exports.NotFoundError = NotFoundError;
var BadRequestError = /** @class */ (function (_super) {
    __extends(BadRequestError, _super);
    function BadRequestError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return BadRequestError;
}(HttpError));
exports.BadRequestError = BadRequestError;
