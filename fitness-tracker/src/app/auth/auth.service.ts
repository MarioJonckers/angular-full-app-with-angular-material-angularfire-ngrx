import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs/Subject';

export class AuthService {
  public authChange: Subject<boolean> = new Subject<boolean>();
  private user: User;

  public registerUser(authDate: AuthData): void {
    this.user = {
      email: authDate.email,
      userId: Math.round(Math.random() * 10000).toString()
    };
    this.authChange.next(true);
  }

  public login(authData: AuthData): void {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString()
    };
    this.authChange.next(true);
  }

  public logout(): void {
    this.user = null;
    this.authChange.next(false);
  }

  private getUser(): User {
    return { ...this.user};
  }

  private isAuth(): boolean {
    return this.user != null;
  }
}
