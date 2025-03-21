import { Component, inject, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { TimerService } from '../timer.service';

@Component({
  selector: 'app-form',
  imports: [FormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent {
  title = signal<string>('');
  date = signal<string>('');
  dateError = signal<boolean>(false);
  buttonDisabled = signal<boolean>(true);

  private timerService = inject(TimerService);

  checkBtnDisable() {
    if (this.title().length && this.date().length) {
      this.buttonDisabled.set(false);
    } else {
      this.buttonDisabled.set(true);
    }
  }

  onSubmit(form: NgForm) {
    if (new Date(this.date()).getTime() < new Date().getTime()) {
      this.dateError.set(true);
    } else {
      this.dateError.set(false);
      this.timerService.setTitle(this.title());
      this.timerService.setDate(new Date(this.date()));
      form.resetForm();
      this.timerService.calculateCountdown();
    }
  }
}
