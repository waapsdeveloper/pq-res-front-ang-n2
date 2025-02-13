import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';  // Your data service
import { of } from 'rxjs';
import { UsersService } from '../services/users.service';

export const userResolver: ResolveFn<any> = (route, state) => {
  const usersService = inject(UsersService);
  const router = inject(Router);

  const user = usersService.getUser();
  if(user){
    return user;
  } else {
    router.navigate(['/tabs/login']);
    return of(null)
  }

};
