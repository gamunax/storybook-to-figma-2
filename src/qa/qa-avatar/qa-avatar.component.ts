import { Component, OnInit } from '@angular/core';
import { Actions, ThemingService, defaultConfig } from 'atlas-cdk';
import { IconSizes } from 'atlas-icon';
import { AvatarVariants, AvatarSizes } from 'atlas-avatar';
import { Radii } from 'atlas-cdk';
import { QaAvatar } from './qa-avatar.const';

@Component({
  selector: 'qa-avatar',
  templateUrl: './qa-avatar.component.html',
  styleUrls: ['./qa-avatar.component.scss']
})
export class QaAvatarComponent implements OnInit {

  constructor(themingService: ThemingService) {
    themingService.applyConfig(defaultConfig)
   }

  ngOnInit(): void {
  }

  actions = Actions;
  iconSize = IconSizes
  avatarVar = AvatarVariants;
  avatarSize = AvatarSizes;
  radius = Radii;

  single: QaAvatar[] = [
    {
      action: Actions.default,
      id: "TC1",
      indicator: true,
      iaction: Actions.info,
      radius: Radii.none,
      grouped: false,
    },

    {
      action: Actions.primary,
      id: "TC2",
      indicator: true,
      iaction: Actions.warning,
      radius: Radii.soft,
      grouped: false,
    },

    {
      action: Actions.secondary,
      id: "TC3",
      indicator: true,
      iaction: Actions.success,
      radius: Radii.softer,
      grouped: false,
    },

    {
      action: Actions.error,
      id: "TC4",
      indicator: true,
      iaction: Actions.error,
      radius: Radii.rounded,
      grouped: false,
    },

    {
      action: Actions.secondary,
      id: "TC10",
      indicator: false,
      iaction: Actions.default,
      radius: Radii.rounded,
      grouped: false,
    },

    {
      action: Actions.primary,
      id: "TC11",
      indicator: false,
      iaction: Actions.default,
      radius: Radii.softer,
      grouped: false,
    },
  ]

  grouped: QaAvatar[] = [
    {
      action: Actions.success,
      id: "TC5",
      indicator: true,
      iaction: Actions.secondary,
      radius: Radii.softer,
      grouped: true,
    },

    {
      action: Actions.warning,
      id: "TC6",
      indicator: false,
      iaction: Actions.default,
      radius: Radii.rounded,
      grouped: true,
    },

    {
      action: Actions.info,
      id: "TC7",
      indicator: true,
      iaction: Actions.default,
      radius: Radii.softer,
      grouped: true,
    },

    {
      action: Actions.error,
      id: "TC8",
      indicator: false,
      iaction: Actions.default,
      radius: Radii.soft,
      grouped: true,
    },

    {
      action: Actions.success,
      id: "TC9",
      indicator: false,
      iaction: Actions.default,
      radius: Radii.softer,
      grouped: true,
    },
  ]


  onClickQA(value: any): void{
    console.log('hello, avatar is clicked!')
  }
}