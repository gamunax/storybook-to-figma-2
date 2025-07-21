import { Component, OnInit } from '@angular/core';
import { Actions, ThemingService, defaultConfig } from 'atlas-cdk';
import { BadgeModes, BadgePositions } from 'atlas-badge';
import { IconSizes } from 'atlas-icon';
import { QaBadge } from './qa-badge.const';
@Component({
  selector: 'qa-badge',
  templateUrl: './qa-badge.component.html',
  styleUrls: ['./qa-badge.component.scss']
})
export class QaBadgeComponent implements OnInit {

  constructor(themingService: ThemingService) {
    themingService.applyConfig(defaultConfig)
   }

  ngOnInit(): void {
  }

  mode = BadgeModes;
  pos = BadgePositions;
  action = Actions;
  size = IconSizes;

  row1: QaBadge[] = [
    {
      cId: "c1",
      icon:{
        name: "icon-window-maximize-24",
        size: IconSizes.xsmall,
      },
      badge:
      {
        action: Actions.default,
        mode: BadgeModes.numbers,
        pos: BadgePositions.topRight,
        number: 1
      },
    },
    {
      cId: "c2",
      icon:{
        name: "icon-window-maximize-24",
        size: IconSizes.xsmall,
      },
      badge:
      {
        action: Actions.primary,
        mode: BadgeModes.dot,
        pos: BadgePositions.topLeft,
        number: 1
      },
    },
    {
      cId: "c3",
      icon:{
        name: "icon-window-maximize-24",
        size: IconSizes.xsmall,
      },
      badge:
      {
        action: Actions.secondary,
        mode: BadgeModes.numbers,
        pos: BadgePositions.bottomRight,
        number: 1000
      },
    },
    {
      cId: "c4",
      icon:{
        name: "icon-window-maximize-24",
        size: IconSizes.small,
      },
      badge:
      {
        action: Actions.error,
        mode: BadgeModes.numbers,
        pos: BadgePositions.bottomLeft,
        number: 4
      },
    },
    {
      cId: "c5",
      icon:{
        name: "icon-window-maximize-24",
        size: IconSizes.small,
      },
      badge:
      {
        action: Actions.info,
        mode: BadgeModes.dot,
        pos: BadgePositions.topRight,
        number: 1
      },
    },
    {
      cId: "c6",
      icon:{
        name: "icon-window-maximize-24",
        size: IconSizes.small,
      },
      badge:
      {
        action: Actions.success,
        mode: BadgeModes.numbers,
        pos: BadgePositions.topLeft,
        number: 1000
      },
    },
    {
      cId: "c7",
      icon:{
        name: "icon-window-maximize-24",
        size: IconSizes.medium,
      },
      badge:
      {
        action: Actions.warning,
        mode: BadgeModes.numbers,
        pos: BadgePositions.bottomRight,
        number: 7
      },
    },
    {
      cId: "c8",
      icon:{
        name: "icon-window-maximize-24",
        size: IconSizes.medium,
      },
      badge:
      {
        action: Actions.success,
        mode: BadgeModes.dot,
        pos: BadgePositions.bottomLeft,
        number: 1
      },
    },
    {
      cId: "c9",
      icon:{
        name: "icon-window-maximize-24",
        size: IconSizes.medium,
      },
      badge:
      {
        action: Actions.info,
        mode: BadgeModes.numbers,
        pos: BadgePositions.topRight,
        number: 1000
      },
    },
    {
      cId: "c10",
      icon:{
        name: "icon-window-maximize-24",
        size: IconSizes.large,
      },
      badge:
      {
        action: Actions.error,
        mode: BadgeModes.numbers,
        pos: BadgePositions.topLeft,
        number: 10
      },
    },
    {
      cId: "c11",
      icon:{
        name: "icon-window-maximize-24",
        size: IconSizes.large,
      },
      badge:
      {
        action: Actions.secondary,
        mode: BadgeModes.dot,
        pos: BadgePositions.bottomRight,
        number: 1
      },
    },
    {
      cId: "c12",
      icon:{
        name: "icon-window-maximize-24",
        size: IconSizes.large,
      },
      badge:
      {
        action: Actions.primary,
        mode: BadgeModes.numbers,
        pos: BadgePositions.bottomLeft,
        number: 1000
      },
    },  
  ] 

  row2: QaBadge[] = [
    {
      cId: "c13",
      icon:{
        name: "icon-window-maximize-24",
        size: IconSizes.xlarge,
      },
      badge:
      {
        action: Actions.default,
        mode: BadgeModes.numbers,
        pos: BadgePositions.topRight,
        number: 13
      },
    },
    {
      cId: "c14",
      icon:{
        name: "icon-window-maximize-24",
        size: IconSizes.xlarge,
      },
      badge:
      {
        action: Actions.primary,
        mode: BadgeModes.dot,
        pos: BadgePositions.topLeft,
        number: 1
      },
    },
    {
      cId: "c15",
      icon:{
        name: "icon-window-maximize-24",
        size: IconSizes.xlarge,
      },
      badge:
      {
        action: Actions.secondary,
        mode: BadgeModes.numbers,
        pos: BadgePositions.bottomRight,
        number: 1000
      },
    },
  ]

  onClickQA(event: any): void{
    console.log("funciona")
  }
}