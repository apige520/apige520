import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//游戏组
import { DNFcustomerComponent } from "./game/dnfcustomer/dnfcustomer.component";
import { DNFAdminComponent } from "./game/dnfadmin/dnfadmin.component";
//爬虫组
import { DouBanComponent} from "./python/dou-ban/dou-ban.component";
import { VideoComponent} from "./python/video/video.component";
import { DanMuComponent} from "./python/dan-mu/dan-mu.component";
import { homeDetailComponent } from "./homePage/homeDetail.component";
//财务组
import {CustomerManageComponent  } from "./Money/customer-manage/customer-manage.component";
//其他组
import { PersonalDiskComponent } from "./others/personal-disk/personal-disk.component";
import { DiaryComponent } from "./others/diary/diary.component";
import { WaiguaComponent} from "./others/waigua/waigua.component";
const routes: Routes = [
  {path: 'game/DNFcustomer', component: DNFcustomerComponent},
  {path: 'game/DNFAdmin', component: DNFAdminComponent},
  {path: 'python/DouBan', component: DouBanComponent},
  {path: 'python/Video', component: VideoComponent},
  {path: 'python/DanMu', component: DanMuComponent},
  {path: 'python/home', component:homeDetailComponent},
  {path: 'money/CustomerManager', component:CustomerManageComponent},
  {path: 'others/PersonalDisk', component:PersonalDiskComponent},
  {path: 'others/Diary', component:DiaryComponent},
  {path: 'others/Waigua', component:WaiguaComponent},
  {path: '**',redirectTo:'money/CustomerManager'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
