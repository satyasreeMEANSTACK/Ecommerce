import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'
import { CommonModule } from '@angular/common';
import{FormsModule}from '@angular/forms';
import { UserRoutingModule } from './user-routing.module';


import { UserallproductsComponent } from './userallproducts/userallproducts.component';
import { UserdashboardComponent } from './userdashboard/userdashboard.component';



@NgModule({
  declarations: [ UserallproductsComponent, UserdashboardComponent],
  imports: [
    BrowserModule,
    CommonModule,
    UserRoutingModule,
    FormsModule,
    
  ]
})
export class UserModule { }
