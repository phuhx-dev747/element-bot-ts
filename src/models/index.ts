import { User, UserWC } from "./tables";

// **Table Name Enum**
export enum TableNameEnum {
  USERS = "users",
  USER_WC = "user_wc"
}

type TableSchemaMap = {
  [TableNameEnum.USERS]: User;
  [TableNameEnum.USER_WC]: UserWC;
};

export class SimpleModel<T extends TableNameEnum> {
  tableName: T;
  columns: TableSchemaMap[T];

  constructor(tableName: T, columns: TableSchemaMap[T]) {
    this.tableName = tableName;
    this.columns = columns;
  }

  addRecord(record: TableSchemaMap[T]): void {
    this.columns = { ...this.columns, ...record };
  }
}
