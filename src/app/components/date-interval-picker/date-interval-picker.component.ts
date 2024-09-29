import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-date-interval-picker',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    ReactiveFormsModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './date-interval-picker.component.html',
  styleUrl: './date-interval-picker.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateIntervalPickerComponent {
  dateChange = output<{ start: number; end: number }>();

  form = new FormGroup({
    startDate: new FormControl(''),
    endDate: new FormControl(''),
  });

  ngOnInit() {
    this.form.valueChanges.subscribe((value) => {
      if (value.startDate && value.endDate) {
        this.dateChange.emit({
          start: new Date(value.startDate).getTime(),
          end: new Date(value.endDate).getTime(),
        });
      }
    });
  }
}
