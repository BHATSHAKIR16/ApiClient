import { Component, EventEmitter, Output } from '@angular/core';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
 @Output() closeRegisterForm : EventEmitter<void> = new EventEmitter<void>()
  model : any = {}
  constructor(private accountService : AccountService){}

  register(){
    this.accountService.register(this.model).subscribe(() =>{
      this.cancel();
    })
  }
  cancel(){
    console.log("cancelled");
    this.closeRegisterForm.emit()
  }
}
