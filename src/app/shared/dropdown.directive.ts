import { Directive, OnInit, HostListener, HostBinding } from '@angular/core';

@Directive({
    selector: '[appDropdown]',
    exportAs: 'appDropdown'
})
export class DropdownDirective implements OnInit {

    @HostBinding('class.show') isOpen = false;
    @HostListener('click') toggolDropdown() {
        this.isOpen = !this.isOpen
    }
    constructor() { }

    ngOnInit() {

    }
}