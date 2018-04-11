import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {
  private progress = 0;
  private timer: number;

  constructor() { }

  ngOnInit() {
    this.timer = setInterval(() => {
      this.progress = this.progress + 5;
      if (this.progress >= 100) {
        clearInterval(this.timer)
      }
    }, 1000);
  }

  private onStop(): void {
    clearInterval(this.timer);
  }

}
