import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Offer } from 'src/app/models/offer';


@Component({
  selector: 'app-new-offer-dialog',
  templateUrl: './new-offer-dialog.component.html',
  styleUrls: ['./new-offer-dialog.component.scss']
})
export class NewOfferDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<NewOfferDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Offer,
  ) {}

  @ViewChild('form') form?: ElementRef;

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    if (!this.form?.nativeElement.className.includes('invalid'))
      this.dialogRef.close(true);
  }
}
