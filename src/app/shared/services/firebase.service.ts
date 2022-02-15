import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth"
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private auth: AngularFireAuth, private router:Router, private snack: MatSnackBar) {  }

  isLogin:boolean = false

  /**
   * Login with email and password
   * @param email string
   * @param password string
   */
  async login(email: string, password: string){
    this.auth.signInWithEmailAndPassword(email, password).then(res=>{
      this.auth.updateCurrentUser(res.user).then(()=>{
        this.isLogin = true
        this.router.navigate(["/home"])
      })
    }).catch(err=>{
      this.showSnackBar(err.message)
    })
  }

  /**
   * Logout the current user
   */
  logout(){
    this.auth.signOut().then(()=>{
      this.isLogin = false
      this.router.navigate(["/"])
    })
  }

  /**
   * Check if there is a user logged
   */
  checkLogin(){
    this.auth.currentUser.then(data=>{
      if (data == null){
        this.isLogin = false
      }else{
        this.isLogin = true
      }
    }).catch(err=>{
      console.log(err)
      this.showSnackBar(err.message)
    })
  }

  /**
   * Shows a snack bar with the provider text
   * @param text string
   */
  showSnackBar(text: string){
    this.snack.open(text,undefined,{duration:5000})
  }
}
