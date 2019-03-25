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

  async pickReservation(seat: string) {
    await this.dataService.setSeat(seat)
    this.apiService.pick(this.dataService.reservation).subscribe(res => {
      console.log(res)
    }, err => {
      console.log(err)
    });
  }

  async submitReservation() {
    this.apiService.confirm(this.dataService.reservation).subscribe(res => {
      console.log(res);
    }, err => console.log(err));
  }

  
}
