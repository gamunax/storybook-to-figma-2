import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { CDKUtils } from '../utils';
import { Theme } from './theme.const';
import { Injectable } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { defaultConfig } from './default-theme-config';

export const CSS_VAR_PREFIX = '--';
export const CSS_VAR_SEPARATOR = '-';
export enum KEYS {
  VALUE = 'value',
  STATES = 'states',
  PALETTE = 'palette',
  PRIMITIVE = 'primitive',
  UTILITY = 'utility',
  DARK = 'dark',
  LIGHT = 'light',
  SEMANTIC_COLOR = 'semanticColor',
  SEMANTIC_TYPOGRAPHY = 'semanticTypography',
  TYPOGRAPHY_STYLES = 'typographyStyles'
}

interface ICSSDeclarations {
  [key: string]: string;
}
interface ITokenData {
  [key: string]: string | number;
}
export interface IToken {
  name: string,
  isClass?: boolean,
  isPseudoClass?: boolean,
  declarations?: ICSSDeclarations,
  type?: string,
  value?: string,
  description?: string,
}

/**
 * A class helper for theming an application.
 */
@Injectable()
export class ThemingServiceGlobal {
  private style: HTMLStyleElement = document.createElement('style', {}) as any;
  protected destroy$ = new Subject<void>();
  private primitive: ITokenData = {};
  private palette: ITokenData = {};
  private semanticColorsLight: ITokenData = {};
  private semanticColorsDark: ITokenData = {};
  private semanticColors: ITokenData = {};
  private sematicTypography: ITokenData = {};
  private typographyStyles: ITokenData = {};

  constructor(protected breakpointObserver: BreakpointObserver) {    
    document.getElementsByTagName('head')[0].appendChild(this.style);
  }

  initializeTheme(themingConfig: object) {
    this.primitive = {
      ...themingConfig[KEYS.PRIMITIVE],
      ...themingConfig[KEYS.UTILITY],
    };
    this.palette = { ...themingConfig[KEYS.PALETTE] };
    this.semanticColors = { ...themingConfig[KEYS.SEMANTIC_COLOR][KEYS.LIGHT] };
    this.semanticColorsLight = { ...themingConfig[KEYS.SEMANTIC_COLOR][KEYS.LIGHT] };
    this.semanticColorsDark = { ...themingConfig[KEYS.SEMANTIC_COLOR][KEYS.DARK] };
    this.sematicTypography = { ...themingConfig[KEYS.SEMANTIC_TYPOGRAPHY] };
    this.typographyStyles = { ...themingConfig[KEYS.TYPOGRAPHY_STYLES] };
  }

  /**
   * Applies a theme, transforming it's values into css variables added in an element
   * @param theme a specific theming style
   */
  applyTheme(element: HTMLElement = document.documentElement): void {
    const tokens = this.loadSemanticTokens();
    this.applyTokens(tokens, element);
  }

  /**
   * Applies a config object, transforming it's values into css variables added in an element
   * @param config a configuration object
   */
  applyConfig(config: object, element: HTMLElement = document.documentElement): void {
    const tokens = this.getTokens(config);
    this.applyTokens(tokens, element);
  }

  /**
   * Applies initial config
   */
  applyConfigTheming(): void {
    this.initializeTheme(defaultConfig);
    this.loadPrimitives();
    this.loadPalette();
    this.applyTheme();
  }

  /**
   * Toggles the mode between light and dark.
   *
   * @param {string} mode The new mode to toggle to. Can be 'light' or 'dark'.
   */
  toggleMode(mode: string) {
    switch (mode) {
      case 'light':
        this.semanticColors = this.semanticColorsLight;
        this.loadSemanticColorsTokens();
        break;
      case 'dark':
        this.semanticColors = this.semanticColorsDark;
        this.loadSemanticColorsTokens();
        break;
      default:
        this.semanticColors = this.semanticColorsLight;
        this.loadSemanticColorsTokens();
    }
  }

  /**
   * Applies a config object, transforming it's values into css variables added in an element
   * @param applyAlternativeConfig switch between default and alternative styles
   * @param defaultConfig default theme config
   * @param alternativeConfig alternative theme config
   */
  applyWithAlternativeConfig(
    applyAlternativeConfig: boolean,
    defaultConfig: object,
    alternativeConfig: object,
    element: HTMLElement = document.documentElement,
  ): void {
    let tokens: IToken[] = [];
    if (applyAlternativeConfig) {
      tokens = this.getTokens(alternativeConfig);
    } else {
      tokens = this.getTokens(defaultConfig);
    }
    this.applyTokens(tokens, element);
  }

  /**
   * Applies tokens into an HTML element
   * @param tokens, the tokens to be applied
   * @param element, the element where the CSS variables will be applied
   */
  applyTokens(tokens: IToken[], element: HTMLElement = document.documentElement): void {
    tokens.forEach((token) => {
      
      if (token.isClass) {
        this.applyClass(token.name, this.transformDeclarationsToRules(token.declarations));
      } else {
        this.applyVar(element, token.name, token.value);
      }
    });
  }

  /**
   * Applies tokens into an HTML element
   * @param tokens, the tokens to be applied
   * @param element, the element where the CSS variables will be applied
   */
  applyTokensVarValues(tokens: any[], element: HTMLElement = document.documentElement): void {
    tokens.forEach((token) => {
      this.applyVar(element, token.name, token.value);
    });
  }

  /**
   * get all available themes
   * @param theme a specific theme
   * @returns object
   */
  getListOfThemes(): string[] {
    return Object.keys(Theme);
  }

  /**
   * New GetTokens with clean tokens for RGBA functions
   * @param initial
   * @returns
   */
  getTokens(initial: any, prefix = '', parent = '', isPseudoClass: boolean = false): IToken[] {
    const tokens = this.cleanRgbaValues(this.getInternalTokens(initial, prefix, parent, isPseudoClass));
    return tokens;
  }

  /**
   * Loads semantic tokens from various sources and concatenates them into a single array.
   *
   * This method first loads semantic colors, then gets internal tokens for typography styles,
   * and finally gets internal tokens for semantic typography. The results are concatenated
   * together to produce the final output.
   *
   * @return {IToken[]} An array of IToken objects representing the loaded semantic tokens.
   */
  private loadSemanticTokens(): IToken[] {
    const sematicColorsTokens: IToken[] = this.loadSemanticColorsTokens();
    const typographySemanticTokens: IToken[] = this.getInternalTokensSemanticTypography();
    const typographyStyleTokens: IToken[] = this.getInternalTokensTypographyStyles();

    return sematicColorsTokens.concat(typographySemanticTokens).concat(typographyStyleTokens);
  }

  /**
   * Transforms an object with deep properties into a flattened object where the key values are css
   * variable names. And the values are css values.
   * @param obj the object to transform
   * @param prefix prefix to be added to the key
   * @param parent optional parameter used to track the parent element name
   * @param isPseudoClass true when the current branch represents a pseudo class
   * @returns a flattened object containing ITokens
   */
  private getInternalTokens(initial: any, prefix = '', parent = '', isPseudoClass: boolean = false): IToken[] {
    return Object.keys(initial).reduce((acc: IToken[], k) => {
      const pre = prefix.length ? prefix : '';
      if (typeof initial[k] === 'object' && k !== KEYS.VALUE) {
        acc = [
          ...acc,
          ...this.getInternalTokens(
            initial[k],
            pre + (prefix ? CSS_VAR_SEPARATOR : '') + k,
            k,
            k === KEYS.STATES || isPseudoClass,
          ),
        ];
      } else {
        const { value, type, description } = initial;
        if (k === KEYS.VALUE) {
          if (typeof value === 'string') {
            let name = `${CSS_VAR_PREFIX}${pre}`;
            acc.push(this.transformReferenceToVar(name, value, type, description));
          } else {
            const className = isPseudoClass
              ? pre.replace(
                  new RegExp(`${CSS_VAR_SEPARATOR}${KEYS.STATES}${CSS_VAR_SEPARATOR}${parent}$`, 'g'),
                  `:${parent}`,
                )
              : pre;
            acc.push(this.transformReferenceToClass(className, value, type, description, isPseudoClass));
          }
        }
      }
      return acc;
    }, []);
  }

  /**
   * Loads and applies primitive tokens to an HTML element.
   *
   * @param {HTMLElement=} element - The HTML element to which the tokens should be applied (defaulting to the document's `<html>` element).
   */
  loadPrimitives(element: HTMLElement = document.documentElement): void {
    const tokens = this.loadPrimitivesTokens(this.primitive);
    this.applyTokensVarValues(tokens, element);
  }

  /**
   * Loads and applies palette tokens to an HTML element.
   *
   * @param {HTMLElement=} element - The HTML element to which the tokens should be applied (defaulting to the document's `<html>` element).
   */
  loadPalette(element: HTMLElement = document.documentElement): void {
    const tokens = this.loadPaletteTokens(this.palette);
    this.applyTokensVarValues(tokens, element);
  }

  /**
   * Loads and transforms primitive token data into an array of IToken objects.
   *
   * @param {Object} dataPrimitive - The object containing the primitive token data.
   * @return {IToken[]} An array of IToken objects representing the transformed data.
   */
  private loadPrimitivesTokens(dataPrimitive: Object): IToken[] {
    return Object.keys(dataPrimitive).reduce((output: IToken[], key) => {
      const newKey = key.replace(/\//g, '-');
      output.push({
        name: `--${newKey}`,
        value: typeof dataPrimitive[key] === 'string' ? `#${dataPrimitive[key]}` : `${dataPrimitive[key]}px`,
      });
      return output;
    }, []);
  }

  /**
   * Loads and transforms palette token data into an array of IToken objects.
   *
   * @param {Object} data - The object containing the palette token data.
   * @return {IToken[]} An array of IToken objects representing the transformed data.
   */
  private loadPaletteTokens(data: Object): IToken[] {
    return Object.keys(data).reduce((output: IToken[], key) => {
      const newKey = key.replace(/\//g, '-');
      output.push({
        name: `--${newKey}`,
        value: data[key].includes('/') ? `var(--${data[key].replace(/\//g, '-')})` : `#${data[key]}`,
      });
      return output;
    }, []);
  }

  private loadSemanticColorsTokens(): IToken[] {
    return Object.keys(this.semanticColors).reduce((output: IToken[], key) => {
      if (typeof this.semanticColors[key] === 'string') {
        const newKey = key.replace(/\//g, '-');
        output.push({
          name: `--${KEYS.SEMANTIC_COLOR}-${newKey}`,
          value: `var(--${this.semanticColors[key].toString().replace(/\//g, '-')})`,
        });
      }
      return output;
    }, []);
  }

  /**
   * Returns an array of internal tokens for semantic typography styles.
   *
   * This method iterates over the `semanticTypography` object and extracts the corresponding values from the `primitive` object. If the value is a string, it looks up the corresponding primitive value and adds it to the output array. If the value is not a string, it assumes it's a numeric value and adds it to the output array with a `px` suffix.
   *
   * @return {IToken[]} An array of IToken objects representing the semantic typography styles.
   */
  private getInternalTokensSemanticTypography(): IToken[] {
    return Object.keys(this.sematicTypography).reduce((output: IToken[], key: string) => {
      if (typeof this.sematicTypography[key] === 'string') {
        const primitiveValue = this.primitive[this.sematicTypography[key]];
        if (primitiveValue !== undefined) {
          output.push({ name: `--${KEYS.SEMANTIC_TYPOGRAPHY}-${key}`.replace(/\//g, '-'), value: `${primitiveValue}` });
        }
      } else {
        output.push({
          name: `--${KEYS.SEMANTIC_TYPOGRAPHY}-${key}`.replace(/\//g, '-'),
          value: `${this.sematicTypography[key]}px`,
        });
      }
      return output;
    }, []);
  }

  /**
   * Returns an array of internal tokens for typography styles.
   *
   * @return {IToken[]} An array of IToken objects representing the typography styles.
   */
  private getInternalTokensTypographyStyles(): IToken[] {
    return Object.keys(this.typographyStyles).reduce((output: IToken[], key: string) => {
      const valueStylesTypography: Object = this.typographyStyles[key];
      if (valueStylesTypography !== undefined) {
        const className = `${KEYS.TYPOGRAPHY_STYLES}-${key}`.replace(/\//g, '-');
        const declarations: ICSSDeclarations = {};
        Object.entries(valueStylesTypography).forEach(([k, v]) => {
          if(k === 'letterSpacing'){
            declarations[CDKUtils.toKebabCase(k)] = v + 'px';
          }else{
            declarations[CDKUtils.toKebabCase(k)] = (typeof v === 'string') ? `var(--${KEYS.SEMANTIC_TYPOGRAPHY +'-' + v?.replace(/\//g, '-')})` : v || '';
          }
        });
        output.push({
          name: className,
          declarations,
          description: key.replace(/\//g, '-'),
          type: KEYS.TYPOGRAPHY_STYLES,
          isClass: true,
        });
      }
      return output;
    }, []);
  }

  /**
   * Transforms a string with references to object deep properties into a string with css variables.
   * @param name the token name
   * @param value a string with references e.g. rgba($a.color.reference, 0.5)
   * @param description the token description
   * @param type the type of token, e.g. typography
   * @returns an IToken with the css value, e.g. rgba(var(--a-color-reference), 0.5), it's type and description
   */
  private transformReferenceToVar(name: string, value: string, type?: string, description?: string): IToken {
    const vars = value.replace(/,/g, ' , ').match(/(\$\S+)/gi);
    vars?.forEach((ref) => {
      const toVar = ref.replace(/\$/g, CSS_VAR_PREFIX).replace(/\./g, CSS_VAR_SEPARATOR);
      value = value.split(ref).join(`var(${toVar})`);
    });
    value.includes('*') ? (value = `calc(${value})`) : (value = value);
    return { name, value, description, type, isClass: false, isPseudoClass: false };
  }

  /**
   * Transforms a string with multiple values including references to IToken with name, description, type and declarations.
   * @param name the class name (without .)
   * @param data a string with references e.g. rgba($a.color.reference, 0.5)
   * @param description the token description
   * @param type the type of token, e.g. typography
   * @param isPseudoClass represents if the class is a pseudo class
   * @returns an IToken with the css class name, it's declarations, type and description
   */
  private transformReferenceToClass(
    name: string,
    data: object,
    type?: string,
    description?: string,
    isPseudoClass: boolean = false,
  ): IToken {
    const declarations: ICSSDeclarations = {};

    if (type === 'boxShadow') {
      name = CDKUtils.toKebabCase(name);
      declarations[CDKUtils.toKebabCase('boxShadow')] = `${this.transformReferenceToVar(name, data['x']).value || ''} ${
        this.transformReferenceToVar(name, data['y']).value || ''
      } ${this.transformReferenceToVar(name, data['blur']).value || ''} ${
        this.transformReferenceToVar(name, data['spread']).value || ''
      } ${this.transformReferenceToVar(name, data['color']).value || ''}`;
      return { name, declarations, description, type, isClass: true, isPseudoClass };
    } else {
      Object.entries(data).forEach(([key, value]) => {
        declarations[CDKUtils.toKebabCase(key)] = this.transformReferenceToVar(name, value).value || '';
      });
      return { name, declarations, description, type, isClass: true, isPseudoClass };
    }
  }

  private appliedStyles = new Set<string>();
  /**
   * Creates a css class with rules adding it to the head.
   * @param name the name of the class without '.'
   * @param rules the rules, e.g. "background-color:red; padding: 10px;"
   */
  private applyClass(name: string, rules: string): void {
    const className = `.${name}`;
    // Check if the style rule already exists in the cache
    if (!this.appliedStyles.has(className)) {
      const sheet = this.style.sheet;

      (sheet || {}).insertRule
        ? sheet.insertRule(`${className}{${rules}}`, 0)
        : sheet.addRule(name, rules);

      this.appliedStyles.add(className);
    }
  }

  /**
   * Applies a css variable in an element
   * @param element the element where the css variable will be applied
   * @param name the name of the css variable
   * @param value the value to be applied
   */
  private applyVar(element: HTMLElement, name: string, value: string = ''): void {
    element.style.setProperty(name, value);
  }

  /**
   * Transforms CSS declarations into a string of rules
   * @param declarations the declarations to be transformed
   * @returns a string of rules of the form "background":"red"; "padding": "50px";
   */
  private transformDeclarationsToRules(declarations: ICSSDeclarations = {}): string {
    let res = '';
    Object.entries(declarations).forEach(([key, value]) => {
      res += ` ${key}: ${value}; `;
    });
    return res;
  }

  /**
   * Replace by item, values that contain an rgba function
   * @param tokens tokens classes
   * @param idx index of tokens array
   * @param item item of tokens array
   * @returns
   */
  private replaceRgbIntoRgbaFunction(tokens: IToken[], idx: number, item: IToken): void {
    if (!item.value) {
      return;
    }

    if (item.value.includes('rgba(--') || item.value.includes('rgba(var(--')) {
      const vars = item.value.replace(/rgba\(|var\(|\)/gi, '').split(',');
      const val = tokens.find((x) => x.name === vars[0].trim());
      const baseItem = this.findBaseClass(tokens, val);

      item.value = `rgba(${baseItem.value.replace(/rgb\(|var\(|\)/gi, '')},${vars[1]})`;
      tokens[idx] = item;
    }
  }

  /**
   * Iterate over array of tokens to find and clean values with rgba functions
   * @param tokens array of tokens to replace rgba values
   */
  private cleanRgbaValues(tokens: IToken[]): IToken[] {
    tokens.forEach((item, idx) => this.replaceRgbIntoRgbaFunction(tokens, idx, item));
    return tokens;
  }

  /**
   *
   * @param tokens  array of tokens to replace rgba values
   * @param item item of tokens array to find values recursively
   * @returns
   */
  private findBaseClass(tokens: IToken[], item: IToken): IToken {
    if (item.value.includes('--')) {
      const value = item.value.replace(/var\(|\)/gi, '');
      const res = tokens.find((x) => x.name === value);
      if (res) {
        return this.findBaseClass(tokens, res);
      }
    }
    return item;
  }

    /**
   * Enables dynamic switching of typography classes based on viewport size.
   * This method observes the viewport size and automatically swaps 'desktop'
   * typography classes with 'mobile' typography classes when the viewport
   * matches the mobile breakpoint, and vice versa.
   * 
   * The method uses Angular CDK's BreakpointObserver to detect changes in
   * viewport size. It specifically watches for the HandsetPortrait breakpoint
   * to determine when to switch to mobile typography.
   * 
   * Classes are swapped by replacing the 'desktop' or 'mobile' substring
   * in the class name. For example, 'typography-desktop-body-2' would
   * become 'typography-mobile-body-2' on mobile devices.
   * 
   * This method should be called once, typically in the ngOnInit lifecycle
   * hook of the app's main component, to enable the dynamic typography switching.
   * 
   * @example
   * ngOnInit() {
   *   this.themeService.enableMobileTypography();
   * }
   * 
   * @returns void
   */
    public enableMobileTypography(): void {
      this.breakpointObserver.observe([Breakpoints.HandsetPortrait])
        .pipe(takeUntil(this.destroy$))
        .subscribe((result: BreakpointState) => {
          if (result.matches) {
            this.updateTypographyClasses('desktop', 'mobile');
          } else {
            this.updateTypographyClasses('mobile', 'desktop');
          }
        });
    }
  
    protected updateTypographyClasses(fromPrefix: string, toPrefix: string): void {
      const elements = document.querySelectorAll(`[class*="${fromPrefix}"]`);
      elements.forEach((element: Element) => {
        const classList = element.className.split(/\s+/);
        const updatedClassList = classList.map(className => {
          if (className.includes(`${fromPrefix}`)) {
            return className.replace(`${fromPrefix}`, `${toPrefix}`);
          }
          return className;
        });
        element.className = updatedClassList.join(' ');
      });
    }

    protected ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete();
    }
}
