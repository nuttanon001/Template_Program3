export interface ResueaColumn<Model> {
  columnField: string;
  columnName: string;
  cell: (row: Model) => any;
  width?: number;
}
