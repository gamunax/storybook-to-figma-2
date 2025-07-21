import { Radii, Actions, ButtonSizings, ButtonVariants} from 'atlas-cdk';

export interface QaButton{
    id: string,
    action: Actions,
    alt?: string,
    customClass?: string,
    disabled: boolean,
    expand: boolean,
    radius: Radii,
    size: ButtonSizings,
    variant: ButtonVariants
}