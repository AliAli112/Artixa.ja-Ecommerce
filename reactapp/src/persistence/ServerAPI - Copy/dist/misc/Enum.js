"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseType = exports.Connection = void 0;
var Connection;
(function (Connection) {
    Connection[Connection["connected"] = 1] = "connected";
    Connection[Connection["disconnected"] = 0] = "disconnected";
})(Connection = exports.Connection || (exports.Connection = {}));
var ExpenseType;
(function (ExpenseType) {
    ExpenseType[ExpenseType["revenue"] = 1] = "revenue";
    ExpenseType[ExpenseType["expense"] = 0] = "expense";
})(ExpenseType = exports.ExpenseType || (exports.ExpenseType = {}));
//# sourceMappingURL=Enum.js.map