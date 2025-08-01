import { EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

//
export interface TimepickerRef {
    close?: () => void;
    hourSelected: EventEmitter<number>;
    timeChanged: EventEmitter<string>;
    timeSet: EventEmitter<string>;
    timeUpdated: Observable<string>;
}
