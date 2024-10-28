import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-text-filter',
  templateUrl: './text-filter.component.html',
  styleUrl: './text-filter.component.css'
})
export class TextFilterComponent {

  @Input() value: string = ''

  @Output() update = new EventEmitter<string>()

  constructor() {}

  updateTextFilter($event: any): void {
    this.update.emit($event.target.value)
  }
}
