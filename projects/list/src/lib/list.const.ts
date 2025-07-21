/** SelectOption type for data passed to the component */
export interface ListItem {
    value: string;
    label: string;
    icon?: string;
    selected?: boolean;
    dense?: boolean;
    level?: number;
}