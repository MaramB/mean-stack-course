import { Component, OnInit, OnDestroy } from '@angular/core';
import { Chart } from 'chart.js'
import { ChartService } from '../chart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, OnDestroy {
  chart;
  clicked = false;
  chartSub: Subscription;

  constructor(private chartService: ChartService) { }

  ngOnInit() {
       

    this.chart = new Chart('canvas', {
      type: 'bar',
      options: {
        responsive: true,
        title: {
          display: true,
          text: 'Realtime Chart'
        },
      },
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
        datasets: [
          {
            type: 'bar',
            label: 'Test Chart',
            data: [10, 3, 6, 11, 38, 5, 6, 17],
            backgroundColor: '#3F3FBF',
            filll: false
          }
        ]
      }
    });

  }

  show19() {
    this.chart.data.datasets[0].data = [3, 5, 6, 11, 3, 5, 6, 38];
    this.chart.update();
  }

  show18() {
    this.chart.data.datasets[0].data = [38, 15, 26, 1, 13, 15, 26, 8];
    this.chart.update();
  }

  show17() {
    this.chart.data.datasets[0].data = [33, 25, 36, 21, 23, 25, 26, 3];
    this.chart.update();
  }

  realtime() {
    this.chartSub = this.chartService.listenOnChart('dataUpdate').subscribe( res => {
      // console.log(res);
      this.chart.data.datasets[0].data = res;
      this.chart.update();
      this.clicked = true;
    }); 
  }

  stopRealtime() {
    this.chartSub.unsubscribe()
    this.clicked = false;
  }

  ngOnDestroy() {
    this.chartService.disconnect();
  }


}
