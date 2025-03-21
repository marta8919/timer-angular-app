import { Component, inject, signal } from '@angular/core';
import { Form, FormsModule, NgForm } from '@angular/forms';
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

  form: Form = {} as Form;

  private timerService = inject(TimerService);

  checkBtnDisable() {
    if (this.title().length && this.date().length) {
      this.buttonDisabled.set(false);
    } else {
      this.buttonDisabled.set(true);
    }
  }

  onSubmit(form: NgForm) {
    this.form = form;
    if (new Date(this.date()).getTime() < new Date().getTime()) {
      this.dateError.set(true);
    } else {
      this.dateError.set(false);
      this.timerService.setTitle(this.title());
      this.timerService.setDate(new Date(this.date()));
      form.resetForm();
      this.timerService.triggerCountdown();
    }
  }

  reset() {
    this.timerService.resetTimer();
    this.timerService.setTitle('');
    this.date.set('');
  }
}
