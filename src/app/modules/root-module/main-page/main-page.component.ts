import * as $ from "jquery";
import {Component, OnInit, Pipe, PipeTransform} from '@angular/core';
import {GoogleApiService} from '../../../services/GoogleApiService';
import {Item} from '../../../model/SearchResponse';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  private request: string;
  private country: string;
  private fieldDelimeter: string;
  private objectDelimeter: string;
  private items: Item[];

  constructor(private googleApi: GoogleApiService) {
    this.fieldDelimeter = '?!';
    this.objectDelimeter = '$!';
  }

  ngOnInit() {
  }

  changeRequest(event) {
    this.request = event.target.value;
    $(".error-message").hide();
  }

  changeCountry(event) {
    this.country = event.target.value;
  }

  goToUrl(): void {
    if (!this.validate()) {
      return;
    }
    this.googleApi.translateText(this.request, 'uk', this.country).subscribe(translatedRequest => {
      this.googleApi.getSearchResults(translatedRequest.data.translations[0].translatedText).subscribe(response => {
        this.googleApi.translateText(this.transformToString(response.items), this.country, 'uk').subscribe(backToNative => {
          this.items = this.transformFromString(response.items, backToNative.data.translations[0].translatedText);
          console.log(this.items);
        });
      });
    });
  }

  transformToString(items: Item[]): string {
    let result = '';
    for (const item of items) {
      result += item.title;
      result += this.fieldDelimeter;
      result += item.snippet;
      result += this.objectDelimeter;
    }
    return result;
  }

  transformFromString(items: Item[], translation: string): Item[] {
    let objects: string[];
    objects = translation.split(this.objectDelimeter);
    for (let i in items) {
      const fields = objects[i].split(this.fieldDelimeter);
      console.log(fields);
      items[i].title = fields[0];
      items[i].snippet = fields[1];
    }
    return items;
  }

  validate(): boolean {
    if (this.country === undefined) {
      this.country = "pl"
      return false;
    } else if (this.request === undefined || this.request === '') {
      // alert('Please enter the request');
      $(".error-message").show();
      return false;
    }
    return true;
  }

}
