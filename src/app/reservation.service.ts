import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(
    private dataService: DataService,
    private apiService: ApiService
  ) { }

  pickReservation() {
    console.log(this.dataService.reservation)
    this.apiService.pick(this.dataService.reservation)
  }

  submitReservation() {
    console.log(this.dataService.reservation)
    this.apiService.confirm(this.dataService.reservation)
  }

  
}
