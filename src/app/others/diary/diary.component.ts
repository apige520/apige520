import { Component, OnInit,Predicate,ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as moment from 'moment'
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

export interface PeriodicCustElement {
  Author: string;
  Date: string;
  Detail: string;
  Weather: string;
  TotalDay: string;
}
const w0warn = '警告'
const w0reminder = '通知'
const w0error = '错误'
const headers = {
  "Access-Control-Allow-Origin": '*',
}

@Component({
  selector: 'app-diary',
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.css']
})
export class DiaryComponent implements OnInit {
  SMSFLAG:boolean =false
  itemList: []
  total: number = 0;
  custTotal: number = 0;
  item = [];
  custItem = [];
  flag:string;
  w0title: string;
  status:boolean;
  author:string;
  weather:string;
  password:string;
  detail:string;
  w0date: string;
  todayDate: any;
  Days:any
  public result: [];
  public result1: [];
  public result2: [];
  public anyList: any;
  public submitFlag: any;
  public DB_Profile: any;
  public DB_Password: any;
  public DB_Name: any;
  BossForm:FormGroup;
  url_Production: string = "http://www.apige520.com:82/"       //"http://www.apige520.com:82/"
  url_local: string = "http://localhost:82/"      //"http://localhost:82/"
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort
  dataSource = new MatTableDataSource<PeriodicCustElement>(this.item);
  blankDataSource = new MatTableDataSource<PeriodicCustElement>();
  displayedColumns = ['Author', 'Date', 'Detail','Weather','TotalDay'];
  constructor(public _snackBar: MatSnackBar,private http: HttpClient) { }

  ngOnInit(): void {
    this.BossForm = new FormGroup({
      author: new FormControl(''),
      weather: new FormControl(''),
      createDate: new FormControl(''),
      detail: new FormControl(''),
      flag:new FormControl('1'),
      password: new FormControl('',Validators.required),
    });
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.flag='1'
    this.todayDate =moment(new Date()).format('YYYY-MM-DD HH:mm:ss')

    this.EnquiryUserList()
  }

  submit(form){
    let object =form.value
    this.author = object.author
    this.password= object.password;
    this.weather= object.weather;
    this.detail= object.detail;
    this.flag= object.flag;
    this.dataSource.paginator.pageIndex=0
    if (this.password!='5201314'){
      this.w0title = "密码错误了呢"
      this.openSnackBar(this.w0title, w0reminder)
    } else 
  if(this.flag=='1'){
    this.EnquiryDiary()
    this.SMSFLAG =true
  } else

  if(this.flag=='2'){
    this.CreateDiary()
    this.SMSFLAG =true
}
else

if(this.flag=='999'){
this.BossForm.reset({
});
this.status=false;
this.flag='0';
}
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }

  ColorClass1(flag){
    let x =flag;
    let className = '';
    if(x==1){
      className = 'RedColor';
    }
    return className
  }
  ColorClass2(flag){
    let x =flag;
    let className = '';
    if(x==2){
      className = 'RedColor';
    }
    return className
  }
 
  CreateDiary(){
    this.todayDate =moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
    this.getDaysBetween()
    let params = {
      "author": this.author,
      "weather": this.weather,
      "detail": this.detail,
      "Date": this.todayDate,
      "TotalDay": this.Days
    }
    var url = this.url_Production + "Others/Diary/CreateDiary/"
    this.http.post(url, params, { headers: headers }).subscribe(res => {
      this.anyList = res
      console.log(this.anyList)
      this.w0title = this.anyList.message
      this.openSnackBar(this.w0title, w0reminder)
      this.status=true;
    });
  }

  EnquiryDiary(){
    var url = this.url_Production + "Others/Diary/EnquiryDiary/"
    this.http.get(url,  { headers: headers }).subscribe(res => {
      this.anyList = res
      console.log(this.anyList)
      this.result = this.anyList.data;
      this.total = this.result.length;
      this.submitFlag = true;
      this.item = [];
      for (let i = 0; i < this.result.length; i++) {
        this.item.push(this.result[i])
      }
      this.dataSource = new MatTableDataSource<PeriodicCustElement>(this.item)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  SendSMS(){
    if(window.confirm('是否需要给溪溪宝贝发送短信！？')){
      //alert("确定");
      let params = {
        "Mobile": 18671178805
      }
      var url = this.url_Production + "Others/SMS/"
      this.http.post(url,params,{ headers: headers }).subscribe(res => {
        this.anyList = res
        console.log(this.anyList)
        this.w0title = this.anyList
        this.openSnackBar(this.w0title, w0reminder)
      });
    }

 else{
      //alert("取消");

 }
  }

  EnquiryUserList(){
    var url = this.url_Production + "Others/Diary/Default/"
    this.http.get(url, { headers: headers }).subscribe(res => {
      this.anyList = res
      console.log(this.anyList)
      this.result1 = this.anyList.data1; 
      this.result2 = this.anyList.data2; 
    });
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
 }
}
