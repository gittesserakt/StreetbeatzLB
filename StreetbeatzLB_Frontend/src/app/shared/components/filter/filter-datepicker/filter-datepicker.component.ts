import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatDatepickerInputEvent} from "@angular/material/datepicker";
import { MatFormFieldAppearance } from '@angular/material/form-field';

@Component({
  selector: 'app-filter-datepicker',
  templateUrl: './filter-datepicker.component.html',
  styleUrls: ['./filter-datepicker.component.scss']
})
export class FilterDatepickerComponent {
  @Input() inDate!: Date | null;
  @Output() outDate= new EventEmitter<Date | null>();

  dateChangeEvent(event: MatDatepickerInputEvent<Date>) {
    this.outDate.emit(event.value);
  }
}
