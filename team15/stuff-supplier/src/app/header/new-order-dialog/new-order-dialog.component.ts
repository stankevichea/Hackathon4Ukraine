import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Address } from 'src/app/models/address';
import { Order } from 'src/app/models/order';
import { OrderItem } from 'src/app/models/order-item';

@Component({
  selector: 'app-new-order-dialog',
  templateUrl: './new-order-dialog.component.html',
  styleUrls: ['./new-order-dialog.component.scss']
})
export class NewOrderDialogComponent {

  address: Address;
  orderItems: OrderItem[] = [{ providedQuantity: 0 } as any];
  constructor(
    public dialogRef: MatDialogRef<NewOrderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Order
  ) {
    this.address = {} as Address;
    this.data.address = this.address
    this.data.orderItems = this.orderItems;
  }
  @ViewChild('form') form?: ElementRef;

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    if (!this.form?.nativeElement.className.includes('invalid'))
      this.dialogRef.close(true);
  }

  newItem(): void {
    this.orderItems.push({} as any);
  }
}
