import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material';
import { DataService } from '../data.service';

@Component({
  selector: 'app-sucesso',
  templateUrl: './sucesso.component.html',
  styleUrls: ['./sucesso.component.scss']
})
export class SucessoComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<SucessoComponent>,
    public dialog: MatDialog,
    private dataService: DataService) { }

  ngOnInit() {
  }

  reload() {
    window.location.reload()
  }



}
