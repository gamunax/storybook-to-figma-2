import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonSizings, ButtonVariants } from 'atlas-button';
import { Actions, Radii } from 'atlas-cdk';
import { FieldSize } from 'atlas-field';
import { IconSizes } from 'atlas-icon';

@Component({
  selector: 'app-login',
  template: `
    <atlas-app-bar [action]="appBarAction">
      <span 
      [ngStyle]="{'color': 'var(--semanticColor-background-brand-strong-rest)'}"
      style="
        display: flex;
        align-items: center;
        width: 240px;
        justify-content: space-between;"
        (click)="logo($event)">
          <img height="20px" [src]="logoUrl" alt="Mercer" />
          <h3 class="typographyStyles-body-largeAlt">|</h3>
          <h3 class="typographyStyles-body-smallAlt">Acme Admin</h3>
      </span>
      <span class="app-bar-separator"></span>
      <atlas-button (onClick)="createAccount($event)" [variant]="text_button_variant" [action]="action">Create account</atlas-button>
    </atlas-app-bar>
      <div style="
        width: 540px;
        padding: 48px;
        background: var(--semanticColor-layer-neutral-02);
        margin: 5rem auto 0;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.16);
      ">
      <div style="text-align:center;">
      <h1 class="typographyStyles-heading-medium" style="margin: 0;">Sign In</h1> 
      <p style="margin-top: 8px;" class="typographyStyles-body-medium">to continue to Acme Admin</p>
      </div>
      <div style="margin: 26px 0"></div>
      <atlas-field [fullWidth]="true" [size]="inputSize">
      <atlas-field-label>Email</atlas-field-label>
        <input [formControl]="emailFormControl" type="text" atlasInput/>
        <atlas-field-error *ngIf="emailFormControl.hasError('email')">This is not a valid email.</atlas-field-error>
        <atlas-field-hint>&nbsp;</atlas-field-hint>
      </atlas-field>
      <div style="margin: 16px 0"></div>
    <atlas-field [fullWidth]="true" [size]="inputSize">
      <atlas-field-label>Password</atlas-field-label>
      <input 
        [formControl]="pwFormControl" 
        atlasInput 
        type="password"
        haloPasswordRedaction
        #haloPwdRef="haloPasswordRedaction"
      />
      <atlas-field-suffix (click)="haloPwdRef.toggleMaskField()" class="login-suffix__hover">
        <atlas-icon
          [icon]="haloPwdRef.maskField === true ? 'icon-eye-24' : 'icon-eye-off-24'"
          [size]="iconSize"
        >
        </atlas-icon>
      </atlas-field-suffix>
    </atlas-field>
      <div style="margin: 42px 0"></div>
        <atlas-button
            [size]="button_size"
            [radius]="radius"
            [expand]="true"
            [action]="action"
            [variant]="button_variant"
            (onClick)="signIn($event)"
            [disabled]="emailFormControl.hasError('email') || emailFormControl.value === ''">
            Sign in
        </atlas-button>
        <atlas-button  [ngStyle]="{
      'margin': '8px auto 0',
      'text-align': 'center',
      'display': 'block'
    }"
          (onClick)="forgotPw($event)" 
          [action]="action" 
          [expand]="true"
          [size]="button_size" 
          [disabled]="emailFormControl.hasError('email')  || emailFormControl.value === ''" 
          [variant]="text_button_variant">
          Forgot Password?
        </atlas-button>
      </div>
      <div class="row align-center">
        <div class="column align-center">
          <p class="typographyStyles-body-medium">Secure Sign in with reCAPTCHA subject to Mercer</p>
          <p class="typographyStyles-body-medium"><a style="color: var(--semanticColor-text-default);" href="#">Terms</a> & <a style="color: var(--semanticColor-text-default);" href="#">Privacy</a></p>
        </div>
      </div>
  `,
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  /** Set the logo url */
  public logoUrl = '/atlas-logos/Mercer.png';
  /** Set the action for components */
  public action = Actions.primary;
  /** Set the App Bar action */
  public appBarAction = Actions.default;
  /** Set the email form control */
  public emailFormControl = new UntypedFormControl('', [Validators.email]);
  /** Set the password form control */
  public pwFormControl = new UntypedFormControl('');
  /** Set the button size */
  public button_size = ButtonSizings.large;
  /** Set the button variant */
  public button_variant = ButtonVariants.contained;
  /** Set the text button variant */
  public text_button_variant = ButtonVariants.text;
  /** Set the size of inputs */
  public inputSize = FieldSize.small;
  /** Set the radius for components */
  public radius = Radii.soft;
  /** Set the size of icons */
  public iconSize = IconSizes.medium;
  /** Boolean variable */
  public textInput: boolean = false;
  /** Suffix icon  */
  public iconSuffix = 'icon-eye-24';

  constructor(public _router: Router) { }

  ngOnInit(): void {
  }

  public forgotPw(event: Event) {
    console.log('forgot pw ' + event);
  }
  
  public signIn(event: Event) {
    console.log('sign in ' + event);
    this._router.navigateByUrl('data');
  }

  public createAccount(event: Event) {
    console.log('create account ' + event);
  }

  public logo(event: Event) {
    console.log('logo ' + event);
  }

  showHidePassword() {
    this.textInput = !this.textInput
    this.iconSuffix = this.textInput ? 'icon-eye-off-24' : 'icon-eye-24';
  }

}
