import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular'; // CKEditor modülünü içe aktarın

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { SliderComponent } from './slider/slider/slider.component';
import { HaberlerComponent } from './haberler/haberler/haberler.component';
import { EtkinliklerComponent } from './etkinlikler/etkinlikler/etkinlikler.component';
import { FirmalarComponent } from './firmalar/firmalar/firmalar.component';
import { LoginComponent } from './login/login/login.component';
import { AnamenuComponent } from './anamenu/anamenu/anamenu.component';
import { AdminComponent } from './admin/admin/admin.component';
import { AdminmenuComponent } from './admin/adminmenu/adminmenu/adminmenu.component';
import { SliderAdminComponent } from './admin/Slider-admin/slider-admin/slider-admin.component';
import { AdminEtkinliklerComponent } from './admin/admin-etkinlikler/admin-etkinlikler.component';
import { Adminmenu2Component } from './admin/adminmenu2/adminmenu2.component';
import { DeleteDirective } from './admin/directives/admin/delete.directive';
import { HaberlerAdminComponent } from './admin/haberler-admin/haberler-admin.component';
import { SkillMenuComponent } from './admin/haberler-admin/skill-menu/skill-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    SliderComponent,
    HaberlerComponent,
    EtkinliklerComponent,
    FirmalarComponent,
    LoginComponent,
    AnamenuComponent,
    AdminComponent,
    AdminmenuComponent,
    SliderAdminComponent,
    AdminEtkinliklerComponent,
    Adminmenu2Component,
    DeleteDirective,
    HaberlerAdminComponent,
    SkillMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
