import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/_ngrx/actions/app.state';
import { userInfosChange } from 'src/_ngrx/actions/auth/login.actions';
import { IK_UserAuth } from 'src/_ngrx/models/user/user-auth.model';

@Component({
  selector: 'ik-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent {
  pseudo : string = '';
  user : IK_UserAuth|null = null;
  user$ : Observable<IK_UserAuth|null> = this._store.select(s => s.authUser.user)
  constructor(
    private _store : Store<AppState>
  ) {
    this.user$.subscribe(user => {
      this.user = user;
      this.pseudo = user?.pseudo || '';
      console.log(user)
    })
  }

  onUpdate() {
    if (this.user)
    this._store.dispatch(userInfosChange({user : {
      ...this.user,
      pseudo : this.pseudo
    }}));
  }
}
