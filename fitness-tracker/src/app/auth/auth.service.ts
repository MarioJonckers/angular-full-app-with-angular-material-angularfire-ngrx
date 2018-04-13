import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class AuthService {
  public authChange: Subject<boolean> = new Subject<boolean>();
  private user: User;

  constructor(private router: Router, private afAuth: AngularFireAuth) {}

  public registerUser(authData: AuthData): void {
    this.afAuth.auth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        console.log(result);
      })
      .catch(error => {
        console.log(error);
      });
    this.authSuccessfully();
  }

  public login(authData: AuthData): void {
    this.afAuth.auth.signInWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        console.log(result);
      })
      .catch(error => {
        console.log(error);
      });
    this.authSuccessfully();
  }

  public logout(): void {
    this.user = null;
    this.authChange.next(false);
    this.router.navigate(['/login']);
  }

  private getUser(): User {
    return { ...this.user};
  }

  public isAuth(): boolean {
    return this.user != null;
  }

  private authSuccessfully(): void {
    this.authChange.next(true);
    this.router.navigate(['/training']);
  }
}
