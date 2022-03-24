import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Offer } from '../../../models/offer';
import { HttpService } from '../../../http.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-offer-list-item',
  templateUrl: './offer-list-item.component.html',
  styleUrls: ['./offer-list-item.component.scss']
})
export class OfferListItemComponent implements OnInit {

  @Input() offer: Offer = {} as Offer;
  @Output() offerRemoved = new EventEmitter<number>();

  constructor(private httpService:HttpService, private snackBar: MatSnackBar, public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  remove(): void {
    this.httpService.delete('Offer/offer', this.offer.id).subscribe((removed: boolean) => {
      if (removed) {
      this.notifySuccess('Offer successfully removed');
      this.offerRemoved.emit(this.offer.id);
      }
      else 
        this.notifyFail('Failed to remove an offer');
    }, () => {
      this.notifyFail('Failed to remove an offer');
    });
  }

  private notifyFail(message: string): void {
    this.snackBar.open(message, 'Close', { duration: 2000, verticalPosition: 'top', horizontalPosition: 'center'});
  }

  private notifySuccess(message: string): void {
    this.snackBar.open(message, 'Close', { duration: 2000, verticalPosition: 'top', horizontalPosition: 'center'});
  }
}
