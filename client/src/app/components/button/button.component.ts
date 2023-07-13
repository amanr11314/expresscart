import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {
  @Input() color!: string;

  @Input() text!: string;
  @Input() classNames?: string;
  @Input() element: string = 'BUTTON';
  @Input() urlIfLink: string = '#';
  @Output() btnClick = new EventEmitter()

  onClick() {
    this.btnClick.emit();
  }
}
