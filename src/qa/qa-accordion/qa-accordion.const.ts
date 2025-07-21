import { IconSizes } from "atlas-icon";

export interface QaAccordionItem {
    expanded?: boolean,
    disabled?: boolean,
    heading?: string,
    subheading?: string,
    content?: string[],
    iconSize? : IconSizes,
    expandedAll?: boolean,
    onExpand?: Function,
    id:string
}