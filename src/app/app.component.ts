import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from './models/userModel';
import { AccountService } from './_services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ApiClient';
  constructor (private http: HttpClient, private accountService: AccountService){ }
  
  ngOnInit(): void {
    this.setCurrentUser();
  }
 
  setCurrentUser(){
    const userString = localStorage.getItem('user');
    if(!userString) return;
    //we are using JSON.parse() because we cant store or retrieve object is local storage but only strings
    const user : User = JSON.parse(userString);
    this.accountService.setCurrentUser(user);
  }
}
