import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, private firebaseSrv: FirebaseService) { }

  ngOnInit(): void {
  }

  async deleteQuote(quoteId:number){
    await this.firebaseSrv.deleteQuote(quoteId)
    window.location.reload()
  }

}

export interface DialogData {
  quote_id:number;
}
