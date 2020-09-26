import { Component, OnInit, Output, EventEmitter, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableModule } from "@angular/material/table";
import * as moment from 'moment'
import { MatSnackBar } from '@angular/material/snack-bar';
import { ifStmt } from '@angular/compiler/src/output/output_ast';
import { ITS_JUST_ANGULAR } from '@angular/core/src/r3_symbols';
import { isNull } from 'util';
import { Observable } from "rxjs";
import { delay } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { BehaviorSubject } from "rxjs";
import { tap } from "rxjs/operators";
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { CustomerManageComponent } from 'src/app/Money/customer-manage/customer-manage.component'
export interface PeriodicElement {
  Customer_ID: number;
  Customer_Name: string;
  Mobile: string
  Item: string;
  Item_Price: string;
  Charge_Date: number;
  Available_Money: number;
}

export interface PeriodicCustElement {
  Customer_ID: number;
  Customer_Name: string;
  Mobile: string;
  Available_Money: number;
  CreateDate: number;
}
const headers = {
  "Access-Control-Allow-Origin": '*',
}
const w0warn = '警告'
const w0reminder = '通知'
const w0error = '错误'
@Component({
  selector: 'app-customer-search',
  templateUrl: './customer-search.component.html',
  styleUrls: ['./customer-search.component.css'],
  template: `{{_parent.flag}},{{_parent.DB_Profile}},{{_parent.DB_Password}},{{_parent.DB_Name}}`,
  providers: [
    // The locale would typically be provided on the root module of your application. We do it at
    // the component level here, due to limitations of our example generation script.
    { provide: MAT_DATE_LOCALE, useValue: 'ja-JP' },

    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ],
})

export class CustomerSearchComponent {
  itemList: []
  total: number = 0;
  custTotal: number = 0;
  item = [];
  custItem = [];
  public result: [];
  public anyList: any;
  public submitFlag: any;
  addressForm: FormGroup
  w0name: string;
  w0mobile: string;
  w0cardNumber: string;
  w1name: string;
  w1mobile: string;
  w1cardNumber: number;
  w1availableMoney: number;
  w0date: string;
  w0item: string;
  w0itemPrice: string;
  w1itemPrice: number;
  w0newGame: string;
  w0newGamePrice: string;
  w1newGamePrice: number;
  w0title: string;
  w0plusMoney: string;
  w1plusMoney: number;
  w0AVmoney: string;
  w1AVmoney: number;
  maxDate: Date;
  w0startDate: any
  w0endDate: any
  dateFilter: any
  dateFilter1: any = ''
  dateFilter2: any = ''
  dateFilter3: any = ''
  w1startDate: number
  w1endDate: number
  countCustomer: number
  countDeposit: number
  countCharge: number
  countAvailableMoney: number
  countAvailableMoneyTotal: number
  countCustomerTotal: number
  nameFlag: boolean = true
  mobileFlag: boolean = true
  cardNumberFlag: boolean = true
  plusMoneyFlag: boolean = true
  itemsFlag: boolean = true
  priceFlag: boolean = true
  newGameFlag: boolean = true
  newGamePriceFlag: boolean = true
  AVmoneyFlag: boolean = true
  DateStartFlag: boolean = true
  DateEndFlag: boolean = true
  url_Production: string = "http://localhost:82/"       //"http://www.apige520.com:82/"
  url_local: string = "http://localhost:82/"      //"http://localhost:82/"
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['Customer_ID', 'Customer_Name', 'Mobile', 'Item', 'Item_Price', 'Charge_Date', 'Available_Money'];
  custColumns = ['Customer_ID', 'Customer_Name', 'Mobile', 'Available_Money', 'CreateDate',];
  hasUnitNumber = false;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort
  dataSource = new MatTableDataSource<PeriodicElement>(this.item);
  custSource = new MatTableDataSource<PeriodicCustElement>(this.custItem);
  blankSource = new MatTableDataSource<PeriodicElement>();
  blankCustSource = new MatTableDataSource<PeriodicCustElement>();
  todayDate: Date


  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.paginator.page
      .pipe(
        tap(() => this.getTransactionHistory())
      )
      .subscribe
  }

  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.addressForm = new FormGroup({
      name: new FormControl(''),
      mobile: new FormControl('', [Validators.maxLength(11), Validators.min(0)]),
      cardNumber: new FormControl('', Validators.maxLength(11)),
      plusMoney: new FormControl('', Validators.min(0)),
      items: new FormControl(''),
      price: new FormControl('', Validators.min(1)),
      newGame: new FormControl(''),
      newGamePrice: new FormControl('', Validators.min(1)),
      AVmoney: new FormControl(''),
      DateStart: new FormControl(''),
      DateEnd: new FormControl('')
    });
    this.cdr.detectChanges();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    //Retrieve Item List
    this.retrieveItem()
    this.maxDate = new Date;
    console.log(this._parent.DB_Name)
    this.getSumary()

  }

  constructor(private fb: FormBuilder, private http: HttpClient, public _snackBar: MatSnackBar, public _parent: CustomerManageComponent, private _adapter: DateAdapter<any>, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, private cdr: ChangeDetectorRef) {
    iconRegistry.addSvgIcon(
      'Money',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/Money-icon.svg'));
    iconRegistry.addSvgIcon(
      'phone',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/phone.svg'));
    iconRegistry.addSvgIcon(
      'name',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/name.svg'));
    iconRegistry.addSvgIcon(
      'cardnumber',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/cardnumber.svg'));
    iconRegistry.addSvgIcon(
      'date',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/date.svg'));
    iconRegistry.addSvgIcon(
      'item',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/item.svg'));
    iconRegistry.addSvgIcon(
      'charge',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/charge.svg'));
    iconRegistry.addSvgIcon(
      'availableMoney',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/availableMoney.svg'));
  }
  @Output() private outer = new EventEmitter();
  async onSubmit(form) {
    //  alert('Thanks!');
    this.reSet()
    console.log(this._parent.DB_Name)
    var object = form.value;
    this.w0name = object.name
    this.w0mobile = object.mobile
    this.w0cardNumber = object.cardNumber
    this.w1cardNumber = parseInt(this.w0cardNumber)
    this.w0item = object.items
    this.w0itemPrice = object.price
    this.w1itemPrice = parseInt(this.w0itemPrice)
    this.w0newGame = object.newGame
    this.w0newGamePrice = object.newGamePrice
    this.w1newGamePrice = parseInt(this.w0newGamePrice)
    this.w1itemPrice = parseInt(this.w0itemPrice)
    this.todayDate = new Date();
    this.w0plusMoney = object.plusMoney
    this.w1plusMoney = parseInt(object.plusMoney)
    this.w0AVmoney = object.AVmoney
    this.w1AVmoney = parseInt(object.AVmoney)
    this.w0date = moment(this.todayDate).format('YYYYMMDD')
    this.w0startDate = moment(object.DateStart).format('YYYYMMDD')
    this.w0endDate = moment(object.DateEnd).format('YYYYMMDD')
    this.w1startDate = parseInt(this.w0startDate)
    this.w1endDate = parseInt(this.w0endDate)
    this.paginator.pageIndex = 0
    //this.formatSQL()
    //this.paginator.pageIndex=0;

    if (this._parent.flag == 1) {//新建客户
      if (this.w0name == '' || this.w0mobile == '') {
        this.w0title = '创建客户必须填入姓名和手机号'
        this.openSnackBar(this.w0title, w0error)
      } else
        if (this.w0cardNumber == '' && this.w0plusMoney != '') {
          this.w0title = '卡号随机分配的情况下不得填写充值金额'
          this.openSnackBar(this.w0title, w0error)
        }
        else {

          this.addCustomer();
        }
    }
    if (this._parent.flag == 2) { //充钱当大佬


      if (isNaN(this.w1plusMoney)) {
        this.w0title = '充钱充钱当大佬必须是整数呀'
        this.openSnackBar(this.w0title, w0warn)
      }
      else {
        if (this.w0cardNumber == '') {
          this.w0title = '请输入卡号！'
          this.openSnackBar(this.w0title, w0warn)
        }

        else {
          await this.addMoney();
        }
      }

    }

    if (this._parent.flag == 3) { //消费

      if (this.w0cardNumber == '') {
        this.w0title = '请输入卡号！'
        this.openSnackBar(this.w0title, w0warn)
      }
      await this.enquiryCustomer()
      if (this.custTotal == 1 && this.w0itemPrice !== "" && this.w1availableMoney >= this.w1itemPrice && this.w0item != "") {
        await this.costProcess();
      }
      else {
        if (this.custTotal != 1) {
          this.w0title = '请指定特定唯一的客户信息'
          this.openSnackBar(this.w0title, w0warn)
        } else
          if (this.w0item == "") {
            this.w0title = '请输入消费项目'
            this.openSnackBar(this.w0title, w0warn)
          } else
            if (this.w0itemPrice == "") {
              this.w0title = '消费价格不能为空'
              this.openSnackBar(this.w0title, w0error)
            } else
              if (isNaN(this.w1itemPrice)) {
                this.w0title = '消费价格必须是整数呀!'
                this.openSnackBar(this.w0title, w0error)
              } else
                if (this.w1availableMoney < this.w1itemPrice) {
                  this.w0title = '赶紧充钱吧臭妹妹，你的余额已经不足'
                  this.openSnackBar(this.w0title, w0error)
                }
      }

    }
    if (this._parent.flag == 4) { //新建消费项目
      if (this.w0newGamePrice == "" || this.w0newGame == "") {
        this.w0title = '新建消费项目必须输入（新增消费项目）+（新增消费价格）'
        this.openSnackBar(this.w0title, w0error)
      } else {
        if (!isNaN(this.w1newGamePrice)) {
          this.newItem()
          this.w0title = '新增项目成功'
          this.openSnackBar(this.w0title, w0reminder)
        } else {
          this.w0title = '新增价格必须是整数呀！'
          this.openSnackBar(this.w0title, w0reminder)

        }
      }
    }
    if (this._parent.flag == 5) { //修改客户信息
      if (this.w0cardNumber == "") {
        this.w0title = '卡号不能为空'
        this.openSnackBar(this.w0title, w0error)
      } else
        if (this.w0AVmoney != '' && isNaN(this.w1AVmoney)) {
          this.w0title = '更新的钱必须为整数呢'
          this.openSnackBar(this.w0title, w0error)
        } else

          this.enquirySpecifyCustomer()
    }
    if (this._parent.flag == 6) {//查询客户信息
      let x = this._parent.flag;
      this.enquiryCustomer();
    }
    if (this._parent.flag == 7) { //查询历史消费记录
      if ((object.DateStart != '') && (object.DateEnd != '') && this.w1endDate < this.w1startDate) {
        this.w0title = '结束日期必须大于等于开始日期！'
        this.openSnackBar(this.w0title, w0error)
      } else if ((object.DateStart != '') && (object.DateEnd == '') || (object.DateStart == '') && (object.DateEnd != '')) {
        this.w0title = '日期必须都输入或者都不输入！'
        this.openSnackBar(this.w0title, w0error)
      } else {
        if (object.DateStart != "") {
          this.dateFilter = 'AND Charge_Date >=' + this.w0startDate + ' AND Charge_Date <=' + this.w0endDate;
        }
        this.getTransactionHistory()
      }
    }
    if (this._parent.flag == 8) { //查询历史充值记录

      if ((object.DateStart != '') && (object.DateEnd != '') && this.w1endDate < this.w1startDate) {
        this.w0title = '结束日期必须大于等于开始日期！'
        this.openSnackBar(this.w0title, w0error)
      } else if ((object.DateStart != '') && (object.DateEnd == '') || (object.DateStart == '') && (object.DateEnd != '')) {
        this.w0title = '日期必须都输入或者都不输入！'
        this.openSnackBar(this.w0title, w0error)
      } else {
        if (object.DateStart != "") {
          this.dateFilter = 'AND Deposit_Date >=' + this.w0startDate + ' AND Deposit_Date <=' + this.w0endDate;
        }
        this.getAddMoneyHistory();
      }
    }
    if (this._parent.flag == 10) { //营业统计汇总

      if ((object.DateStart != '') && (object.DateEnd != '') && this.w1endDate < this.w1startDate) {
        this.w0title = '结束日期必须大于等于开始日期！'
        this.openSnackBar(this.w0title, w0error)
      } else if ((object.DateStart != '') && (object.DateEnd == '') || (object.DateStart == '') && (object.DateEnd != '')) {
        this.w0title = '日期必须都输入或者都不输入！'
        this.openSnackBar(this.w0title, w0error)
      } else {
        if (object.DateStart != "") {
          this.dateFilter1 = ' WHERE CreateDate >=' + this.w0startDate + ' AND CreateDate <=' + this.w0endDate;
          this.dateFilter2 = ' WHERE Deposit_Date >=' + this.w0startDate + ' AND Deposit_Date <=' + this.w0endDate;
          this.dateFilter3 = ' WHERE Charge_Date >=' + this.w0startDate + ' AND Charge_Date <=' + this.w0endDate;
        }
        this.getSumary();
      }
    }
    if (this._parent.flag == 11) { //删除客户
      await this.enquiryCustomer()
      if (this.custTotal != 1) {
        this.w0title = '请指定特定唯一的客户信息'
        this.openSnackBar(this.w0title, w0warn)
      }
      else {
        await this.deleteCustomer()
        this.w0title = '删除成功'
        this.openSnackBar(this.w0title, w0reminder)
      }
    }
  }
  //消息提醒
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }
  //交易历史记录
  getTransactionHistory() {
    let params = {
      "name": '%' + this.w0name + '%',
      "mobile": this.w0mobile + '%',
      "cardNumber": this.w0cardNumber + '%',
      "dateFilter": this.dateFilter,
      //    "pageIndex": this.paginator.pageIndex,
      //    "pageSize": this.paginator.pageSize,
      "DB_Profile": this._parent.DB_Profile,
      "DB_Password": this._parent.DB_Password,
      "DB_Name": this._parent.DB_Name
    }
    this.reSet()
    var url = this.url_Production + "Money/CustomerManager/EnqTransactionHistory/"
    this.http.post(url, params, { headers: headers })
      .subscribe(res => {
        this.anyList = res
        console.log(this.anyList)
        this.result = this.anyList.message;
        this.total = this.anyList.Total[0].COUNT;
        this.submitFlag = true;
        this.item = [];
        for (let i = 0; i < this.result.length; i++) {
          this.item.push(this.result[i])
        }
        this.dataSource = new MatTableDataSource<PeriodicElement>(this.item)
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
  }

  //充值历史记录
  getAddMoneyHistory() {
    let params = {
      "name": '%' + this.w0name + '%',
      "mobile": this.w0mobile + '%',
      "cardNumber": this.w0cardNumber + '%',
      "dateFilter": this.dateFilter,
      "DB_Profile": this._parent.DB_Profile,
      "DB_Password": this._parent.DB_Password,
      "DB_Name": this._parent.DB_Name
    }
    this.reSet()
    var url = this.url_Production + "Money/CustomerManager/EnqAddMoneyHistory/"
    this.http.post(url, params, { headers: headers }).subscribe(res => {
      this.anyList = res
      console.log(this.anyList)
      this.result = this.anyList.message;
      this.submitFlag = true;
      this.custTotal = this.result.length;
      this.custItem = [];
      for (let i = 0; i < this.result.length; i++) {
        this.custItem.push(this.result[i])
        //       this.w1cardNumber = this.custItem[0].Customer_ID
        //       this.w1mobile = this.custItem[0].Mobile
        //       this.w1name = this.custItem[0].Customer_Name
        //       this.w1availableMoney = this.custItem[0].Available_Money
      }
      this.custSource = new MatTableDataSource<PeriodicCustElement>(this.custItem)
    })
  }
  //客户信息模糊查询
  enquiryCustomer() {
    let params = {
      "name": '%' + this.w0name + '%',
      "mobile": this.w0mobile + '%',
      "cardNumber": this.w0cardNumber + '%',
      "DB_Profile": this._parent.DB_Profile,
      "DB_Password": this._parent.DB_Password,
      "DB_Name": this._parent.DB_Name
    }
    this.reSet()
    var url = this.url_Production + "Money/CustomerManager/EnqCust/"
    this.http.post(url, params, { headers: headers }).subscribe(res => {
      this.anyList = res
      console.log(this.anyList)
      this.result = this.anyList.message;
      this.submitFlag = true;
      this.custTotal = this.result.length;
      this.custItem = [];
      for (let i = 0; i < this.result.length; i++) {
        this.custItem.push(this.result[i])
        this.w1cardNumber = this.custItem[0].Customer_ID
        this.w1mobile = this.custItem[0].Mobile
        this.w1name = this.custItem[0].Customer_Name
        this.w1availableMoney = this.custItem[0].Available_Money
      }
      this.custSource = new MatTableDataSource<PeriodicCustElement>(this.custItem)
    });
  }

  //指定客户信息查询
  enquirySpecifyCustomer() {
    let params = {
      "cardNumber": this.w0cardNumber,
      "AVmoney": this.w0AVmoney,
      "DB_Profile": this._parent.DB_Profile,
      "DB_Password": this._parent.DB_Password,
      "DB_Name": this._parent.DB_Name
    }
    this.reSet()
    var url = this.url_Production + "Money/CustomerManager/EnqSpecifyCust/"
    this.http.post(url, params, { headers: headers }).subscribe(res => {
      this.anyList = res
      console.log(this.anyList)
      this.result = this.anyList.message;
      this.submitFlag = true;
      this.custTotal = this.result.length;
      this.custItem = [];
      for (let i = 0; i < this.result.length; i++) {
        this.custItem.push(this.result[i])
        this.w1cardNumber = this.custItem[0].Customer_ID
        this.w1mobile = this.custItem[0].Mobile
        this.w1name = this.custItem[0].Customer_Name
        this.w1availableMoney = this.custItem[0].Available_Money
      }
      this.custSource = new MatTableDataSource<PeriodicCustElement>(this.custItem)
      if (this.w0AVmoney != '') {
        var url = this.url_Production + "Money/CustomerManager/UpdateCust"
        this.http.post(url, params, { headers: headers }).subscribe(res => {
          this.anyList = res
          this.enquiryCustomer();
        });
      }
    });
  }
  //添加客户
  addCustomer() {
    let params = {
      "name": this.w0name,
      "mobile": this.w0mobile,
      "cardNumber": this.w0cardNumber,
      "money": this.w0plusMoney,
      "createDate": this.w0date,
      "DB_Profile": this._parent.DB_Profile,
      "DB_Password": this._parent.DB_Password,
      "DB_Name": this._parent.DB_Name
    }
    if (this.w0cardNumber == '') {
      var url = this.url_Production + "Money/CustomerManager/Default"
    } else {
      var url = this.url_Production + "Money/CustomerManager/"
    }
    this.http.post(url, params, { headers: headers })
      .subscribe(res => {
        this.anyList = res
        this.w0title = this.anyList.message
        this.openSnackBar(this.w0title, w0reminder)
        this.enquiryCustomer()
        console.log(this.anyList)
      })
  }
  //充钱
  addMoney() {
    let params = {
      "name": '%' + this.w0name + '%',
      "mobile": this.w0mobile + '%',
      "cardNumber": this.w0cardNumber + '%',
      "money": this.w0plusMoney,
      "createDate": this.w0date,
      "DB_Profile": this._parent.DB_Profile,
      "DB_Password": this._parent.DB_Password,
      "DB_Name": this._parent.DB_Name
    }
    var url = this.url_Production + "Money/CustomerManager/addMoney"
    this.http.post(url, params, { headers: headers })
      .subscribe(res => {
        this.anyList = res
        console.log(this.anyList);
        this.result = this.anyList.data;
        this.submitFlag = true;
        this.custTotal = this.result.length;
        this.custItem = [];
        for (let i = 0; i < this.result.length; i++) {
          this.custItem.push(this.result[i])
          this.w1cardNumber = this.custItem[0].Customer_ID
          this.w1mobile = this.custItem[0].Mobile
          this.w1name = this.custItem[0].Customer_Name
          this.w1availableMoney = this.custItem[0].Available_Money
        }
        this.custSource = new MatTableDataSource<PeriodicCustElement>(this.custItem)
        this.w0title = this.anyList.message
        this.openSnackBar(this.w0title, w0reminder)
      })
  }
  //初始化
  reSet() {
    this.dataSource = this.blankSource;
    this.custSource = this.blankCustSource;
    this.custItem = [];
    this.item = [];
    this.total = 0;
    this.anyList = '';
    this.dateFilter = '';
    this.dateFilter1 = '';
    this.dateFilter2 = '';
    this.dateFilter3 = '';
    this.paginator.pageIndex = 0;
  }

  onclear() {
    this.addressForm.reset({
      name: '',
      mobile: '',
      cardNumber: '',
      plusMoney: '',
      items: '',
      price: '',
      newGame: '',
      newGamePrice: '',
      AVmoney: '',
      DateStart: '',
      DateEnd: ''
    });
  }
  //获取消费项目信息
  retrieveItem() {
    let params = {
      "DB_Profile": this._parent.DB_Profile,
      "DB_Password": this._parent.DB_Password,
      "DB_Name": this._parent.DB_Name
    }
    var url = this.url_Production + "Money/CustomerManager/EnqitemList/"
    this.http.post(url, params, { headers: headers })
      .subscribe(res => {
        this.anyList = res
        console.log(this.anyList)
        this.itemList = this.anyList.message;
        this.submitFlag = false;
      })
  }
  //消费
  costProcess() {
    let params = {
      "name": this.w1name,
      "mobile": this.w1mobile,
      "cardNumber": this.w1cardNumber,
      "createDate": this.w0date,
      "item": this.w0item,
      "itemPrice": this.w0itemPrice,
      "DB_Profile": this._parent.DB_Profile,
      "DB_Password": this._parent.DB_Password,
      "DB_Name": this._parent.DB_Name
    }
    var url = this.url_Production + "Money/CustomerManager/Cost"
    this.http.post(url, params, { headers: headers })
      .subscribe(res => {
        this.anyList = res
        this.w0title = '消费成功'
        this.enquiryCustomer();
        this.openSnackBar(this.w0title, w0reminder)
        console.log(this.anyList)
      })
  }

  //新增消费项目
  newItem() {
    let params = {
      "newGame": this.w0newGame,
      "newGamePrice": this.w0newGamePrice,
      "DB_Profile": this._parent.DB_Profile,
      "DB_Password": this._parent.DB_Password,
      "DB_Name": this._parent.DB_Name
    }
    var url = this.url_Production + "Money/CustomerManager/newItem"
    this.http.post(url, params, { headers: headers })
      .subscribe(res => {
        this.anyList = res
        console.log(this.anyList)
        this.retrieveItem()
      })
  }

  //统计报表
  getSumary() {

    let params = {
      "dateFilter1": this.dateFilter1,
      "dateFilter2": this.dateFilter2,
      "dateFilter3": this.dateFilter3,
      "DB_Profile": this._parent.DB_Profile,
      "DB_Password": this._parent.DB_Password,
      "DB_Name": this._parent.DB_Name
    }
    this.reSet()
    var url = this.url_Production + "Money/CustomerManager/getSumary/"
    this.http.post(url, params, { headers: headers })
      .subscribe(res => {
        this.anyList = res
        console.log(this.anyList)
        this.countCustomer = this.anyList.message[0].COUNT;
        this.countDeposit = this.anyList.message[1].COUNT;
        this.countCharge = this.anyList.message[2].COUNT;
        this.countCustomerTotal = this.anyList.Total[0].COUNT;
        this.countAvailableMoneyTotal = this.anyList.Total[1].COUNT;

      })

  }

  //删除客户
  deleteCustomer() {

    let params = {
      "name": this.w1name,
      "mobile": this.w1mobile,
      "cardNumber": this.w1cardNumber,
      "DB_Profile": this._parent.DB_Profile,
      "DB_Password": this._parent.DB_Password,
      "DB_Name": this._parent.DB_Name
    }
    this.reSet()
    var url = this.url_Production + "Money/CustomerManager/deleteCustomer/"
    this.http.post(url, params, { headers: headers })
      .subscribe(res => {
        this.anyList = res
        this.enquiryCustomer()
      })

  }

}
