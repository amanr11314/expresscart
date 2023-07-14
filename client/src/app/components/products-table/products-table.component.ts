import { Component, OnDestroy, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.service';
import { Product } from '../../Product';
import { Modal, ModalOptions } from 'flowbite';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.css'],
  providers: [BackendService]
})
export class ProductsTableComponent implements OnInit, OnDestroy {

  backendServiceAllProductsSubscription?: Subscription;
  backendServiceDeleteProductSubscription?: Subscription;


  products: Product[] = [];
  modal?: Modal

  deleteProduct?: Product;

  constructor(private backendService: BackendService, private router: Router) { }

  ngOnInit(): void {
    this.backendServiceAllProductsSubscription = this.backendService.getProducts().subscribe(
      (data) => {
        return this.products = data['products'] || [];
      }
    )

    const $modal = document.getElementById('popup-modal-delete');

    // options with default values
    const options: ModalOptions = {
      placement: 'top-center',
      backdrop: 'dynamic',
      backdropClasses: 'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40',
      closable: true,
      onHide: () => {
        console.log('modal is hidden');
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

  handleDelete(_product: Product) {
    this.modal?.show();
    this.deleteProduct = _product;
  }

  handleConfirmDelete() {
    if (this.deleteProduct) {
      console.log('deleting product', this.deleteProduct)
      const productId = this.deleteProduct.id!
      this.backendServiceDeleteProductSubscription = this.backendService.deleteProduct(productId).subscribe(
        (response: any) => {
          console.log(response)
          this.products = this.products.filter(item => item.id != productId)
          this.modal?.hide();
        }
      )
    }
  }

  ngOnDestroy(): void {
    if (this.backendServiceAllProductsSubscription) {
      this.backendServiceAllProductsSubscription.unsubscribe();
    }
    if (this.backendServiceDeleteProductSubscription) {
      this.backendServiceDeleteProductSubscription.unsubscribe();
    }
  }
}
