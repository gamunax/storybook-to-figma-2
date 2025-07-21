import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonSizings, ButtonVariants } from 'atlas-button';
import { Actions, Density, Radii } from 'atlas-cdk';
import { IconSizes } from 'atlas-icon';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
    /** Set the logo for the sample template */
    public logoUrl = '/atlas-logos/Mercer.png';
    /** Set the primary action across the sample template. */
    action = Actions.primary;
    /** Set the size of the inputs. */
    input_size = 'default';
    /** Set the variant of the login button in the sample template. */
    button_variant = ButtonVariants.contained;
    /** text variant for button */
    text_variant = ButtonVariants.text;
    /** Set the size of the icons in the sample template. */
    iconSize =IconSizes.medium;
    /** Set the size of the buttons. */
    button_size = ButtonSizings.xlarge;
    /** Set the radius for the components in the sample template. */
    radius = Radii.rounded;
    /** set boolean var open */
    open = false;
    /** Set the density for the components in the sample template. */
    density = Density.condensed;
    /** small variant of icon size */
    smallIconSize = IconSizes.small;
    /** success variant of actions */
    success = Actions.success;
    /** primary variant of action for drawer component */
    drawerPrimary = Actions.primary;
    /** density boolean var for table */
    tableDense = true;
    /** items for breadcrumb */
    public breadItems = [
      {
        label: "Home",
        path: "/level1",
        active: false,
      },
      {
        label: "Data Uploads",
        path: "/level1/level2",
        active: true,
      },
    ];
    /** profile data */
    public itemsUser = [
      {
          value: '/data',
          label: 'Profile',
          icon: 'icon-home-24',
          dense: true,
      },
      {
        value: '/data',
        label: 'Preferences',
        icon: 'icon-edit-24',
        dense: true,
     },
      {
        value: '/data',
        label: 'Uploads',
        icon: 'icon-file-upload-24',
        dense: true,
     },
    ];
    /** sidebar items */
    public items = [
      {
          value: '/',
          label: 'Home',
          icon: 'icon-home-24',
          reverse: true,
      },
      {
        value: '/form',
        label: 'Form',
        icon: 'icon-document-2-24',
        reverse: true,
      },
      {
        value: '/data',
        label: 'Data Display',
        icon: 'icon-document-copy-24',
        reverse: true,
        selected: true,
      },
      {
          value: '/results',
          label: 'Search',
          icon: 'icon-search-24',
          reverse: true,
      },
      {
          value: '/login',
          label: 'Sign out',
          icon: 'icon-logout-24',
          reverse: true,
      },
    ];

  constructor(public _router: Router) { }
  /** @internal */
  ngOnInit(): void {
  }

  /** on collapse event */
  public onCollapsed(event: any) {
    console.log('collapsed' + event);
  }

  /** open menu event */
  public openMenu(event: any) {
    this.open = !this.open;
    if (this.open) {
      this.density = Density.expanded;
    } else {
      this.density = Density.condensed;
    }
  }

  /** sign out event */
  public signOut(event: any) {
    console.log('sign out' + event);
    this._router.navigateByUrl('login');
  }

}
