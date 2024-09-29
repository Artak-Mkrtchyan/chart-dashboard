export enum ChartType {
  Line = 'line',
  Column = 'column',
}

export interface ChartData {
  name: string;
  data: number[][];
}
