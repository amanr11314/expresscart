import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../../Product';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
  providers: [TaskService]
})
export class ProductDetailsComponent implements OnInit, OnDestroy {

  id?: number;
  private sub?: any;
  productDetails?: Product


  constructor(private route: ActivatedRoute, private taskService: TaskService) { }

  ngOnInit(): void {
    // this.
    this.sub = this.route.params.subscribe(
      params => {
        this.id = +params['id'];
        this.taskService.getProductDetail(this.id).subscribe(
          (data) => {
            console.log(JSON.stringify(data))
            return this.productDetails = data['product']
          }
        )
      }
    )
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
