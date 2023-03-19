export interface NewDataType {
  title: string;
  start?: string;
  end?: string;
  diary?: string;
}

export interface NewDataTypeWithID {
  id: string;
  title: string;
  start: string;
  end?: string;
  diary?: string;
}
