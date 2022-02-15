import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/shared/services/firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required])
  hide = true

  constructor(private firebaseSrv: FirebaseService, private router: Router){ }

  ngOnInit(): void {
    this.firebaseSrv.checkLogin()
    if(this.firebaseSrv.isLogin == true){
      this.router.navigate(["/home"])
    }
  }
  
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  async login(){
    // console.log(this.email.value, this.password.value)
    if(this.email.hasError('required') || this.email.hasError('email') || this.password.hasError('required')){
    }else{
      this.firebaseSrv.login(this.email.value, this.password.value)
    }
  }

}
