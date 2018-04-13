import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class UiService {
  public loadingStateChanged: Subject<boolean> = new Subject<boolean>();

  constructor(private snackbar: MatSnackBar) {}

  public showSnackbar(message: string, action: string, duration: number): void {
    this.snackbar.open(message, action, {
      duration: duration
    });
  }
}
