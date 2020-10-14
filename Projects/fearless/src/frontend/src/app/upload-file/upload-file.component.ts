import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

interface FileForm {
  file: any
}

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.styl']
})
export class UploadFileComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<UploadFileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FileForm) { }

  onNoClick() {
    this.dialogRef.close()
  }

  valueChange(e) {
    console.log(e)
    this.data.file = e.target.files
  }

  ngOnInit(): void {
  }

}
