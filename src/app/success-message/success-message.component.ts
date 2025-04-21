import { Component, inject, output } from '@angular/core'
import { TimerService } from '../timer.service'

@Component({
  selector: 'app-success-message',
  imports: [],
  templateUrl: './success-message.component.html',
  styleUrl: './success-message.component.css',
})
export class SuccessMessageComponent {
  close = output()

  private timerService = inject(TimerService)

  title = this.timerService.titleCountdown

  closeSuccess() {
    this.close.emit()
  }
}
