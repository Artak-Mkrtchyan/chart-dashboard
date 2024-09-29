import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { ChartWidgetComponent } from '@app/components/chart-widget/chart-widget.component';
import { DataService } from '@app/services/data.service';
import { ChartFormComponent } from '@app/components/chart-form/chart-form.component';
import { DateIntervalPickerComponent } from '@app/components/date-interval-picker/date-interval-picker.component';
import { ChartData, ChartType } from '@app/components/chart-widget/types';
import { ChartFormData } from '@app/components/chart-form/types';
import { DashboardChartWidget } from './types';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    ChartWidgetComponent,
    ChartFormComponent,
    DateIntervalPickerComponent,
  ],
  providers: [DataService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  dataService: DataService = inject(DataService);
  dateRange = signal<{ start: number; end: number } | null>(null);
  chartWidgets = signal<DashboardChartWidget[]>([]);

  ngOnInit() {
    this.dataService.loadData();
  }

  addChartWidget(chartData: ChartFormData) {
    const selectedSensors = this.dataService
      .sensors()
      .filter((sensor) => chartData.sensors.includes(sensor.id));

    this.chartWidgets.update((widgets) => [
      ...widgets,
      {
        name: chartData.name,
        type: chartData.type,
        color: chartData.color,
        data: selectedSensors.map((sensor) => ({
          name: sensor.name,
          data: sensor.data.map(({ date, value }) => [date, value]),
        })),
      },
    ]);
  }

  removeChartWidget(chartIndex: number) {
    this.chartWidgets.update((widgets) => {
      return widgets.filter((_, index) => index !== chartIndex);
    });
  }

  updateDateRange({ start, end }: { start: number; end: number }) {
    this.dateRange.set({
      start,
      end,
    });
  }
}
