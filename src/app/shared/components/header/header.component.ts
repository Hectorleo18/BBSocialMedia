import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent{

  constructor(private firebaseSrv: FirebaseService) { }
  
  getLogin(){
    return this.firebaseSrv.isLogin
  }

}
