import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable,map } from 'rxjs';
import { User } from '../models/userModel';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  base_url : string = "https://localhost:7000/api/";
  /*here we are creating a behaviourSubject to let the other part of our app know about the user
  the initial value of this would be null, however we would be using union type '<User | null>',
  to return both null and user type*/
  private currentUserSource : any = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private httpClient : HttpClient) {
   }
   
   login(model:any) : Observable<any> {
    return this.httpClient.post<User>(this.base_url + 'account/login',model).pipe(
      map((response:User)=>{
        const user = response
        if(user){
          //save the user in local storage after login
          localStorage.setItem('user',JSON.stringify(user));
          //emit the observable so that other parts of the app can know that user has logged in
          this.currentUserSource.next(user);
        }
      })
    )
   }
   register(model:any) : Observable<any>{
    return this.httpClient.post<User>(this.base_url + 'account/register', model).pipe(
      map(response =>{
        localStorage.setItem('User',JSON.stringify(response));
        this.currentUserSource.next(response);
      })
    )
   }
   setCurrentUser(user : User){
    this.currentUserSource.next(user);
   }
   logout(){
    //once logged out remove the user from localstorage
    localStorage.removeItem('user');
    //update other components that user has logged out
    this.currentUserSource.next(null);
   }
}
