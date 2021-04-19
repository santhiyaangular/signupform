import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-warning',
  templateUrl: './view-warning.component.html',
  styleUrls: ['./view-warning.component.css']
})
export class ViewWarningComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ViewWarningComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  ok(){
    this.dialogRef.close("clear");
  }

  cancel(){
    this.dialogRef.close("cancel");
  }

}
