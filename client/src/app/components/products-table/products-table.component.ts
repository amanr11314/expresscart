import { Component, OnDestroy, OnInit, } from '@angular/core';
import { BackendService } from '../../services/backend.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { User } from 'src/app/shared/User';
import { Product } from '../../shared/Product';
import { Modal, ModalOptions } from 'flowbite';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.css'],
  providers: [BackendService]
})
export class ProductsTableComponent implements OnInit, OnDestroy {

  backendServiceAllProductsSubscription?: Subscription;
  backendServiceDeleteProductSubscription?: Subscription;

  currentUser?: User

  searchString: string = '';


  products: Product[] = [];
  productsCopy: Product[] = [];

  previewModal?: Modal
  previewProduct?: Product

  deleteModal?: Modal
  deleteProduct?: Product;

  getThumbnailURL(product: Product) {

    if (product) {
      if (product!.imgUrl === '#') {
        return null;
      }
      // check if already url
      if (product?.imgUrl?.startsWith('https://')) return product.imgUrl;

      return 'http://localhost:3000/' + 'thumbnails/' + product?.imgUrl
    } return null;
  }

  constructor(private backendService: BackendService, private router: Router, public authService: AuthService,
    private actRoute: ActivatedRoute
  ) { }

  onProductSearch(val: string) {
    // fetch products with filter
    this.searchString = val;
    this.backendServiceAllProductsSubscription = this.backendService.getProducts({
      search: this.searchString
    }).subscribe(
      (data) => {
        this.productsCopy = [...data['products']]
        return this.products = data['products'] || [];
      }
    )
  }

  onSearchReset(val: any) {
    this.searchString = '';
    this.backendServiceAllProductsSubscription = this.backendService.getProducts().subscribe(
      (data) => {
        this.productsCopy = [...data['products']]
        return this.products = data['products'] || [];
      }
    )
  }

  ngOnInit(): void {
    this.backendServiceAllProductsSubscription = this.backendService.getProducts().subscribe(
      (data) => {
        this.productsCopy = [...data['products']]
        return this.products = data['products'] || [];
      }
    )

    this.initDeleteModal();

    this.initPreviewModal();

  }

  initDeleteModal() {
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
    this.deleteModal = new Modal($modal, options)
  }

  initPreviewModal() {
    const $modal = document.getElementById('popup-modal-preview');

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
    this.previewModal = new Modal($modal, options)
  }

  showPreview(_product: Product) {
    console.log('called show preview');

    this.previewModal?.show();
    this.previewProduct = _product;
  }

  handleDelete(_product: Product) {
    this.deleteModal?.show();
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
          this.deleteModal?.hide();
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
