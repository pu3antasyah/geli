import {Injectable} from '@angular/core';
import {SnackBarService} from './snack-bar.service';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslatableSnackBarServiceService {

  /**
   * @param snackBarService
   * @param translateService
   */
  constructor(private snackBarService: SnackBarService, private translateService: TranslateService) {
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.translateService.get('snackbarMessages.dismiss').subscribe((res: string) => {
        this.snackBarService.setDefaultAction(res);
      });
    });
  }

  /**
   * Emit snackbar with given duration
   * @param {String[]} keys
   * @param {number} duration
   */
  open(keys: Array<string>, duration: number = SnackBarService.defaultDuration): void {
    this.translateService.get(keys).subscribe((translations: {}) => {
      let message = '';
      for (let key of keys) {
        message += translations[key];
      }
      this.snackBarService.open(message, duration);
    });
  }

  /**
   * Emit snackbar with duration short
   * @param {String[]} keys
   */
  openShort(keys: Array<string>): void {
    this.open(keys, SnackBarService.durationShort);
  }

  /**
   * Emit snackbar with duration long
   * @param {String[]} keys
   */
  openLong(keys: Array<string>): void {
    this.open(keys, SnackBarService.durationLong);
  }
}
