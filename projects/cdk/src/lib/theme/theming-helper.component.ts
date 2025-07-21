import { AfterViewInit, Component, ViewEncapsulation } from '@angular/core';
import { ThemingService } from './theming.service';
import { defaultConfig } from './default-theme-config';

@Component({
  selector: 'atlas-theming-helper',
  template: `
      <div class="select">
        <label for="theme" class="typographyStyles-label-small">Select a theme</label>
        <select name="theme" class="select-text" (change)="onChange($event.target)">
          <option *ngFor="let item of _themingService.getListOfThemes()" [value]="item">{{(item === 'default' ? 'Default - Marsh Theme' : item) | camelspace | titlecase }}</option>
        </select>
      <span class="select-highlight"></span>
      <span class="select-bar"></span>
      <span class="typographyStyles-label-small">Note: Sample themes and are still being accessibility tested.</span>
     
    </div>
  `,
  styles: [`    
      /* select starting stylings ------------------------------*/
      .select {
        font-family:
          'Roboto','Helvetica','Arial',sans-serif;
        cursor: pointer;
      }

      .select-text {
        color: inherit;
        cursor: pointer;
        position: relative;
        font-family: inherit;
        background-color: rgb(255 255 255 / 16%);
        width: 350px;
        padding: 10px;
        font-size: 18px;
        border-radius: 0;
        border: none;
        border-bottom: 1px solid rgba(0,0,0, 0.12);
      }

      /* Remove focus */
      .select-text:focus {
        outline: none;
        border-bottom: 1px solid rgba(0,0,0, 0);
      }

        /* Use custom arrow */
      .select .select-text {
        appearance: none;
        -webkit-appearance:none
      }

      .select:after {
        position: absolute;
        top: 18px;
        right: 10px;
        /* Styling the down arrow */
        width: 0;
        height: 0;
        padding: 0;
        content: '';
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
        border-top: 6px solid rgba(0, 0, 0, 0.12);
        pointer-events: none;
      }


      /* LABEL ======================================= */
      .select-label {
        color: var(--semanticColor-background-brand-strong-rest);
        font-size: 18px;
        font-weight: normal;
        position: absolute;
        pointer-events: none;
        left: 0;
        top: 10px;
        transition: 0.2s ease all;
      }

      /* active state */
      .select-text:focus ~ .select-label, .select-text:valid ~ .select-label {
        color: var(--semanticColor-background-brand-strong-rest);
        top: -20px;
        transition: 0.2s ease all;
        font-size: 14px;
      }

      /* BOTTOM BARS ================================= */
      .select-bar {
        position: relative;
        display: block;
        width: 350px;
      }

      .select-bar:before, .select-bar:after {
        content: '';
        height: 2px;
        width: 0;
        bottom: 1px;
        position: absolute;
        background: var(--semanticColor-background-brand-strong-rest);
        transition: 0.2s ease all;
      }

      .select-bar:before {
        left: 50%;
      }

      .select-bar:after {
        right: 50%;
      }

      /* active state */
      .select-text:focus ~ .select-bar:before, .select-text:focus ~ .select-bar:after {
        width: 50%;
      }

      /* HIGHLIGHTER ================================== */
      .select-highlight {
        position: absolute;
        height: 60%;
        width: 100px;
        top: 25%;
        left: 0;
        pointer-events: none;
        opacity: 0.5;
      }
  `],
  encapsulation: ViewEncapsulation.None,
})
export class ThemingHelperComponent implements AfterViewInit{


  constructor(
    public _themingService: ThemingService,
  ) {
    this._themingService.initializeTheme(defaultConfig);
    this._themingService.loadPrimitives();
  }
  
  ngAfterViewInit(): void {
    this._themingService.loadPalette();
    this.applyConfiguration();
  }

  onChange(target: any): void {
    this._themingService.toggleMode(target.value);
    this.applyConfiguration();
  }  

  private applyConfiguration() {
    try {
      this._themingService.applyTheme(
        // TODO: make it configurable, but it doesn't work propery with angular elements
        document?.getElementsByTagName('iframe')[0]?.contentWindow?.document?.documentElement,
      );
    } catch (error) {
      console.error(error);
    }
  }
}
