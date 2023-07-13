import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Product } from '../Product';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.css'],
  providers: [TaskService]
})
export class ProductsTableComponent implements OnInit {

  products: Product[] = [];

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.taskService.getProducts().subscribe(
      (data) => {
        return this.products = data['products'] || [];
      }
    )
  }
}
