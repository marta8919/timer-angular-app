import { Component, inject, signal } from '@angular/core'
import { Form, FormsModule, NgForm } from '@angular/forms'
import { TimerService } from '../timer.service'
import { ErrorMessageComponent } from '../error-message/error-message.component'
import { SuccessMessageComponent } from '../success-message/success-message.component'

@Component({
  selector: 'app-form',
  imports: [FormsModule, ErrorMessageComponent, SuccessMessageComponent],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent {
  title = signal<string>('')
  date = signal<string>('')
  dateError = signal<boolean>(false)
  buttonDisabled = signal<boolean>(true)

  form: Form = {} as Form

  public timerService = inject(TimerService)

  onSubmit(form: NgForm) {
    this.form = form
    if (this.title().length && this.date().length) {
      if (this.timerService.timerOn()) {
        this.reset()
      }

      if (new Date(this.date()).getTime() < new Date().getTime()) {
        this.dateError.set(true)
      } else {
        this.dateError.set(false)
        this.timerService.setData(this.title(), new Date(this.date()))
        this.timerService.triggerCountdown()
        this.timerService.timerOn.set(true)
        form.resetForm()
      }
    }
  }

  reset() {
    this.timerService.resetTimer()
    this.timerService.setData('', new Date())
    this.timerService.timerOn.set(false)
    this.buttonDisabled.set(true)
  }

  closeError() {
    this.dateError.set(false)
  }

  closeSuccess() {
    this.timerService.successScreen.set(false)
    this.timerService.setData('')
  }
}
