import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { TimerComponent } from './timer/timer.component'
import { FormComponent } from './form/form.component'

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TimerComponent, FormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'timer-angular-app'
}
