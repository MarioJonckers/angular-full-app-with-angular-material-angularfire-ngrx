import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UiService } from '../../shared/ui.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../../app.reducer';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // private loadingSubs: Subscription;
  public loginForm: FormGroup;
  public isLoading$: Observable<boolean>;

  constructor(private authService: AuthService, private uiService: UiService, private store: Store<{ui: fromApp.State}>) {}

  ngOnInit(): void {
    this.isLoading$ = this.store.map(state => state.ui.isLoading);
    // this.loadingSubs = this.uiService.loadingStateChanged.subscribe((isLoadingState: boolean) => {
    //   this.isLoading = isLoadingState;
    // });
    this.loginForm = new FormGroup({
      email: new FormControl('', {validators: [Validators.required, Validators.email]}),
      password: new FormControl('', {validators: [Validators.required]})
    });
  }

  // ngOnDestroy(): void {
  //   if (this.loadingSubs) {
  //     this.loadingSubs.unsubscribe();
  //   }
  // }

  public onSubmit(): void {
    this.authService.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    });
  }

}
