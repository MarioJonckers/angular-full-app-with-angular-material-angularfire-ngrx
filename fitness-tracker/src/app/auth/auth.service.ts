import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { TrainingService } from '../training/training.service';
import { UiService } from '../shared/ui.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../app.reducer';

@Injectable()
export class AuthService {
  public authChange: Subject<boolean> = new Subject<boolean>();
  private isAuthenticated = false;

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private trainingService: TrainingService,
    private uiService: UiService,
    private store: Store<{ui: fromApp.State}>
  ) {}

  public initAuthListener(): void {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.router.navigate(['/training']);
      } else {
        this.trainingService.cancelSubscriptions();
        this.isAuthenticated = false;
        this.authChange.next(false);
        this.router.navigate(['/login']);
      }
    });
  }

  public registerUser(authData: AuthData): void {
    this.store.dispatch({type: 'START_LOADING'});
    this.afAuth.auth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        this.store.dispatch({type: 'STOP_LOADING'});
      })
      .catch(error => {
        this.store.dispatch({type: 'STOP_LOADING'});
        this.uiService.showSnackbar(error.message, null, 3000);
      });
  }

  public login(authData: AuthData): void {
    this.store.dispatch({type: 'START_LOADING'});
    this.afAuth.auth.signInWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        this.store.dispatch({type: 'STOP_LOADING'});
      })
      .catch(error => {
        this.store.dispatch({type: 'STOP_LOADING'});
        this.uiService.showSnackbar(error.message, null, 3000);
      });
  }

  public logout(): void {
    this.afAuth.auth.signOut();
  }

  public isAuth(): boolean {
    return this.isAuthenticated;
  }
}
