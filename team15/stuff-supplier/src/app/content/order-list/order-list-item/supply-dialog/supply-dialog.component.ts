import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrderItem } from 'src/app/models/order-item';

@Component({
  selector: 'app-supply-dialog',
  templateUrl: './supply-dialog.component.html',
  styleUrls: ['./supply-dialog.component.scss']
})
export class SupplyDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<SupplyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: OrderItem[],
  ) {
    this.data.forEach(x => x.quantity = 0);
  }

  @ViewChild('form') form?: ElementRef;

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    if (!this.form?.nativeElement.className.includes('invalid')) {
      this.data.forEach(data => {
        if (data.quantity != null && data.providedQuantity != null)
          data.providedQuantity += data.quantity;
      })
      this.dialogRef.close(true);
    }

  }
}
