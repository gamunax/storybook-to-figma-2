import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

    /**
     * The format that should be followed to add a new route should be: 
     * {
     *  path: 'componentRoute', loadChildren: () => import('path to component module')
     *  .then(m => m.QaComponentModule)
     * }
     */
    
    {
        path: 'qa-alert', loadChildren: () => import('./qa-alert/qa-alert.module')
        .then(m => m.QaAlertModule)
    },
    {
      path: 'qa-avatar', loadChildren: () => import('./qa-avatar/qa-avatar.module')
      .then(m => m.QaAvatarModule)
    },
    {
      path: 'qa-badge', loadChildren: () => import('./qa-badge/qa-badge.module')
      .then(m => m.QaBadgeModule)
    },
    {
      path: 'qa-field', loadChildren: () => import('./qa-field/qa-field.module')
      .then(m => m.QaFieldModule)
    },
    {
      path: 'qa-accordion', loadChildren: () => import('./qa-accordion/qa-accordion.module')
      .then(m => m.QaAccordionModule)
    },
    {
      path: 'qa-drawer', loadChildren: () => import('./qa-drawer/qa-drawer.module')
      .then(m => m.QaDrawerModule)
    },
    {
      path: 'qa-list', loadChildren: () => import('./qa-list/qa-list.module')
      .then(m => m.QaListModule)
    },
    {
      path: 'qa-menu', loadChildren: () => import('./qa-menu/qa-menu.module')
      .then(m => m.QaMenuModule)
    },
    {
      path: 'qa-stepper', loadChildren: () => import('./qa-stepper/qa-stepper.module')
      .then(m => m.QaStepperModule)
    },
    {
      path: 'qa-snack-bar', loadChildren: () => import('./qa-snack-bar/qa-snack-bar.module')
      .then(m => m.QaSnackBarModule)
    },
    {
      path: 'qa-app-bar', loadChildren: () => import('./qa-app-bar/qa-app-bar.module')
      .then(m => m.QaAppBarModule)
    },
    {
      path: 'qa-card', loadChildren: () => import('./qa-card/qa-card.module')
      .then(m => m.QaCardModule)
    },
    {
      path: 'qa-chip', loadChildren: () => import('./qa-chip/qa-chip.module')
      .then(m => m.QaChipModule)
    },
    {
      path: 'qa-table', loadChildren: () => import('./qa-table/qa-table.module')
      .then(m => m.QaTableModule)
    },
    {
      path: 'qa-button', loadChildren: () => import('./qa-button/qa-button.module')
      .then(m => m.QaButtonModule)
    },
    {
      path: 'qa-bottom-navigation', loadChildren: () => import('./qa-bottom-navigation/qa-bottom-navigation.module')
      .then(m => m.QaBottomNavigationModule)
    },
    {
      path: 'qa-checkbox', loadChildren: () => import('./qa-checkbox/qa-checkbox.module')
      .then(m => m.QaCheckboxModule)
    },
    {
      path: 'qa-rating', loadChildren: () => import('./qa-rating/qa-rating.module')
      .then(m => m.QaRatingModule)
    },
  ];
  @NgModule({
    declarations: [],
    imports: [CommonModule, RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class QaRoutingModule {}
  