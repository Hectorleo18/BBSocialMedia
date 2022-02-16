import { Component } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.scss']
})
export class AddDialogComponent {

  constructor(private firebaseSrv: FirebaseService) { }

  author = new FormControl('', [Validators.required]);
  quote = new FormControl('', [Validators.required]);

  getErrorMessage() {
    if (this.author.hasError('required')) {
      return 'You must enter a value';
    }else{return ''}
  }

  getErrorMessageQuote() {
    if (this.quote.hasError('required')) {
      return 'You must enter a value';
    }else{return ''}
  }

  async addQuote(){
    if (this.author.hasError('required') || this.quote.hasError('required')){

    }else{
      await this.firebaseSrv.addQuote(this.author.value, this.quote.value)
      window.location.reload()
    }
  }

}
