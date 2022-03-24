import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class SharedService {
    updateOffer$ = new Subject<void>();
    updateOrder$ = new Subject<void>();
}