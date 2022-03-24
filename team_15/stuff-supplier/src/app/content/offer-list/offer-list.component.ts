import { Component, OnDestroy, OnInit } from '@angular/core';
import { Offer } from '../../models/offer';
import { HttpService } from '../../http.service';
import { SharedService } from 'src/app/shared/shared.service';
import { Subject, switchMap, takeUntil } from 'rxjs';

@Component({
  selector: 'app-offer-list',
  templateUrl: './offer-list.component.html',
  styleUrls: ['./offer-list.component.scss']
})
export class OfferListComponent implements OnInit, OnDestroy {

  constructor(private httpService: HttpService, private sharedService: SharedService) { }

  offers: Offer[] = [];
  private unsubscribe$ = new Subject<void>();

  ngOnInit(): void {
    this.sharedService.updateOffer$.pipe(
      takeUntil(this.unsubscribe$),
      switchMap(() => this.httpService.get<Offer>('Offer/offers'))
    ).subscribe((offers: Offer[]) => {
      this.offers = offers;
    });

    this.sharedService.updateOffer$.next();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  removeOffer(id: number): void {
    this.offers = this.offers.filter(o => o.id !== id);
  }
}
