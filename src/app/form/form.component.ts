import { Component, OnInit } from '@angular/core';
import { Reservation } from '../reservation';
import { ApiService } from '../api.service';
import { DataService } from '../data.service';
import { MatDialogRef, MatDialog } from '@angular/material';
import { MovieMapComponent } from '../movie-map/movie-map.component';
import { ReservationService } from '../reservation.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  constructor(
    private reservationService: ReservationService,
    private dataService: DataService,
    private dialog: MatDialog
  ) { }

  reservation: Reservation = new Reservation();

  ngOnInit() {
  }

  onSubmit(form) {

    this.dataService.reservation = this.reservation;
    let dialogRef = this.dialog.open(MovieMapComponent, {
      width: '600px'
    });
    dialogRef.updatePosition();



  }



}
