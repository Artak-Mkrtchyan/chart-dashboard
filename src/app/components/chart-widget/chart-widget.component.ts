import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  output,
} from '@angular/core';
import { DataService } from '@app/services/data.service';
import Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ChartData, ChartType } from './types';

@Component({
  selector: 'app-chart-widget',
  standalone: true,
  imports: [HighchartsChartModule, MatIconModule, MatButtonModule],
  providers: [DataService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './chart-widget.component.html',
  styleUrl: './chart-widget.component.scss',
})
export class ChartWidgetComponent {
  Highcharts: typeof Highcharts = Highcharts;
  dataService: DataService = inject(DataService);

  index = input.required<number>();
  data = input.required<ChartData[]>();
  dateRange = input<{ start: number; end: number } | null>(null);
  title = input<string>('Chart Widget');
  lineColor = input<string>('#000000');
  chartType = input<ChartType>(ChartType.Line);
  remove = output<number>();

  filteredData = computed(() => {
    if (this.dateRange()) {
      const { start, end } = this.dateRange()!;

      return this.data().map((series) => ({
        ...series,
        data: series.data.filter(([date]) => date >= start && date <= end),
      }));
    }

    return this.data();
  });

  chartOptions = computed<Highcharts.Options>(() => ({
    title: {
      text: '',
    },
    colors: [this.lineColor()],
    chart: {
      type: this.chartType(),
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
    series: this.filteredData() as Highcharts.SeriesOptionsType[],
  }));
}
