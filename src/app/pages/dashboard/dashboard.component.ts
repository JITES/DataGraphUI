import { Component, OnInit } from '@angular/core';
import { lollipopChartD3 } from '../../../assets/js/lollipop-plugin-structure';
import {pieChartD3} from '../../../assets/js/piechart-plugin-structure';
import {lineChartD3} from '../../../assets/js/linechart-plugin-structure';
import { Observable } from 'rxjs/internal/Observable';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  title = 'dashboard';
  singleObj = [{
    data: [{
      'sale': '202',
      'year': '2000'
    }, {
      'sale': '215',
      'year': '2001'
    }, {
      'sale': '179',
      'year': '2002'
    }, {
      'sale': '199',
      'year': '2003'
    }, {
      'sale': '134',
      'year': '2004'
    }, {
      'sale': '176',
      'year': '2010'
    }]
  }];
  multiObj = [
    {
    data: [{
      'MARKET SHARE': 4900,
      'year': '2000',
      'yField': 'MARKET SHARE'
    }, {
      'MARKET SHARE': 6400,
      'year': '2001',
      'yField': 'MARKET SHARE'
    }, {
      'MARKET SHARE': 7200,
      'year': '2002',
      'yField': 'MARKET SHARE'
    }, {
      'MARKET SHARE': 8600,
      'year': '2003',
      'yField': 'MARKET SHARE'
    }, {
      'MARKET SHARE': 9500,
      'year': '2004',
      'yField': 'MARKET SHARE'
    }, {
      'MARKET SHARE': 13596,
      'year': '2010',
      'yField': 'MARKET SHARE'
    }]
  }, {
    data: [{
      'PRODUCT GROWTH': 4500,
      'year': '2000',
      'yField': 'PRODUCT GROWTH'
    }, {
      'PRODUCT GROWTH': 4600,
      'year': '2002',
      'yField': 'PRODUCT GROWTH'
    }, {
      'PRODUCT GROWTH': 12000,
      'year': '2004',
      'yField': 'PRODUCT GROWTH'
    }, {
      'PRODUCT GROWTH': 40600,
      'year': '2006',
      'yField': 'PRODUCT GROWTH'
    }, {
      'PRODUCT GROWTH': 43000,
      'year': '2008',
      'yField': 'PRODUCT GROWTH'
    }, {
      'PRODUCT GROWTH': 50000,
      'year': '2010',
      'yField': 'PRODUCT GROWTH'
    }]
  }, {
    data: [{
      'REVENUE': 1780,
      'year': '2000',
      'yField': 'REVENUE'
    }, {
      'REVENUE': 6200,
      'year': '2002',
      'yField': 'REVENUE'
    }, {
      'REVENUE': 3700,
      'year': '2004',
      'yField': 'REVENUE'
    }, {
      'REVENUE': 7800,
      'year': '2006',
      'yField': 'REVENUE'
    }, {
      'REVENUE': 12300,
      'year': '2008',
      'yField': 'REVENUE'
    }, {
      'REVENUE': 16869,
      'year': '2010',
      'yField': 'REVENUE'
    }]
  },
];
  lineChartconfigData = {
    xField: 'year',
    yField: 'sale',
    chartTitle: '',
    chartTitleColor: '#A584A4',
    listGroup: { axis: 'y', data: ['valueA', 'valueB', 'valueC'] },
    tooltip: true,
    zoom: true,
    backgroundColor: '',
    backgroundImage: '',
    dottedGraph: false,
    dottedAxis: false,
    axisInfo: {
      xAxis: [{
        title: 'Year',
        color: '#9433FF',
        lineColor: '#00cccc'
      }, {
        title: '',
        color: '#B03A2E',
        lineColor: '#fd7e14'
      }, {
        title: '',
        color: '#34495E',
        lineColor: '#f10075'
      }],
      yAxis: [{
        title: '',
        color: '#570D54'
      }]
    }
  };
  chartsView: string;
  subscription: Subscription;
  contSubscription: Subscription;

  count:number = Math.floor(Math.random() * 1000);
  contract:number = Math.floor(Math.random() * 100);
  constructor() {

    const source = interval(2000);
    const contractInterval = interval(10000);
    this.subscription = source.subscribe(val => this.count += Math.floor((Math.random() * 10) + 1)
    );
    this.contSubscription = contractInterval.subscribe(val => this.contract += Math.floor((Math.random() * 5) + 1)
    );

   }

  ngOnInit() {
    this.setDefaultChart();
    this.loadPieChart();
  }

  loadPieChart() {
    var data1 = {'ORGANIC SEARCH': 1320, 'EMAIL': 987, 'REFERRRAL':2010, 'SOCIAL MEDIA':1054}
    var configs = {colors: ['#f10075', '#0168fa', '#00cccc', '#fd7e14']}
    pieChartD3.actions.drawChart(configs, data1, '#my_dataviz_pie');
  }

  changeChartView(event) {
    // const selectedVal = 'single';
    const selectedVal = event.target.value;
    if (selectedVal === 'single') {
      this.lineChartconfigData.axisInfo = {
        xAxis: [{
          title: 'Year',
          color: '#9433FF',
          lineColor: '#9433FF'
        }],
        yAxis: [{
          title: 'Sale',
          color: '#570D54'
        }]
      };
      lineChartD3.actions.drawChart(this.lineChartconfigData, this.singleObj, '#my_line_dataviz');
    } else {
      this.lineChartconfigData.axisInfo = {
        xAxis: [{
          title: 'Year1',
          color: '#9433FF',
          lineColor: '#9433FF'
        }, {
          title: 'Year2',
          color: '#B03A2E',
          lineColor: '#B03A2E'
        }, {
          title: 'Year3',
          color: '#34495E',
          lineColor: '#34495E'
        }],
        yAxis: [{
          title: 'Sale',
          color: '#570D54'
        }]
      };
      lineChartD3.actions.drawChart(this.lineChartconfigData, this.multiObj, '#my_dataviz');
    }
  }

  setDefaultChart() {
      this.chartsView = 'multiple';
      lineChartD3.actions.drawChart(this.lineChartconfigData, this.multiObj, '#my_dataviz');
  }


}


