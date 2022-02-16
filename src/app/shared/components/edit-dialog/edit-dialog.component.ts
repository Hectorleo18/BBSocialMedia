import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss']
})
export class EditDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogDeleteData, private firebaseSrv: FirebaseService) { }

  author = new FormControl('', [Validators.required]);
  quote = new FormControl('', [Validators.required]);
  authorValue:string = this.data.author
  quoteValue:string = this.data.quote

  ngOnInit(): void {
    this.author.setValue(this.data.author)
    this.quote.setValue(this.data.quote)
    this.author.valueChanges.subscribe(authorValue=>{
      this.authorValue = authorValue
    })
    this.quote.valueChanges.subscribe(quoteValue=>{
      this.quoteValue = quoteValue
    })
  }

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

  async editQuote(quote:any){
    if(this.quote.hasError('required') || this.author.hasError('required')){

    }else{
      await this.firebaseSrv.editQuote(this.authorValue, this.quoteValue, quote.quote_id)
      window.location.reload()
    }
  }

}

export interface DialogDeleteData {
  quote_id:number;
  quote:string;
  author:string;
}