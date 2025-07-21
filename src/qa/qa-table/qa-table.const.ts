import { ColumnDef } from "atlas-table";

export interface QaTable {
    columnDef: ColumnDef[],
    dense: boolean,
    rows: object[]
}