import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SubscribeDialogData } from '../subscribe-dialog-data';

@Component({
  selector: 'app-add-to-cart-dialog',
  templateUrl: './subscribe-dialog.component.html',
  styleUrls: ['./subscribe-dialog.component.css'],
})
export class SubscribeDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<SubscribeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SubscribeDialogData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
