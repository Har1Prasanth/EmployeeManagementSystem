
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-department-filter',
  templateUrl: './department-filter.component.html',
  styleUrl: './department-filter.component.css'
})
export class DepartmentFilterComponent {

  @Input() options: string[] = []
  @Input() selectedValues: string[] = []
  @Output() selectionChange = new EventEmitter<string[]>()


  isFilterExpanded: boolean = true
  
  onCheckboxChange(event: any, option: string) {
    const checked = event.target.checked;
    if (checked) {
      this.selectedValues.push(option);
    } else {
      const index = this.selectedValues.indexOf(option);
      if (index > -1) {
        this.selectedValues.splice(index, 1);
      }
    }
    this.selectionChange.emit(this.selectedValues);
  }

  toggleFilter(): void {
    this.isFilterExpanded = !this.isFilterExpanded
  }

}
