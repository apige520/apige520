//import {NativeDateApdater } from "@angular/material/";
import  * as moment  from "moment";

//export class UtlDateApdater extends NativeDateApdater{
//  format(date:Date,displayFormat:Object):string{
//    return moment(date).format('YYYY-MM-DD')
//  }
//}

export const FormatDate_DDMMYYYY ={
  parse:{
    dateInput:["YYYYMMDD","DDMMYYYY","DD-MM-YYYY"]
  },
  display:{
    dateInput:"DD-MMM-YYY",
    monthYearLabel:"MMM-YYYY",
    dateA11yLabel:"DD-MMM-YYYY",
    monthYearA11yLabel:"MMMM-YYYY",
  }
}