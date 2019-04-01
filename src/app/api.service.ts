import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Reservation } from './reservation';
import { controlNameBinding } from '@angular/forms/src/directives/reactive_directives/form_control_name';
import { DataService } from './data.service';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  server = "https://vingadores-ultimato.herokuapp.com"
  // server = "http://localhost:8080"

  constructor(private http: HttpClient,
  ) { }
  dataSource
  public getLockedSeats(): Observable<any> {

    let path = this.server + "/movie/lockedSeats";
    return this.http.get<Array<String>>(path);
  }

  public pick(booking: Reservation) {
    let path = this.server + "/movie/pick";
    return this.http.put(path, booking);
  }

  public confirm(booking: Reservation) {
    let path = this.server + "/movie/confirm"
    return this.http.put(path, booking);
  }

  public getAllReservations() {
    let path = this.server + "/movie/movieState"
    return this.http.get(path);
  }

  public getCpfUsage(cpf: string) {
    let path = this.server + "/movie/checkCpfUsage/" + cpf
    return this.http.get(path);
  }


  


}
