import { Component, OnInit,Injectable} from '@angular/core';
import { homePageervice } from "./../shared/homeDetail.service";
import { FormGroup, FormControl,Validators } from '@angular/forms';
import { NotificationService } from "./../shared/notification.service";
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable, Subscriber } from 'rxjs'




const headers = {
  "Access-Control-Allow-Origin": '*',
}
@Component({
  selector: 'app-homeDetail',
  templateUrl: './homeDetail.component.html',
  styleUrls: ['./homeDetail.component.css']
})
export class homeDetailComponent {
  [x: string]: any;
  customerForm: FormGroup;
  result:boolean ;
  public anyList:any;
  fanyi:string[];
  constructor(private service: homePageervice,private http:HttpClient) { }
   submitFlag:any;
  ngOnInit() {
    this.customerForm = new FormGroup({
      $key: new FormControl(null),
      fullName: new FormControl('',Validators.required),
    })
  }

  onclear(){
    this.customerForm.reset();
    // Also can set up default Value
    this.submitFlag =false;
    this.result = true;
    this.anyList =null;
  }

  onsubmit(form){
    console.log(this.customerForm);
    var object = form.value;
    this.fullName = object.fullName
    var url = "http://www.apige520.com:82/" +this.fullName
    this.http.get(url,{headers:headers})
    .subscribe(res=>{ this.anyList = res 
      console.log(this.anyList)
      this.fanyi = this.anyList.message.data;
      this.submitFlag =true;
      })
  }

}
