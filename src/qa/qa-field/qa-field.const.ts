import { FormControl } from "@angular/forms";
import { Actions } from "atlas-cdk";
import { FieldSize, FieldVariants } from "atlas-field";
import { IconSizes } from "atlas-icon";

export interface QaField{

    action: Actions
    hideRM: boolean
    size: FieldSize
    variant: FieldVariants
    placeholder: string
    icon?: string
    isize?: IconSizes
    hint?: string
    emailFC?: FormControl

}