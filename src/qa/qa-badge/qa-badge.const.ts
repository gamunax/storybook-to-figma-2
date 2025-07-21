import { BadgeModes, BadgePositions } from "atlas-badge";
import { Actions } from "atlas-cdk";
import { IconSizes } from "atlas-icon";

export interface QaBadge{
    cId: string
    icon: {
        name: string
        size: IconSizes
    }
    badge:{
        action: Actions
        mode: BadgeModes
        pos: BadgePositions
        number: number
    }
}