import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MemberListComponent } from '../Components/Members/member-list/member-list.component';
import { AccountService } from '../_services/account.service';
import { map } from 'rxjs';

export const authgaurdGuard: CanActivateFn = (route, state) => {
  const toastr = inject(ToastrService);
  const account = inject(AccountService);
  //here we are ensuring the user exists(i.e user has logged in) then only return true
  return account.currentUser$.pipe(
    map(user=>{
      if(user) return true;
      else{
        toastr.error('access denies')
        return false;
      }
    })
  )
  return true;
};
