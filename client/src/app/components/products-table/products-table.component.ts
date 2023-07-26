import { Component, Input, OnDestroy, OnInit, } from '@angular/core';
import { BackendService } from '../../services/backend.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { User } from 'src/app/shared/User';
import { Product } from '../../shared/Product';
import { Modal, ModalOptions } from 'flowbite';
import { Subscription, Observable, of, tap, share } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CartService } from 'src/app/services/cart.service';
import { CartProductsEntity } from 'src/app/shared/Cart';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.css'],
  providers: [BackendService]
})
export class ProductsTableComponent implements OnInit, OnDestroy {

  // @Input()
  // sharedCartService?: CartService

  list: any[] = []
  checkedList: any[] = [];


  onChange(item: Product) {
    const checked = this.checkedList.includes(item.id)
    if (!checked) {
      // add to checked list
      this.checkedList.push(item.id!);
    } else {
      // remove from checked list
      this.checkedList.splice(this.checkedList.indexOf(item.id), 1);
    }
    console.log('checked list: ');
    console.log(this.checkedList);

  }

  isAllSelected = false;

  handleAllSelected(val: any) {

    if (val) {
      // select all by pushing id
      this.checkedList = this.list.map(item => item.id)
    } else {
      this.checkedList = []
    }

    console.log('allselected: ', val);
    console.log(this.checkedList);

  }

  isShowAlert = false;
  alertText = '';

  showAlert(val: string) {
    this.alertText = val
    this.isShowAlert = true;
    setTimeout(() => {
      this.isShowAlert = false;
    }, 2300)
  }

  backendServiceDeleteProductSubscription?: Subscription;

  currentUser?: User

  searchString: string = '';

  products$: Observable<Product[]> = of([]);

  previewModal?: Modal
  previewProduct?: Product

  deleteModal?: Modal
  deleteProduct?: Product;

  cartModal?: Modal;

  /**
   * -1 ASC
   *  1 DESC
   */
  sortOrder = 0;

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
    private actRoute: ActivatedRoute, private SpinnerServcie: NgxSpinnerService, private cartService: CartService
  ) { }

  loadProducts(query?: string) {
    this.SpinnerServcie.show();
    // if (query) {
    const params = {}

    if (this.sortOrder) {
      Object.assign(params, {
        order: this.sortOrder === -1 ? 'ASC' : 'DESC',
        col: 'title'
      })
    }
    if (this.searchString.trim().length > 0) {
      Object.assign(params, { search: this.searchString })
    }

    this.products$ = this.backendService.getProducts(params).pipe(
      tap((data) => {
        console.log(data);
        const newList: any[] = [...data]

        // maintain checked list
        newList.forEach(
          (item, idx) => {
            if (this.checkedList.includes(item.id)) {
              newList[idx].checked = true;
            }
          }
        )
        this.list = newList

        this.SpinnerServcie.hide()
      })
    )
  }

  onSortClick = (val: any) => {
    if (this.sortOrder) {
      this.sortOrder *= -1;
    } else {
      this.sortOrder = -1;
    }

    this.loadProducts();
  }

  onProductSearch(val: string) {
    // fetch products with filter
    this.searchString = val;
    this.loadProducts()
  }

  onSearchReset(val: any) {
    this.searchString = '';
    this.loadProducts();
  }

  ngOnInit(): void {
    this.loadProducts()
    this.initDeleteModal();
    this.initPreviewModal();
    this.initCartModal();
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

  initCartModal() {
    const $modal = document.getElementById('popup-modal-cart');

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
    this.cartModal = new Modal($modal, options)
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
          this.loadProducts();
          // this.products = this.products.filter(item => item.id != productId)
          this.deleteModal?.hide();
        }
      )
    }
  }

  showCartModal(_: any) {
    console.log('adding items to cart');
    console.log(this.checkedList);
    let alreadyAddedAll = false;
    this.cartService.localSelectedItemsCount$.subscribe(
      data => {
        alreadyAddedAll = data === this.checkedList.length;
      }
    )
    if (alreadyAddedAll) {
      this.resetChecklist();
      this.showAlert('Items Already present in cart')
    } else {
      this.cartModal?.show();
    }

  }

  handleConfirmAddToCart() {
    console.log('adding to cart', this.checkedList);
    this.hideCartModal();
    this.cartService.addBulkCart(this.checkedList).subscribe({
      next: (val) => {
        console.log('items were added: ', val);
        const msg = val?.status;
        const updatedCartProducts = val?.updatedCartProducts || [];
        this.cartService.changeSelectedCount(updatedCartProducts.length)
        this.showAlert(msg)
      },
      error: (err) => {
        console.log('something went wrong: ', err);
      },
      complete: () => {
        console.log('completed');
        this.resetChecklist();
      }
    })

  }

  resetChecklist() {
    this.checkedList = []
    this.isAllSelected = false;
  }

  hideCartModal() {
    this.cartModal?.hide();
  }

  ngOnDestroy(): void {
    if (this.backendServiceDeleteProductSubscription) {
      this.backendServiceDeleteProductSubscription.unsubscribe();
    }
  }
}
