import { Routes, RouterModule } from '@angular/router';
import { FormComponent } from '../form/form.component';
import { ViewReservationsComponent } from '../view-reservations/view-reservations.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



const routes: Routes = [
  { path: '', component: FormComponent },
  // { path: '/manage', component: ViewReservationsComponent }

];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})

export class AppRoutingModule {

 }
