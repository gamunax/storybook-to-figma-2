import { Actions } from "atlas-cdk";
import { IconSizes } from "atlas-icon";

export interface QaAlert{
    id: string,
    alertIcon: string,
    variant: string,
    action: Actions,
    closeEmit?: Function,
    actionClick?: Function,
    title: string,
    content: string,
    iconSize: IconSizes,
    width: string
}