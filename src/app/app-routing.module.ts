import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutusComponent } from './aboutus/aboutus.component';

import { AllProductsComponent } from './admin/all-products/all-products.component';
import { CreateproductComponent } from './admin/createproduct/createproduct.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { EditComponent } from './admin/edit/edit.component';
import { ViewallusersComponent } from './admin/viewallusers/viewallusers.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserallproductsComponent } from './user/userallproducts/userallproducts.component';
import { UserdashboardComponent } from './user/userdashboard/userdashboard.component';


const routes: Routes = [
  {path:"home",component:HomeComponent},
  {path:"user/register",component:RegisterComponent},
  {path:"login",component:LoginComponent},
  {path:"aboutus",component:AboutusComponent},
  
  {path:"",redirectTo:"/home",pathMatch:"full"},
  //all admin routs 
  { path:"admin/:name",component:DashboardComponent,
    children: [
      { path: "allproducts", component: AllProductsComponent },
      { path: "viewallusers", component: ViewallusersComponent },
      { path: "createproduct", component: CreateproductComponent},
      


    ]
  },
  // user routs
  { path:"user/:name",component:UserdashboardComponent,
    children: [
      { path: "userallproduct", component: UserallproductsComponent },
      
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true}),],
  exports: [RouterModule]
})
export class AppRoutingModule { }
