import { Component, OnInit } from '@angular/core';
import {histogramBinsD3} from '../../../assets/js/histogramBins-plugin-structure';

@Component({
  selector: 'app-stacked-bar',
  templateUrl: './stacked-bar.component.html',
  styleUrls: ['./stacked-bar.component.css']
})
export class StackedBarComponent implements OnInit {

  constructor() { 
    var salesData = [{
      'date': '2019-06-30T18:30:00.000Z',
      'Commercial': 300,
      'Medical Devices': 100,
      'Insurance': 200
  }, {
      'date': '2019-07-31T18:30:00.000Z',
      'Commercial': 350,
      'Medical Devices': 125,
      'Insurance': 250
  },
  {
      'date': '2019-08-31T18:30:00.000Z',
      'Commercial': 400,
      'Medical Devices': 175,
      'Insurance': 270
  }, {
      'date': '2019-09-30T18:30:00.000Z',
      'Commercial': 503,
      'Medical Devices': 132,
      'Insurance': 128
  }, {
      'date': '2019-10-31T18:30:00.000Z',
      'Commercial': 844,
      'Medical Devices': 287,
      'Insurance': 106
  }, {
      'date': '2019-11-30T18:30:00.000Z',
      'Commercial': 750,
      'Medical Devices': 250,
      'Insurance': 131
  }, {
      'date': '2019-12-31T18:30:00.000Z',
      'Commercial': 1000,
      'Medical Devices': 183,
      'Insurance': 324
  }
];
var configData = {xField: 'date', 
    yField: '', 
    groups : ["Insurance", "Medical Devices", "Commercial"],
    tooltip: true,
    xLabel: 'Month',
    yLabel: 'Sales'
    };
histogramBinsD3.actions.drawChart(configData,salesData, '#histogram-bins');
  }

  ngOnInit() {
  }

}
