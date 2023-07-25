import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Modal, ModalOptions } from 'flowbite';

@Component({
  selector: 'app-add-cart',
  templateUrl: './add-cart.component.html',
  styleUrls: ['./add-cart.component.css']
})
export class AddCartComponent implements OnInit {

  @Input()
  itemCount = 0;
  get getProductCount() {
    const plural = this.itemCount > 1;
    const countWord = this.itemCount + (plural ? ' products' : 'product');
    return countWord;
  }

  modal?: Modal

  @Output()
  btnConfirmClick = new EventEmitter()

  @Output()
  hideCartModal = new EventEmitter()

  ngOnInit(): void {

    const $modal = document.getElementById('popup-modal-delete')!;

    // options with default values
    const options: ModalOptions = {
      placement: 'top-center',
      backdrop: 'dynamic',
      backdropClasses: 'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40',
      closable: true,
      onHide: () => {
        this.hideCartModal.emit();
      },
      onShow: () => {
        console.log('modal is shown');
      },
      onToggle: () => {
        console.log('modal has been toggled');
      }
    };
    this.modal = new Modal($modal, options)

  }

  onClick() {
    this.btnConfirmClick.emit();
  }
}
