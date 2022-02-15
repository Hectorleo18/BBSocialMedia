import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth"
import { AngularFirestore } from "@angular/fire/compat/firestore"
import { Router } from '@angular/router';
import { User } from '../interfaces/user';
import { Quote } from '../interfaces/quote';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(
    private auth: AngularFireAuth,
    private router:Router,
    private db: AngularFirestore,
    private commonSrv: CommonService
  ) {  }

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
      this.commonSrv.showSnackBar(err.message)
    })
  }

  /**
   * Logout the current user
   */
  logout():void{
    this.auth.signOut().then(()=>{
      this.isLogin = false
      this.router.navigate(["/"])
    })
  }

  /**
   * Check if there is a user logged
   */
  async checkLogin(){
    try{
      let data = await this.auth.currentUser
      if(data == null){
        this.isLogin = false
      }else{
        this.isLogin = true
      }
    }catch(err){
      console.log(err)
    }
  }

  async resetDatabase(users:User[], quotes:Quote[]){
    let batchUsers = this.db.firestore.batch()
    let batchQuotes = this.db.firestore.batch()
    let oldUsers = await this.db.firestore.collection('Users').get()
    let oldQuotes = await this.db.firestore.collection('Quotes').get()
    await Promise.all(oldUsers.docs.map(async(oldUser)=>{
      let positionUser = users.findIndex(x=>x.char_id === oldUser.data().char_id)
      if(positionUser != -1){
        let referenceUser = this.db.firestore.collection('Users').doc(oldUser.id)
        batchUsers.set(referenceUser,{
          char_id:users[positionUser].char_id,
          img: users[positionUser].img,
          name: users[positionUser].name,
          nickname: users[positionUser].nickname
        })
      }
    }))
    await Promise.all(oldQuotes.docs.map(async(oldQuote)=>{
      let position = quotes.findIndex(x=>x.quote_id === oldQuote.data().quote_id)
      if(position != -1){
        let reference = this.db.firestore.collection('Quotes').doc(oldQuote.id)
        batchQuotes.set(reference,{
          author:quotes[position].author,
          quote:quotes[position].quote,
          quote_id:quotes[position].quote_id
        })
      }
    }))
    await batchUsers.commit()
    await batchQuotes.commit()
    window.location.reload()
  }

  /**
   * Set the database the first time
   * @param users 
   * @param quotes
   */
  async setDatabase(users:User[], quotes:Quote[]){
    await Promise.all(users.map(async(user)=>{
      await this.db.firestore.collection('Users').add({
        char_id:user.char_id,
        img:user.img,
        name:user.name,
        nickname:user.nickname
      })
    }))
    await Promise.all(quotes.map(async(quote)=>{
      await this.db.firestore.collection('Quotes').add({
        author:quote.author,
        quote:quote.quote,
        quote_id:quote.quote_id
      })
    }))
    window.location.reload()
  }

  async getQuotes(){
    return await this.db.firestore.collection('Quotes').get()
  }

  async getUsers(){
    return await this.db.firestore.collection('Users').get()
  }


}
