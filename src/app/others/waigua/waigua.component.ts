import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-waigua',
  templateUrl: './waigua.component.html',
  styleUrls: ['./waigua.component.css']
})
export class WaiguaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    window.open("apige520.77sq.net")
    //window.location.href = 'apige520.77sq.net'
  }

}
