import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/shared/services/firebase.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private firebaseSrv: FirebaseService, private router: Router, private dialog: MatDialog) { }

  quotes = new Array()

  ngOnInit(): void {
    setTimeout(async()=>{
      await this.firebaseSrv.checkLogin()
      if(this.firebaseSrv.isLogin == false){
        this.router.navigate(["/"])
      }
      await this.firebaseSrv.getQuotes()
      this.quotes = this.firebaseSrv.quotes
    }, 700)
  }

  async openDialog(quote:number){
    this.dialog.open(DialogComponent,{
      data:{
        quote_id:quote
      }
    })
  }

}
