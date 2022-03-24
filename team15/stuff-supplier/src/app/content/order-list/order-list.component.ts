import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { HttpService } from 'src/app/http.service';
import { Order } from 'src/app/models/order';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit, OnDestroy {

  constructor(private httpService: HttpService, private sharedService: SharedService) { }

  orders: Order[] = [];
  private unsubscribe$ = new Subject<void>();

  ngOnInit(): void {
    this.sharedService.updateOrder$.pipe(
      takeUntil(this.unsubscribe$),
      switchMap(() => this.httpService.get<Order>('Order/orders'))
    ).subscribe((orders: Order[]) => {
      this.orders = orders;
    });

    this.sharedService.updateOrder$.next();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  removeOrder(id: number): void {
    this.orders = this.orders.filter(o => o.id !== id);
  }
}
