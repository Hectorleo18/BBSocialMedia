import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/shared/services/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private firebaseSrv: FirebaseService, private router: Router) { }

  ngOnInit(): void {
    this.firebaseSrv.checkLogin()
    if(this.firebaseSrv.isLogin == false){
      this.router.navigate(["/"])
    }
  }

}
