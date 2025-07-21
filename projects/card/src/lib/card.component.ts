import {
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  Input,
  OnChanges,
  OnInit,
  QueryList,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { BackgroundColors, BoxShadows, SurfaceColors, TextColors, ThemingService } from "atlas-cdk";
import { config } from './card.theming';


/**
 * @ignore
 */
 @Component({
  selector: 'atlas-card-header',
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardHeaderComponent { }

/**
 * @ignore
 */
 @Component({
  selector: 'atlas-card-subheader',
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardSubHeaderComponent { }

/**
 * @ignore
 */
 @Component({
  selector: 'atlas-card-header-action',
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardHeaderActionComponent { }

/**
 * @ignore
 */
@Component({
  selector: 'atlas-card-media',
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardMediaContentComponent { }

/**
 * @ignore
 */
@Component({
  selector: 'atlas-card-content',
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardContentComponent { }

/**
 * @ignore
 */
@Component({
  selector: 'atlas-card-footer',
  template: '<div class="atlas-card-footer-children"><ng-content></ng-content></div>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardFooterComponent { }
/**
 * Card is a layout-type component that allows for organization of content in groups or lists.
 */
@Component({
  selector: 'atlas-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent implements OnChanges, OnInit {
  /** 
   * Set the proper style for the card header to support the avatar image.
  */
  @Input() avatar = false;
  /** 
   * Shadow elevation of the accordion group 
  */
  @Input() elevation = BoxShadows.flat;
   /** 
   * Set the padding classes for the card-header region
  */
  @Input() headerPaddingClass = 'padding-y-8 padding-x-8';
  /** 
   * Set the padding classes for the card-content region
  */
  @Input() contentPaddingClass = 'padding-y-8 padding-x-8';
  /** 
   * Set the padding classes for the card-footer region
  */
  @Input() footerPaddingClass = 'padding-y-8 padding-x-4';
  /** 
   * Set the padding classes for the card-media region
  */
  @Input() mediaPaddingClass = '';
  /** 
   * Set the padding classes for the card-subheader region
  */
  @Input() subheaderPaddingClass = '';
  /** 
   * Set the padding classes for when avatar is used
  */
  @Input() avatarPaddingClass = 'padding-left-8';
  /** 
   * Set the background color of the card
  */
  @Input() background: SurfaceColors | BackgroundColors = SurfaceColors['surface-default-main'];
  /** 
   * Set the text color of the card
  */
  @Input() textColor = TextColors['text-default-main-dark'];

  /** Set the card to full width */
  @Input() fullWidth = false;

  /**
   * @internal
   * Used to determine if any children exists from ng-content
   */
  @ContentChildren(CardHeaderComponent, {descendants: true}) _cardHeaderChildren: QueryList<CardHeaderComponent> | undefined;
  
  /**
   * @internal
   */
  @ContentChildren(CardSubHeaderComponent, {descendants: true}) _cardSubHeaderChildren: QueryList<CardSubHeaderComponent> | undefined;
  
  /**
   * @internal
   */
  @ContentChildren(CardHeaderActionComponent, {descendants: true}) _cardHeaderActionChildren: QueryList<CardHeaderActionComponent> | undefined;
  
  /**
   * @internal
   */
  @ContentChildren(CardContentComponent, {descendants: true}) _cardContentChildren: QueryList<CardContentComponent> | undefined;

  /**
   * @internal
   */
  @ContentChildren(CardMediaContentComponent, {descendants: true}) _cardMediaContentChildren: QueryList<CardMediaContentComponent> | undefined;
  
  /**
   * @internal
   */
  @ContentChildren(CardFooterComponent, {descendants: true}) _cardFooterChildren: QueryList<CardFooterComponent> | undefined;
  

  // get cardStyles(): {[key: string]: any} {
  //   return {
  //     'background-color': this.background,
  //     'color': this.textColor,
  //   };
  // }

  cardStyles: {[key: string]: any} = {};

  constructor(private themingService: ThemingService) {
    this.themingService.applyConfig(config);
  }

  ngOnInit() {
    this.cardStyles = {
      'background-color': 'var(--semanticColor-' + this.background + ')',
      'color': 'var(--semanticColor-' + this.textColor + ')',
    };
  }
  

  /**
   * @internal
   */
  ngOnChanges(changes: SimpleChanges) {
    this.cardStyles = {
      'background-color': 'var(--semanticColor-' + this.background + ')',
      'color': 'var(--semanticColor-' + this.textColor + ')',
    };
  }
}
