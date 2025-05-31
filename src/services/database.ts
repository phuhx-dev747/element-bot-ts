import { exec } from "child_process";
import util from "util";
import { SimpleModel, TableNameEnum } from "../models";
import { ConvertCamelCaseToSnakeCase } from "../helpers";

export interface QueryResult {
  success: boolean;
  error: string | null;
  data?: string;
}

const execPromise = util.promisify(exec);
/**
 * Executes a SQLite query on the local database.
 * @param {string} query - The SQL query to execute.
 * @returns {Promise<void>} - A promise that resolves when the query execution is complete.
 */
export async function dbRunner(query: string): Promise<QueryResult> {
  const command = `sqlite3 local.db "${query}"`;

  if (!query.trim()) {
    return { success: false, data: undefined, error: "Query cannot be empty." };
  }

  const result: QueryResult = { success: false, data: undefined, error: null };

  try {
    const { stdout, stderr } = await execPromise(command);
    if (stderr) {
      result.error = stderr;
      console.error("stderr:", stderr);
    } else {
      result.success = true;
      result.data = stdout;
    }
  } catch (error: any) {
    result.error = error.message || "An error occurred while executing the query.";
  }

  return result;
}


/**
 * 
 * @param model The model to insert data into the database.
 * This function takes a SimpleModel instance, converts its column names from camelCase to snake_case,
 * and inserts the corresponding values into the database.
 * @returns A promise that resolves when the data has been inserted.
 * @throws Will throw an error if the query fails.
 */
export async function insertData(model: SimpleModel<TableNameEnum>) {
  const columns = Object.keys(model.columns)
    .map(ConvertCamelCaseToSnakeCase)
    .join(", ");
  if (Object.keys(model.columns).length === 0) {
    throw new Error("No data to insert. Please provide valid data in the model.");
  }
  const values = Object.values(model.columns)
    .map(value => `'${value.toString().replace(/'/g, "''")}'`)
    .join(", ");
  const query = `INSERT INTO ${model.tableName} (${columns}) VALUES (${values});`;
  await dbRunner(query);  
}

/**
 * Deletes a record from the database based on the provided model and ID.
 * @param model The model representing the table from which to delete the record.
 * @param id The ID of the record to delete.
 * @returns A promise that resolves when the deletion is complete.
 */
export async function deleteDataById(model: SimpleModel<TableNameEnum>, id: number) {
  const query = `DELETE FROM ${model.tableName} WHERE id = ${id};`;
  await dbRunner(query);
}
