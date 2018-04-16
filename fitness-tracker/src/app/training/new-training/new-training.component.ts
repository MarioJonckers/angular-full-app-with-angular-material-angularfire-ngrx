import { Component, OnDestroy, OnInit } from '@angular/core';
import { TrainingService } from '../training.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Exercise } from '../exercise.model';
import { UiService } from '../../shared/ui.service';
import * as fromRoot from '../../app.reducer';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  private exerciseSubscription: Subscription;
  public exercises: Exercise[];
  public isLoading$: Observable<boolean>;

  constructor(private trainingService: TrainingService,
              private uiService: UiService,
              private store: Store<fromRoot.State>) { }

  ngOnInit(): void {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.exerciseSubscription = this.trainingService.exercisesChanged.subscribe(exercises => {
      this.exercises = exercises;
    });
    this.fetchExercises();
  }

  ngOnDestroy(): void {
    if (this.exerciseSubscription) {
      this.exerciseSubscription.unsubscribe();
    }
  }

  public onStartTraining(form: NgForm): void {
    this.trainingService.startExercise(form.value.exercise);
  }

  public fetchExercises(): void {
    this.trainingService.fetchAvailableExercises();
  }
}
