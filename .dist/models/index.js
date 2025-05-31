"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleModel = exports.TableNameEnum = void 0;
// **Table Name Enum**
var TableNameEnum;
(function (TableNameEnum) {
    TableNameEnum["USERS"] = "users";
    TableNameEnum["USER_WC"] = "user_wc";
})(TableNameEnum || (exports.TableNameEnum = TableNameEnum = {}));
class SimpleModel {
    constructor(tableName, columns) {
        this.tableName = tableName;
        this.columns = columns;
    }
    addRecord(record) {
        this.columns = Object.assign(Object.assign({}, this.columns), record);
    }
}
exports.SimpleModel = SimpleModel;
