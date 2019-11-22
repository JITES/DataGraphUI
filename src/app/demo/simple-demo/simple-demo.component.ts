import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-simple-demo',
  templateUrl: './simple-demo.component.html',
  styleUrls: ['./simple-demo.component.css']
})
export class SimpleDemoComponent implements OnInit {
  allowNewServer = false;
  serverCreation:string="No server is created";
  serverCreated:boolean = false;
  constructor() { 
    setTimeout(()=>{
      this.allowNewServer = true;
      this.serverCreated=true;

    },2000);
  }

  ngOnInit() {
  }

  onCreateServer(){
    this.serverCreation = "Server was created";
  }

  getColor(){
    return 'green';
  }
}
