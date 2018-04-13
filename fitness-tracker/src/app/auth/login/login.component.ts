import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UiService } from '../../shared/ui.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  private loadingSubs: Subscription;
  public loginForm: FormGroup;
  public isLoading = false;

  constructor(private authService: AuthService, private uiService: UiService) {}

  ngOnInit(): void {
    this.loadingSubs = this.uiService.loadingStateChanged.subscribe((isLoadingState: boolean) => {
      this.isLoading = isLoadingState;
    });
    this.loginForm = new FormGroup({
      email: new FormControl('', {validators: [Validators.required, Validators.email]}),
      password: new FormControl('', {validators: [Validators.required]})
    })
  }

  ngOnDestroy(): void {
    this.loadingSubs.unsubscribe();
  }

  private onSubmit(): void {
    this.authService.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    });
  }

}
