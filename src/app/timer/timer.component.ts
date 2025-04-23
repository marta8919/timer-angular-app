import { Component, computed, inject } from '@angular/core'
import { TimerService } from '../timer.service'
import { AdjustToScreenDirective } from '../adjust-to-screen.directive'

@Component({
  selector: 'app-timer',
  imports: [AdjustToScreenDirective],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.css',
})
export class TimerComponent {
  public timer = inject(TimerService)

  timeTrigger = computed(
    () =>
      `${this.timer.days()}-${this.timer.hours()}-${this.timer.minutes()}-${this.timer.seconds()}`,
  )

  titleTrigger = computed(() => `${this.timer.titleCountdown()}`)
}
