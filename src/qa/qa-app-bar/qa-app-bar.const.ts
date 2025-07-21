import { ButtonVariants } from "atlas-button";
import { Actions } from "atlas-cdk";
import { IconSizes } from "atlas-icon";

export interface QaAppBar{
    action: Actions
    size: IconSizes
    variant: ButtonVariants
    actionBtn: Actions
    src?: string
    avatarClass?: string
    customClass?: string
    id: string
}