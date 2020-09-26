import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MaterialModule} from './material/material.module';

import { ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { homeDetailComponent } from './homePage/homeDetail.component';
import { NotificationService } from "./shared/notification.service";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from '@angular/common/http';
import { MenuComponent } from './menu/menu.component';
import { CustomerManageComponent } from './Money/customer-manage/customer-manage.component';
import { DNFcustomerComponent } from './game/dnfcustomer/dnfcustomer.component';
import { DNFAdminComponent } from './game/dnfadmin/dnfadmin.component';
import { DouBanComponent } from './python/dou-ban/dou-ban.component';
import { VideoComponent } from './python/video/video.component';
import { DanMuComponent } from './python/dan-mu/dan-mu.component';
import { PersonalDiskComponent } from './others/personal-disk/personal-disk.component';
import { MatTableModule } from '@angular/material/table'; ;
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { CustomerSearchComponent } from './Money/customer-manage/customer-search/customer-search.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { CustomerLoginComponent } from './game/dnfcustomer/customer-login/customer-login.component';
import { AdminLoginComponent } from './game/dnfadmin/admin-login/admin-login.component';
import { CustomerControlComponent } from './game/dnfcustomer/customer-control/customer-control.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { AdminControlComponent } from './game/dnfadmin/admin-control/admin-control.component';
import { DiskTreeComponent } from './others/personal-disk/disk-tree/disk-tree.component';
import { MatTreeModule } from '@angular/material/tree';
import { DanmuDetailComponent } from './python/dan-mu/danmu-detail/danmu-detail.component';
import { DoubanDetailComponent } from './python/dou-ban/douban-detail/douban-detail.component';
import { VideoDetailComponent } from './python/video/video-detail/video-detail.component';
import { DiaryComponent } from './others/diary/diary.component';
import { AdminComponent } from './Money/admin/admin.component'
//import { QuillModule } from 'ngx-quill'

@NgModule({
  declarations: [
    AppComponent,
    homeDetailComponent,
    MenuComponent,
    CustomerManageComponent,
    DNFcustomerComponent,
    DNFAdminComponent,
    DouBanComponent,
    VideoComponent,
    DanMuComponent,
    PersonalDiskComponent,
    CustomerSearchComponent,
    CustomerLoginComponent,
    AdminLoginComponent,
    CustomerControlComponent,
    AdminControlComponent,
    DiskTreeComponent,
    DanmuDetailComponent,
    DoubanDetailComponent,
    VideoDetailComponent,
    DiaryComponent,
    AdminComponent,
//    QuillModule
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTreeModule
  ],
  providers: [NotificationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
