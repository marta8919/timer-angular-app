import { Component, inject } from '@angular/core';
import { TimerService } from '../timer.service';

@Component({
  selector: 'app-timer',
  imports: [],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.css',
})
export class TimerComponent {
  private timerService = inject(TimerService);

  title = this.timerService.titleCountdown;
  days = this.timerService.days;
  hours = this.timerService.hours;
  minutes = this.timerService.minutes;
  seconds = this.timerService.seconds;
}
