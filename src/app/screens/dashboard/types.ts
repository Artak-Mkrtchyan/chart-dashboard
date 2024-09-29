import { ChartData, ChartType } from '@app/components/chart-widget/types';

export interface DashboardChartWidget {
  type: ChartType;
  name: string;
  color: string;
  data: ChartData[];
}
