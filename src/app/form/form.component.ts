import { Component, OnInit } from '@angular/core';
import { Reservation } from '../reservation';
import { DataService } from '../data.service';
import { MatDialog } from '@angular/material';
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

  async onSubmit(form) {

    if (this.reservation.cpf != "" && this.reservation.email != "" && this.reservation.name != ""
          && this.reservation.phone != "" && this.reservation.seat != "" && this.reservation.value != "" && this.reservation.cpf.length == 11 && this.reservation.phone.length == 11) {
            this.dataService.reservation = this.reservation;
            let dialogRef = await this.dialog.open(MovieMapComponent, {
              width: '800px'
            });
            dialogRef.updatePosition();
          } else {
            alert("Informe todos os dados completos =)")
          }
  }

  clearReservation() {
    this.reservation.cpf = "";
    this.reservation.email = "";
    this.reservation.name = "";
    this.reservation.phone = "";
    this.reservation.seat = ""; 
    this.reservation.value = "";
  }

}
