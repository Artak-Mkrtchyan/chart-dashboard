import { ChartType } from '@app/components/chart-widget/types';

export interface ChartFormData {
  name: string;
  type: ChartType;
  color: string;
  sensors: string[];
}
