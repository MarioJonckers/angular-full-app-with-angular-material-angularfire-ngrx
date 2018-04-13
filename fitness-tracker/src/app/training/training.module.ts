import { NgModule } from '@angular/core';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { StopTrainingComponent } from './current-training/stop-training.component';
import { TrainingComponent } from './training.component';
import { PastTrainingComponent } from './past-training/past-training.component';
import { AngularFirestoreModule } from 'angularfire2/firestore';

@NgModule({
  declarations: [
    TrainingComponent,
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingComponent,
    StopTrainingComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    AngularFirestoreModule,
  ],
  exports: [],
  entryComponents: [StopTrainingComponent]
})
export class TrainingModule {

}
