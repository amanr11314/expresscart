import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-custom-label-input',
  templateUrl: './custom-label-input.component.html',
  styleUrls: ['./custom-label-input.component.css']
})
export class CustomLabelInputComponent {
  @Input()
  value?: string
}
