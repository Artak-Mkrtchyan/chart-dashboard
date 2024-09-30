import {
  Directive,
  ElementRef,
  input,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { getChartOptions } from './utils';
import Highcharts from 'highcharts';
import { ChartData, ChartType } from './types';

@Directive({
  standalone: true,
  selector: '[appChartWidget]',
})
export class ChartWidgetDirective implements OnInit, OnDestroy {
  private chart: any;

  data = input.required<ChartData[]>();
  lineColor = input<string>('#000000');
  chartType = input<ChartType>(ChartType.Line);

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.createChart();
  }

  private createChart() {
    if (this.chart) {
      this.chart.destroy();
    }

    this.renderer.setStyle(this.el.nativeElement, 'width', '100%');
    this.renderer.setStyle(this.el.nativeElement, 'height', '400px');

    this.chart = Highcharts.chart(
      this.el.nativeElement,
      getChartOptions(this.data(), this.lineColor(), this.chartType())
    );
  }

  ngOnDestroy() {
    if (this.chart) {
      this.chart.destroy();
    }
  }
}
