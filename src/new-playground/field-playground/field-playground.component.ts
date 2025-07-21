import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, UntypedFormControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms'; // Import Angular forms modules
import { Colors, FieldSize, IconSizes, Styles } from 'atlas-cdk';

@Component({
  selector: 'field-playground',
  templateUrl: './field-playground.component.html',
  styleUrls: ['./field-playground.component.scss'],
})
export class FieldPlayground {
  fieldSize = FieldSize;
  styles = Styles;
  Colors = Colors;
  iconSizes = IconSizes;
  emailFormControl = new UntypedFormControl({ value: '', disabled: false }, [Validators.required, Validators.email]);
  emailFormControlDisabled = new UntypedFormControl({ value: '', disabled: true }, [Validators.required, Validators.email]);

  step2PageForm: FormGroup;
  inputSize = FieldSize.medium;

  constructor(private fb: FormBuilder) {
    this.step2PageForm = this.fb.group({
      companyEmail: ['', [Validators.required, Validators.email]],
      confirmCompanyEmail: ['', [Validators.required, Validators.email]],
    }, { validators: this.emailMatchValidator() });
  }

  emailMatchValidator(): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const email = formGroup.get('companyEmail');
      const confirmEmail = formGroup.get('confirmCompanyEmail');
  
      if (!email || !confirmEmail) return null;
  
      const mismatch = email.value !== confirmEmail.value;
  
      if (mismatch) {
        confirmEmail.setErrors({ ...(confirmEmail.errors || {}), emailMismatch: true });
        confirmEmail.markAsTouched(); // Mark as touched to show validation error
      } else {
        if (confirmEmail.errors?.['emailMismatch']) {
          const newErrors = { ...confirmEmail.errors };
          delete newErrors['emailMismatch'];
          confirmEmail.setErrors(Object.keys(newErrors).length ? newErrors : null);
        }
      }
      return null;
    };
  }
  
}
