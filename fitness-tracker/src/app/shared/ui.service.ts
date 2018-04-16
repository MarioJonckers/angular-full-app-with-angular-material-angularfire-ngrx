import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class UiService {
  constructor(private snackbar: MatSnackBar) {}

  public showSnackbar(message: string, action: string, duration: number): void {
    this.snackbar.open(message, action, {
      duration: duration
    });
  }
}
