import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/shared/Product';


@Component({
  selector: 'app-multi-select-dropdown',
  templateUrl: './multi-select-dropdown.component.html',
  styleUrls: ['./multi-select-dropdown.component.css']
})
export class MultiSelectDropdownComponent {
  @Input() list: any[] = [];

  @Output() shareCheckedList = new EventEmitter();
  @Output() shareIndividualCheckedList = new EventEmitter();

  showDropDown: boolean = false


  checkedList: any[];
  currentSelected: {} = {};

  constructor() {
    this.checkedList = [];
  }

  getSelectedValue(status: Boolean, value: String) {
    if (status) {
      this.checkedList.push(value);
    } else {
      var index = this.checkedList.indexOf(value);
      this.checkedList.splice(index, 1);
    }

    this.currentSelected = { checked: status, name: value };

    //share checked list
    this.shareCheckedlist();

    //share individual selected item
    this.shareIndividualStatus();
  }

  // when checkbox change, add/remove the item from the array
  onChange(checked: Boolean, item: Product, index: number) {
    if (checked) {
      // Removes it from the index
      this.list.splice(index, 1);

      // Push it in the first position
      this.list.unshift(item);

      this.checkedList.push(item);
    } else {
      // remove from checked list
      this.checkedList.splice(this.checkedList.indexOf(item), 1);

      // Removes it from the index
      this.list.splice(index, 1);

      // Push it to last
      this.list.push(item)
    }
    console.log(this.checkedList);
    //share checked list
    this.shareCheckedlist();

    //share individual selected item
    this.shareIndividualStatus();
  }

  shareCheckedlist() {
    this.shareCheckedList.emit(this.checkedList);
  }
  shareIndividualStatus() {
    this.shareIndividualCheckedList.emit(this.currentSelected);
  }



}