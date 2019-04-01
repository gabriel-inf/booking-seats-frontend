import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material';
import { MovieMapComponent } from '../movie-map/movie-map.component';

@Component({
  selector: 'app-cpf-warnning',
  templateUrl: './cpf-warnning.component.html',
  styleUrls: ['./cpf-warnning.component.scss']
})
export class CpfWarnningComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<CpfWarnningComponent>,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
  }

  closeDialog() {
    this.dialogRef.close();
  }

  reload() {
    window.location.reload()
  }

  proceed() {
    this.dialog.closeAll();
    let dialogRef = this.dialog.open(MovieMapComponent, {
      width: '800px'
    });
    dialogRef.updatePosition();
  }

}
