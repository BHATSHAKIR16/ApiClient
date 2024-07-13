import { isPlatformWorkerApp } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { AccountService } from 'src/app/_services/account.service';
import { User } from 'src/app/models/userModel';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  model : any = {}
  isLoggedIn : boolean = false;
  currentUser$ : Observable<User | null> = of(null);
  constructor(public accountService : AccountService, private router : Router,
    private toastr : ToastrService
  ){

  }
  ngOnInit(): void {
    this.currentUser$ = this.accountService.currentUser$;
    // this.getCurrentUser()
  }
  // getCurrentUser(){
  //   //in this method we are checking if user is available by subscribing to the behaviour subject,
  //   //and setting the isloggedin accordingly to decide whether to allow login or not
  //   this.accountService.currentUser$.subscribe((user: User|null)=>{
  //     this.isLoggedIn = !!user;
  //   })
  // }
login(){
  console.log(this.model)
  this.accountService.login(this.model).subscribe({
    next : res =>{
      this.router.navigateByUrl('/members')
      this.isLoggedIn = true;
    },
    error : err => {
      console.log(err)
      this.toastr.error(err.error)
    }
  })
}
logOut(){
  this.accountService.logout();
  this.isLoggedIn = false;
}
}
