import Highcharts from 'highcharts';

import { ChartData, ChartType } from './types';

export const getChartOptions = (
  data: ChartData[],
  lineColor: string,
  chartType: ChartType
): Highcharts.Options => ({
  title: {
    text: '',
  },
  colors: [lineColor],
  chart: {
    type: chartType,
  },
  xAxis: {
    type: 'datetime',
    title: {
      text: 'Date',
    },
  },
  yAxis: {
    title: {
      text: 'Value',
    },
  },
  series: data as Highcharts.SeriesOptionsType[],
});
