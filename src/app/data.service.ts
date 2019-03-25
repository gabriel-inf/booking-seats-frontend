import { Injectable } from '@angular/core';
import { Reservation } from './reservation';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {


  reservation: Reservation;
  locked_seats: any = [];

  constructor(private apiService: ApiService) {
    // this.loadLockedSeats();
  }

  loadLockedSeats() {
    console.log("Loading locked seats")
    this.apiService.getLockedSeats().subscribe(res => {
      this.locked_seats = res;
    });
  }

  setReservation(reservation: Reservation) {
    this.reservation = reservation;
  }

  getReservation() {
    return this.reservation;
  }

  setSeat(label) {
    this.reservation.seat = label;
  }

}