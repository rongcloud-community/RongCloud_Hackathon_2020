import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AcccountManagementService } from '../account-management.service';

interface FileForm {
  file: any
  result: any
}

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.styl']
})
export class UploadFileComponent implements OnInit {
  constructor(
    private accSer: AcccountManagementService,
    public dialogRef: MatDialogRef<UploadFileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FileForm) { }

  onNoClick() {
    this.dialogRef.close()
  }

  valueChange(e) {
    this.data.file = e.target.files
  }

  ngOnInit(): void {
  }

}
