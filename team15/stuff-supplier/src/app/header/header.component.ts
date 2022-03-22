import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, switchMap } from 'rxjs';
import { HttpService } from '../http.service';
import { Address } from '../models/address';
import { Offer } from '../models/offer';
import { Order } from '../models/order';
import { SharedService } from '../shared/shared.service';
import { NewOfferDialogComponent } from './new-offer-dialog/new-offer-dialog.component';
import { NewOrderDialogComponent } from './new-order-dialog/new-order-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private dialog: MatDialog, private httpService: HttpService, private snackBar: MatSnackBar, private sharedService: SharedService) { }

  title = "Stuff Supplier";
  newOrderButtonText = "New request";
  newOfferButtonText = "New offer";

  newOrder(): void {
    const order = { address: {} as Address } as Order;
    order.orderStatus = 1;
    const dialogRef = this.dialog.open(NewOrderDialogComponent, { width: '900px', data: order });
    dialogRef.afterClosed().pipe(
      switchMap(result => result ? this.httpService.post<Order>('Order/order', order) : EMPTY)
    ).subscribe(result => {
      if (result) {
        this.sharedService.updateOrder$.next();
        this.notify('Order successfully created');
      }
      else
        this.notify('Failed to create an order');
    });
  }

  newOffer(): void {
    const offer = {} as Offer;
    const dialogRef = this.dialog.open(NewOfferDialogComponent, { width: '500px', data: offer });
    dialogRef.afterClosed().pipe(
      switchMap(result => result ? this.httpService.post<Order>('Offer/offer', offer) : EMPTY)
    ).subscribe(result => {
      if (result.id) {
        this.notify('Offer successfully created');
        this.sharedService.updateOffer$.next();
      }
      else
        this.notify('Failed to create an offer');
    });
  }

  private notify(message: string): void {
    this.snackBar.open(message, 'Close', { duration: 2000, verticalPosition: 'top', horizontalPosition: 'center'});
  }

}
