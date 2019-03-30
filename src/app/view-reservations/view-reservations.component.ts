import { Component, OnInit } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { ApiService } from '../api.service';
import { Reservation } from '../reservation';

@Component({
  selector: 'app-view-reservations',
  templateUrl: './view-reservations.component.html',
  styleUrls: ['./view-reservations.component.scss']
})
export class ViewReservationsComponent implements OnInit {

  dataSource: any;
  constructor(private apiService: ApiService) { }

  displayedColumns: string[] = ['cadeira', 'name', 'cpf', 'email', 'phone', 'value'];

  ngOnInit() {
    this.apiService.getAllReservations().subscribe(res => {
      this.dataSource = res;
    }, err => alert(err.message));
  }

}
