"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbRunner = dbRunner;
exports.insertData = insertData;
exports.deleteDataById = deleteDataById;
const child_process_1 = require("child_process");
const util_1 = __importDefault(require("util"));
const helpers_1 = require("../helpers");
const execPromise = util_1.default.promisify(child_process_1.exec);
/**
 * Executes a SQLite query on the local database.
 * @param {string} query - The SQL query to execute.
 * @returns {Promise<void>} - A promise that resolves when the query execution is complete.
 */
function dbRunner(query) {
    return __awaiter(this, void 0, void 0, function* () {
        const command = `sqlite3 local.db "${query}"`;
        if (!query.trim()) {
            return { success: false, data: undefined, error: "Query cannot be empty." };
        }
        const result = { success: false, data: undefined, error: null };
        try {
            const { stdout, stderr } = yield execPromise(command);
            if (stderr) {
                result.error = stderr;
                console.error("stderr:", stderr);
            }
            else {
                result.success = true;
                result.data = stdout;
            }
        }
        catch (error) {
            result.error = error.message || "An error occurred while executing the query.";
        }
        return result;
    });
}
/**
 *
 * @param model The model to insert data into the database.
 * This function takes a SimpleModel instance, converts its column names from camelCase to snake_case,
 * and inserts the corresponding values into the database.
 * @returns A promise that resolves when the data has been inserted.
 * @throws Will throw an error if the query fails.
 */
function insertData(model) {
    return __awaiter(this, void 0, void 0, function* () {
        const columns = Object.keys(model.columns)
            .map(helpers_1.ConvertCamelCaseToSnakeCase)
            .join(", ");
        if (Object.keys(model.columns).length === 0) {
            throw new Error("No data to insert. Please provide valid data in the model.");
        }
        const values = Object.values(model.columns)
            .map(value => `'${value.toString().replace(/'/g, "''")}'`)
            .join(", ");
        const query = `INSERT INTO ${model.tableName} (${columns}) VALUES (${values});`;
        yield dbRunner(query);
    });
}
/**
 * Deletes a record from the database based on the provided model and ID.
 * @param model The model representing the table from which to delete the record.
 * @param id The ID of the record to delete.
 * @returns A promise that resolves when the deletion is complete.
 */
function deleteDataById(model, id) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = `DELETE FROM ${model.tableName} WHERE id = ${id};`;
        yield dbRunner(query);
    });
}
