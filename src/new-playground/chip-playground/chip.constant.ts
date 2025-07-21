import { ChipStates } from "./chip.interface";

export const CHIPS: ChipStates[] = [
  {
    hasAvatar: false,
    hasIcon: false,
    isRemovable: false,
  },
  {
    hasAvatar: false,
    hasIcon: false,
    isRemovable: false,
    isIndicator: true,
  },
  {
    hasAvatar: true,
    hasIcon: false,
    isRemovable: false,
  },
  {
    hasAvatar: false,
    hasIcon: true,
    isRemovable: false,
  },
  {
    hasAvatar: false,
    hasIcon: true,
    isRemovable: false,
    isDisabled: true,
  },
  {
    hasAvatar: false,
    hasIcon: false,
    isRemovable: true,
  },
  {
    hasAvatar: true,
    hasIcon: false,
    isRemovable: true,
  },
  {
    hasAvatar: false,
    hasIcon: true,
    isRemovable: true,
  },
  {
    hasAvatar: false,
    hasIcon: false,
    isRemovable: false,
    flag: 'AR',
  },
];
