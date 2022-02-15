import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private snack: MatSnackBar,) { }

    /**
   * Shows a snack bar with the provider text
   * @param text string
   */
     showSnackBar(text: string):void{
      this.snack.open(text,undefined,{duration:5000})
    }
}
