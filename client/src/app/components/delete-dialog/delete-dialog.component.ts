import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Modal } from 'flowbite';
import type { ModalOptions } from 'flowbite'

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css'],
})
export class DeleteDialogComponent implements OnInit {
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
  modal?: Modal

  @Output()
  btnConfirmClick = new EventEmitter()

  ngOnInit(): void {

    const $modal = document.getElementById('popup-modal-delete')!;

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

  onClick() {
    this.btnConfirmClick.emit();
  }

}
