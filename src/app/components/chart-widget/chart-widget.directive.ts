import { Directive } from '@angular/core';

@Directive({
  selector: '[appChartWidget]',
})
export class ChartWidgetDirective {
  //   private chart: any;
  //   constructor(private el: ElementRef, private renderer: Renderer2) {}
  //   @Input() set chartData(data: any) {
  //     this.updateChart(data);
  //   }
  //   @Input() set chartType(type: 'line' | 'bar') {
  //     this.createChart(type);
  //   }
  //   @Input() set lineColor(color: string) {
  //     if (this.chart) {
  //       this.chart.update({ series: [{ color }] });
  //     }
  //   }
  //   private createChart(type: 'line' | 'bar') {
  //     if (this.chart) {
  //       this.chart.destroy();
  //     }
  //     this.chart = Highcharts.chart(this.el.nativeElement, {
  //       chart: {
  //         type: type,
  //       },
  //       series: [
  //         {
  //           data: [], // Placeholder for data
  //         },
  //       ],
  //     });
  //   }
  //   private updateChart(data: any) {
  //     if (this.chart) {
  //       this.chart.series[0].setData(data);
  //     }
  //   }
  //   ngOnDestroy() {
  //     if (this.chart) {
  //       this.chart.destroy();
  //     }
  //   }
}
