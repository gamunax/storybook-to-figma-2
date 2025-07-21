import { Actions } from "atlas-cdk";
import { IconSizes } from "atlas-icon";


export interface QaCheckbox {

    action: Actions,
    checkboxId: string,
    checkboxName: string,
    disabled: boolean,
    indeterminate: boolean,
    isChecked: boolean,
    size: IconSizes,
    value: string,
    labelCustomClass?: string
    
}