import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as moment from 'moment'

const w0warn = '警告'
const w0reminder = '通知'
const w0error = '错误'
const headers = {
  "Access-Control-Allow-Origin": '*',
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  flag:number =0;
  w0title: string;
  status:boolean;
  profile:string;
  profile1:string;
  password:string;
  description:string;
  w0date: string;
  todayDate: Date
  public result: [];
  public anyList: any;
  public submitFlag: any;
  public DB_Profile: any;
  public DB_Password: any;
  public DB_Name: any;
  BossForm:FormGroup;
  url_Production: string = "http://localhost:82/"       //"http://www.apige520.com:82/"
  url_local: string = "http://localhost:82/"      //"http://localhost:82/"
  constructor(public _snackBar: MatSnackBar,private http: HttpClient) { }

  ngOnInit(): void {
    this.BossForm = new FormGroup({
      profile: new FormControl(''),
      profile1: new FormControl(''),
      password: new FormControl('',Validators.required),
      description: new FormControl(''),
    });
    this.flag=0
    this.EnquiryUserList()
  }

  submit(form){
    let object =form.value
    this.profile ='a' + object.profile;
    this.profile1 = object.profile1;
    this.password= object.password;
    this.description= object.description;
    this.todayDate = new Date();
    this.w0date = moment(this.todayDate).format('YYYYMMDD')
  if(this.flag==1){
      this.CreateUser()
  }

  if(this.flag==2){
    this.w0title = '跳转会员充值'
    this.openSnackBar(this.w0title, w0reminder)
}
if(this.flag==3){
  this.UpdatePassword()
}
if(this.flag==4){
  this.w0title = '跳转信息维护'
  this.openSnackBar(this.w0title, w0reminder)
}
if(this.flag==5){
  this.w0title = '跳转会员更新'
  this.openSnackBar(this.w0title, w0reminder)
}
if(this.flag==6){
  this.w0title = '跳转客户查询'
  this.openSnackBar(this.w0title, w0reminder)
}
if(this.flag==7){
  this.w0title = '跳转交易查询'
  this.openSnackBar(this.w0title, w0reminder)
}
if(this.flag==8){
  this.w0title = '跳转充值查询'
  this.openSnackBar(this.w0title, w0reminder)
}

if(this.flag==9){
  this.w0title = '跳转超级功能'
  this.openSnackBar(this.w0title, w0reminder)
}

if(this.flag==10){
  this.w0title = '营业统计汇总'
  this.openSnackBar(this.w0title, w0reminder)
}

if(this.flag==999){
this.BossForm.reset({
});
this.status=false;
this.flag=0;
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
  ColorClass3(flag){
    let x =flag;
    let className = '';
    if(x==3){
      className = 'RedColor';
    }
    return className
  }
  ColorClass4(flag){
    let x =flag;
    let className = '';
    if(x==4){
      className = 'RedColor';
    }
    return className
  }
  ColorClass5(flag){
    let x =flag;
    let className = '';
    if(x==5){
      className = 'RedColor';
    }
    return className
  }
  ColorClass6(flag){
    let x =flag;
    let className = '';
    if(x==6){
      className = 'RedColor';
    }
    return className
  }
  ColorClass7(flag){
    let x =flag;
    let className = '';
    if(x==7){
      className = 'RedColor';
    }
    return className
  }
  ColorClass8(flag){
    let x =flag;
    let className = '';
    if(x==8){
      className = 'RedColor';
    }
    return className
  }
  ColorClass9(flag){
    let x =flag;
    let className = '';
    if(x==9){
      className = 'RedColor';
    }
    return className
  }
  ColorClass10(flag){
    let x =flag;
    let className = '';
    if(x==10){
      className = 'RedColor';
    }
    return className
  }
  ColorClass998(flag){
    let x =flag;
    let className = '';
    if(x==998){
      className = 'RedColor';
    }
    return className
  }
  ColorClass997(flag){
    let x =flag;
    let className = '';
    if(x==997){
      className = 'RedColor';
    }
    return className
  }
  ColorClass996(flag){
    let x =flag;
    let className = '';
    if(x==996){
      className = 'RedColor';
    }
    return className
  }

  CreateUser(){
    let params = {
      "Profile": this.profile,
      "Password": this.password,
      "Description": this.description,
      "Date": this.w0date
    }
    var url = this.url_Production + "Money/CustomerManager/CreateUser/"
    this.http.post(url, params, { headers: headers }).subscribe(res => {
      this.anyList = res
      console.log(this.anyList)
      this.result = this.anyList.message; 
      if(this.result.length!=0){ 
      this.w0title = this.anyList.message
      this.openSnackBar(this.w0title, w0reminder)
      this.status=true;
      }
    });
  }

  UpdatePassword(){
    let params = {
      "Profile": this.profile1,
      "Password": this.password,
    }
    var url = this.url_Production + "Money/CustomerManager/UpdatePassword/"
    this.http.post(url, params, { headers: headers }).subscribe(res => {
      this.anyList = res
      console.log(this.anyList)
      this.result = this.anyList.message; 
      if(this.result.length!=0){ 
      this.w0title = this.anyList.message
      this.openSnackBar(this.w0title, w0reminder)
      this.status=true;
      }
    });
  }

  EnquiryUserList(){
    var url = this.url_Production + "Money/CustomerManager/EnquiryUserList/"
    this.http.get(url, { headers: headers }).subscribe(res => {
      this.anyList = res
      console.log(this.anyList)
      this.result = this.anyList.message; 
    });
  }
}
