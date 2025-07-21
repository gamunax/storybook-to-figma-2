import { ChipVariants } from "atlas-chips";
import { Actions } from "atlas-cdk";
import { ChipSizings } from "atlas-chips/public-api";

export interface QaChip{
    action: Actions,
    size: ChipSizings,
    variant: ChipVariants,
    customClass?: string,
    id: string,
    disabled: boolean,
    removable: boolean
}