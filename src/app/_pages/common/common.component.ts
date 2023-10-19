import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/_ngrx/actions/app.state';
import { logout } from 'src/_ngrx/actions/auth/login.actions';

@Component({
  selector: 'ik-common',
  templateUrl: './common.component.html',
  styleUrls: ['./common.component.scss']
})
export class CommonComponent {
  onLogout() {
    this.store.dispatch(logout());
  }
  userName$ = this.store.select(state => state.authUser.user?.username);
  constructor(private store : Store<AppState>) {
    this.userName$.subscribe(username => {
      console.log(username);
    });
  }
}
