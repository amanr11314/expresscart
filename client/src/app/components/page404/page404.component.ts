import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-page404',
  templateUrl: './page404.component.html',
  styleUrls: ['./page404.component.css']
})
export class Page404Component {
  @Input()
  title = '404';

  @Input()
  subTitle = 'Page Not Found'

  @Input()
  showRedirect = true;

}
