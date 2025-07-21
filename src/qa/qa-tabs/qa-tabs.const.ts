import { Actions } from "atlas-cdk";
import { TabVariants } from "atlas-tabs";

export interface QaTabGroup{
    action:Actions
    fullWidth:boolean
    selectedIndex:number
    variant: TabVariants
}

export interface QaTab{
    icon: string
    label: string
    content: string
    disabled: boolean
}