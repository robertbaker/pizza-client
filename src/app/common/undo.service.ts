import { Injectable, EventEmitter, Input, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root',
})
export class UndoService {
  constructor(private snackBar: MatSnackBar) { }

  public performActionWithUndo(
    message: string,
    onAction: () => any,
    onUndo?: () => any
  ): void {
    let performDelete = true;

    const snackBarRef = this.snackBar.open(message, 'Undo', {
      duration: 2000
    });

    snackBarRef.afterDismissed().subscribe(() => {
      if (performDelete) {
        onAction();
      }
    });

    snackBarRef.onAction().subscribe(() => {
      performDelete = false;
      onUndo();
    });
  }
}
