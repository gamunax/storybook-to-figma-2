import { Route } from "@angular/router";

export interface Breadcrumb {
    displayName: string;
    lastElement: boolean;
    url: string;
    route?: Route | null;   
    active?: boolean; 
    disabled?: boolean;
}