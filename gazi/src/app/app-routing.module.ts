import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { LoginComponent } from './login/login/login.component'; 
import { Adminmenu2Component } from './admin/adminmenu2/adminmenu2.component'; 
import { AnamenuComponent } from './anamenu/anamenu/anamenu.component';
import { AdminComponent } from './admin/admin/admin.component';
import { SliderAdminComponent } from './admin/Slider-admin/slider-admin/slider-admin.component';
import { AdminEtkinliklerComponent } from './admin/admin-etkinlikler/admin-etkinlikler.component';
import { HaberlerAdminComponent } from './admin/haberler-admin/haberler-admin.component';
import { SkillMenuComponent } from './admin/haberler-admin/skill-menu/skill-menu.component';

const routes: Routes = [

{ path: 'login', component: LoginComponent },
{path:'',component:AnamenuComponent},
{path:'admin',component:AdminComponent},  
{path:'slider-admin' ,component:SliderAdminComponent},
{path:'admin-etkinlikler',component:AdminEtkinliklerComponent},
{path:'haberler-admin', component:HaberlerAdminComponent}

];


@NgModule({
  
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

