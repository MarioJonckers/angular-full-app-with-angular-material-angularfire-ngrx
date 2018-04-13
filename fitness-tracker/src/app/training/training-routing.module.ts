import { NgModule } from '@angular/core';
import { AuthGuard } from '../auth/auth.guard';
import { TrainingComponent } from './training.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: TrainingComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainingRoutingModule {}
