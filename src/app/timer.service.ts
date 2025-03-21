import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  titleCountdown = signal<string>('');
  dateCountdown = signal<Date>(new Date());

  days = signal<number>(0);
  hours = signal<number>(0);
  minutes = signal<number>(0);
  seconds = signal<number>(0);

  distance: number | undefined;

  constructor() {}

  setTitle(title: string) {
    this.titleCountdown.set(title);
  }

  setDate(date: Date) {
    this.dateCountdown.set(date);
  }

  calculateCountdown() {
    const now = new Date().getTime();
    const difference = this.dateCountdown().getTime() - new Date().getTime();
    this.distance = this.dateCountdown().getTime() - now;
    this.days.set(Math.floor(difference / (1000 * 60 * 60 * 24)));
    this.hours.set(
      Math.floor((this.distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    );
    this.minutes.set(
      Math.floor((this.distance % (1000 * 60 * 60)) / (1000 * 60))
    );
    this.seconds.set(Math.floor((this.distance % (1000 * 60)) / 1000));
  }

  x = setInterval(() => {
    this.calculateCountdown();
    if (this.distance !== undefined && this.distance == 0) {
      clearInterval(this.x);
      this.titleCountdown.set('');
    }
  }, 100);
}
