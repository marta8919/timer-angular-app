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
  x: any;
  clearInterval = signal<boolean>(false);
  timerOn = signal<boolean>(false);

  distance: number | undefined;

  constructor() {
    let localTitle = localStorage.getItem('title');
    let localDate = localStorage.getItem('date');

    if (localDate && localTitle) {
      this.titleCountdown.set(localTitle);
      this.dateCountdown.set(new Date(localDate));
      this.triggerCountdown();
    }
  }

  setTitle(title: string) {
    this.titleCountdown.set(title);
    localStorage.setItem('title', title);
  }

  setDate(date: Date) {
    this.dateCountdown.set(date);
    localStorage.setItem('date', date.toString());
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

  triggerCountdown() {
    this.timerOn.set(true);
    this.x = setInterval(() => {
      this.calculateCountdown();
      if (this.distance !== undefined && this.distance == 0) {
        clearInterval(this.x);
      }
    }, 100);
  }

  resetTimer() {
    clearInterval(this.x);
    this.timerOn.set(false);
    localStorage.setItem('title', '');
    localStorage.setItem('date', '');
  }
}
