export interface UpdateData {
  latest: number;
  data:   Data;
}

export interface Data {
  downloadBase: string;
  fields:       string[];
  data:         Array<Array<DatumClass | number | string>>;
}

export interface DatumClass {
  type: string;
  data: string;
}
