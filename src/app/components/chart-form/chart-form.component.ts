import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormGroupDirective } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { ChartType } from '@app/components/chart-widget/types';
import { ChartFormData } from './types';
import { DisableButtonDirective } from '@app/directives/disable-button/disable-button.directive';

import { MatTooltipModule } from '@angular/material/tooltip';
@Component({
  selector: 'app-chart-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatSelectModule,
    MatButtonModule,
    DisableButtonDirective,
    MatTooltipModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './chart-form.component.html',
  styleUrl: './chart-form.component.scss',
})
export class ChartFormComponent {
  private defaultColor = '#000000';

  creationDisabled = input<boolean>(false);
  creationDisabledTooltip = input<string>('');
  formChange = output<ChartFormData>();
  chartTypeOptions = Object.values(ChartType);

  chartForm = new FormGroup({
    name: new FormControl<ChartFormData['name']>('', Validators.required),
    type: new FormControl<ChartFormData['type']>(
      ChartType.Line,
      Validators.required
    ),
    color: new FormControl<ChartFormData['color']>(
      this.defaultColor,
      Validators.required
    ),
    sensors: new FormControl<ChartFormData['sensors'] | null>(
      null,
      Validators.required
    ),
  });

  sensors = input<{ id: string; name: string }[]>();

  onSubmit(formDirective: FormGroupDirective): void {
    if (this.chartForm.valid) {
      const formValue = this.chartForm.value as ChartFormData;
      this.formChange.emit(formValue);

      formDirective.resetForm();
    }
  }
}
