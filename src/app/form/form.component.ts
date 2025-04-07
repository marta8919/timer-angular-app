import { Component, inject, signal } from '@angular/core';
import { Form, FormsModule, NgForm } from '@angular/forms';
import { TimerService } from '../timer.service';
import { ErrorMessageComponent } from '../error-message/error-message.component';
import { SuccessMessageComponent } from '../success-message/success-message.component';

@Component({
  selector: 'app-form',
  imports: [FormsModule, ErrorMessageComponent, SuccessMessageComponent],
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

  timerOnForm = this.timerService.timerOn;
  successScreenOnForm = this.timerService.successScreen;

  onSubmit(form: NgForm) {
    this.form = form;
    if (new Date(this.date()).getTime() < new Date().getTime()) {
      this.dateError.set(true);
    } else {
      this.dateError.set(false);
      this.timerService.setData(this.title(), new Date(this.date()));
      this.timerService.triggerCountdown();
      this.timerOnForm.set(true);
      form.resetForm();
    }
  }

  reset() {
    this.timerService.resetTimer();
    this.timerService.setData('', new Date());
    this.timerOnForm.set(false);
    this.buttonDisabled.set(true);
  }

  closeError() {
    this.dateError.set(false);
  }

  closeSuccess() {
    this.successScreenOnForm.set(false);
    this.timerService.setData('', undefined);
  }
}
