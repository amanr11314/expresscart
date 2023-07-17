import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-file-upload-component',
  templateUrl: './file-upload-component.component.html',
  styleUrls: ['./file-upload-component.component.css'],
  providers: [FileUploadService]
})
export class FileUploadComponentComponent implements OnInit {
  ngOnInit(): void {

  }

  shortLink: string = "";
  loading: boolean = false;
  file: File | null = null;

  constructor(private fileUploadService: FileUploadService) { }

  onChange(event: any) {
    this.file = event.target.files[0];
  }

  onUpload() {
    this.loading = !this.loading;
    console.log(this.file);
    this.fileUploadService.upload(this.file).subscribe(
      (event: any) => {
        if (typeof (event) === 'object') {
          this.shortLink = event.link;
          this.loading = false;
        }
      }
    )

  }


}
