import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Fighter';
  Days:any
  Timer:any
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
   // setInterval(this.getDaysBetween,1000)
   // setInterval(this.getDaysBetween,1000)


  setInterval(() => {
    let StartDate = new Date('2020/09/03 21:49:00') 
    let x:any = StartDate

    var startDate = Date.parse(x);
    let y = new Date
    let z:any = y
    var  endDate = Date.parse(z);

    var days=(endDate - startDate)/(1*24*60*60*1000);
    this.Days = days

}
    ,1000);
  }

  
  getDaysBetween(){
    let StartDate = new Date('2020/09/03 21:49:00') 
    let x:any = StartDate
    var startDate = Date.parse(x);
    let y = new Date
    let z:any = y
    var  endDate = Date.parse(z);
    var days=(endDate - startDate)/(1*24*60*60*1000);
    this.Days = days
    console.log(this.Days)
    return days
 }


}
