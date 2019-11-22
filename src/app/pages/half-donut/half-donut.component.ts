import { Component, OnInit } from '@angular/core';
import {halfDonutPlugin} from '../../../assets/js/half-donut-plugin';

@Component({
  selector: 'app-half-donut',
  templateUrl: './half-donut.component.html',
  styleUrls: ['./half-donut.component.css']
})
export class HalfDonutComponent implements OnInit {

  constructor() { 
    halfDonutPlugin.actions.drawChart();
  }

  ngOnInit() {

  }

}
