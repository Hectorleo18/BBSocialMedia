import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/shared/services/firebase.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { EditDialogComponent } from 'src/app/shared/components/edit-dialog/edit-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('search') searchInput!: ElementRef
  constructor(
    private firebaseSrv: FirebaseService, 
    private router: Router, 
    private dialog: MatDialog
  ) { }

  quotes = new Array()
  originalQuotes = new Array()

  ngOnInit(): void {
    setTimeout(async()=>{
      await this.firebaseSrv.checkLogin()
      if(this.firebaseSrv.isLogin == false){
        this.router.navigate(["/"])
      }
      await this.firebaseSrv.getQuotes()
      this.quotes = this.firebaseSrv.quotes
      this.originalQuotes = this.firebaseSrv.quotes
    }, 700)
  }

  async openDeleteDialog(quote:number){
    this.dialog.open(DialogComponent,{
      data:{
        quote_id:quote
      }
    })
  }

  openEditDialog(quote:any){
    this.dialog.open(EditDialogComponent,{
      data:{
        quote:quote.quote,
        author:quote.author,
        quote_id:quote.quote_id
      }
    })
  }

  searchAuthor(){
    let searchText = this.searchInput.nativeElement.value
    if(this.searchInput.nativeElement.value.length < 3){
      this.quotes = this.originalQuotes
    }else{
      this.quotes = this.quotes.filter((quote)=>{
        return quote.author.toLowerCase().indexOf(searchText.toLowerCase()) > -1
      })
    }
  }

}
