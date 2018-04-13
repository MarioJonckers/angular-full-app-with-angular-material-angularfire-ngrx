import { Component, OnDestroy, OnInit } from '@angular/core';
import { TrainingService } from '../training.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Exercise } from '../exercise.model';
import { UiService } from '../../shared/ui.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  private exercises: Exercise[];
  private loadingSubscription: Subscription;
  private exerciseSubscription: Subscription;
  public isLoading = true;

  constructor(private trainingService: TrainingService, private uiService: UiService) { }

  ngOnInit(): void {
    this.loadingSubscription = this.uiService.loadingStateChanged.subscribe((isLoading: boolean) => {
      this.isLoading = isLoading;
    });
    this.exerciseSubscription = this.trainingService.exercisesChanged.subscribe(exercises => {
      this.exercises = exercises;
    });
    this.trainingService.fetchAvailableExercises();
  }

  ngOnDestroy(): void {
    this.exerciseSubscription.unsubscribe();
    this.loadingSubscription.unsubscribe();
  }

  private onStartTraining(form: NgForm): void {
    this.trainingService.startExercise(form.value.exercise);
  }

}
