import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { TrainingService } from './training.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit, OnDestroy {
  private exerciseSubscription: Subscription;
  public ongoingTraining = false;

  constructor(private trainingService: TrainingService) { }

  ngOnInit(): void {
    this.exerciseSubscription = this.trainingService.exerciseChanged.subscribe(exercise => {
      if(exercise) {
        this.ongoingTraining = true;
      } else {
        this.ongoingTraining = false;
      }
    })
  }

  ngOnDestroy(): void {
    this.exerciseSubscription.unsubscribe();
  }

}
