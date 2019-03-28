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

  public getLockedSeats(): Observable<any> {

    let path = this.server + "/movie/lockedSeats";
    console.log(path);
    return this.http.get<Array<String>>(path);
  }

  public pick(booking: Reservation) {
    let path = this.server + "/movie/pick";
    console.log(path);
    console.log(booking)
    return this.http.put(path, booking);
  }

  public confirm(booking: Reservation) {
    let path = this.server + "/movie/confirm"
    console.log(path);
    return this.http.put(path, booking);
  }



  


}
