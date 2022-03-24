import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ContentComponent } from './content/content.component';
import { FooterComponent } from './footer/footer.component';
import { ListItemComponent } from './content/order-list/order-list-item/order-list-item.component';
import { NewItemFormComponent } from './new-item-form/new-item-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatExpansionModule } from '@angular/material/expansion';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { OrderListComponent } from './content/order-list/order-list.component';
import { OfferListComponent } from './content/offer-list/offer-list.component';
import { OfferListItemComponent } from './content/offer-list/offer-list-item/offer-list-item.component';
import { HoldableDirective } from './shared/holdable.directive';
import { RemoveButtonComponent } from './shared/remove-button/remove-button.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { SupplyDialogComponent } from './content/order-list/order-list-item/supply-dialog/supply-dialog.component';
import { FormsModule } from '@angular/forms';
import { NewOrderDialogComponent } from './header/new-order-dialog/new-order-dialog.component';
import { NewOfferDialogComponent } from './header/new-offer-dialog/new-offer-dialog.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { UnitPipe } from './pipes/UnitPipe';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContentComponent,
    FooterComponent,
    ListItemComponent,
    NewItemFormComponent,
    OrderListComponent,
    OfferListComponent,
    OfferListItemComponent,
    HoldableDirective,
    RemoveButtonComponent,
    SupplyDialogComponent,
    NewOrderDialogComponent,
    NewOfferDialogComponent,
    UnitPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    MatSelectModule,
    MatInputModule,
    MatGridListModule,
    MatDividerModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
