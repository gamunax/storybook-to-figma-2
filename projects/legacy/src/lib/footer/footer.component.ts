import {
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  Input,
  QueryList,
  ViewEncapsulation,
} from '@angular/core';

/**
 * @ignore
 */
@Component({
  selector: 'legacy-footer-social-links',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterSocialLinksComponent {}


/**
 * @ignore
 */
 @Component({
  selector: 'legacy-footer-custom-links',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterCustomLinksComponent {
}

@Component({
  selector: 'legacy-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  /** Toggle the display of the coop link section. */
  @Input() coopLinks = true;
  /** Hide the terms links section. */
  @Input() hideTerms = false;
  /** Terms URL string */
  @Input() termsUrl = '';
  /** Terms label string */
  @Input() termsLabel = 'Terms of Use';
  /** Privacy URL string */
  @Input() privacyUrl = '';
  /** Privacy label string */
  @Input() privacyLabel = 'Privacy policy';
  /** Sitemap URL string */
  @Input() sitemapUrl = '';
  /** Sitemap label string */
  @Input() sitemapLabel = 'Sitemap';
  /** Sitemap URL string */
  @Input() bottomRightLogo = 'atlas-logos/Mercer.png';
  /** Sitemap URL string */
  @Input() topLeftLogo = 'atlas-logos/mmc-logo-v3-transparent-background-blue-letters.svg';
  /** Toggles between routerLink and href for each link */
  @Input() outBoundLinks = false;
  /** Sets the target of your outboundLinks anchor */
  @Input() outBoundLinkTarget = '_blank';
  /** Set the company string displayed in the footer copyright */
  @Input() company = 'Mercer LLC';
  /** Custom copyright  string */
  @Input() customCopyright = null;
  /** Custom links to show in the footer */
  @ContentChildren(FooterCustomLinksComponent, { descendants: true })
  _footerChildren: QueryList<FooterCustomLinksComponent>;

  /** @internal */
  currentYear = new Date().getFullYear();

  constructor() {}
}