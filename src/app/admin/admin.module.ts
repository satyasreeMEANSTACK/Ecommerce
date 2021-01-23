import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import{FormsModule}from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AllProductsComponent } from './all-products/all-products.component';
import { ViewallusersComponent } from './viewallusers/viewallusers.component';
import { CreateproductComponent } from './createproduct/createproduct.component';
import { EditComponent } from './edit/edit.component';


@NgModule({
  declarations: [DashboardComponent, AllProductsComponent, ViewallusersComponent, CreateproductComponent, EditComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule
  ]
})
export class AdminModule { }
