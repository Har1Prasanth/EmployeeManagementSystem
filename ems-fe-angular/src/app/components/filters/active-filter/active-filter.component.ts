import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-active-filter',
  templateUrl: './active-filter.component.html',
  styleUrl: './active-filter.component.css'
})
export class ActiveFilterComponent {

  @Input() active: boolean = true // Default to true, showing both yes and no
  @Input() inactive: boolean = true

  @Output() filterChange: EventEmitter<{yes: boolean; no: boolean}> = new EventEmitter()

  isFilterExpanded: boolean = true

  toggleFilter(): void {
    this.isFilterExpanded = !this.isFilterExpanded
  }

  onFilterChange(option: string, isChecked: any): void {
    const input = isChecked.target as HTMLInputElement;

    if (input) {
      const isChecked = input.checked;
  
      if (option === 'yes') {
        this.active = isChecked;
      } else if (option === 'no') {
        this.inactive = isChecked;
      }
  
    }
    this.filterChange.emit({yes: this.active, no: this.inactive})
  }
}


