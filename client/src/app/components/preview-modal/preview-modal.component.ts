import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Modal } from 'flowbite';
import type { ModalOptions } from 'flowbite'
import { Product } from 'src/app/shared/Product';

@Component({
  selector: 'app-preview-modal',
  templateUrl: './preview-modal.component.html',
  styleUrls: ['./preview-modal.component.css']
})
export class PreviewModalComponent {
  modal?: Modal

  @Input()
  previewProduct?: Product;

  get previewImgUrl() {

    if (this.previewProduct) {
      if (this.previewProduct!.imgUrl === '#') {
        return null;
      }
      // check if already url
      if (this.previewProduct?.imgUrl?.startsWith('https://')) return this.previewProduct.imgUrl;

      return 'http://localhost:3000/' + this.previewProduct?.imgUrl
    } return null;
  }

  ngOnInit(): void {

    const $modal = document.getElementById('popup-modal-preview')!;

    // options with default values
    const options: ModalOptions = {
      placement: 'top-center',
      backdrop: 'dynamic',
      backdropClasses: 'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40',
      closable: true,
      onHide: () => {
        console.log('modal is hidden');
        console.log(this.modal?.isHidden())
        document.querySelector('body > :last-child')?.remove();
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
}
