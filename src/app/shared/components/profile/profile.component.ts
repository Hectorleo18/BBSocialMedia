import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  constructor(private firebaseSrv: FirebaseService, private dataSrv: DataService) { }

  closeSession(){
    this.firebaseSrv.logout()
  }

  async resetProject(){
    let users = await this.dataSrv.getUsers().toPromise()
    let quotes = await this.dataSrv.getQuotes().toPromise()
    this.firebaseSrv.resetDatabase(users,quotes)
  }

}
