import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UiService } from '../../shared/ui.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  private loadingSub: Subscription;
  public isLoading = false;
  public maxDate: Date;

  constructor(private authService: AuthService, private uiService: UiService) { }

  ngOnInit(): void {
    this.loadingSub = this.uiService.loadingStateChanged.subscribe((isLoadingState: boolean) => {
      this.isLoading = isLoadingState;
    });
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  ngOnDestroy(): void {
    if (this.loadingSub) {
      this.loadingSub.unsubscribe();
    }
  }

  public onSubmit(form: NgForm): void {
    this.authService.registerUser({
      email: form.value.email,
      password: form.value.password
    });
  }

}
