import { Route, RouterModule } from '@angular/router';
import { FormComponent } from './form/form.component';
import { ViewReservationsComponent } from './view-reservations/view-reservations.component';
import { NgModule } from '@angular/core';



const routes: Route[] = [
  { path: '', component: FormComponent },
  { path: 'manage', component: ViewReservationsComponent }

];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})

export class AppRoutingModule {

 }
