import { Injectable, signal } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  titleCountdown = signal<string>('')
  dateCountdown = signal<Date | undefined>(undefined)
  days = signal<number>(0)
  hours = signal<number>(0)
  minutes = signal<number>(0)
  seconds = signal<number>(0)
  timerOn = signal<boolean>(false)
  successScreen = signal<boolean>(false)

  distance: number | undefined
  x: any

  constructor() {
    let localTitle = localStorage.getItem('title')
    let localDate = localStorage.getItem('date')

    if (localDate && localTitle) {
      this.titleCountdown.set(localTitle)
      this.dateCountdown.set(new Date(localDate))
      this.triggerCountdown()
    }
  }

  setData(title: string, date: Date | undefined) {
    this.titleCountdown.set(title)
    localStorage.setItem('title', title)
    if (typeof date !== undefined) {
      this.dateCountdown.set(date)
      localStorage.setItem('date', (date as Date).toString())
    }
  }

  calculateCountdown() {
    const now = new Date().getTime()
    const date = this.dateCountdown() as Date
    const difference = date.getTime() - new Date().getTime()
    this.distance = date.getTime() - now
    this.days.set(Math.floor(difference / (1000 * 60 * 60 * 24)))
    this.hours.set(
      Math.floor((this.distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    )
    this.minutes.set(
      Math.floor((this.distance % (1000 * 60 * 60)) / (1000 * 60)),
    )
    this.seconds.set(Math.floor((this.distance % (1000 * 60)) / 1000))
  }

  triggerCountdown() {
    this.timerOn.set(true)
    this.x = setInterval(() => {
      this.calculateCountdown()
      if (this.distance !== undefined && this.distance <= 0) {
        this.successScreen.set(true)
        this.resetTimer()
      }
    }, 100)
  }

  resetTimer() {
    clearInterval(this.x)
    this.timerOn.set(false)
    localStorage.clear()
  }
}
