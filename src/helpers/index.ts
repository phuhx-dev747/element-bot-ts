export const ConvertSnakeCaseToCamelCase = (str: string): string => {
  return str.replace(/_([a-z])/g, (match, letter) => letter.toUpperCase());
}

export const ConvertCamelCaseToSnakeCase = (str: string): string => {
  return str.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
}

export function escapeString(str: string): string {
  return str.replace(/'/g, "''");
}
