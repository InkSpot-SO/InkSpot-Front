import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, NonNullableFormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { login } from 'src/_ngrx/actions/auth/login.actions';
import { AuthentificationService } from 'src/app/_services/authentification-service.service';

@Component({
  selector: 'ik-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss' , '../auth.component.scss']
})
export class LoginComponent {
  validateForm: FormGroup<{
    username: FormControl<string>;
    password: FormControl<string>;
    remember: FormControl<boolean>;
  }> = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
    remember: [true]
  });

  submitForm(): void {
    if (
      this.validateForm.valid
      ) {
      this.store.dispatch(login({user : {
        username: this.validateForm.value.username!,
        password: this.validateForm.value.password!,
      }}));
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  constructor(private fb: NonNullableFormBuilder,
    private _authService : AuthentificationService,
    private store : Store
  ) {}
}
