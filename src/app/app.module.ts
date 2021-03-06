import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxMaskModule } from 'ngx-mask';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ApiService } from './api.service';
import { ReservationService } from './reservation.service';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from './data.service';
import { MatDialogRef, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material';
import { TooltipModule } from 'ngx-bootstrap';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { Routes, RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';



import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
} from '@angular/material';
import { FormComponent } from './form/form.component';
import { FormsModule } from '@angular/forms';
import { MovieMapComponent } from './movie-map/movie-map.component';
import { SucessoComponent } from './sucesso/sucesso.component';
import { ViewReservationsComponent } from './view-reservations/view-reservations.component';
import { CpfWarnningComponent } from './cpf-warnning/cpf-warnning.component';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    MovieMapComponent,
    SucessoComponent,
    ViewReservationsComponent,
    CpfWarnningComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule, MatCheckboxModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    NgxMaskModule.forRoot(),
    FlexLayoutModule,
    HttpClientModule,
    FormsModule,
    TooltipModule.forRoot(),
    NgbModule,  
    AppRoutingModule


  ],
  providers: [ApiService, DataService, ReservationService, 
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: true } },
    { provide: MatDialogRef, useValue: { hasBackdrop: false } }],
  bootstrap: [AppComponent],
  entryComponents: [MovieMapComponent, SucessoComponent, CpfWarnningComponent]
})
export class AppModule { }
