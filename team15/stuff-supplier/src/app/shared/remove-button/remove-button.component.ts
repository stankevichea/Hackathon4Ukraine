import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-remove-button',
  templateUrl: './remove-button.component.html',
  styleUrls: ['./remove-button.component.scss']
})
export class RemoveButtonComponent {

  @Output() removed = new EventEmitter<void>();
  progress = 0;

  remove(event: any): void {
    const newProgress = event / 10;
    if (this.progress <= 100 && newProgress > 100) {
      this.removed.emit();
    }
    this.progress = newProgress;
  }

}
