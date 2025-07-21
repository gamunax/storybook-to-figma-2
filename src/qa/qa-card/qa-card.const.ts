import { Actions } from "atlas-cdk";
import { ButtonVariants, ButtonSizings } from "atlas-button";

export interface QaCard{
    action: Actions,
    avatar: boolean,
    size: ButtonSizings,
    variant: ButtonVariants,
    imgSrc?: string,
    id: string
}