import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, NonNullableFormBuilder } from '@angular/forms';
import { AuthentificationService } from 'src/app/_services/authentification-service.service';

@Component({
  selector: 'ik-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss' , '../auth.component.scss']
})
export class RegisterComponent {
  validatorConfirmPassword = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  }
  validateForm: FormGroup<{
    username: FormControl<string>;
    password: FormControl<string>;
    passwordConfirm: FormControl<string>;
    firstName: FormControl<string>;
    lastName: FormControl<string>;
  }> = this.fb.group({
    username: ['', [Validators.required , Validators.email]],
    password: ['', [Validators.required , Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/)]],
    passwordConfirm: ['', [Validators.required , this.validatorConfirmPassword]],
    firstName: ['', [Validators.required , Validators.minLength(3)]],
    lastName: ['', [Validators.required , Validators.minLength(3)]],
  });

  submitForm(): void {
    if (
      this.validateForm.valid
      ) {
      this._authService.register({
        username: this.validateForm.value.username!,
        password: this.validateForm.value.password!,
        firstName: this.validateForm.value.firstName!,
        lastName: this.validateForm.value.lastName!
      }).subscribe();
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
  ) {}



}
