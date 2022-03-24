import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {TranslationResponse} from '../model/TranslationResponse';
import {Observable} from 'rxjs';
import {SearchResponse} from '../model/SearchResponse';
import * as $ from "jquery";

@Injectable()
export class GoogleApiService {

  constructor(private http: HttpClient) {
  }

  public translateText(query: string, source: string, target: string): Observable<TranslationResponse> {
    const params = new HttpParams().set('q', query)
      .set('target', target)
      .set('format', 'text')
      .set('source', source)
      .set('model', 'base')
      .set('key', 'AIzaSyAIL0n9HJbOT_Fcptu7fFWu5q7e0uLUulE');
    const httpOptions = {
      params: params
    };
    return this.http.get<TranslationResponse>('https://translation.googleapis.com/language/translate/v2', httpOptions);
  }

  public getSearchResults(query: string): Observable<SearchResponse> {
    const params = new HttpParams().set('q', query).set('cx', 'c14ae622f4eae43d4').set('key', 'AIzaSyAIL0n9HJbOT_Fcptu7fFWu5q7e0uLUulE');
    const httpOptions = {
      params: params
    };
    return this.http.get<SearchResponse>('https://www.googleapis.com/customsearch/v1', httpOptions);
  }
}
